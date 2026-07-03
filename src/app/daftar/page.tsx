"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { AuthError } from "@/components/AuthAlert";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import GoogleButton from "@/components/GoogleButton";

// ponytail: same structure as masuk — needs use client for form state + router.push

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

export default function DaftarPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleDaftar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("nama") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // ponytail: placeholder — replace with actual auth logic
    console.log("[DaftarPage] Register attempt:", { name, email, password });

    // Simulate async + redirect to verification
    setTimeout(() => {
      console.log("[DaftarPage] Register success — redirecting to verifikasi");
      router.push(`/verifikasi?email=${encodeURIComponent(email)}`);
    }, 1000);
  }

  return (
    <AuthCard icon={BOOK_ICON} title="Daftar Akun SIBITA">
      <AuthError message={error} />

      <form onSubmit={handleDaftar} style={{ textAlign: "left" }}>
        <FormInput
          id="nama"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          required
          disabled={loading}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="nama@gmail.com"
          required
          disabled={loading}
        />
        <PasswordInput
          placeholder="Buat password (min. 8 karakter)"
          required
          minLength={8}
          maxLength={128}
          disabled={loading}
        />
        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </button>
      </form>

      <div className="divider">Atau Daftar dengan</div>

      <GoogleButton label="Daftar dengan Google" disabled={loading} />

      <p className="back-link">
        Sudah punya akun? <Link href="/masuk">Masuk di sini</Link>
      </p>
    </AuthCard>
  );
}
