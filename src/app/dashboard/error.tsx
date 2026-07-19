"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[60vh] text-center antialiased">
      <div className="max-w-md w-full bg-white border border-neutral-border rounded-4 p-8 shadow-md">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-danger-bg flex items-center justify-center text-danger">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <h3 className="font-display font-extrabold text-neutral-text text-[18px] mb-2">
          Terjadi Kesalahan di Dashboard
        </h3>
        <p className="text-neutral-muted text-[13.5px] leading-relaxed mb-6 font-body">
          Sistem mengalami kendala saat memuat data dashboard. Silakan coba kembali atau hubungi admin.
        </p>

        {error.digest && (
          <div className="text-[11px] text-neutral-light font-mono bg-neutral-bg py-1.5 px-3 rounded-md mb-6 break-all border border-neutral-border/50">
            ID Error: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center bg-brand hover:bg-brand-dark active:scale-[0.98] text-white text-[13px] font-semibold py-2.5 px-4 rounded-2.5 cursor-pointer transition-all duration-150"
          >
            Coba Lagi
          </button>
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center bg-brand-bg hover:bg-brand-light/10 text-brand text-[13px] font-semibold py-2.5 px-4 rounded-2.5 transition-all duration-150 border border-brand/10"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
