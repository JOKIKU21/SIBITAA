// ponytail: Server Component — timeline for mahasiswa progress
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMahasiswaByUserId } from "@/lib/dosen-data";
import { STAGES } from "@/lib/stages";
import { computeStageWindows, getStageStatus } from "@/lib/stage-status";
import { StageCard } from "@/components/dashboard/StageCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Mahasiswa | SIBITA",
};

const STATUS_BADGE = {
  aktif: { cls: "bg-success-bg text-success", label: "Aktif" },
  "mendekati-tenggat": { cls: "bg-warning-bg text-warning", label: "Mendekati Tenggat" },
  terlambat: { cls: "bg-danger-bg text-danger", label: "Terlambat" },
} as const;

export default async function DetailMahasiswaPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const mhs = getMahasiswaByUserId(userId);
  if (!mhs) notFound();

  const badge = STATUS_BADGE[mhs.status];
  const windows = computeStageWindows();

  // ponytail: mock completedStages from tahapanAktif
  const completedStages = new Set<number>();
  for (let i = 1; i < mhs.tahapanAktif; i++) {
    completedStages.add(i);
  }

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
            <div className={`w-14 h-14 rounded-full bg-linear-to-br ${mhs.avatarColor} flex items-center justify-center text-5 font-bold text-white shrink-0`}>
              {mhs.nama.charAt(0)}
            </div>
            <div>
              <div className="text-white text-5 font-extrabold font-display">{mhs.nama}</div>
              <div className="text-white/70 text-[13px] font-medium">NIM {mhs.nim} · {mhs.prodi}</div>
            </div>
            <span className={`ml-auto whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-bold ${badge.cls}`}>
              {badge.label}
            </span>
          </div>
          <div className="text-white/80 text-3.5 leading-normal">
            <span className="text-white/50 text-[12.5px] font-medium">Judul:</span>{" "}
            {mhs.judul}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6FE3A6] transition-all duration-500"
                style={{ width: `${mhs.progress}%` }}
              />
            </div>
            <span className="text-white text-[13px] font-bold">{mhs.progress}%</span>
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
          {STAGES.map((stage) => (
            <StageCard
              key={stage.n}
              stage={stage}
              status={getStageStatus(stage.n, completedStages)}
              window={windows[stage.n]}
              basePath={`/dashboard/dosen/bimbingan/${userId}/tahap`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
