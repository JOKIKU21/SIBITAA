// ponytail: Server Component — back link + badge + title

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { formatStageNumber } from "@/lib/stage-status";

export function StageHeader({ n, name }: { n: number; name: string }) {
  return (
    <div className="mb-6">
      <Link
        href="/dashboard/mahasiswa"
        className="mb-4 inline-flex items-center gap-1 text-[13px] font-semibold text-neutral-muted transition-colors hover:text-brand"
      >
        <ChevronLeft size={16} />
        Kembali ke Progress Skripsi
      </Link>
      <div className="rounded-panel border border-neutral-border bg-white p-6">
        <span className="mb-2 inline-block rounded-full bg-brand-bg px-3 py-1 font-display text-sm font-extrabold text-brand">
          Tahap {formatStageNumber(n)}
        </span>
        <h1 className="font-display text-xl font-extrabold text-neutral-text">
          {name}
        </h1>
      </div>
    </div>
  );
}
