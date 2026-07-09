// ponytail: pure functions — no state, no side effects

import { STAGES, getStageMetadata } from "./stages";

export type StageStatus = "belum-mulai" | "berlangsung" | "selesai";

export interface StageWindow {
  start: number;
  end: number;
}

const TIMELINE_START = new Date(2026, 5, 29);

export function computeStageWindows(
  stages?: Array<{ n: number; days?: number }>
): Record<number, StageWindow> {
  const windows: Record<number, StageWindow> = {};
  let cursor = 0;
  const list = stages || STAGES;
  for (const stage of list) {
    const days = ("days" in stage ? stage.days : undefined) ?? getStageMetadata(stage.n).days;
    windows[stage.n] = { start: cursor, end: cursor + days };
    cursor += days;
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
