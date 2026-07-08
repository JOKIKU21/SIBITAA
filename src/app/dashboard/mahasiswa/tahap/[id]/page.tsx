import { notFound } from "next/navigation";
import { STAGES } from "@/lib/stages";
import { StagePageClient } from "@/components/stage/StagePageClient";
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
  const { icon: _icon, ...stageWithoutIcon } = stage;

  const nextStage = STAGES[index + 1] ?? null;
  const nextStageWithoutIcon = nextStage
    ? { slug: nextStage.slug }
    : null;

  return <StagePageClient stage={stageWithoutIcon} nextStage={nextStageWithoutIcon} />;
}
