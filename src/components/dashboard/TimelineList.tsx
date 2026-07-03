"use client";

import { STAGES } from "@/lib/stages";
import { computeStageWindows, getStageStatus } from "@/lib/stage-status";
import { useProgress } from "@/components/providers/ProgressProvider";
import { StageCard } from "./StageCard";

export function TimelineList() {
  const { completedStages } = useProgress();
  const windows = computeStageWindows();

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
