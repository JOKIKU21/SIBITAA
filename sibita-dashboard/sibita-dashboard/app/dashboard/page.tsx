import { Topbar } from "@/components/layout/Topbar";
import { OverallCard } from "@/components/dashboard/OverallCard";
import { TimelineList } from "@/components/dashboard/TimelineList";

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-7">
        <div className="mb-6">
          <h2 className="font-display text-[22px] font-extrabold text-neutral-text">
            Progress Skripsi
          </h2>
          <p className="text-sm text-neutral-muted">
            Pantau perkembangan setiap tahapan tugas akhir Anda
          </p>
        </div>

        <OverallCard />
        <TimelineList />
      </div>
    </>
  );
}
