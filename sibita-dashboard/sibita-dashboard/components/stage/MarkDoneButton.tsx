"use client";

import { useRouter } from "next/navigation";
import { useProgress } from "@/components/providers/ProgressProvider";

interface MarkDoneButtonProps {
  stageNumber: number;
  /** slug tahap berikutnya, atau null jika ini tahap terakhir */
  nextSlug: string | null;
}

export function MarkDoneButton({ stageNumber, nextSlug }: MarkDoneButtonProps) {
  const router = useRouter();
  const { markStageDone } = useProgress();

  function handleClick() {
    markStageDone(stageNumber);
    // Redirect ke tahap berikutnya (sesuai alur index__6_.html), atau
    // kembali ke dashboard jika ini tahap terakhir.
    router.push(nextSlug ? `/dashboard/tahap/${nextSlug}` : "/dashboard");
  }

  return (
    <div className="flex justify-end gap-2.5">
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="rounded-[9px] border border-neutral-border bg-white px-5 py-2.5 text-[13.5px] font-semibold text-neutral-muted transition-colors hover:bg-neutral-bg"
      >
        Batal
      </button>
      <button
        type="button"
        onClick={handleClick}
        className="rounded-[9px] bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Tandai Selesai
      </button>
    </div>
  );
}
