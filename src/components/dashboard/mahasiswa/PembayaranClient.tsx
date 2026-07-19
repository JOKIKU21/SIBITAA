"use client";

import { useState, useMemo } from "react";
import { 
  Coins, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  X, 
  Download, 
  CreditCard,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { 
  useStudentPayments, 
  useUploadPaymentProof,
  useEditPayment,
  useDeletePayment
} from "@/hooks/useStudent";
import { useToast } from "@/components/providers/ToastProvider";
import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader";
import type { RegistrationPayment } from "@/services/student";

export function PembayaranClient() {
  const { data: paymentsData, isLoading, error } = useStudentPayments();
  const uploadProofMutation = useUploadPaymentProof();
  const editMutation = useEditPayment();
  const deleteMutation = useDeletePayment();
  const toast = useToast();

  const [selectedPayment, setSelectedPayment] = useState<RegistrationPayment | null>(null);
  
  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const [tempFile, setTempFile] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Edit form states
  const [editInstallment, setEditInstallment] = useState<number>(1);
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editNote, setEditNote] = useState<string>("");

  // New payment form states
  const [newPaymentAmount, setNewPaymentAmount] = useState<number>(0);

  const mapPaymentOptionLabel = (option: string) => {
    switch (option) {
      case "full": return "Langsung Lunas";
      case "installment_2x": return "Cicilan (2x)";
      case "installment_3x": return "Cicilan (3x)";
      case "installment_4x": return "Cicilan (4x)";
      case "pay_at_end": return "Bayar di Akhir";
      default: return option || "-";
    }
  };

  const paymentGroup = useMemo(() => paymentsData?.payments?.[0] || null, [paymentsData]);
  const payments = useMemo(() => paymentGroup?.payments || [], [paymentGroup]);

  // Statistics calculations
  const totalAmount = useMemo(() => paymentGroup ? paymentGroup.totalAmount : 0, [paymentGroup]);
  const paidAmount = useMemo(() => 
    payments.reduce((acc, p) => p.status === "paid" ? acc + p.amount : acc, 0), 
    [payments]
  );
  const remainingAmount = totalAmount - paidAmount;
  
  const paymentOptionLabel = useMemo(() => {
    if (!paymentGroup) return "-";
    return mapPaymentOptionLabel(paymentGroup.paymentOption);
  }, [paymentGroup]);

  const paymentStatus = useMemo(() => {
    if (!paymentGroup) return "Belum Terdaftar";
    if (totalAmount > 0 && paidAmount === totalAmount) {
      return "Lunas";
    }
    return "Belum Lunas";
  }, [paymentGroup, totalAmount, paidAmount]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (isoString: string | null) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Upload modal handlers
  const handleOpenUploadModal = (payment: RegistrationPayment) => {
    setSelectedPayment(payment);
    setTempFile(null);
    setSelectedFile(null);
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedPayment(null);
    setTempFile(null);
    setSelectedFile(null);
  };

  // New payment modal handlers
  const handleOpenNewPaymentModal = () => {
    setNewPaymentAmount(remainingAmount > 0 ? remainingAmount : 0);
    setTempFile(null);
    setSelectedFile(null);
    setIsNewPaymentModalOpen(true);
  };

  const handleCloseNewPaymentModal = () => {
    setIsNewPaymentModalOpen(false);
    setTempFile(null);
    setSelectedFile(null);
    setNewPaymentAmount(0);
  };

  // Edit modal handlers
  const handleOpenEditModal = (payment: RegistrationPayment) => {
    setSelectedPayment(payment);
    setEditInstallment(payment.installment);
    setEditAmount(payment.amount);
    setEditNote(payment.note || "");
    
    // Set existing file if any
    if (payment.files && payment.files.length > 0) {
      const file = payment.files[0];
      setTempFile({
        id: file.id,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
      });
    } else {
      setTempFile(null);
    }
    setSelectedFile(null);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPayment(null);
    setTempFile(null);
    setSelectedFile(null);
    setEditInstallment(1);
    setEditAmount(0);
    setEditNote("");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTempFile({
      id: "temp-file",
      fileName: file.name,
      fileSize: file.size,
      fileUrl: URL.createObjectURL(file),
    });
    toast.success("Bukti transfer berhasil dipilih! Silakan klik Simpan.");
  };

  const handleSavePaymentProof = () => {
    if (!selectedPayment || !selectedFile) return;

    uploadProofMutation.mutate({
      paymentId: selectedPayment.id,
      file: selectedFile,
    }, {
      onSuccess: () => {
        toast.success("Bukti pembayaran berhasil disimpan dan sedang diverifikasi!");
        handleCloseUploadModal();
      },
      onError: (err: any) => {
        toast.error("Gagal memproses pembayaran", {
          description: err.message || "Silakan coba lagi."
        });
      }
    });
  };

  const handleSaveNewPayment = () => {
    if (!selectedFile) {
      toast.error("Harap unggah bukti transfer.");
      return;
    }
    if (newPaymentAmount <= 0) {
      toast.error("Harap isi nominal pembayaran dengan benar.");
      return;
    }

    uploadProofMutation.mutate({
      paymentId: "new",
      file: selectedFile,
      amount: newPaymentAmount,
    }, {
      onSuccess: () => {
        toast.success("Bukti pembayaran baru berhasil disimpan dan sedang diverifikasi!");
        handleCloseNewPaymentModal();
      },
      onError: (err: any) => {
        toast.error("Gagal memproses pembayaran baru", {
          description: err.message || "Silakan coba lagi."
        });
      }
    });
  };

  const handleSaveEdit = () => {
    if (!selectedPayment) return;

    editMutation.mutate({
      paymentId: selectedPayment.id,
      payload: {
        installment: editInstallment,
        amount: editAmount,
        note: editNote || "",
        file: selectedFile || undefined,
      },
    }, {
      onSuccess: () => {
        toast.success("Data pembayaran berhasil diperbarui!");
        handleCloseEditModal();
      },
      onError: (err: any) => {
        toast.error("Gagal mengubah data pembayaran", {
          description: err.message || "Silakan coba lagi."
        });
      }
    });
  };

  const handleDelete = (paymentId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data cicilan pembayaran ini secara permanen?")) {
      deleteMutation.mutate(paymentId, {
        onSuccess: () => {
          toast.success("Cicilan pembayaran berhasil dihapus!");
        },
        onError: (err: any) => {
          toast.error("Gagal menghapus pembayaran", {
            description: err.message || "Silakan coba lagi."
          });
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 bg-success-bg text-success py-1 px-3 rounded-full text-[12px] font-bold border border-success/15">
            <CheckCircle2 size={13} className="shrink-0" />
            Lunas
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 bg-warning-bg text-warning py-1 px-3 rounded-full text-[12px] font-bold border border-warning/15">
            <Clock size={13} className="shrink-0 animate-pulse" />
            Verifikasi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-neutral-bg text-neutral-muted py-1 px-3 rounded-full text-[12px] font-bold border border-neutral-border">
            <AlertCircle size={13} className="shrink-0" />
            Belum Bayar
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="p-7 max-[600px]:p-4">
        {/* Header Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8.5 w-64 bg-neutral-200 rounded mb-2" />
          <div className="h-4.5 w-96 bg-neutral-100 rounded" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-neutral-border rounded-3.5 p-5 h-28 animate-pulse flex flex-col justify-between shadow-xs">
              <div className="h-4 w-28 bg-neutral-100 rounded mb-2" />
              <div className="h-7 w-36 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden animate-pulse shadow-sm">
          <div className="py-4.5 px-6 border-b border-neutral-border h-14 bg-neutral-bg/30" />
          <div className="p-6 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 w-full bg-neutral-100 rounded-2.5" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-7 max-[600px]:p-4 text-center">
        <div className="bg-white border border-neutral-border rounded-3.5 py-12 px-6 shadow-sm">
          <AlertCircle size={44} className="text-danger mx-auto mb-4" />
          <h3 className="font-display font-extrabold text-[16px] text-neutral-text mb-2">Gagal Memuat Data Pembayaran</h3>
          <p className="text-[13.5px] text-neutral-muted max-w-md mx-auto mb-6">
            Terjadi kesalahan saat memuat status keuangan Anda. Pastikan Anda telah terdaftar dan akun Anda aktif.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-5.5 font-extrabold mb-1">Riwayat & Cicilan Pembayaran</h2>
            <p className="text-3.5 text-neutral-muted">
              Kelola tagihan, pantau status verifikasi, dan unggah bukti transfer pembayaran tugas akhir Anda.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap self-start">
            {paymentGroup && paymentStatus === "Belum Lunas" && (
              <Button
                variant="brand"
                size="custom"
                onClick={handleOpenNewPaymentModal}
                className="py-1.5 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-2 shadow-xs h-8.5"
              >
                <Upload size={14} className="shrink-0" />
                Unggah Pembayaran
              </Button>
            )}
            <div className={`py-1.5 px-4 rounded-full text-[12.5px] font-bold shrink-0 ${
              paymentStatus === "Lunas" ? "bg-success-bg text-success border border-success/20" : 
              "bg-[#f0f4ff] text-brand border border-brand/20"
            }`}>
              Status Akun: {paymentStatus}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1 mb-8">
          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1.5">Metode Pembayaran</div>
              <div className="text-5.5 font-display font-extrabold text-neutral-text">{paymentOptionLabel}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-neutral-muted font-semibold">
              <CreditCard size={14} className="text-brand shrink-0" />
              Sesuai pengajuan registrasi
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1.5">Total Tagihan</div>
              <div className="text-5.5 font-display font-extrabold text-neutral-text">{formatRupiah(totalAmount)}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-neutral-muted font-semibold">
              <Coins size={14} className="text-brand shrink-0" />
              Jumlah kewajiban UKT
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1.5">Sudah Terbayar</div>
              <div className="text-5.5 font-display font-extrabold text-success">{formatRupiah(paidAmount)}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-success font-bold">
              {totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0}% Terlapor
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1.5">Sisa Pembayaran</div>
              <div className="text-5.5 font-display font-extrabold text-warning">{formatRupiah(remainingAmount)}</div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-neutral-muted font-semibold">
              <Clock size={14} className="text-warning shrink-0" />
              Wajib dilunasi sesuai skema
            </div>
          </div>
        </div>

        {/* Payments List Table */}
        <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden shadow-xs">
          <div className="px-6 py-5 border-b border-neutral-border bg-neutral-bg/25">
            <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
              Jadwal & Riwayat Cicilan
            </h3>
          </div>

          {payments.length === 0 ? (
            <div className="p-12 text-center">
              <CreditCard size={40} className="text-neutral-400 mx-auto mb-3" />
              <h4 className="font-display font-bold text-neutral-text text-[14.5px] mb-1">Data Pembayaran Tidak Ditemukan</h4>
              <p className="text-neutral-muted text-[13px] max-w-xs mx-auto">
                Anda belum melakukan registrasi atau tidak memiliki jadwal pembayaran aktif.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-border bg-neutral-bg/40">
                    <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wider w-36">Cicilan</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Nominal Tagihan</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wider w-44">Tanggal Bayar</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wider w-32">Status</th>
                    <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => {
                    const hasFile = payment.files && payment.files.length > 0;
                    const proofFile = hasFile ? payment.files![0] : null;

                    return (
                      <tr key={payment.id} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/10 transition-colors">
                        <td className="py-4.5 px-6 font-display font-bold text-[14px] text-neutral-text">
                          Cicilan ke-{payment.installment}
                        </td>
                        <td className="py-4.5 px-4 font-display font-extrabold text-[14px] text-neutral-text">
                          {formatRupiah(payment.amount)}
                        </td>
                        <td className="py-4.5 px-4 text-[13px] text-neutral-muted font-medium">
                          {payment.paidAt ? formatDate(payment.paidAt) : "-"}
                        </td>
                        <td className="py-4.5 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {proofFile && (
                              <a
                                href={proofFile.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[12px] font-bold bg-[#f0f4ff] hover:bg-brand-bg text-brand border border-brand/10 py-1.5 px-3 rounded-1.75 transition-all cursor-pointer h-8.5"
                              >
                                <Eye size={13} className="shrink-0" />
                                Lihat Bukti
                              </a>
                            )}
                            {payment.status !== "paid" && (
                              <Button
                                variant="brand"
                                size="custom"
                                className="py-1.5 px-3 rounded-1.75 text-[12px] font-bold shadow-xs h-8.5 mr-1"
                                onClick={() => handleOpenUploadModal(payment)}
                              >
                                <Upload size={13} className="shrink-0 mr-1" />
                                Bayar Cicilan
                              </Button>
                            )}
                            {payment.status !== "paid" && (
                              <>
                                <button
                                  onClick={() => handleOpenEditModal(payment)}
                                  className="inline-flex items-center justify-center bg-neutral-bg hover:bg-neutral-border/40 text-neutral-text border border-neutral-border w-8.5 h-8.5 rounded-1.75 transition-all cursor-pointer"
                                  title="Edit Pembayaran"
                                  disabled={editMutation.isPending}
                                >
                                  <Edit size={13} />
                                </button>
                                <button
                                  onClick={() => handleDelete(payment.id)}
                                  className="inline-flex items-center justify-center bg-danger/10 hover:bg-danger/20 text-danger border border-danger/15 w-8.5 h-8.5 rounded-1.75 transition-all cursor-pointer"
                                  title="Hapus Pembayaran"
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            )}
                            {payment.status === "processing" && !proofFile && (
                              <span className="text-[12px] text-neutral-muted italic font-medium">
                                Menunggu Berkas Bukti
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Bukti Pembayaran Modal */}
      {isUploadModalOpen && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={handleCloseUploadModal} />
          
          <div className="relative bg-white border border-neutral-border rounded-4 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border bg-neutral-bg/20">
              <div className="flex items-center gap-2 text-brand">
                <CreditCard size={18} className="shrink-0" />
                <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
                  Konfirmasi Pembayaran Cicilan
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleCloseUploadModal}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 text-left">
              <div className="bg-[#f0f4ff] rounded-3.5 p-4.5 mb-5 border border-brand/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11.5px] text-neutral-muted uppercase tracking-wider font-bold block mb-0.5">Tipe Tagihan</span>
                    <span className="text-[14px] font-bold text-neutral-text font-display">Cicilan ke-{selectedPayment.installment}</span>
                  </div>
                  <div>
                    <span className="text-[11.5px] text-neutral-muted uppercase tracking-wider font-bold block mb-0.5">Nominal Bayar</span>
                    <span className="text-[14px] font-extrabold text-brand font-display">{formatRupiah(selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <FileUploader
                  id="payment-proof-uploader"
                  label={<span>Unggah Bukti Transfer <span className="text-danger">*</span></span> as any}
                  subLabel="Unggah struk transfer bank atau bukti pembayaran (PDF, DOCX, PNG, JPEG, maks 20MB)."
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  files={tempFile ? [tempFile] : []}
                  onFileSelect={handleFileSelect}
                  onDeleteFile={() => {
                    setTempFile(null);
                    setSelectedFile(null);
                  }}
                  isLoading={isUploading}
                  maxSizeMB={20}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-8 border-t border-neutral-border pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseUploadModal} 
                  className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-2.25 px-4.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors"
                >
                  Batal
                </button>
                <Button 
                  variant="brand"
                  size="custom"
                  onClick={handleSavePaymentProof} 
                  className="py-2.25 px-5.5 rounded-2 text-[12.5px] font-bold shadow-sm"
                  disabled={!tempFile || isUploading || uploadProofMutation.isPending}
                  isLoading={uploadProofMutation.isPending}
                >
                  Simpan Bukti Bayar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Pembayaran Modal */}
      {isEditModalOpen && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={handleCloseEditModal} />
          
          <div className="relative bg-white border border-neutral-border rounded-4 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border bg-neutral-bg/20">
              <div className="flex items-center gap-2 text-brand">
                <Edit size={18} className="shrink-0" />
                <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
                  Ubah Rincian Pembayaran
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleCloseEditModal}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 text-left flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Installment order field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-neutral-text">
                    Cicilan Ke- <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editInstallment}
                    onChange={(e) => setEditInstallment(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-[#f8fafc] border border-neutral-border rounded-2.5 h-11 px-4 text-[13.5px] font-medium outline-none focus:ring-2 focus:ring-brand-light"
                  />
                </div>
                {/* Amount field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-neutral-text">
                    Nominal Tagihan (Rp) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editAmount}
                    onChange={(e) => setEditAmount(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-[#f8fafc] border border-neutral-border rounded-2.5 h-11 px-4 text-[13.5px] font-medium outline-none focus:ring-2 focus:ring-brand-light"
                  />
                </div>
              </div>

              {/* Note field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-neutral-text">
                  Catatan Pembayaran
                </label>
                <textarea
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="Tambahkan catatan (misal: Transfer via bank Mandiri)"
                  className="w-full bg-[#f8fafc] border border-neutral-border rounded-2.5 py-2.5 px-4 text-[13.5px] font-medium outline-none focus:ring-2 focus:ring-brand-light resize-y min-h-18"
                />
              </div>

              {/* File Uploader to change files */}
              <div className="flex flex-col gap-1.5">
                <FileUploader
                  id="edit-payment-proof-uploader"
                  label={<span>Unggah Bukti Transfer Baru <span className="text-neutral-muted font-normal text-[12px]">(Opsional)</span></span> as any}
                  subLabel="Ganti berkas bukti pembayaran lama (PDF, DOCX, PNG, JPEG, maks 20MB)."
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  files={tempFile ? [tempFile] : []}
                  onFileSelect={handleFileSelect}
                  onDeleteFile={() => {
                    setTempFile(null);
                    setSelectedFile(null);
                  }}
                  isLoading={isUploading}
                  maxSizeMB={20}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-4 border-t border-neutral-border pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseEditModal} 
                  className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-2.25 px-4.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors"
                >
                  Batal
                </button>
                <Button 
                  variant="brand"
                  size="custom"
                  onClick={handleSaveEdit} 
                  className="py-2.25 px-5.5 rounded-2 text-[12.5px] font-bold shadow-sm"
                  disabled={isUploading || editMutation.isPending || editAmount <= 0}
                  isLoading={editMutation.isPending}
                >
                  Simpan Perubahan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Payment Modal */}
      {isNewPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={handleCloseNewPaymentModal} />
          
          <div className="relative bg-white border border-neutral-border rounded-4 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border bg-neutral-bg/20">
              <div className="flex items-center gap-2 text-brand">
                <CreditCard size={18} className="shrink-0" />
                <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
                  Unggah Pembayaran Baru
                </h3>
              </div>
              <button 
                type="button" 
                onClick={handleCloseNewPaymentModal}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 text-left flex flex-col gap-4">
              <div className="bg-[#f0f4ff] rounded-3.5 p-4.5 border border-brand/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11.5px] text-neutral-muted uppercase tracking-wider font-bold block mb-0.5">Sisa Tagihan</span>
                    <span className="text-[14px] font-extrabold text-neutral-text font-display">{formatRupiah(remainingAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[11.5px] text-neutral-muted uppercase tracking-wider font-bold block mb-0.5">Total Tagihan</span>
                    <span className="text-[14px] font-extrabold text-brand font-display">{formatRupiah(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-neutral-text">
                  Nominal Pembayaran (Rp) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={remainingAmount > 0 ? remainingAmount : undefined}
                  value={newPaymentAmount}
                  onChange={(e) => setNewPaymentAmount(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-[#f8fafc] border border-neutral-border rounded-2.5 h-11 px-4 text-[13.5px] font-medium outline-none focus:ring-2 focus:ring-brand-light"
                  placeholder="Masukkan nominal pembayaran"
                />
                <span className="text-[11.5px] text-neutral-muted font-medium">
                  Disarankan membayar sisa tagihan sebesar {formatRupiah(remainingAmount)}.
                </span>
              </div>

              {/* File Uploader */}
              <div className="flex flex-col gap-1.5">
                <FileUploader
                  id="new-payment-proof-uploader"
                  label={<span>Unggah Bukti Transfer <span className="text-danger">*</span></span> as any}
                  subLabel="Unggah struk transfer bank atau bukti pembayaran (PDF, DOCX, PNG, JPEG, maks 20MB)."
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  files={tempFile ? [tempFile] : []}
                  onFileSelect={handleFileSelect}
                  onDeleteFile={() => {
                    setTempFile(null);
                    setSelectedFile(null);
                  }}
                  isLoading={isUploading}
                  maxSizeMB={20}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-4 border-t border-neutral-border pt-4">
                <button 
                  type="button" 
                  onClick={handleCloseNewPaymentModal} 
                  className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-2.25 px-4.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors"
                >
                  Batal
                </button>
                <Button 
                  variant="brand"
                  size="custom"
                  onClick={handleSaveNewPayment} 
                  className="py-2.25 px-5.5 rounded-2 text-[12.5px] font-bold shadow-sm"
                  disabled={!tempFile || isUploading || uploadProofMutation.isPending || newPaymentAmount <= 0}
                  isLoading={uploadProofMutation.isPending}
                >
                  Unggah Bukti Bayar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
