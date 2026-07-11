"use client";

import { useState } from "react";

interface InstallmentItem {
  id: string;
  installment: number;
  amount: number;
  status: "paid" | "pending" | "processing";
  paidAt: string | null;
}

interface PaymentRecord {
  registrationId: string;
  studentId: string;
  studentName: string;
  totalAmount: number;
  paidAmount: number;
  paymentOption: "installment" | "full";
  status: "pending" | "approved" | "rejected";
  payments: InstallmentItem[];
}

import { useAdminPayments, useUpdatePaymentStatus } from "@/hooks/useAdmin";

export function PembayaranManager() {
  const { data, isLoading, error, refetch } = useAdminPayments();
  const updatePayment = useUpdatePaymentStatus();

  const [selectedRegId, setSelectedRegId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const paymentsList = data?.payments || [];
  const selectedRecord = paymentsList.find(r => r.registrationId === selectedRegId) || null;

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Calculations for summary stats
  const totalTarget = paymentsList.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalReceived = paymentsList.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalReceivable = totalTarget - totalReceived;
  const collectionRate = totalTarget > 0 ? Math.round((totalReceived / totalTarget) * 100) : 0;

  const handleVerifyInstallment = (regId: string, paymentId: string) => {
    updatePayment.mutate(
      { paymentId, status: "paid" },
      {
        onSuccess: () => {
          setToastMessage("Pembayaran berhasil diverifikasi!");
          setTimeout(() => setToastMessage(null), 3000);
        },
      }
    );
  };


  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-success text-white py-3 px-5 rounded-3 shadow-lg flex items-center gap-2.5 toast-enter">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[13.5px] font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
        {/* Target Card */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-5 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Target Penerimaan</div>
            <div className="text-5.5 font-display font-extrabold text-neutral-text">{formatRupiah(totalTarget)}</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px]">
            <span className="text-neutral-muted font-medium">Berdasarkan data registrasi</span>
            <div className="w-7 h-7 rounded-2 bg-brand-bg flex items-center justify-center text-brand shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Received Card */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-5 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Total Dana Diterima</div>
            <div className="text-5.5 font-display font-extrabold text-success">{formatRupiah(totalReceived)}</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px]">
            <span className="text-success font-bold">{collectionRate}% Terkumpul</span>
            <div className="w-7 h-7 rounded-2 bg-success-bg flex items-center justify-center text-success shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Receivable Card */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-5 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Sisa Piutang</div>
            <div className="text-5.5 font-display font-extrabold text-warning">{formatRupiah(totalReceivable)}</div>
          </div>
          <div className="mt-4 flex items-center justify-between text-[12px]">
            <span className="text-neutral-muted font-medium">Dana yang belum dibayar</span>
            <div className="w-7 h-7 rounded-2 bg-warning-bg flex items-center justify-center text-warning shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-5 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1">Progres Pembayaran</div>
            <div className="text-5.5 font-display font-extrabold text-neutral-text">{collectionRate}%</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-neutral-bg rounded-full h-2">
              <div
                className="bg-brand h-2 rounded-full transition-[width] duration-500"
                style={{ width: `${collectionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>



      {/* Main Table List */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden shadow-sm">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
            Daftar Keuangan Mahasiswa
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3.5 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Metode</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Total Biaya</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Sudah Dibayar</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Menunggu Verifikasi</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Progres Pelunasan</th>
                <th className="py-3.5 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
                <th className="py-3.5 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="border-b border-neutral-border animate-pulse">
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-bg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3.5 bg-neutral-bg rounded w-3/4" />
                          <div className="h-2.5 bg-neutral-bg rounded w-1/2" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4.5 px-4"><div className="h-4 bg-neutral-bg rounded w-12" /></td>
                    <td className="py-4.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-20" /></td>
                    <td className="py-4.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-20" /></td>
                    <td className="py-4.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-16" /></td>
                    <td className="py-4.5 px-4"><div className="h-1.5 bg-neutral-bg rounded w-24" /></td>
                    <td className="py-4.5 px-4"><div className="h-5 bg-neutral-bg rounded w-16" /></td>
                    <td className="py-4.5 px-6 text-right"><div className="h-8 bg-neutral-bg rounded w-24 ml-auto" /></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <p className="text-danger text-[13.5px] font-bold mb-2">Gagal mengambil data keuangan.</p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="bg-danger text-white border-none text-[12px] font-bold py-1.5 px-4 rounded-2 cursor-pointer hover:bg-danger-dark"
                    >
                      Coba Lagi
                    </button>
                  </td>
                </tr>
              ) : paymentsList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[13.5px] text-neutral-muted">
                    Tidak ada data keuangan mahasiswa.
                  </td>
                </tr>
              ) : (
                paymentsList.map((record) => {
                  const isPaidInFull = record.paidAmount >= record.totalAmount;
                  const payPercent = record.totalAmount > 0 ? Math.round((record.paidAmount / record.totalAmount) * 100) : 0;
                  const hasProcessingPayment = record.payments?.some((p) => p.status === "processing");
                  const pendingAmount = record.payments?.reduce((sum, p) => p.status === "processing" ? sum + p.amount : sum, 0) || 0;

                  return (
                    <tr
                      key={record.registrationId}
                      className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/20 transition-colors"
                    >
                      {/* Student Name */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                            {record.studentName ? record.studentName.charAt(0) : "?"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="text-[13.5px] font-bold text-neutral-text leading-tight">{record.studentName || "-"}</div>
                              {hasProcessingPayment && (
                                <span className="inline-flex items-center gap-0.75 text-[10px] font-extrabold bg-warning-bg text-warning py-0.5 px-1.75 rounded-md animate-pulse">
                                  <span className="rounded-full bg-warning animate-ping absolute inline-flex h-1.25 w-1.25 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.25 w-1.25 bg-warning"></span>
                                  Butuh ACC
                                </span>
                              )}
                            </div>
                            <div className="text-[11.5px] text-neutral-muted mt-0.5">ID: {record.studentId || "-"}</div>
                          </div>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="py-4.5 px-4">
                        <span className={`inline-flex items-center text-[11px] font-bold py-0.5 px-2 rounded-md ${
                          record.paymentOption === "full"
                            ? "bg-success-bg text-success"
                            : "bg-warning-bg text-warning"
                        }`}>
                          {record.paymentOption === "full" ? "Penuh" : "Cicilan"}
                        </span>
                      </td>

                      {/* Total Cost */}
                      <td className="py-4.5 px-4 text-[13px] font-semibold text-neutral-text">
                        {formatRupiah(record.totalAmount)}
                      </td>

                      {/* Paid Amount */}
                      <td className="py-4.5 px-4 text-[13px] font-bold text-brand">
                        {formatRupiah(record.paidAmount)}
                      </td>

                      {/* Pending Verification Amount */}
                      <td className="py-4.5 px-4 text-[13px] font-bold">
                        {pendingAmount > 0 ? (
                          <span className="text-warning flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 animate-pulse">
                              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {formatRupiah(pendingAmount)}
                          </span>
                        ) : (
                          <span className="text-neutral-muted font-normal">-</span>
                        )}
                      </td>

                      {/* Progress Bar */}
                      <td className="py-4.5 px-4">
                        <div className="flex items-center gap-2 max-w-32">
                          <div className="flex-1 bg-neutral-bg h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${payPercent === 100 ? "bg-success" : "bg-brand"}`}
                              style={{ width: `${payPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-[11.5px] font-bold text-neutral-muted">{payPercent}%</span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-4.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11.5px] font-bold py-0.75 px-2.5 rounded-full ${
                          isPaidInFull
                            ? "bg-success-bg text-success"
                            : hasProcessingPayment
                            ? "bg-warning-bg text-warning"
                            : record.paidAmount === 0
                            ? "bg-danger-bg text-danger"
                            : "bg-neutral-bg text-neutral"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isPaidInFull ? "bg-success" : hasProcessingPayment ? "bg-warning" : record.paidAmount === 0 ? "bg-danger" : "bg-neutral"
                          }`}></span>
                          {isPaidInFull ? "Lunas" : hasProcessingPayment ? "Butuh ACC" : record.paidAmount === 0 ? "Belum Bayar" : "Mencicil"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRegId(record.registrationId)}
                          className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3.5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                        >
                          Detail & Termin
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Installments Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-border rounded-3.5 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border shrink-0">
              <h3 className="font-display text-[15.5px] font-extrabold text-neutral-text">
                Rincian Termin Pembayaran
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRegId(null)}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
              {/* Profile Card */}
              <div className="bg-neutral-bg/60 border border-neutral-border p-4 rounded-3 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center text-4.5 font-bold">
                  {selectedRecord.studentName.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-extrabold text-neutral-text">{selectedRecord.studentName}</div>
                  <div className="text-[12px] text-neutral-muted mt-px">Student ID: {selectedRecord.studentId}</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[11px] font-extrabold py-px px-1.75 bg-brand-bg text-brand rounded">
                      Registration ID: {selectedRecord.registrationId}
                    </span>
                    <span className={`text-[11px] font-extrabold py-px px-1.75 rounded ${
                      selectedRecord.paymentOption === "full" ? "bg-success-bg text-success" : "bg-warning-bg text-warning"
                    }`}>
                      {selectedRecord.paymentOption === "full" ? "Bayar Penuh" : "Cicilan"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Installment History list */}
              <div>
                <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-3">Daftar Termin Pembayaran</h4>
                <div className="flex flex-col gap-3">
                  {selectedRecord.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="border border-neutral-border rounded-3 p-4 bg-white flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-3.5 font-bold shrink-0 mt-0.5 ${
                          payment.status === "paid" ? "bg-success-bg text-success" : "bg-warning-bg text-warning"
                        }`}>
                          {payment.installment}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-bold text-neutral-text">
                            Termin #{payment.installment}
                          </div>
                          <div className="text-[13px] font-semibold text-brand mt-0.5">
                            {formatRupiah(payment.amount)}
                          </div>
                          <div className="text-[11.5px] text-neutral-muted mt-1.5 flex items-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                              <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {payment.status === "paid" ? `Lunas pada ${formatDate(payment.paidAt)}` : "Belum ada pembayaran"}
                          </div>
                        </div>
                      </div>

                      {/* Action status/verify */}
                      <div>
                        {payment.status === "paid" ? (
                          <span className="inline-flex items-center gap-1 text-[12px] text-success font-bold bg-success-bg/60 py-1 px-3 rounded-2">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Terverifikasi
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1.5 items-end">
                            <span className={`text-[11.5px] font-bold py-0.5 px-2.5 rounded-full mb-1 ${
                              payment.status === "processing" ? "bg-warning-bg text-warning animate-pulse" : "bg-neutral-bg text-neutral-muted"
                            }`}>
                              {payment.status === "processing" ? "Menunggu ACC" : "Belum Bayar"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleVerifyInstallment(selectedRecord.registrationId, payment.id)}
                              className="bg-success text-white border-none text-[12px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-success-dark transition-colors"
                            >
                              Verifikasi Lunas
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-border shrink-0 flex justify-end bg-neutral-bg/30">
              <button
                type="button"
                onClick={() => setSelectedRegId(null)}
                className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2 px-4.5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
