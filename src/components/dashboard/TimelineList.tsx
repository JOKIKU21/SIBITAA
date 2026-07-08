"use client";

import { STAGES } from "@/lib/stages";
import { computeStageWindows, getStageStatus } from "@/lib/stage-status";
import { useProgress } from "@/components/providers/ProgressProvider";
import { StageCard } from "./StageCard";

export function TimelineList() {
  const { completedStages, isLoading } = useProgress();
  const windows = computeStageWindows();

  if (isLoading) {
    return (
      <div className="py-12 text-center text-neutral-muted font-semibold bg-white rounded-3.5 border border-neutral-border my-4 shadow-xs">
        Memuat progres skripsi Anda...
      </div>
    );
  }

  return (
    <div className="timeline">
      {STAGES.map((stage) => (
        <StageCard
          key={stage.n}
          stage={stage}
          status={getStageStatus(stage.n, completedStages)}
          window={windows[stage.n]}
        />
      ))}
    </div>
  );
}
