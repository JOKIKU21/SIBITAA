import { notFound } from "next/navigation";
import { STAGES } from "@/lib/stages";
import { Topbar } from "@/components/layout/Topbar";
import { StageHeader } from "@/components/stage/StageHeader";
import { StageFieldList } from "@/components/stage/StageFieldList";
import { CompareRevision } from "@/components/stage/CompareRevision";
import { MarkDoneButton } from "@/components/stage/MarkDoneButton";

interface StagePageProps {
  params: { id: string };
}

// Pre-render seluruh 16 halaman tahap saat build (performa terbaik: tidak
// ada request-time data fetching, murni statis).
export function generateStaticParams() {
  return STAGES.map((stage) => ({ id: stage.slug }));
}

export default function StagePage({ params }: StagePageProps) {
  const index = STAGES.findIndex((s) => s.slug === params.id);
  if (index === -1) notFound();

  const stage = STAGES[index];
  const nextStage = STAGES[index + 1] ?? null;

  return (
    <>
      <Topbar title="Detail Tahap" />
      <div className="p-7">
        <StageHeader n={stage.n} name={stage.name} />

        <div className="max-w-2xl rounded-panel border border-neutral-border bg-white p-6">
          <p className="mb-5 text-sm leading-relaxed text-neutral-muted">
            {stage.desc}
          </p>

          {stage.comparison && (
            <div className="mb-5">
              <CompareRevision comparison={stage.comparison} />
            </div>
          )}

          <div className="mb-6">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-brand">
              Isi Tahapan
            </div>
            <StageFieldList fields={stage.fields} />
          </div>

          <MarkDoneButton
            stageNumber={stage.n}
            nextSlug={nextStage ? nextStage.slug : null}
          />
        </div>
      </div>
    </>
  );
}
