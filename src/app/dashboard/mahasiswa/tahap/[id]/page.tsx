import { StagePageClient } from "@/components/stage/StagePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Tahapan | SIBITA",
};

export default async function StagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StagePageClient slug={id} />;
}
