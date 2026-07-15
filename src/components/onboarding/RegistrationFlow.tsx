"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import FileDropzone from "./FileDropzone";
import { Download, User, Building, Info, ArrowRight, BookUser, Phone, GraduationCap } from "lucide-react";
import { apiFetch, apiUpload } from "@/lib/api-client";
import { useToast } from "@/components/providers/ToastProvider";
import { studentService } from "@/services/student";

const STEPS = ["Data Diri", "Pembayaran", "Kontrak"];

export default function RegistrationFlow() {
  const router = useRouter();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    prodi: "",
    asalKampus: "",
    pembayaran: "langsung-lunas",
    phoneNumber: "",
    education: "S1",
    title: "",
  });

  // State for active registration loaded from API
  const [activeRegistration, setActiveRegistration] = useState<any>(null);

  // State for uploaded files metadata
  const [uktFile, setUktFile] = useState<any>(null);
  const [paymentFile, setPaymentFile] = useState<any>(null);
  const [contractFile, setContractFile] = useState<any>(null);

  // Loading states for each file uploader
  const [isUploadingUkt, setIsUploadingUkt] = useState(false);
  const [isUploadingPayment, setIsUploadingPayment] = useState(false);
  const [isUploadingContract, setIsUploadingContract] = useState(false);

  // Helper to map UI payment options to database schema enum values
  const mapPaymentOption = (opt: string) => {
    switch (opt) {
      case "langsung-lunas": return "full";
      case "cicil-2x": return "installment_2x";
      case "cicil-3x": return "installment_3x";
      case "cicil-4x": return "installment_4x";
      case "bayar-diakhir": return "pay_at_end";
      default: return "full";
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const profile = await studentService.getProfile();
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            nama: profile.name || "",
            nim: profile.nim || "",
            prodi: profile.studyProgram || "",
            asalKampus: profile.campus || "",
            phoneNumber: profile.phoneNumber || "",
            education: profile.education || "S1",
          }));
          
          try {
            const regData = await studentService.getRegistration();
            if (regData && regData.registration) {
              const reg = regData.registration;
              setActiveRegistration(reg);
              
              let pembayaranVal = "langsung-lunas";
              if (reg.paymentOption === "full") pembayaranVal = "langsung-lunas";
              else if (reg.paymentOption === "installment_2x") pembayaranVal = "cicil-2x";
              else if (reg.paymentOption === "installment_3x") pembayaranVal = "cicil-3x";
              else if (reg.paymentOption === "installment_4x") pembayaranVal = "cicil-4x";
              else if (reg.paymentOption === "pay_at_end") pembayaranVal = "bayar-diakhir";
              
              setFormData((prev) => ({ ...prev, pembayaran: pembayaranVal }));

              const ukt = reg.files?.find((f: any) => f.type === "ukt");
              const payment = reg.files?.find((f: any) => f.type === "payment_proof");
              const contract = reg.files?.find((f: any) => f.type === "contract");

              if (ukt) setUktFile(ukt);
              if (payment) setPaymentFile(payment);
              if (contract) setContractFile(contract);

              if (contract) {
                setCurrentStep(3); // Registration completed
              } else {
                const isPaymentRequired = reg.paymentOption !== "pay_at_end";
                if (ukt && (!isPaymentRequired || payment)) {
                  setCurrentStep(2); // UKT and Payment (if required) uploaded -> move to Contract step
                } else {
                  setCurrentStep(1); // files missing
                }
              }
            } else {
              setCurrentStep(1);
            }
          } catch (err) {
            setCurrentStep(1);
          }
        }
      } catch (err) {
        setCurrentStep(0);
      } finally {
        setInitLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUploadUkt = async (file: File) => {
    setIsUploadingUkt(true);
    try {
      const uploadRes = await apiUpload(file, "registrations");
      if (activeRegistration) {
        // If registration already exists, link it immediately
        const res = await studentService.uploadRegistrationFile({
          type: "ukt",
          fileName: uploadRes.fileName,
          fileUrl: uploadRes.fileUrl,
          fileType: uploadRes.fileType,
          fileSize: uploadRes.fileSize,
        });
        setUktFile(res.file);
      } else {
        // Store as temporary file info in state to be linked later
        setUktFile({
          id: "temp-ukt",
          fileName: uploadRes.fileName,
          fileUrl: uploadRes.fileUrl,
          fileType: uploadRes.fileType,
          fileSize: uploadRes.fileSize,
          isTemp: true,
        });
      }
      toast.success("Dokumen UKT berhasil diunggah!");
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengunggah berkas UKT", { description: err.message || "Silakan coba lagi." });
    } finally {
      setIsUploadingUkt(false);
    }
  };

  const handleUploadPayment = async (file: File) => {
    setIsUploadingPayment(true);
    try {
      const uploadRes = await apiUpload(file, "registrations");
      if (activeRegistration) {
        // If registration already exists, get the payment record ID
        const firstInstallment = activeRegistration.payments?.find((p: any) => p.installment === 1);
        if (!firstInstallment) {
          throw new Error("Data pembayaran cicilan pertama tidak ditemukan.");
        }
        const res = await studentService.uploadRegistrationFile({
          type: "payment_proof",
          fileName: uploadRes.fileName,
          fileUrl: uploadRes.fileUrl,
          fileType: uploadRes.fileType,
          fileSize: uploadRes.fileSize,
          registrationPaymentId: firstInstallment.id,
        });
        setPaymentFile(res.file);
      } else {
        // Store as temporary file info in state to be linked later
        setPaymentFile({
          id: "temp-payment",
          fileName: uploadRes.fileName,
          fileUrl: uploadRes.fileUrl,
          fileType: uploadRes.fileType,
          fileSize: uploadRes.fileSize,
          isTemp: true,
        });
      }
      toast.success("Bukti transfer berhasil diunggah!");
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengunggah bukti transfer", { description: err.message || "Silakan coba lagi." });
    } finally {
      setIsUploadingPayment(false);
    }
  };

  const handleUploadContract = async (file: File) => {
    setIsUploadingContract(true);
    try {
      const uploadRes = await apiUpload(file, "registrations");
      if (!activeRegistration) {
        throw new Error("Pendaftaran belum dibuat.");
      }
      const res = await studentService.uploadRegistrationFile({
        type: "contract",
        fileName: uploadRes.fileName,
        fileUrl: uploadRes.fileUrl,
        fileType: uploadRes.fileType,
        fileSize: uploadRes.fileSize,
      });
      setContractFile(res.file);
      toast.success("Kontrak final berhasil diunggah!");
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengunggah kontrak bimbingan", { description: err.message || "Silakan coba lagi." });
    } finally {
      setIsUploadingContract(false);
    }
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      if (
        !formData.nama.trim() ||
        !formData.nim.trim() ||
        !formData.prodi.trim() ||
        !formData.asalKampus.trim() ||
        !formData.phoneNumber.trim() ||
        !formData.education.trim()
      ) {
        toast.warning("Silakan lengkapi semua field bertanda bintang (*)");
        return;
      }

      setLoading(true);
      try {
        await apiFetch("/api/student/profile", {
          method: "POST",
          body: JSON.stringify({
            campus: formData.asalKampus,
            nim: formData.nim,
            studyProgram: formData.prodi,
            title: formData.title || undefined,
            education: formData.education,
            phoneNumber: formData.phoneNumber,
          }),
        });
        setCurrentStep(1);
      } catch (err: any) {
        if (err.status === 409) {
          // Profile already exists, skip to Step 1
          setCurrentStep(1);
        } else {
          console.error(err);
          toast.error("Gagal mengirim data", { description: err.message || "Silakan coba lagi." });
        }
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 1) {
      const paymentOpt = mapPaymentOption(formData.pembayaran);
      const isPaymentRequired = paymentOpt !== "pay_at_end";

      if (!uktFile) {
        toast.warning("Silakan unggah file UKT terlebih dahulu.");
        return;
      }
      if (isPaymentRequired && !paymentFile) {
        toast.warning("Silakan unggah bukti transfer terlebih dahulu.");
        return;
      }

      setLoading(true);
      try {
        let registration = activeRegistration;

        // 1. Create registration if it does not exist
        if (!registration) {
          await studentService.createRegistration({
            paymentOption: paymentOpt,
          });
          // Call GET to retrieve the full registration with generated payments
          const fullRes = await studentService.getRegistration();
          registration = fullRes.registration;
          setActiveRegistration(registration);
        } else if (!registration.payments || registration.payments.length === 0) {
          // If for some reason activeRegistration doesn't have payments, fetch it
          const fullRes = await studentService.getRegistration();
          registration = fullRes.registration;
          setActiveRegistration(registration);
        }

        // 2. Link UKT file if it was uploaded as temporary
        if (uktFile && uktFile.isTemp) {
          const res = await studentService.uploadRegistrationFile({
            type: "ukt",
            fileName: uktFile.fileName,
            fileUrl: uktFile.fileUrl,
            fileType: uktFile.fileType,
            fileSize: uktFile.fileSize,
          });
          setUktFile(res.file);
        }

        // 3. Link Payment Proof file if temporary and required
        if (isPaymentRequired && paymentFile && paymentFile.isTemp) {
          const firstInstallment = registration.payments?.find((p: any) => p.installment === 1) || registration.payments?.[0];
          if (!firstInstallment) {
            throw new Error("Data pembayaran cicilan pertama tidak ditemukan.");
          }
          const res = await studentService.uploadRegistrationFile({
            type: "payment_proof",
            fileName: paymentFile.fileName,
            fileUrl: paymentFile.fileUrl,
            fileType: paymentFile.fileType,
            fileSize: paymentFile.fileSize,
            registrationPaymentId: firstInstallment.id,
          });
          setPaymentFile(res.file);
        }

        setCurrentStep(2);
      } catch (err: any) {
        console.error(err);
        toast.error("Gagal memproses pendaftaran", { description: err.message || "Silakan coba lagi." });
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      if (!contractFile) {
        toast.warning("Silakan unggah kontrak final bimbingan terlebih dahulu.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(3); // Show success/waiting state
      }, 800);
    }
  };

  const handleFinish = () => {
    router.push("/masuk");
  };

  if (initLoading) {
    return (
      <div className="w-full max-w-200 mx-auto text-center py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-neutral-muted text-[14px]">Memuat data registrasi...</p>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="w-full max-w-200 mx-auto text-center py-10 animate-[slideUp_0.3s_ease]">
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
            <span className="font-bold text-brand"> Menunggu Verifikasi</span>. 
            Anda belum bisa masuk sebelum admin menyetujui akun Anda. Hubungi admin jika ada pertanyaan lebih lanjut. Terima kasih telah mendaftar!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-200 mx-auto flex flex-col items-center animate-[fadeIn_0.3s_ease]">
      {/* Header & Progress Bar */}
      <div className="mb-10 w-full text-center">
        <h1 className="text-[32px] font-extrabold text-[#0B1536] mb-3 tracking-tight">Registrasi Mahasiswa</h1>
        <p className="text-[14px] text-neutral-muted mb-10">
          Langkah {currentStep + 1} dari 3: {STEPS[currentStep]}
        </p>

        {/* Progress Timeline */}
        <div className="flex items-center justify-between max-w-115 mx-auto relative px-6">
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
                className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
                <FormInput
                  id="nim"
                  label={<span>Nomor Induk Mahasiswa (NIM) <span className="text-danger">*</span></span> as any}
                  placeholder="Masukkan NIM"
                  className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                />
                
                <FormInput
                  id="prodi"
                  label={<span>Program Studi <span className="text-danger">*</span></span> as any}
                  placeholder="Contoh: Teknologi Informasi"
                  className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                  value={formData.prodi}
                  onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
                <FormInput
                  id="phoneNumber"
                  label={<span>Nomor HP <span className="text-danger">*</span></span> as any}
                  placeholder="Contoh: 081234567890"
                  leftIcon={<Phone size={18} className="text-neutral-muted" />}
                  className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />

                <div className="text-left flex flex-col">
                  <label className="block text-[13px] font-semibold text-neutral-text mb-2">
                    Pendidikan <span className="text-danger">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-neutral-muted pointer-events-none">
                      <GraduationCap size={18} />
                    </div>
                    <select
                      className="w-full bg-[#f8fafc] border-none rounded-2.5 h-12.5 pl-11 pr-10 text-[13.5px] font-medium text-neutral-text outline-none appearance-none transition-colors duration-200 focus:ring-2 focus:ring-brand-light shadow-sm"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    >
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                    <div className="absolute right-4 pointer-events-none text-neutral-muted">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <FormInput
                id="asalKampus"
                label={<span>Asal Kampus <span className="text-danger">*</span></span> as any}
                placeholder="Contoh: Universitas Mataram"
                leftIcon={<Building size={18} className="text-neutral-muted" />}
                className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                value={formData.asalKampus}
                onChange={(e) => setFormData({ ...formData, asalKampus: e.target.value })}
              />

              <FormInput
                id="title"
                label={<span>Judul Tugas Akhir / Topik</span> as any}
                placeholder="Masukkan judul tugas akhir / topik skripsi Anda (opsional)"
                leftIcon={<BookUser size={18} className="text-neutral-muted" />}
                className="bg-[#f8fafc] border-none py-3.5 h-12.5 shadow-sm rounded-2.5"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                accept=".pdf"
                files={uktFile ? [{ id: uktFile.id, fileName: uktFile.fileName, fileSize: uktFile.fileSize }] : []}
                onFileSelect={handleUploadUkt}
                onDeleteFile={() => setUktFile(null)}
                isLoading={isUploadingUkt}
              />
              
              <div className="mb-2 text-left">
                <label className="block text-[13px] font-semibold text-neutral-text mb-2">
                  Pilihan Pembayaran <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-[#f8fafc] border-none rounded-2.5 h-12.5 px-4 text-[13.5px] font-medium text-neutral-text outline-none appearance-none transition-colors duration-200 focus:ring-2 focus:ring-brand-light shadow-sm"
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

              {formData.pembayaran !== "bayar-diakhir" && (
                <FileDropzone
                  label={<span>Upload Bukti Transfer <span className="text-danger">*</span></span> as any}
                  subLabel="Format PDF, Maksimal 5MB"
                  accept=".pdf"
                  files={paymentFile ? [{ id: paymentFile.id, fileName: paymentFile.fileName, fileSize: paymentFile.fileSize }] : []}
                  onFileSelect={handleUploadPayment}
                  onDeleteFile={() => setPaymentFile(null)}
                  isLoading={isUploadingPayment}
                />
              )}
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
                  onClick={() => toast.info("Mendownload template kontrak...")}
                >
                  <Download size={16} />
                  Download Template Kontrak
                </Button>
              </div>

              <FileDropzone
                label={<span>Upload Kontrak Final <span className="text-danger">*</span></span> as any}
                subLabel="Format PDF berisi kontrak yang sudah ditandatangani"
                accept=".pdf"
                files={contractFile ? [{ id: contractFile.id, fileName: contractFile.fileName, fileSize: contractFile.fileSize }] : []}
                onFileSelect={handleUploadContract}
                onDeleteFile={() => setContractFile(null)}
                isLoading={isUploadingContract}
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
            onClick={() => toast.success("Draft berhasil disimpan!")}
          >
            Simpan Draft
          </Button>

          <div className="flex gap-4">
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
