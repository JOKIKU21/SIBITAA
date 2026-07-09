"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { authService } from "@/services/auth";

const BOOK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
    <path
      d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
      stroke="#2B3BAF"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M4 17.5C4 16.12 5.12 15 6.5 15H18"
      stroke="#2B3BAF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ERROR_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AuthForm({ mode }: { mode: "masuk" | "daftar" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "masuk";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await authService.signIn(email, password);
        router.push("/dashboard");
      } else {
        await authService.signUp(nama, email, password);
        router.push(`/verifikasi?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(message);

      // Redirect to verification if email is not verified
      if (
        isLogin &&
        (message.toLowerCase().includes("verify") ||
          message.toLowerCase().includes("verified") ||
          message.toLowerCase().includes("unverified"))
      ) {
        router.push(`/verifikasi?email=${encodeURIComponent(email)}`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal masuk dengan Google.";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-5 py-10 px-9 w-full max-w-105 shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center">
        <div className="w-18 h-18 bg-neutral-bg rounded-3.5 mx-auto mb-5 flex items-center justify-center">{BOOK_ICON}</div>
        <h1 className="text-5.5 font-extrabold text-neutral-text mb-7">{isLogin ? "Selamat Datang di SIBITA" : "Daftar Akun SIBITA"}</h1>

        {error && (
          <div className="flex items-center gap-2 py-2.5 px-3.5 mb-4 rounded-2 bg-[#FEF2F2] border border-danger text-[13px] font-medium leading-normal animate-[slideDown_0.2s_ease]" role="alert">
            {ERROR_ICON}
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          {!isLogin && (
            <FormInput
              id="nama"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              required
              disabled={loading}
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          )}
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="nama@gmail.com"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder={isLogin ? "Masukkan password" : "Buat password (min. 8 karakter)"}
            required
            minLength={8}
            maxLength={128}
            disabled={loading}
            wrapperClassName="text-left mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="brand"
            size="lg"
            fullWidth
            className="mt-2"
            isLoading={loading}
          >
            {isLogin ? "Masuk" : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5 mx-0 text-neutral-muted text-[13px]">
          <div className="flex-1 h-px bg-neutral-border" />
          <span>{isLogin ? "Atau Masuk dengan" : "Atau Daftar dengan"}</span>
          <div className="flex-1 h-px bg-neutral-border" />
        </div>

        <Button
          variant="google"
          disabled={loading}
          onClick={handleGoogleLogin}
          fullWidth
        >
          {isLogin ? "Masuk dengan Google" : "Daftar dengan Google"}
        </Button>

        <p className="mt-5 text-[13px] text-neutral-muted">
          {isLogin ? (
            <>
              Belum punya akun?{" "}
              <Link
                href="/daftar"
                className="text-brand font-semibold no-underline cursor-pointer hover:underline"
              >
                Daftar di sini
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <Link
                href="/masuk"
                className="text-brand font-semibold no-underline cursor-pointer hover:underline"
              >
                Masuk di sini
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
