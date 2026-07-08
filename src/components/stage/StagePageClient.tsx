"use client";

import Link from "next/link";
import type { Stage } from "@/lib/stages";
import { CompareRevision } from "@/components/stage/CompareRevision";
import { StageForm } from "@/components/dashboard/StageForm";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { MarkDoneButton } from "@/components/stage/MarkDoneButton";
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
          <div className="text-white text-5.5 font-extrabold leading-[1.3] font-display">{stage.name}</div>
          <div className="text-white/80 text-3.5 mt-3 leading-normal font-normal">
            {stage.desc}
          </div>
        </div>
        {stage.comparison && (
          <div className="mb-5 max-w-50">
            <CompareRevision comparison={stage.comparison} />
          </div>
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
              <div className="rounded-3 border border-neutral-border bg-white p-6">
                <MarkDoneButton
                  stageNumber={stage.n}
                  stageId={stageId}
                  existingNote={existingNote}
                  nextSlug={nextStage ? nextStage.slug : null}
                />
              </div>
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
