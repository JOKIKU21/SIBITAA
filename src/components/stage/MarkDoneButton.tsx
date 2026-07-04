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
    <div className="flex justify-end gap-2 w-full">
      <button
        type="button"
        onClick={handleClick}
        className="w-full text-[15px] p-3.5 bg-[#16A34A] text-white border-none font-semibold rounded-2.25 cursor-pointer transition-[background] duration-200 hover:bg-[#15803d]"
      >
        Tandai Selesai
      </button>
    </div>
  );
}
