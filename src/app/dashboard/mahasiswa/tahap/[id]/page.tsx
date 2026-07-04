import Link from "next/link";
import { notFound } from "next/navigation";
import { STAGES } from "@/lib/stages";
import { CompareRevision } from "@/components/stage/CompareRevision";
import { StageForm } from "@/components/dashboard/StageForm";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { MarkDoneButton } from "@/components/stage/MarkDoneButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Tahapan | SIBITA",
};

export function generateStaticParams() {
  return STAGES.map((stage) => ({ id: stage.slug }));
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = STAGES.findIndex((s) => s.slug === id);
  if (index === -1) notFound();

  const stage = STAGES[index];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...stageWithoutIcon } = stage;
  const nextStage = STAGES[index + 1] ?? null;

  return (
    <div className="content-page active">
      <div className="content-inner">
        <Link href="/dashboard/mahasiswa" className="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Kembali ke Progress Skripsi
        </Link>
        
        <div className="stage-header-simple">
          <span className="stage-header-badge">Tahap {stage.n}</span>
          <div className="stage-header-title">{stage.name}</div>
          <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginTop: "12px", lineHeight: "1.5", fontWeight: "normal" }}>
            {stage.desc}
          </div>
        </div>

        {stage.comparison && (
          <div className="mb-5 max-w-[800px]">
            <CompareRevision comparison={stage.comparison} />
          </div>
        )}

        <div className="dash-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <StageForm stage={stageWithoutIcon} />
            <div className="stage-page-panel" style={{ maxWidth: "none" }}>
              <MarkDoneButton
                stageNumber={stage.n}
                nextSlug={nextStage ? nextStage.slug : null}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
