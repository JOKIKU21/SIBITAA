// ponytail: Server Component — dosen detail tahapan view
import Link from "next/link";
import { notFound } from "next/navigation";
import { STAGES } from "@/lib/stages";
import {
  getMahasiswaByUserId,
  getSubmissionByUserIdAndStage,
  getFilesByUserIdAndStage,
} from "@/lib/dosen-data";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { SubmissionDisplay } from "@/components/dashboard/dosen/SubmissionDisplay";
import { FileListDisplay } from "@/components/dashboard/dosen/FileListDisplay";
import { DosenNoteInput } from "@/components/dashboard/dosen/DosenNoteInput";
import { DosenFileUpload } from "@/components/dashboard/dosen/DosenFileUpload";
import { ApprovalCheckbox } from "@/components/dashboard/dosen/ApprovalCheckbox";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Tahapan Mahasiswa | SIBITA",
};

export default async function DosenStagePage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const { userId, id } = await params;

  const mhs = getMahasiswaByUserId(userId);
  if (!mhs) notFound();

  const stageIndex = STAGES.findIndex((s) => s.slug === id);
  if (stageIndex === -1) notFound();

  const stage = STAGES[stageIndex];

  // ponytail: mock data
  const submissions = getSubmissionByUserIdAndStage(userId, stage.n);
  const files = getFilesByUserIdAndStage(userId, stage.n);
  const isApproved = mhs.tahapanAktif > stage.n;

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
              Tahap {stage.n}
            </span>
            <span className="text-white/80 text-[13px] font-medium border-l border-white/20 pl-3">
              {mhs.nama} ({mhs.nim})
            </span>
          </div>
          <div className="text-white text-5.5 font-extrabold leading-[1.3] font-display">{stage.name}</div>
          <div className="text-white/80 text-3.5 mt-3 leading-normal font-normal">
            {stage.desc}
          </div>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-5 items-stretch max-[980px]:grid-cols-1">
          {/* Kolom Kiri: Detail & Form Dosen */}
          <div className="flex flex-col">
            <SubmissionDisplay title="Pengisian Mahasiswa" data={submissions} />
            <FileListDisplay title="File Mahasiswa" files={files} />
            <DosenNoteInput initialNote="" />
            <DosenFileUpload />
            <ApprovalCheckbox initialApproved={isApproved} />
          </div>

          {/* Kolom Kanan: Chat Panel — sama persis ukurannya dengan mahasiswa */}
          <div className="flex flex-col">
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
