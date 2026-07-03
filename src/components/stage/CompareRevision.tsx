// ponytail: Server Component — side-by-side revision comparison

import type { StageComparison } from "@/lib/stages";

export function CompareRevision({ comparison }: { comparison: StageComparison }) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-brand">
        Perbandingan Revisi
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[10px] border border-danger/20 bg-danger-bg p-3.5">
          <h4 className="mb-1.5 text-[11.5px] font-bold text-danger">
            Versi Sebelumnya
          </h4>
          <p className="text-[12.5px] leading-relaxed text-neutral-text">
            {comparison.before}
          </p>
        </div>
        <div className="rounded-[10px] border border-success/20 bg-success-bg p-3.5">
          <h4 className="mb-1.5 text-[11.5px] font-bold text-success">
            Versi Terbaru
          </h4>
          <p className="text-[12.5px] leading-relaxed text-neutral-text">
            {comparison.after}
          </p>
        </div>
      </div>
    </div>
  );
}
