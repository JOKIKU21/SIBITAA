"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { authService } from "@/services/auth";

const ERROR_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const SUCCESS_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

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
      setSuccess("Email berhasil diverifikasi! Melanjutkan ke pendaftaran...");
      setTimeout(() => {
        router.push("/registrasi-mahasiswa");
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
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-5 py-10 px-9 w-full max-w-105 shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center">
        <div className="w-18 h-18 bg-neutral-bg rounded-3.5 mx-auto mb-5 flex items-center justify-center">{MAIL_ICON}</div>
        <h1 className="text-5.5 font-extrabold text-neutral-text mb-7">Verifikasi Email</h1>

        <p className="text-3.5 text-neutral-muted mb-2 leading-[1.6]">
          Kami telah mengirimkan kode OTP 6 digit ke email:
        </p>
        {email ? (
          <p className="text-3.5 font-semibold text-brand mb-6">
            {email}
          </p>
        ) : null}

        {error && (
          <div className="flex items-center gap-2 py-2.5 px-3.5 mb-4 rounded-2 bg-[#FEF2F2] border border-danger text-[13px] font-medium leading-normal animate-[slideDown_0.2s_ease]" role="alert">
            {ERROR_ICON}
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 py-2.5 px-3.5 mb-4 rounded-2 bg-[#F0FDF4] border border-success text-[13px] font-medium leading-normal animate-[slideDown_0.2s_ease]" role="status">
            {SUCCESS_ICON}
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="text-left">
          <div className="text-left mb-4">
            <label htmlFor="otp-0" className="block text-[13px] font-semibold text-neutral-text mb-1.5 text-center">
              Kode OTP
            </label>
            <div className="flex justify-center gap-2" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <Input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  variant="custom"
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
                  fullWidth={false}
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="brand"
            size="lg"
            fullWidth
            className="mt-4"
            disabled={!otpComplete}
            isLoading={loading}
          >
            Verifikasi Akun
          </Button>
        </form>

        <p className="mt-6 text-[13px] text-neutral-muted">
          Belum menerima email?{" "}
          <Button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            variant="link"
            className="text-[13px] font-semibold disabled:text-neutral-light disabled:opacity-100 disabled:cursor-default"
          >
            {resendCooldown > 0
              ? `Kirim Ulang (${resendCooldown}s)`
              : "Kirim Ulang"}
          </Button>
          <br />
          <br />
          Kembali ke{" "}
          <Link href="/daftar" className="text-brand font-semibold no-underline cursor-pointer hover:underline">
            Pendaftaran
          </Link>
        </p>
      </div>
    </div>
  );
}
