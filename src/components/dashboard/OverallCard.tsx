"use client";

import { STAGES } from "@/lib/stages";
import { useProgress } from "@/components/providers/ProgressProvider";

export function OverallCard() {
  const { completedStages } = useProgress();

  return (
    <div className="bg-linear-to-r from-brand to-brand-dark rounded-4 py-6 px-7 flex items-center gap-6 mb-7 flex-wrap">
      <div className="w-13.5 h-13.5 rounded-3.5 bg-white/14 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-6.5 h-6.5"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="flex-1 min-w-50">
        <h3 className="font-display text-[17px] font-extrabold text-white mb-1">Progres Keseluruhan</h3>
        <p className="text-[13.5px] text-white/78 font-semibold">{completedStages.size} dari {STAGES.length} tahap selesai</p>
      </div>
    </div>
  );
}
