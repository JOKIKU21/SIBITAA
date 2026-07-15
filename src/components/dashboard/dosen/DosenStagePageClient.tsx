"use client";

import Link from "next/link";
import { STAGES, getStageMetadata } from "@/lib/stages";
import { StageForm } from "@/components/dashboard/StageForm";
import { DosenChatPanel } from "@/components/dashboard/dosen/DosenChatPanel";
import {
  useLecturerStudents,
  useLecturerStudentProgress,
  useLecturerStudentStageDetail,
} from "@/hooks/useLecturer";
import { DosenNoteInput } from "@/components/dashboard/dosen/DosenNoteInput";
import { DosenFileUpload } from "@/components/dashboard/dosen/DosenFileUpload";
import { ApprovalCheckbox } from "@/components/dashboard/dosen/ApprovalCheckbox";

interface DosenStagePageClientProps {
  userId: string;
  stageId: string;
}

export function DosenStagePageClient({ userId, stageId: urlStageId }: DosenStagePageClientProps) {
  // 1. Fetch student progress list
  const { data: progressData, isLoading: isProgressLoading } = useLecturerStudentProgress(userId);
  const stageOrder = parseInt(urlStageId, 10);
  const stageConfig = STAGES.find((s) => s.n === stageOrder);
  const backendStage = progressData?.stages?.find((s) => s.order === stageOrder);
  const metadata = getStageMetadata(stageOrder || 0, backendStage);

  // 2. Fetch notes & files for this stage
  const { data: detailData, isLoading: isDetailLoading } = useLecturerStudentStageDetail(userId, urlStageId);
  const existingNote = detailData?.notes?.[0];
  const existingFiles = detailData?.files || [];

  // 3. Fetch student list to get name, NIM, and current active stage
  const { data: studentsData, isLoading: isStudentsLoading } = useLecturerStudents();
  const student = (studentsData?.students ?? []).find((s) => s.studentId === userId);
  const studentName = student?.name || "Mahasiswa";
  const studentNim = student?.nim || "";

  const activeOrder = student?.currentStage?.order ?? 0;
  const isApproved = existingNote?.status === "approved" || activeOrder > (stageOrder || 0) || (student?.progressPercentage === 100);

  const isLoading = isProgressLoading || isDetailLoading || isStudentsLoading;

  const lecturerFiles = existingFiles.filter((file) => file.uploadedById !== file.studentId);

  if (isLoading) {
    return (
      <div className="p-7 max-[600px]:p-4">
        <div className="py-12 text-center text-neutral-muted font-medium bg-white rounded-3.5 border border-neutral-border animate-pulse">
          Memuat detail tahapan mahasiswa...
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

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <Link
          href={`/dashboard/dosen/bimbingan/${userId}`}
          className="inline-flex items-center gap-1.5 bg-transparent border-none text-neutral-muted text-[13px] font-semibold cursor-pointer p-0 mb-4.5 transition-[color] duration-150 hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Progress Mahasiswa
        </Link>
 
        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="inline-block bg-white/18 text-white text-[12.5px] font-bold py-1.25 px-3.5 rounded-full">
              Tahap {stageConfig.n}
            </span>
            <span className="text-white/80 text-[13px] font-medium border-l border-white/20 pl-3">
              {studentName} {studentNim ? `(${studentNim})` : ""}
            </span>
          </div>
          <div className="text-white text-5.5 font-extrabold leading-[1.3] font-display">{metadata.name}</div>
          <div className="text-white/80 text-3.5 mt-3 leading-normal font-normal">
            {metadata.desc}
          </div>
        </div>
 
        <div className="grid grid-cols-[1.4fr_1fr] gap-5 items-stretch max-[980px]:grid-cols-1">
          {/* Kolom Kiri: Detail & Form Dosen */}
          <div className="flex flex-col gap-5">
            <StageForm
              stage={stageConfig}
              stageId={urlStageId}
              existingNote={existingNote}
              existingFiles={existingFiles}
              readOnly={true}
              stageName={metadata.name}
            />
            <DosenNoteInput initialNote={existingNote?.comment || ""} />
            <DosenFileUpload existingFiles={lecturerFiles} studentId={userId} stageId={urlStageId} />
            <ApprovalCheckbox
              studentId={userId}
              stageId={urlStageId}
              initialApproved={isApproved}
            />
          </div>

          {/* Kolom Kanan: Chat Panel */}
          <div className="flex flex-col">
            <DosenChatPanel stageId={urlStageId} studentId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
