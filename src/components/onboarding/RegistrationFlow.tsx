"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import FileDropzone from "./FileDropzone";
import { Download, User, Building, Info, ArrowRight, BookUser } from "lucide-react";

const STEPS = ["Data Diri", "Pembayaran", "Kontrak"];

export default function RegistrationFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    prodi: "",
    asalKampus: "",
    pembayaran: "langsung-lunas",
  });

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === 2) {
      // Final submit
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(3); // Show success/waiting state
      }, 1000);
    }
  };

  const handleFinish = () => {
    router.push("/masuk");
  };

  if (currentStep === 3) {
    return (
      <div className="w-full max-w-[800px] mx-auto text-center py-10 animate-[slideUp_0.3s_ease]">
        <div className="bg-white rounded-5 shadow-[0_4px_24px_rgba(43,59,175,0.06)] border border-[#e0e7ff] p-12">
          <div className="w-24 h-24 bg-success-bg rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-success">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-7 font-extrabold text-neutral-text mb-4">
            Registrasi Berhasil!
          </h1>
          <p className="text-[14.5px] text-neutral-muted mb-8 leading-relaxed max-w-lg mx-auto">
            Akun Anda telah berhasil dibuat. Saat ini status akun Anda sedang 
            <span className="font-bold text-brand"> Menunggu Verifikasi Admin</span>. 
            Anda belum bisa masuk sebelum admin menyetujui akun Anda.
          </p>
          <Button
            variant="brand"
            size="lg"
            className="px-10"
            onClick={handleFinish}
          >
            Kembali ke Halaman Masuk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col items-center animate-[fadeIn_0.3s_ease]">
      {/* Header & Progress Bar */}
      <div className="mb-10 w-full text-center">
        <h1 className="text-[32px] font-extrabold text-[#0B1536] mb-3 tracking-tight">Registrasi Mahasiswa</h1>
        <p className="text-[14px] text-neutral-muted mb-10">
          Langkah {currentStep + 1} dari 3: {STEPS[currentStep]}
        </p>

        {/* Progress Timeline */}
        <div className="flex items-center justify-between max-w-[460px] mx-auto relative px-6">
          {/* Connecting Line background */}
          <div className="absolute top-5 left-10 right-10 h-[1.5px] bg-[#e2e8f0] -translate-y-1/2 z-0" />
          
          {/* Connecting Line active */}
          <div 
            className="absolute top-5 left-10 h-[1.5px] bg-brand -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: currentStep === 0 ? "0%" : currentStep === 1 ? "48%" : "100%" }}
          />

          {[0, 1, 2].map((step) => {
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2.5 bg-[#F0F4FF] px-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold transition-all duration-300 border-2 
                    ${isActive ? "border-brand bg-brand text-white shadow-[0_4px_12px_rgba(43,59,175,0.25)]" : 
                      isCompleted ? "border-brand bg-brand text-white" : "border-[#e2e8f0] bg-[#f8fafc] text-neutral-muted"}`}
                >
                  {step + 1}
                </div>
                <span className={`text-[12.5px] font-semibold ${isActive || isCompleted ? "text-brand" : "text-neutral-muted"}`}>
                  {STEPS[step]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3 shadow-[0_8px_30px_rgba(43,59,175,0.06)] border border-[#e2e8f0] w-full p-10">
        
        {/* Step 1: Data Diri */}
        {currentStep === 0 && (
          <div className="animate-[fadeIn_0.3s_ease] text-left">
            <div className="flex items-center gap-2.5 mb-5 text-[15.5px] text-[#0B1536] font-extrabold">
              <User size={18} className="text-brand" />
              Informasi Akademik
            </div>
            <div className="h-px bg-neutral-border w-full mb-8" />

            <div className="flex flex-col gap-6">
              <FormInput
                id="nama"
                label={<span>Nama Lengkap <span className="text-danger">*</span></span> as any}
                placeholder="Masukkan nama lengkap sesuai ijazah"
                leftIcon={<BookUser size={18} className="text-neutral-muted" />}
                className="bg-[#f8fafc] border-none py-3.5 h-[50px] shadow-sm rounded-2.5"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
                <FormInput
                  id="nim"
                  label={<span>Nomor Induk Mahasiswa (NIM) <span className="text-danger">*</span></span> as any}
                  placeholder="Masukkan NIM"
                  className="bg-[#f8fafc] border-none py-3.5 h-[50px] shadow-sm rounded-2.5"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                />
                
                <div className="text-left mb-4">
                  <label className="block text-[13px] font-semibold text-neutral-text mb-2">
                    Program Studi <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#f8fafc] border-none rounded-2.5 h-[50px] px-4 text-[13.5px] font-medium text-neutral-text outline-none appearance-none transition-colors duration-200 focus:ring-2 focus:ring-brand-light shadow-sm"
                      value={formData.prodi}
                      onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                    >
                      <option value="" disabled hidden>Pilih Program Studi</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                      <option value="Teknik Informatika">Teknik Informatika</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <FormInput
                id="asalKampus"
                label="Asal Kampus"
                placeholder="Contoh: Universitas Mataram"
                leftIcon={<Building size={18} className="text-neutral-muted" />}
                className="bg-[#f8fafc] border-none py-3.5 h-[50px] shadow-sm rounded-2.5"
                value={formData.asalKampus}
                onChange={(e) => setFormData({ ...formData, asalKampus: e.target.value })}
              />

              <div className="mt-4 p-4 rounded-2.5 bg-[#f0f4ff] border border-[#dbeafe] flex gap-3 items-start shadow-sm">
                <Info size={18} className="text-brand shrink-0 mt-0.5" />
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  Pastikan data yang Anda masukkan sudah benar sebelum melanjutkan ke tahap pembayaran. 
                  Data ini akan digunakan untuk kontrak perkuliahan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pembayaran */}
        {currentStep === 1 && (
          <div className="animate-[fadeIn_0.3s_ease] text-left">
            <div className="flex items-center gap-2.5 mb-5 text-[15.5px] text-[#0B1536] font-extrabold">
              <BookUser size={18} className="text-brand" />
              Informasi Pembayaran
            </div>
            <div className="h-px bg-neutral-border w-full mb-8" />

            <div className="flex flex-col gap-6">
              <FileDropzone
                label={<span>Upload File UKT <span className="text-danger">*</span></span> as any}
                subLabel="Format PDF, Maksimal 5MB"
              />
              
              <div className="mb-2 text-left">
                <label className="block text-[13px] font-semibold text-neutral-text mb-2">
                  Pilihan Pembayaran <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-[#f8fafc] border-none rounded-2.5 h-[50px] px-4 text-[13.5px] font-medium text-neutral-text outline-none appearance-none transition-colors duration-200 focus:ring-2 focus:ring-brand-light shadow-sm"
                    value={formData.pembayaran}
                    onChange={(e) => setFormData({ ...formData, pembayaran: e.target.value })}
                  >
                  <option value="langsung-lunas">Langsung Lunas</option>
                  <option value="cicil-2x">Cicil 2x</option>
                  <option value="cicil-3x">Cicil 3x</option>
                  <option value="cicil-4x">Cicil 4x</option>
                  <option value="bayar-diakhir">Bayar Di Akhir</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <FileDropzone
                label={<span>Upload Bukti Transfer <span className="text-danger">*</span></span> as any}
                subLabel="Format JPG/PNG/PDF, Maksimal 5MB"
              />
            </div>
          </div>
        )}

        {/* Step 3: Kontrak */}
        {currentStep === 2 && (
          <div className="animate-[fadeIn_0.3s_ease] text-left">
            <div className="flex items-center gap-2.5 mb-5 text-[15.5px] text-[#0B1536] font-extrabold">
              <BookUser size={18} className="text-brand" />
              Kontrak Bimbingan
            </div>
            <div className="h-px bg-neutral-border w-full mb-8" />

            <div className="flex flex-col gap-6">
              <div className="mb-2 p-6 rounded-3 bg-[#f0f4ff] border border-[#dbeafe] text-center flex flex-col items-center shadow-sm">
                <p className="text-[13px] text-[#475569] mb-4 leading-relaxed max-w-sm">
                  Silakan unduh dokumen kontrak bimbingan di bawah ini. Cetak, isi form yang diperlukan, 
                  tandatangani, lalu unggah kembali versi scan-nya.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  className="inline-flex items-center gap-2 bg-white border-[#cbd5e1] shadow-sm hover:bg-[#f8fafc]"
                  onClick={() => alert("Mendownload template kontrak...")}
                >
                  <Download size={16} />
                  Download Template Kontrak
                </Button>
              </div>

              <FileDropzone
                label={<span>Upload Kontrak Final <span className="text-danger">*</span></span> as any}
                subLabel="Format PDF berisi kontrak yang sudah ditandatangani"
              />
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-10 pt-8 border-t border-[#e2e8f0] flex items-center justify-between">
          <Button
            type="button"
            variant="link"
            className="text-brand font-bold text-[13.5px] hover:underline px-0 transition-opacity hover:opacity-80"
            onClick={() => alert("Draft tersimpan!")}
          >
            Simpan Draft
          </Button>

          <div className="flex gap-4">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={loading}
                className="text-neutral-text text-[13.5px] font-semibold shadow-sm h-11 px-6 border-[#e2e8f0]"
              >
                Kembali
              </Button>
            )}
            <Button
              variant="brand"
              size="custom"
              className="px-8 h-11 rounded-2.5 text-[14px] font-bold flex items-center gap-2 shadow-[0_4px_12px_rgba(43,59,175,0.2)] hover:shadow-[0_6px_16px_rgba(43,59,175,0.3)] transition-all duration-200"
              onClick={handleNext}
              isLoading={loading}
            >
              {currentStep === 2 ? "Kirim Pendaftaran" : "Selanjutnya"}
              {currentStep < 2 && <ArrowRight size={18} strokeWidth={2.5} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
