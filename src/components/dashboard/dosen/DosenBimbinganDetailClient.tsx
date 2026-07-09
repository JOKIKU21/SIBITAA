"use client";

import Link from "next/link";
import { useLecturerStudents } from "@/hooks/useLecturer";
import { STAGES, calculateRemainingDays, getStageMetadata } from "@/lib/stages";
import { computeStageWindows, getStageStatus } from "@/lib/stage-status";
import { StageCard } from "@/components/dashboard/StageCard";

const STATUS_BADGE = {
  aktif: { cls: "bg-success-bg text-success", label: "Aktif" },
  "mendekati-tenggat": { cls: "bg-warning-bg text-warning", label: "Mendekati Tenggat" },
  terlambat: { cls: "bg-danger-bg text-danger", label: "Terlambat" },
} as const;

// Helper to determine status based on backend value
const mapStatus = (backendStatus: string): "aktif" | "mendekati-tenggat" | "terlambat" => {
  const s = backendStatus.toLowerCase();
  if (s.includes("tenggat") || s.includes("mendekati")) return "mendekati-tenggat";
  if (s.includes("lambat") || s.includes("lewat") || s.includes("terlambat")) return "terlambat";
  return "aktif";
};

// Colors for avatar gradients
const AVATAR_GRADIENTS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#A78BFA] to-[#7C3AED]",
  "from-[#34D399] to-[#059669]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#2DD4BF] to-[#0D9488]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#FBBF24] to-[#D97706]",
  "from-[#C084FC] to-[#9333EA]",
  "from-[#6FE3A6] to-[#16A34A]",
  "from-[#F87171] to-[#DC2626]",
  "from-[#38BDF8] to-[#0284C7]",
];

const getAvatarColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
};

