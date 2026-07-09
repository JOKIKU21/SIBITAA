"use client";

import { useLecturerDashboardSummary, useLecturerStudents } from "@/hooks/useLecturer";
import { authClient } from "@/lib/auth-client";
import { StatCards } from "./StatCards";
import { BimbinganTable } from "./BimbinganTable";
import type { MahasiswaBimbingan } from "@/lib/dosen-data";

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

export function DosenDashboardClient() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const { data: summary, isLoading: isSummaryLoading } = useLecturerDashboardSummary();
  const { data: studentsData, isLoading: isStudentsLoading } = useLecturerStudents();

  const isLoading = isSessionLoading || isSummaryLoading || isStudentsLoading;

  const lecturerName = session?.user?.name || "Dosen";
  const welcomeName = lecturerName.split(",")[0];

  if (isLoading) {
    return (
      <div className="block">
        <div className="p-7 max-[600px]:p-4">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="h-8 w-64 bg-neutral-200 rounded animate-pulse mb-2" />
            <div className="h-4.5 w-96 bg-neutral-100 rounded animate-pulse" />
          </div>

          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-3 gap-4 mb-6 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-border rounded-3.5 py-5 px-5 flex items-center gap-4 animate-pulse"
              >
                <div className="w-12 h-12 rounded-3 bg-neutral-200 shrink-0" />
                <div className="flex-1">
                  <div className="h-6 w-12 bg-neutral-200 rounded mb-2" />
                  <div className="h-4.5 w-32 bg-neutral-100 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
            <div className="px-6 pt-5 pb-4">
              <div className="h-5 w-48 bg-neutral-200 rounded animate-pulse" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                    <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Judul / Topik</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tahapan Aktif</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-neutral-border last:border-b-0 animate-pulse">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
                          <div>
                            <div className="h-4.5 w-32 bg-neutral-200 rounded mb-1.5" />
                            <div className="h-3.5 w-48 bg-neutral-100 rounded" />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="h-4 w-52 bg-neutral-100 rounded" />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="h-4 w-24 bg-neutral-100 rounded" />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="h-6 w-20 bg-neutral-200 rounded-full" />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="h-8.25 w-20 bg-neutral-200 rounded-2" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Map backend stats to the format expected by StatCards
  const mappedStats = {
    total: summary?.totalStudents ?? 0,
    mendekatTenggat: summary?.approachingDeadlineCount ?? 0,
    terlambat: summary?.overdueCount ?? 0,
    selesai: 0, // Placeholder as it is not displayed anyway
  };

  // Map backend students to the format expected by BimbinganTable
  const mappedStudents: MahasiswaBimbingan[] = (studentsData?.students ?? []).map((s) => ({
    userId: s.studentId,
    nim: s.nim,
    nama: s.name,
    prodi: s.studyProgram,
    judul: s.thesisTitle || "Belum mengajukan judul",
    tahapanAktif: s.currentStage?.order ?? 0,
    tahapanNama: s.currentStageName || "Belum Mulai",
    status: mapStatus(s.status),
    progress: s.progressPercentage,
    avatarColor: getAvatarColor(s.studentId),
  }));

  // ponytail: show only first 5 on dashboard, full list on bimbingan page
  const previewMahasiswa = mappedStudents.slice(0, 5);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">
            Selamat datang, {welcomeName} 👋
          </h2>
          <p className="text-3.5 text-neutral-muted">
            Berikut ringkasan bimbingan mahasiswa Anda hari ini.
          </p>
        </div>

        {/* Stat Cards */}
        <StatCards stats={mappedStats} />

        {/* Bimbingan Table Preview */}
        <BimbinganTable mahasiswa={previewMahasiswa} />
      </div>
    </div>
  );
}
