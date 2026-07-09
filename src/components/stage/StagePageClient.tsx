"use client";

import Link from "next/link";
import { STAGES, getStageMetadata, calculateRemainingDays } from "@/lib/stages";
import { StageForm } from "@/components/dashboard/StageForm";
import { MahasiswaChatPanel } from "@/components/stage/MahasiswaChatPanel";
import { useStudentBimbingan, useStudentBimbinganDetail } from "@/hooks/useStudent";

interface StagePageClientProps {
  slug: string;
}

export function StagePageClient({ slug }: StagePageClientProps) {
  const { data: bimbinganData, isLoading: isBimbinganLoading } = useStudentBimbingan();
  
  const backendStage = bimbinganData?.stages?.find((s) => s.slug === slug);
  const stageId = backendStage?.id;
  const stageOrder = backendStage?.order;
  const stageConfig = STAGES.find((s) => s.n === stageOrder);

  const { data: detailData, isLoading: isDetailLoading } = useStudentBimbinganDetail(stageId);
  const existingNote = detailData?.notes?.[0];
  const existingFiles = detailData?.files || [];

  const isLoading = isBimbinganLoading || isDetailLoading;

  if (isBimbinganLoading) {
    return (
      <div className="p-7 max-[600px]:p-4">
        <div className="py-12 text-center text-neutral-muted font-medium bg-white rounded-3.5 border border-neutral-border">
          Memuat detail tahapan...
        </div>
      </div>
    );
  }

  if (!backendStage || !stageConfig) {
    return (
      <div className="p-7 max-[600px]:p-4">
        <div className="py-12 text-center text-neutral-muted font-medium bg-white rounded-3.5 border border-neutral-border">
          Tahapan tidak ditemukan.
        </div>
      </div>
    );
  }

  const metadata = getStageMetadata(stageConfig.n, backendStage);

  const progress = bimbinganData?.progress;
  const isCurrentStage = progress?.currentStageId === stageId && progress?.status === "in progress";
  const remainingDays = isCurrentStage && progress?.startedAt
    ? calculateRemainingDays(progress.startedAt, metadata.days)
    : undefined;

  const nextBackendStage = bimbinganData?.stages?.find((s) => s.order === stageConfig.n + 1);
  const nextStage = nextBackendStage ? { slug: nextBackendStage.slug } : null;

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <Link href="/dashboard/mahasiswa" className="inline-flex items-center gap-1.5 bg-transparent border-none text-neutral-muted text-[13px] font-semibold cursor-pointer p-0 mb-4.5 transition-[color] duration-150 hover:text-brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Kembali ke Progress Skripsi
        </Link>
        
        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <span className="inline-block bg-white/18 text-white text-[12.5px] font-bold py-1.25 px-3.5 rounded-full mb-2.5">Tahap {stageConfig.n}</span>
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
                stage={stageConfig}
                stageId={stageId}
                existingNote={existingNote}
                existingFiles={existingFiles}
                stageName={metadata.name}
              />
            </div>

            <div className="flex flex-col gap-5">
              <MahasiswaChatPanel stageId={stageId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
