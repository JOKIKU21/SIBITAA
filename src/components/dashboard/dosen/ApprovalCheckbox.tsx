"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { Check, AlertCircle, X } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { useLecturerApproveStage } from "@/hooks/useLecturer";

interface ApprovalCheckboxProps {
  studentId: string;
  stageId: string;
  initialApproved?: boolean;
}

export function ApprovalCheckbox({
  studentId,
  stageId,
  initialApproved = false,
}: ApprovalCheckboxProps) {
  const [approved, setApproved] = useState(initialApproved);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const approveMutation = useLecturerApproveStage();

  useEffect(() => {
    setApproved(initialApproved);
  }, [initialApproved]);

  const handleApprove = () => {
    setIsModalOpen(false);
    approveMutation.mutate(
      {
        studentId,
        stageId,
      },
      {
        onSuccess: () => {
          setApproved(true);
          toast.success("Status bimbingan berhasil disetujui!");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Gagal menyetujui bimbingan.");
        },
      }
    );
  };

  const isSaving = approveMutation.isPending;

  return (
    <>
      <div className="bg-white rounded-3.5 border border-neutral-border p-6 flex items-center justify-between shadow-xs">
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-[14.5px] font-bold text-neutral-text">
            Persetujuan Bimbingan
          </span>
          <p className="text-[13px] text-neutral-muted leading-relaxed">
            {approved
              ? "Tahapan bimbingan ini telah disetujui dan mahasiswa telah melaju ke tahap berikutnya."
              : "Setujui tahapan bimbingan mahasiswa jika semua persyaratan telah terpenuhi."}
          </p>
        </div>

        <div className="shrink-0">
          {approved ? (
            <span className="inline-flex items-center gap-1.5 bg-success-bg text-success py-2 px-3.5 rounded-full text-[12.5px] font-bold border border-success/20 animate-in fade-in duration-300">
              <Check size={14} className="stroke-[3]" />
              Approved
            </span>
          ) : (
            <Button
              variant="brand"
              size="custom"
              className="py-2 px-4.5 rounded-2 text-[12.5px] font-bold shadow-sm"
              onClick={() => setIsModalOpen(true)}
              isLoading={isSaving}
            >
              Setujui Tahapan
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white border border-neutral-border rounded-3.5 w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-border shrink-0 bg-neutral-bg/25">
              <div className="flex items-center gap-2 text-warning">
                <AlertCircle size={18} className="shrink-0" />
                <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Konfirmasi Persetujuan</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent border-none text-neutral-muted hover:text-neutral-text cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <p className="text-[13.5px] text-neutral-text leading-relaxed">
                Apakah Anda yakin ingin menyetujui tahapan bimbingan ini? 
                Setelah disetujui, status akan berubah menjadi <strong className="text-success">Approved</strong> dan mahasiswa akan otomatis melaju ke tahapan berikutnya. Tindakan ini tidak dapat dibatalkan.
              </p>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
                >
                  Batal
                </button>
                <button 
                  type="button" 
                  onClick={handleApprove} 
                  className="bg-brand text-white border-none text-[12.5px] font-bold py-2 px-4 rounded-2.25 cursor-pointer hover:bg-brand-dark transition-colors duration-200 shadow-sm"
                >
                  Ya, Setujui
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
