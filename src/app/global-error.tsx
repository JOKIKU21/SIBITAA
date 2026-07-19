"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <head>
        <title>Sistem Error - SIBITA</title>
      </head>
      <body className="min-h-screen bg-radial from-[#1E293B] to-[#0F172A] text-slate-100 flex flex-col items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 border border-slate-800 rounded-[20px] p-8 backdrop-blur-md shadow-2xl">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-[14px] bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white font-sans">
              Terjadi Kesalahan Sistem
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Aplikasi mengalami kegagalan sistem yang tidak terduga. Silakan coba memuat ulang halaman.
            </p>
          </div>
          
          {error.digest && (
            <div className="text-[11px] text-slate-500 font-mono bg-slate-950/40 py-2 px-3 rounded-lg break-all border border-slate-800/50">
              ID Error: {error.digest}
            </div>
          )}
          
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#2B3BAF] hover:bg-[#1A2580] active:scale-[0.98] text-white text-[14.5px] font-bold py-3 px-6 rounded-[12px] transition-all duration-200 cursor-pointer shadow-lg shadow-[#2B3BAF]/20"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
