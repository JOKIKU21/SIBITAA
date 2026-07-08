"use client";

import { useRouter } from "next/navigation";
import { useProgress } from "@/components/providers/ProgressProvider";
import { useCreateNote, useUpdateNote } from "@/hooks/useStudentBimbingan";
import type { StageNote } from "@/services/student";
import Button from "@/components/Button";

interface MarkDoneButtonProps {
  stageNumber: number;
  stageId?: string;
  existingNote?: StageNote;
  nextSlug: string | null;
}

export function MarkDoneButton({ stageNumber, stageId, existingNote, nextSlug }: MarkDoneButtonProps) {
  const router = useRouter();
  const { markStageDone } = useProgress();
  const createNoteMut = useCreateNote();
  const updateNoteMut = useUpdateNote();

  const isPending = createNoteMut.isPending || updateNoteMut.isPending;

  async function handleClick() {
    try {
      if (stageId) {
        if (existingNote) {
          await updateNoteMut.mutateAsync({
            stageId,
            noteId: existingNote.id,
            payload: { completedAt: new Date().toISOString() },
          });
        } else {
          // If no note exists, create an empty one first, then mark it complete
          const res = await createNoteMut.mutateAsync({
            stageId,
            data: {},
          });
          if (res?.note?.id) {
            await updateNoteMut.mutateAsync({
              stageId,
              noteId: res.note.id,
              payload: { completedAt: new Date().toISOString() },
            });
          }
        }
      }
    } catch (err) {
      console.error("Gagal menyimpan status selesai ke backend:", err);
    }

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
        isLoading={isPending}
      >
        Tandai Selesai
      </Button>
    </div>
  );
}
