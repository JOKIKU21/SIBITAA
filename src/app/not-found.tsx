import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-b from-brand/5 to-brand/10 flex flex-col items-center justify-center p-6 text-center antialiased">
      <div className="max-w-md w-full space-y-6 bg-white border border-neutral-border rounded-[20px] p-8 shadow-2xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-brand-bg flex items-center justify-center text-brand">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-brand font-display tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-neutral-text font-display">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-sm text-neutral-muted leading-relaxed font-body">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center bg-brand hover:bg-brand-dark active:scale-[0.98] text-white text-[14px] font-bold py-3 px-5 rounded-[12px] transition-all duration-200"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center bg-brand-bg hover:bg-brand-light/10 text-brand text-[14px] font-bold py-3 px-5 rounded-[12px] transition-all duration-200 border border-brand/10"
          >
            Buka Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
