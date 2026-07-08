import { Metadata } from "next";
import RegistrationFlow from "@/components/onboarding/RegistrationFlow";

export const metadata: Metadata = {
  title: "Registrasi Mahasiswa - SIBITA",
  description: "Lengkapi data diri dan administrasi untuk mulai menggunakan SIBITA.",
};

export default function RegistrasiMahasiswaPage() {
  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
      <RegistrationFlow />
    </div>
  );
}
