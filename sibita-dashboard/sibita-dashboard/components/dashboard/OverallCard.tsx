"use client";

import { CheckCircle2 } from "lucide-react";
import { STAGES } from "@/lib/stages";
import { useProgress } from "@/components/providers/ProgressProvider";

export function OverallCard() {
  const { completedStages } = useProgress();

  return (
    <div className="mb-7 flex flex-wrap items-center gap-6 rounded-panel bg-gradient-to-br from-brand to-brand-dark p-6 px-7">
      <div className="flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-[14px] bg-white/15">
        <CheckCircle2 size={26} className="text-white" />
      </div>
      <div>
        <h3 className="font-display text-[17px] font-extrabold text-white">
          Progres Keseluruhan
        </h3>
        <p className="text-[13.5px] font-semibold text-white/80">
          {completedStages.size} dari {STAGES.length} tahap selesai
        </p>
      </div>
    </div>
  );
}
