import { Metadata } from "next";
import { Suspense } from "react";
import VerifikasiForm from "./VerifikasiForm";

export const metadata: Metadata = {
  title: "Verifikasi - SIBITA",
  description: "Verifikasi akun SIBITA Anda untuk mengelola bimbingan tugas akhir.",
};

export default function VerifikasiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
          <div className="bg-white rounded-5 py-10 px-9 w-full max-w-105 shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center flex justify-center items-center min-h-50">
            <p className="text-neutral-muted text-3.5">Memuat...</p>
          </div>
        </div>
      }
    >
      <VerifikasiForm />
    </Suspense>
  );
}
