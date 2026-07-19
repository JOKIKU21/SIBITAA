import React from "react";
import Link from "next/link";

export default function BimbinganNotFound() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4 flex flex-col items-center justify-center min-h-[50vh] text-center antialiased">
        <div className="max-w-md w-full bg-white border border-neutral-border rounded-4 p-8 shadow-md">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-neutral-bg flex items-center justify-center text-neutral-muted">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
          </div>

          <h3 className="font-display font-extrabold text-neutral-text text-[18px] mb-2">
            Mahasiswa Tidak Ditemukan
          </h3>
          <p className="text-neutral-muted text-[13.5px] leading-relaxed mb-6 font-body">
            Data bimbingan mahasiswa dengan ID tersebut tidak terdaftar dalam sistem bimbingan Anda.
          </p>

          <Link
            href="/dashboard/dosen/bimbingan"
            className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark active:scale-[0.98] text-white text-[13px] font-semibold py-2.5 px-6 rounded-2.5 transition-all duration-150 shadow-md shadow-brand/10 w-full"
          >
            Kembali ke Daftar Bimbingan
          </Link>
        </div>
      </div>
    </div>
  );
}
