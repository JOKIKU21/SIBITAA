import { Suspense } from "react";
import VerifikasiForm from "./VerifikasiForm";

// ponytail: server component wrapper — only exists for Suspense boundary
// useSearchParams() in VerifikasiForm requires Suspense to avoid CSR bailout

export default function VerifikasiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
          <div className="bg-white rounded-5 py-10 px-9 w-full max-w-[420px] shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center flex justify-center items-center min-h-[200px]">
            <p className="text-neutral-muted text-3.5">Memuat...</p>
          </div>
        </div>
      }
    >
      <VerifikasiForm />
    </Suspense>
  );
}
