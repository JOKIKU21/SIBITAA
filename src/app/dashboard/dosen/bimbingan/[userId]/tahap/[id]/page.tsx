// ponytail: Server Component — dosen detail tahapan view
import { DosenStagePageClient } from "@/components/dashboard/dosen/DosenStagePageClient";
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
  return <DosenStagePageClient userId={userId} slug={id} />;
}
