// ponytail: Server Component — data imported at module level, no fetch waterfalls
import { StatCards } from "@/components/dashboard/dosen/StatCards";
import { BimbinganTable } from "@/components/dashboard/dosen/BimbinganTable";
import {
  DOSEN_PROFILE,
  MAHASISWA_BIMBINGAN,
  getDosenStats,
  getTahapanDistribution,
} from "@/lib/dosen-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Dosen | SIBITA",
};

export default function DosenDashboardPage() {
  const stats = getDosenStats();
  const distribution = getTahapanDistribution();
  // ponytail: show only first 5 on dashboard, full list on bimbingan page
  const previewMahasiswa = MAHASISWA_BIMBINGAN.slice(0, 5);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">
            Selamat datang, {DOSEN_PROFILE.nama.split(",")[0]} 👋
          </h2>
          <p className="text-3.5 text-neutral-muted">
            Berikut ringkasan bimbingan mahasiswa Anda hari ini.
          </p>
        </div>

        {/* Stat Cards */}
        <StatCards stats={stats} />

        {/* Bimbingan Table Preview */}
        <BimbinganTable mahasiswa={previewMahasiswa} />
      </div>
    </div>
  );
}
