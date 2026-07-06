import { OverallCard } from "@/components/dashboard/OverallCard";
import { TimelineList } from "@/components/dashboard/TimelineList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Skripsi | SIBITA",
};

export default function MahasiswaDashboard() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold mb-1">Progress Skripsi</h2>
          <p className="text-lg text-neutral-muted">Pantau perkembangan setiap tahapan tugas akhir Anda</p>
        </div>
        
        <OverallCard />
        <TimelineList />
      </div>
    </div>
  );
}
