"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { AuthError } from "@/components/AuthAlert";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";

// ponytail: page needs use client for form state (error, loading) + event handlers

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // ponytail: placeholder — replace with actual auth logic
    console.log("[MasukPage] Login attempt:", { email, password });

    // Simulate async
    setTimeout(() => {
      console.log("[MasukPage] Login success — redirect to dashboard");
      setLoading(false);
    }, 1000);
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
        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <div className="divider">Atau Masuk dengan</div>

      <GoogleButton label="Masuk dengan Google" disabled={loading} />

      <p className="back-link">
        Belum punya akun? <Link href="/daftar">Daftar di sini</Link>
      </p>
    </AuthCard>
  );
}
