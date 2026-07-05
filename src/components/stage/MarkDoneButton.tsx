"use client";

// ponytail: client boundary — needs useRouter + useProgress

import { useRouter } from "next/navigation";
import { useProgress } from "@/components/providers/ProgressProvider";
import Button from "@/components/Button";

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
      <Button
        type="button"
        onClick={handleClick}
        variant="success"
        size="lg"
        fullWidth
        className="font-semibold rounded-2.25"
      >
        Tandai Selesai
      </Button>
    </div>
  );
}
