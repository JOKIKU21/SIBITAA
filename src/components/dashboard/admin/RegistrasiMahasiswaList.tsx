"use client";

import { useState } from "react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface StudentDetail {
  userId: string;
  campus: string;
  nim: string;
  studyProgram: string;
  title: string | null;
  education: string;
  status: "active" | "nonactive" | "ended";
  user: UserInfo;
}

interface FileItem {
  id: string;
  name: string;
  url: string;
  size: string;
}

interface PaymentItem {
  id: string;
  amount: number;
  method: string;
  date: string;
}

interface RegistrationItem {
  id: string;
  studentId: string;
  paymentOption: "full" | "installment";
  status: "pending" | "approved" | "rejected";
  approvedBy: string | null;
  approvedAt: string | null;
  rejectedReason?: string | null;
  createdAt: string;
  student: StudentDetail;
  files: FileItem[];
  payments: PaymentItem[];
}

const INITIAL_REGISTRATIONS: RegistrationItem[] = [
  {
    id: "reg-1",
    studentId: "student-1",
    paymentOption: "full",
    status: "pending",
    approvedBy: null,
    approvedAt: null,
    createdAt: "2026-07-09T14:02:11.120Z",
    student: {
      userId: "student-1",
      campus: "UIN Mataram",
      nim: "210101099",
      studyProgram: "Sistem Informasi",
      title: null,
      education: "S1",
      status: "nonactive",
      user: {
        id: "student-1",
        name: "Ahmad Maulana",
        email: "ahmad.maulana@uin-mataram.ac.id",
        image: null,
      },
    },
    files: [
      { id: "f-1", name: "Bukti_Pembayaran_Registrasi_Ahmad.pdf", url: "#", size: "1.4 MB" },
      { id: "f-2", name: "KRS_Semester_Ganjil_Ahmad.pdf", url: "#", size: "850 KB" }
    ],
    payments: [
      { id: "p-1", amount: 3000000, method: "Transfer BNI Syariah", date: "2026-07-09" }
    ]
  },
  {
    id: "reg-2",
    studentId: "student-2",
    paymentOption: "installment",
    status: "pending",
    approvedBy: null,
    approvedAt: null,
    createdAt: "2026-07-10T09:15:30.000Z",
    student: {
      userId: "student-2",
      campus: "UIN Mataram",
      nim: "210101105",
      studyProgram: "Teknik Informatika",
      title: null,
      education: "S1",
      status: "nonactive",
      user: {
        id: "student-2",
        name: "Fina Indriani",
        email: "fina.indri@uin-mataram.ac.id",
        image: null,
      },
    },
    files: [
      { id: "f-3", name: "Bukti_Cicilan_Registrasi_Fina.jpg", url: "#", size: "980 KB" },
      { id: "f-4", name: "Transkrip_Nilai_Fina.pdf", url: "#", size: "1.2 MB" }
    ],
    payments: [
      { id: "p-2", amount: 1500000, method: "Transfer Bank Syariah Indonesia", date: "2026-07-10" }
    ]
  },
  {
    id: "reg-3",
    studentId: "student-3",
    paymentOption: "full",
    status: "approved",
    approvedBy: "admin-uuid-5678",
    approvedAt: "2026-07-10T08:12:02.000Z",
    createdAt: "2026-07-08T11:02:11.000Z",
    student: {
      userId: "student-3",
      campus: "UIN Mataram",
      nim: "210101067",
      studyProgram: "Sistem Informasi",
      title: "Penerapan Metode Agile Pada Pengembangan SIBITA",
      education: "S1",
      status: "active",
      user: {
        id: "student-3",
        name: "Dewi Lestari",
        email: "dewi@mail.com",
        image: null,
      },
    },
    files: [
      { id: "f-5", name: "Bukti_Pembayaran_Lunas_Dewi.pdf", url: "#", size: "1.8 MB" }
    ],
    payments: [
      { id: "p-3", amount: 3000000, method: "Transfer Bank NTB Syariah", date: "2026-07-08" }
    ]
  },
  {
    id: "reg-4",
    studentId: "student-4",
    paymentOption: "installment",
    status: "rejected",
    approvedBy: "admin-uuid-5678",
    approvedAt: "2026-07-08T15:30:00.000Z",
    rejectedReason: "Bukti transfer tidak terbaca (gambar terlalu blur). Mohon upload ulang bukti pembayaran yang jelas.",
    createdAt: "2026-07-07T10:00:00.000Z",
    student: {
      userId: "student-4",
      campus: "UIN Mataram",
      nim: "210101041",
      studyProgram: "Teknik Informatika",
      title: null,
      education: "S1",
      status: "nonactive",
      user: {
        id: "student-4",
        name: "Hafiz Rahmat",
        email: "hafiz@mail.com",
        image: null,
      },
    },
    files: [
      { id: "f-6", name: "Bukti_Cicilan_1_Hafiz.jpg", url: "#", size: "450 KB" }
    ],
    payments: [
      { id: "p-4", amount: 1500000, method: "Transfer Bank Mandiri", date: "2026-07-07" }
    ]
  }
];

