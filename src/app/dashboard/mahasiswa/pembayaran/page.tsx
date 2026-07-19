import type { Metadata } from "next";
import { PembayaranClient } from "@/components/dashboard/mahasiswa/PembayaranClient";

export const metadata: Metadata = {
  title: "Riwayat & Cicilan Pembayaran | SIBITA",
};

export default function PembayaranPage() {
  return <PembayaranClient />;
}
