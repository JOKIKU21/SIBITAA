"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthError } from "@/components/AuthAlert";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";
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

export default function MasukPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authService.signIn(email, password);
      router.push("/dashboard/mahasiswa");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Email atau password salah.";
      setError(message);
      // Redirect to verification if email is not verified
      if (
        message.toLowerCase().includes("verify") ||
        message.toLowerCase().includes("verified") ||
        message.toLowerCase().includes("unverified")
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
    <AuthCard icon={BOOK_ICON} title="Selamat Datang di SIBITA">
      <AuthError message={error} />

      <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="nama@gmail.com"
          required
          disabled={loading}
        />
        <PasswordInput
          placeholder="Masukkan password"
          required
          minLength={8}
          disabled={loading}
        />
        <button type="submit" className="w-full bg-brand text-white border-none p-3.5 rounded-2.5 text-[15px] font-bold cursor-pointer mt-2 transition-[background,transform] duration-100 no-underline block text-center font-sans hover:bg-brand-dark hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5 mx-0 text-neutral-muted text-[13px]">
        <div className="flex-1 h-px bg-neutral-border" />
        <span>Atau Masuk dengan</span>
        <div className="flex-1 h-px bg-neutral-border" />
      </div>

      <GoogleButton
        label="Masuk dengan Google"
        disabled={loading}
        onClick={handleGoogleLogin}
      />

      <p className="mt-5 text-[13px] text-neutral-muted">
        Belum punya akun?{" "}
        <Link href="/daftar" className="text-brand font-semibold no-underline cursor-pointer hover:underline">
          Daftar di sini
        </Link>
      </p>
    </AuthCard>
  );
}