export function RegistrasiMahasiswaList() {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>(INITIAL_REGISTRATIONS);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedReg, setSelectedReg] = useState<RegistrationItem | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  // Filter registrations by active tab
  const filteredRegs = registrations.filter((reg) => {
    return reg.status === activeTab;
  });

  const handleApprove = (id: string) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          return {
            ...reg,
            status: "approved",
            approvedBy: "admin-uuid-5678",
            approvedAt: new Date().toISOString(),
            student: {
              ...reg.student,
              status: "active"
            }
          };
        }
        return reg;
      })
    );
    // If modal is open, update its selection view
    if (selectedReg?.id === id) {
      setSelectedReg(prev => prev ? { ...prev, status: "approved", student: { ...prev.student, status: "active" } } : null);
    }
  };

  const handleRejectSubmit = () => {
    if (!selectedReg || !rejectReasonInput.trim()) return;

    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === selectedReg.id) {
          return {
            ...reg,
            status: "rejected",
            approvedBy: "admin-uuid-5678",
            approvedAt: new Date().toISOString(),
            rejectedReason: rejectReasonInput
          };
        }
        return reg;
      })
    );
    
    setSelectedReg(null);
    setRejectReasonInput("");
    setIsRejecting(false);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-wrap gap-4 items-center justify-start">
        <div className="flex gap-1.5 bg-neutral-bg p-1.25 rounded-2.75">
          {(["pending", "approved", "rejected"] as const).map((tab) => {
            const count = registrations.filter(r => r.status === tab).length;
            const label = tab === "pending" ? "Menunggu" : tab === "approved" ? "Disetujui" : "Ditolak";
            const tabColor = tab === "pending" ? "text-warning bg-warning-bg" : tab === "approved" ? "text-success bg-success-bg" : "text-danger bg-danger-bg";
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-2.25 text-[13px] font-bold cursor-pointer transition-colors duration-150 flex items-center gap-2 border-none ${
                  activeTab === tab
                    ? "bg-white text-neutral-text shadow-sm"
                    : "text-neutral-muted hover:text-neutral-text bg-transparent"
                }`}
              >
                <span>{label}</span>
                <span className={`inline-flex items-center justify-center text-[11px] font-extrabold w-5 h-5 rounded-full ${
                  activeTab === tab ? tabColor : "bg-neutral-light/20 text-neutral-muted"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">
            Daftar Registrasi Mahasiswa
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tanggal Pengajuan</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Metode Pembayaran</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Jumlah Pembayaran</th>
                {activeTab === "rejected" && (
                  <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Alasan Penolakan</th>
                )}
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegs.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150"
                >
                  {/* Mahasiswa */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-light to-brand flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                        {reg.student.user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{reg.student.user.name}</div>
                        <div className="text-[11.5px] text-neutral-muted">NIM {reg.student.nim}</div>
                      </div>
                    </div>
                  </td>

                  {/* Prodi */}
                  <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                    {reg.student.studyProgram}
                  </td>

                  {/* Tanggal Pengajuan */}
                  <td className="py-3.5 px-4 text-[13px] text-neutral-muted">
                    {formatDate(reg.createdAt)}
                  </td>

                  {/* Metode Pembayaran */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center text-[11.5px] font-bold py-0.5 px-2 rounded-md ${
                      reg.paymentOption === "full"
                        ? "bg-success-bg text-success"
                        : "bg-warning-bg text-warning"
                    }`}>
                      {reg.paymentOption === "full" ? "Lunas" : "Cicilan"}
                    </span>
                  </td>

                  {/* Jumlah Pembayaran */}
                  <td className="py-3.5 px-4 text-[13px] font-bold text-neutral-text">
                    {formatRupiah(reg.payments[0]?.amount || 0)}
                  </td>

                  {/* Rejected Reason */}
                  {activeTab === "rejected" && (
                    <td className="py-3.5 px-4 text-[12.5px] text-danger max-w-50 truncate" title={reg.rejectedReason || ""}>
                      {reg.rejectedReason}
                    </td>
                  )}

                  {/* Aksi */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReg(reg)}
                        className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                      >
                        Detail
                      </button>
                      
                      {reg.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(reg.id)}
                            className="bg-success text-white border-none text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-success-dark transition-colors duration-150"
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReg(reg);
                              setIsRejecting(true);
                            }}
                            className="bg-danger text-white border-none text-[12.5px] font-bold py-1.5 px-3 rounded-2 cursor-pointer hover:bg-danger-dark transition-colors duration-150"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRegs.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeTab === "rejected" ? 7 : 6}
                    className="py-12 text-center text-[13.5px] text-neutral-muted"
                  >
                    Tidak ada pendaftaran dengan status ini.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-border rounded-3.5 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border shrink-0">
              <h3 className="font-display text-[15.5px] font-extrabold text-neutral-text">
                {isRejecting ? "Tolak Registrasi Mahasiswa" : "Detail Pengajuan Registrasi"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedReg(null);
                  setIsRejecting(false);
                  setRejectReasonInput("");
                }}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
              {isRejecting ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-danger-bg text-danger text-[13px] py-3 px-4 rounded-2.5 font-medium">
                    Anda sedang menolak pengajuan pendaftaran untuk mahasiswa: <strong>{selectedReg.student.user.name}</strong>.
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12.5px] font-semibold text-neutral-muted">
                      Alasan Penolakan <span className="text-danger">*</span>
                    </label>
                    <textarea
                      placeholder="Tulis alasan penolakan secara detail agar dapat dibaca oleh mahasiswa..."
                      value={rejectReasonInput}
                      onChange={(e) => setRejectReasonInput(e.target.value)}
                      rows={4}
                      className="w-full bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 p-3 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-danger"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Student Info Section */}
                  <div>
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Data Mahasiswa</h4>
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 max-[500px]:grid-cols-1">
                      <div>
                        <div className="text-[12px] text-neutral-muted">Nama Lengkap</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{selectedReg.student.user.name}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">NIM</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{selectedReg.student.nim}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Program Studi</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.studyProgram}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Perguruan Tinggi</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.campus}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Pendidikan</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.education}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Email</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.student.user.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Section */}
                  <div className="border-t border-neutral-border pt-4.5">
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Rincian Pembayaran</h4>
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-5 max-[500px]:grid-cols-1">
                      <div>
                        <div className="text-[12px] text-neutral-muted">Pilihan Metode</div>
                        <div className="text-[13.5px] font-bold text-neutral-text">
                          {selectedReg.paymentOption === "full" ? "Pembayaran Lunas (Full)" : "Pembayaran Cicilan (Installment)"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Status Pengajuan</div>
                        <div className="text-[13.5px] font-bold mt-0.5">
                          <span className={`inline-flex items-center gap-1 text-[12px] py-0.5 px-2.5 rounded-full ${
                            selectedReg.status === "pending"
                              ? "bg-warning-bg text-warning"
                              : selectedReg.status === "approved"
                              ? "bg-success-bg text-success"
                              : "bg-danger-bg text-danger"
                          }`}>
                            {selectedReg.status === "pending" ? "Menunggu Persetujuan" : selectedReg.status === "approved" ? "Disetujui" : "Ditolak"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Jumlah yang Dibayar</div>
                        <div className="text-[13.5px] font-bold text-brand">{formatRupiah(selectedReg.payments[0]?.amount || 0)}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-neutral-muted">Metode Bank / Transfer</div>
                        <div className="text-[13.5px] font-semibold text-neutral-text">{selectedReg.payments[0]?.method}</div>
                      </div>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="border-t border-neutral-border pt-4.5">
                    <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2.5">Berkas Pendukung</h4>
                    <div className="flex flex-col gap-2.5">
                      {selectedReg.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-neutral-bg border border-neutral-border rounded-2.5 hover:bg-neutral-bg/60 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-neutral-muted shrink-0">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[13px] font-semibold text-neutral-text truncate">{file.name}</span>
                            <span className="text-[11.5px] text-neutral-muted shrink-0">({file.size})</span>
                          </div>
                          <a
                            href={file.url}
                            onClick={(e) => { e.preventDefault(); alert(`Mengunduh berkas: ${file.name}`); }}
                            className="text-[12.5px] text-brand font-bold hover:underline shrink-0 pl-4"
                          >
                            Unduh
                          </a>
                        </div>
                      ))}
                      {selectedReg.files.length === 0 && (
                        <div className="text-[13px] text-neutral-muted italic">Tidak ada berkas yang diunggah.</div>
                      )}
                    </div>
                  </div>

                  {/* Rejected Details (if rejected) */}
                  {selectedReg.status === "rejected" && selectedReg.rejectedReason && (
                    <div className="border-t border-neutral-border pt-4.5">
                      <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2">Informasi Penolakan</h4>
                      <div className="p-3.5 bg-danger-bg/50 border border-danger/10 text-danger rounded-2.5 text-[13px] font-medium leading-relaxed">
                        <div className="text-[11px] uppercase tracking-wider font-extrabold mb-1 opacity-75">Alasan Penolakan:</div>
                        {selectedReg.rejectedReason}
                      </div>
                    </div>
                  )}

                  {/* Approved Details (if approved) */}
                  {selectedReg.status === "approved" && selectedReg.approvedAt && (
                    <div className="border-t border-neutral-border pt-4.5">
                      <h4 className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-2">Informasi Persetujuan</h4>
                      <div className="p-3.5 bg-success-bg/40 border border-success/10 text-success rounded-2.5 text-[13px] font-medium">
                        Disetujui pada {formatDate(selectedReg.approvedAt)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-border shrink-0 flex justify-end gap-3 bg-neutral-bg/30">
              {isRejecting ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRejecting(false);
                      setRejectReasonInput("");
                    }}
                    className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectSubmit}
                    disabled={!rejectReasonInput.trim()}
                    className={`text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer transition-colors duration-150 ${
                      rejectReasonInput.trim() ? "bg-danger hover:bg-danger-dark" : "bg-neutral-light cursor-not-allowed"
                    }`}
                  >
                    Kirim Penolakan
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedReg(null)}
                    className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                  >
                    Tutup
                  </button>
                  
                  {selectedReg.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRejecting(true);
                        }}
                        className="bg-danger text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-danger-dark transition-colors duration-150"
                      >
                        Tolak Pendaftaran
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(selectedReg.id)}
                        className="bg-success text-white border-none text-[13px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-success-dark transition-colors duration-150"
                      >
                        Setujui Pendaftaran
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
