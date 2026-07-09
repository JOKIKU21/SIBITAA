"use client";

import Link from "next/link";
import type { Stage } from "@/lib/stages";
import { getStageMetadata, calculateRemainingDays } from "@/lib/stages";
import { StageForm } from "@/components/dashboard/StageForm";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { useStudentBimbingan, useStudentBimbinganDetail } from "@/hooks/useStudentBimbingan";

interface StagePageClientProps {
  stage: Omit<Stage, "icon">;
  nextStage: { slug: string } | null;
}

export function StagePageClient({ stage, nextStage }: StagePageClientProps) {
  // 1. Fetch bimbingan list to get the UUID of this stage
  const { data: bimbinganData, isLoading: isBimbinganLoading } = useStudentBimbingan();
  const backendStage = bimbinganData?.stages?.find((s) => s.order === stage.n);
  const stageId = backendStage?.id;
  const metadata = getStageMetadata(stage.n, backendStage);

  const progress = bimbinganData?.progress;
  const isCurrentStage = progress?.currentStageId === stageId && progress?.status === "in progress";
  const remainingDays = isCurrentStage && progress?.startedAt
    ? calculateRemainingDays(progress.startedAt, metadata.days)
    : undefined;

  // 2. Fetch notes & files for this stage
  const { data: detailData, isLoading: isDetailLoading } = useStudentBimbinganDetail(stageId);
  const existingNote = detailData?.notes?.[0];
  const existingFiles = detailData?.files || [];

  const isLoading = isBimbinganLoading || isDetailLoading;

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <Link href="/dashboard/mahasiswa" className="inline-flex items-center gap-1.5 bg-transparent border-none text-neutral-muted text-[13px] font-semibold cursor-pointer p-0 mb-4.5 transition-[color] duration-150 hover:text-brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Kembali ke Progress Skripsi
        </Link>
        
        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <span className="inline-block bg-white/18 text-white text-[12.5px] font-bold py-1.25 px-3.5 rounded-full mb-2.5">Tahap {stage.n}</span>
          <div className="text-white text-5.5 font-extrabold leading-[1.3] font-display">{metadata.name}</div>
          <div className="text-white/80 text-3.5 mt-3 leading-normal font-normal">
            {metadata.desc}
          </div>
        </div>

        {remainingDays !== undefined && (
          <>
            {remainingDays <= 0 ? (
              <div className="bg-danger-bg border border-danger text-danger rounded-3 py-3 px-5 mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Perhatian: Anda telah melewati deadline pengerjaan tahapan ini! Segera lengkapi dan kirim progres Anda.
              </div>
            ) : remainingDays <= 3 ? (
              <div className="bg-warning-bg border border-warning text-warning rounded-3 py-3 px-5 mb-6 flex items-center gap-2.5 text-[13.5px] font-semibold">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Perhatian: Tahapan ini mendekati deadline! Sisa waktu pengerjaan: {remainingDays} hari.
              </div>
            ) : null}
          </>
        )}

        {isLoading ? (
          <div className="py-12 text-center text-neutral-muted font-medium bg-white rounded-3.5 border border-neutral-border">
            Memuat detail tahapan...
          </div>
        ) : (
          <div className="grid grid-cols-[1.4fr_1fr] gap-5 items-stretch max-[980px]:grid-cols-1">
            <div className="flex flex-col gap-5">
              <StageForm
                stage={stage}
                stageId={stageId}
                existingNote={existingNote}
                existingFiles={existingFiles}
              />
            </div>

            <div className="flex flex-col gap-5">
              <ChatPanel stageId={stageId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
