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
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          marginBottom: "8px",
          lineHeight: "1.6",
        }}
      >
        Kami telah mengirimkan kode OTP 6 digit ke email:
      </p>
      {email ? (
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--blue-primary)",
            marginBottom: "24px",
          }}
        >
          {email}
        </p>
      ) : null}

      <AuthError message={error} />
      <AuthSuccess message={success} />

      <form onSubmit={handleVerify} style={{ textAlign: "left" }}>
        <div className="form-group">
          <label htmlFor="otp-0" style={{ textAlign: "center" }}>
            Kode OTP
          </label>
          <div className="otp-inputs" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className="otp-input"
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
          className="btn-login"
          style={{ marginTop: "16px" }}
          disabled={loading || !otpComplete}
        >
          {loading ? "Memverifikasi..." : "Verifikasi Akun"}
        </button>
      </form>

      <p className="back-link" style={{ marginTop: "24px" }}>
        Belum menerima email?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0}
          style={{
            background: "none",
            border: "none",
            color:
              resendCooldown > 0 ? "var(--text-light)" : "var(--blue-primary)",
            fontWeight: 600,
            cursor: resendCooldown > 0 ? "default" : "pointer",
            padding: 0,
            font: "inherit",
          }}
        >
          {resendCooldown > 0
            ? `Kirim Ulang (${resendCooldown}s)`
            : "Kirim Ulang"}
        </button>
        <br />
        <br />
        Kembali ke <Link href="/daftar">Pendaftaran</Link>
      </p>
    </AuthCard>
  );
}
