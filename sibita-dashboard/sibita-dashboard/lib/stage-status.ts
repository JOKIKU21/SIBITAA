import { STAGES } from "./stages";

export type StageStatus = "belum-mulai" | "berlangsung" | "selesai";

export interface StageWindow {
  start: number;
  end: number;
}

/** Tanggal mulai simulasi timeline (sesuai sibita.html): 29 Juni 2026 */
const TIMELINE_START = new Date(2026, 5, 29);

/**
 * Menghitung rentang hari (start–end) untuk setiap tahap secara berurutan,
 * berdasarkan durasi (`days`) masing-masing tahap.
 */
export function computeStageWindows(): Record<number, StageWindow> {
  const windows: Record<number, StageWindow> = {};
  let cursor = 0;
  for (const stage of STAGES) {
    windows[stage.n] = { start: cursor, end: cursor + stage.days };
    cursor += stage.days;
  }
  return windows;
}

export function formatStageDate(dayOffset: number): string {
  const date = new Date(TIMELINE_START);
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Status tahap murni berdasarkan urutan penyelesaian — tanpa persentase.
 * Tahap pertama yang belum ditandai selesai dianggap "berlangsung",
 * semua tahap sebelumnya (yang sudah ditandai) "selesai", sisanya "belum-mulai".
 */
export function getStageStatus(
  n: number,
  completedStages: ReadonlySet<number>
): StageStatus {
  if (completedStages.has(n)) return "selesai";

  const firstIncomplete = STAGES.find((s) => !completedStages.has(s.n));
  if (firstIncomplete && firstIncomplete.n === n) return "berlangsung";

  return "belum-mulai";
}

export function formatStageNumber(n: number): string {
  return String(n).padStart(2, "0");
}
