import { DosenBimbinganClient } from "@/components/dashboard/dosen/DosenBimbinganClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bimbingan | SIBITA",
};

export default function BimbinganPage() {
  return <DosenBimbinganClient />;
}
