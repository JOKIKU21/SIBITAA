import { OverallCard } from "@/components/dashboard/OverallCard";
import { TimelineList } from "@/components/dashboard/TimelineList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Skripsi | SIBITA",
};

export default function MahasiswaDashboard() {
  return (
    <div className="content-page active">
      <div className="content-inner">
        <div className="dash-header">
          <h2>Progress Skripsi</h2>
          <p>Pantau perkembangan setiap tahapan tugas akhir Anda</p>
        </div>
        
        <OverallCard />
        <TimelineList />
      </div>
    </div>
  );
}
