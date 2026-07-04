"use client";

import { STAGES } from "@/lib/stages";
import { useProgress } from "@/components/providers/ProgressProvider";

export function OverallCard() {
  const { completedStages } = useProgress();

  return (
    <div className="bg-gradient-to-r from-brand to-brand-dark rounded-[16px] py-[24px] px-[28px] flex items-center gap-[24px] mb-[28px] flex-wrap">
      <div className="w-[54px] h-[54px] rounded-[14px] bg-white/14 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px]"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="flex-1 min-w-[200px]">
        <h3 className="font-display text-[17px] font-extrabold text-white mb-[4px]">Progres Keseluruhan</h3>
        <p className="text-[13.5px] text-white/78 font-semibold">{completedStages.size} dari {STAGES.length} tahap selesai</p>
      </div>
      <div className="ml-auto text-right shrink-0">
        <div className="text-[12px] text-white/60 mb-[6px]">Simulasi Hari ke-</div>
        <div className="font-display text-[22px] font-extrabold text-white mb-[8px]">0</div>
        <div className="flex gap-[6px]">
          <button className="py-[6px] px-[12px] rounded-[7px] text-[12px] font-bold border-none cursor-pointer transition-[background] duration-150 bg-white/12 text-white/80 hover:bg-white/20">&minus;</button>
          <button className="py-[6px] px-[12px] rounded-[7px] text-[12px] font-bold border-none cursor-pointer transition-[background] duration-150 bg-[#6FE3A6] text-[#14532D] hover:bg-[#4ade80]">+1 Hari</button>
        </div>
      </div>
    </div>
  );
}