export function DosenBimbinganDetailClient({ userId }: { userId: string }) {
  const { data: studentsData, isLoading } = useLecturerStudents();

  if (isLoading) {
    return (
      <div className="block">
        <div className="p-7 max-[600px]:p-4">
          {/* Back link skeleton */}
          <div className="h-4.5 w-48 bg-neutral-100 rounded animate-pulse mb-4.5" />

          {/* Student Header Skeleton */}
          <div className="bg-neutral-100 border border-neutral-border rounded-4 py-6 px-7 mb-6 animate-pulse">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-neutral-200 shrink-0" />
              <div className="flex-1">
                <div className="h-6 w-48 bg-neutral-200 rounded mb-1.5" />
                <div className="h-4 w-64 bg-neutral-200 rounded" />
              </div>
              <div className="h-8 w-24 bg-neutral-200 rounded-full" />
            </div>
            <div className="h-4 w-3/4 bg-neutral-200 rounded mb-4" />
            <div className="h-2 w-full bg-neutral-200 rounded-full" />
          </div>

          {/* Timeline Skeleton */}
          <div className="mb-4">
            <div className="h-5.5 w-40 bg-neutral-200 rounded animate-pulse mb-1.5" />
            <div className="h-4 w-80 bg-neutral-100 rounded animate-pulse" />
          </div>

          <div className="flex flex-col gap-3.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-0 animate-pulse">
                <div className="flex flex-col items-center w-14 shrink-0">
                  <div className="w-11 h-11 rounded-full bg-neutral-200 border-[3px] border-neutral-200" />
                  <div className="w-0.5 flex-1 min-h-12 bg-neutral-200" />
                </div>
                <div className="flex-1 mb-3.5 ml-3 bg-white border border-neutral-border rounded-3.5 py-4.5 px-5">
                  <div className="h-5 w-16 bg-neutral-200 rounded mb-2.5" />
                  <div className="h-4.5 w-40 bg-neutral-200 rounded mb-1.5" />
                  <div className="h-3.5 w-3/4 bg-neutral-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const student = (studentsData?.students ?? []).find((s) => s.studentId === userId);

  if (!student) {
    return (
      <div className="block">
        <div className="p-7 max-[600px]:p-4 text-center">
          <h3 className="font-display font-extrabold text-neutral-text text-[17px] mb-2">Mahasiswa Tidak Ditemukan</h3>
          <p className="text-neutral-muted text-[13.5px] mb-4.5">Mahasiswa dengan ID tersebut tidak terdaftar dalam bimbingan Anda.</p>
          <Link
            href="/dashboard/dosen/bimbingan"
            className="inline-flex items-center gap-1.5 bg-brand text-white text-[13px] font-semibold py-2 px-4 rounded-2.5 hover:bg-brand-dark transition-colors duration-150"
          >
            Kembali ke Daftar Bimbingan
          </Link>
        </div>
      </div>
    );
  }

  const statusKey = mapStatus(student.status);
  const badge = STATUS_BADGE[statusKey];
  const avatarColor = getAvatarColor(student.studentId);

  const completedStages = new Set<number>();
  const activeOrder = student.currentStage?.order ?? 0;
  for (let i = 1; i < activeOrder; i++) {
    completedStages.add(i);
  }

  // Merge the student's current active stage duration from the backend
  const mergedStages = STAGES.map((stageConfig) => {
    const isCurrent = stageConfig.n === activeOrder;
    const backendStage = isCurrent && student.currentStage
      ? {
          name: student.currentStage.name,
          description: null,
          durationDays: student.currentStage.durationDays,
        }
      : undefined;
    const metadata = getStageMetadata(stageConfig.n, backendStage);
    return {
      ...stageConfig,
      name: metadata.name,
      desc: metadata.desc,
      days: metadata.days,
    };
  });

  const windows = computeStageWindows(mergedStages);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <Link
          href="/dashboard/dosen/bimbingan"
          className="inline-flex items-center gap-1.5 text-neutral-muted text-[13px] font-semibold mb-4.5 transition-colors duration-150 hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Daftar Bimbingan
        </Link>

        {/* Mahasiswa Info Header */}
        <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-14 h-14 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-5 font-bold text-white shrink-0`}>
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="text-white text-5 font-extrabold font-display">{student.name}</div>
              <div className="text-white/70 text-[13px] font-medium">NIM {student.nim} · {student.studyProgram}</div>
            </div>
            <span className={`ml-auto whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-bold ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
          <div className="text-white/80 text-3.5 leading-normal">
            <span className="text-white/50 text-[12.5px] font-medium">Judul:</span>{" "}
            {student.thesisTitle || "Belum mengajukan judul"}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6FE3A6] transition-all duration-500"
                style={{ width: `${student.progressPercentage}%` }}
              />
            </div>
            <span className="text-white text-[13px] font-bold">{student.progressPercentage}%</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <h3 className="font-display text-[16px] font-extrabold text-neutral-text mb-1">
            Timeline Bimbingan
          </h3>
          <p className="text-[13px] text-neutral-muted mb-5">
            Pantau perkembangan dan berikan feedback untuk setiap tahapan bimbingan.
          </p>
        </div>

        <div className="timeline">
          {mergedStages.map((stage) => {
            const status = getStageStatus(stage.n, completedStages);
            const isOngoing = status === "berlangsung";

            let remainingDays: number | undefined = undefined;
            if (isOngoing) {
              const rawStartedAt =
                (student as any).startedAt ||
                (student as any).currentStage?.startedAt ||
                (student as any).currentStageStartedAt ||
                (student as any).updatedAt;

              if (rawStartedAt) {
                remainingDays = calculateRemainingDays(rawStartedAt, stage.days);
              } else {
                // Fallback to timeline-relative date calculation to avoid dummy values
                const TIMELINE_START = new Date(2026, 5, 29);
                const computedStart = new Date(TIMELINE_START);
                computedStart.setDate(computedStart.getDate() + windows[stage.n].start);
                remainingDays = calculateRemainingDays(computedStart, stage.days);
              }
            }

            return (
              <StageCard
                key={stage.n}
                stage={stage}
                status={status}
                window={windows[stage.n]}
                remainingDays={remainingDays}
                basePath={`/dashboard/dosen/bimbingan/${userId}/tahap`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
