"use client";

import { STAGES } from "@/lib/stages";
import { useProgress } from "@/components/providers/ProgressProvider";

export function OverallCard() {
  const { completedStages } = useProgress();

  return (
    <div className="overall-card">
      <div className="overall-icon">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="overall-info">
        <h3>Progres Keseluruhan</h3>
        <p>{completedStages.size} dari {STAGES.length} tahap selesai</p>
      </div>
      <div className="overall-sim">
        <div className="sim-day-label">Simulasi Hari ke-</div>
        <div className="sim-day-num">0</div>
        <div className="sim-btns">
          <button className="sim-btn sim-btn-minus">&minus;</button>
          <button className="sim-btn sim-btn-plus">+1 Hari</button>
        </div>
      </div>
    </div>
  );
}
