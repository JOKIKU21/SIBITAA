"use client";

// ponytail: client boundary — needs useRouter + useProgress

import { useRouter } from "next/navigation";
import { useProgress } from "@/components/providers/ProgressProvider";

interface MarkDoneButtonProps {
  stageNumber: number;
  nextSlug: string | null;
}

export function MarkDoneButton({ stageNumber, nextSlug }: MarkDoneButtonProps) {
  const router = useRouter();
  const { markStageDone } = useProgress();

  function handleClick() {
    markStageDone(stageNumber);
    router.push(nextSlug ? `/dashboard/mahasiswa/tahap/${nextSlug}` : "/dashboard/mahasiswa");
  }

  return (
    <div className="detail-actions" style={{ width: "100%" }}>
      <button
        type="button"
        onClick={handleClick}
        className="btn-detail-done"
        style={{ width: "100%", fontSize: "15px", padding: "14px" }}
      >
        Tandai Selesai
      </button>
    </div>
  );
}
