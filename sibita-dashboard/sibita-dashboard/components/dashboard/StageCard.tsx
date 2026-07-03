import Link from "next/link";
import type { Stage } from "@/lib/stages";
import type { StageStatus, StageWindow } from "@/lib/stage-status";
import { formatStageDate, formatStageNumber } from "@/lib/stage-status";
import { StatusBadge } from "./StatusBadge";

const ICON_STYLES: Record<StageStatus, string> = {
  "belum-mulai": "bg-neutral-bg border-neutral-border text-neutral",
  berlangsung: "bg-brand-bg border-brand text-brand",
  selesai: "bg-success-bg border-success text-success",
};

const CARD_STYLES: Record<StageStatus, string> = {
  "belum-mulai": "border-neutral-border",
  berlangsung: "border-brand ring-2 ring-brand/10",
  selesai: "border-neutral-border",
};

interface StageCardProps {
  stage: Stage;
  status: StageStatus;
  window: StageWindow;
  isLast: boolean;
}

export function StageCard({ stage, status, window, isLast }: StageCardProps) {
  const Icon = stage.icon;

  return (
    <div className="flex">
      {/* Kolom kiri: ikon tahap + garis penghubung */}
      <div className="flex w-14 flex-shrink-0 flex-col items-center">
        <div
          className={`z-[1] flex h-11 w-11 items-center justify-center rounded-full border-[3px] transition-colors ${ICON_STYLES[status]}`}
        >
          <Icon size={20} />
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 ${
              status === "selesai" ? "bg-success" : "bg-neutral-border"
            }`}
          />
        )}
      </div>

      {/* Kartu tahap */}
      <Link
        href={`/dashboard/tahap/${stage.slug}`}
        className={`mb-3.5 ml-3 flex-1 rounded-card border bg-white p-5 pb-4 transition-shadow hover:shadow-[0_4px_18px_rgba(43,59,175,0.10)] ${CARD_STYLES[status]}`}
      >
        <div className="mb-2 flex items-center justify-between gap-2.5">
          <span className="font-display text-[22px] font-extrabold leading-none text-brand">
            {formatStageNumber(stage.n)}
          </span>
          <StatusBadge status={status} />
        </div>
        <div className="mb-1 font-display text-[15px] font-bold text-neutral-text">
          {stage.name}
        </div>
        <div className="mb-2 text-[12.5px] font-semibold text-brand">
          {formatStageDate(window.start)} – {formatStageDate(window.end)}
        </div>
        <p className="text-[13px] leading-relaxed text-neutral-muted">
          {stage.desc}
        </p>
      </Link>
    </div>
  );
}
