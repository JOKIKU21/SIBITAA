import type { StageStatus } from "@/lib/stage-status";

const STYLES: Record<StageStatus, string> = {
  "belum-mulai": "bg-neutral-bg text-neutral",
  berlangsung: "bg-brand-bg text-brand",
  selesai: "bg-success-bg text-success",
};

const LABELS: Record<StageStatus, string> = {
  "belum-mulai": "Belum Mulai",
  berlangsung: "Berlangsung",
  selesai: "Selesai ✓",
};

export function StatusBadge({ status }: { status: StageStatus }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-bold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
