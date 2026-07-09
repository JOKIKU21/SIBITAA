import { DosenBimbinganDetailClient } from "@/components/dashboard/dosen/DosenBimbinganDetailClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Mahasiswa | SIBITA",
};

export default async function DetailMahasiswaPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <DosenBimbinganDetailClient userId={userId} />;
}
