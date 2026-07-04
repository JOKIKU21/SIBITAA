import { OverallCard } from "@/components/dashboard/OverallCard";
import { TimelineList } from "@/components/dashboard/TimelineList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Skripsi | SIBITA",
};

export default function MahasiswaDashboard() {
  return (
    <div className="block">
      <div className="p-[28px] max-[600px]:p-[16px]">
        <div className="mb-[24px]">
          <h2 className="font-display text-[22px] font-extrabold mb-[4px]">Progress Skripsi</h2>
          <p className="text-[14px] text-neutral-muted">Pantau perkembangan setiap tahapan tugas akhir Anda</p>
        </div>
        
        <OverallCard />
        <TimelineList />
      </div>
    </div>
  );
}
