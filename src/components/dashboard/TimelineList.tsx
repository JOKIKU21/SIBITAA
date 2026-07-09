"use client";

import { computeStageWindows, getStageStatus } from "@/lib/stage-status";
import { useProgress } from "@/components/providers/ProgressProvider";
import { StageCard } from "./StageCard";
import { calculateRemainingDays } from "@/lib/stages";

export function TimelineList() {
  const { completedStages, isLoading, stages, progress } = useProgress();
  const windows = computeStageWindows(stages);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-neutral-muted font-semibold bg-white rounded-3.5 border border-neutral-border my-4 shadow-xs">
        Memuat progres skripsi Anda...
      </div>
    );
  }

  return (
    <div className="timeline">
      {stages.map((stage) => {
        const status = getStageStatus(stage.n, completedStages);
        const isOngoing = status === "berlangsung";
        const remainingDays =
          isOngoing && progress?.startedAt
            ? calculateRemainingDays(progress.startedAt, stage.days)
            : undefined;

        return (
          <StageCard
            key={stage.n}
            stage={stage}
            status={status}
            window={windows[stage.n]}
            remainingDays={remainingDays}
          />
        );
      })}
    </div>
  );
}
