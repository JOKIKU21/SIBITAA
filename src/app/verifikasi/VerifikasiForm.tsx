"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthError, AuthSuccess } from "@/components/AuthAlert";
import { authService } from "@/services/auth";

const MAIL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
    <path
      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
      stroke="#2B3BAF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="#2B3BAF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function VerifikasiForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState(() => Array<string>(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInputChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only

    setOtp((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      setOtp((prev) => {
        if (!prev[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        return prev;
      });
    }
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    setOtp(() => {
      const next = Array<string>(OTP_LENGTH).fill("");
      for (let i = 0; i < OTP_LENGTH; i++) {
        next[i] = pasted[i] ?? "";
      }
      return next;
    });

    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("Masukkan 6 digit kode OTP");
      return;
    }

    if (!email) {
      setError("Email tidak ditemukan. Silakan daftar ulang.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.verifyEmailOtp(email, code);
      setSuccess("Email berhasil diverifikasi! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memverifikasi OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0 || !email) return;

    setError("");
    setResendCooldown(RESEND_COOLDOWN);

    try {
      await authService.resendOtp(email);
      setSuccess("Kode OTP baru telah dikirim ke email Anda");
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim ulang kode OTP.");
      setResendCooldown(0); // reset cooldown on failure so they can try again
    }
  }

  const otpComplete = otp.join("").length === OTP_LENGTH;

  return (
    <AuthCard icon={MAIL_ICON} title="Verifikasi Email">
      <p className="text-3.5 text-neutral-muted mb-2 leading-[1.6]">
        Kami telah mengirimkan kode OTP 6 digit ke email:
      </p>
      {email ? (
        <p className="text-3.5 font-semibold text-brand mb-6">
          {email}
        </p>
      ) : null}

      <AuthError message={error} />
      <AuthSuccess message={success} />

      <form onSubmit={handleVerify} className="text-left">
        <div className="text-left mb-4">
          <label htmlFor="otp-0" className="block text-[13px] font-semibold text-neutral-text mb-1.5 text-center">
            Kode OTP
          </label>
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className="w-12 h-14 text-center text-5.5 font-bold border-[1.5px] border-neutral-border rounded-2.5 bg-neutral-bg text-neutral-text outline-none transition-[border-color,background,box-shadow] duration-200 caret-brand focus:border-brand-light focus:bg-[#f8f9ff] focus:shadow-[0_0_0_3px_rgba(43,59,175,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                type="text"
                inputMode="numeric"
                id={`otp-${i}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={loading}
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand text-white border-none p-3.5 rounded-2.5 text-[15px] font-bold cursor-pointer mt-4 transition-[background,transform] duration-100 no-underline block text-center font-sans hover:bg-brand-dark hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading || !otpComplete}
        >
          {loading ? "Memverifikasi..." : "Verifikasi Akun"}
        </button>
      </form>

      <p className="mt-6 text-[13px] text-neutral-muted">
        Belum menerima email?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className={`bg-transparent border-none font-semibold p-0 text-[13px] font-sans ${resendCooldown > 0 ? 'text-neutral-light cursor-default' : 'text-brand cursor-pointer'}`}
        >
          {resendCooldown > 0
            ? `Kirim Ulang (${resendCooldown}s)`
            : "Kirim Ulang"}
        </button>
        <br />
        <br />
        Kembali ke{" "}
        <Link href="/daftar" className="text-brand font-semibold no-underline cursor-pointer hover:underline">
          Pendaftaran
        </Link>
      </p>
    </AuthCard>
  );
}
