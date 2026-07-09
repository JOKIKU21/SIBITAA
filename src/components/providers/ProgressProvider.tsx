"use client";

// ponytail: single client boundary for all progress state

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useStudentBimbingan } from "@/hooks/useStudentBimbingan";
import { STAGES, getStageMetadata } from "@/lib/stages";
import type { Stage, StageField, StageComparison } from "@/lib/stages";
import type { StudentProgress } from "@/services/student";
import type { LucideIcon } from "lucide-react";

export interface MergedStage extends Stage {
  id?: string;
  name: string;
  desc: string;
  days: number;
}

interface ProgressContextValue {
  completedStages: ReadonlySet<number>;
  markStageDone: (n: number) => void;
  isLoading: boolean;
  stages: MergedStage[];
  progress: StudentProgress | null;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const STORAGE_KEY = "sibita.completed-stages";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [localCompleted, setLocalCompleted] = useState<Set<number>>(() => new Set());
  const { data: bimbinganData, isLoading } = useStudentBimbingan();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalCompleted(new Set(JSON.parse(raw)));
      }
    } catch {
      // ponytail: localStorage not available — start empty
    }
  }, []);

  const backendCompleted = useMemo(() => {
    const completed = new Set<number>();
    if (!bimbinganData) return completed;

    const { progress, stages } = bimbinganData;
    if (!progress) return completed;

    if (progress.status === "completed") {
      for (let i = 1; i <= 17; i++) {
        completed.add(i);
      }
      return completed;
    }

    const currentStage = stages.find((s) => s.id === progress.currentStageId);
    if (currentStage) {
      const currentOrder = currentStage.order;
      for (let i = 1; i < currentOrder; i++) {
        completed.add(i);
      }
    }
    return completed;
  }, [bimbinganData]);

  const completedStages = useMemo(() => {
    const union = new Set<number>(backendCompleted);
    localCompleted.forEach((n) => union.add(n));
    return union;
  }, [backendCompleted, localCompleted]);

  const stages = useMemo(() => {
    return STAGES.map((stageConfig) => {
      const backendStage = bimbinganData?.stages?.find((s) => s.order === stageConfig.n);
      const metadata = getStageMetadata(stageConfig.n, backendStage);
      return {
        ...stageConfig,
        id: backendStage?.id,
        name: metadata.name,
        desc: metadata.desc,
        days: metadata.days,
      };
    });
  }, [bimbinganData]);

  const progress = useMemo(() => bimbinganData?.progress ?? null, [bimbinganData]);

  const markStageDone = useCallback((n: number) => {
    setLocalCompleted((prev) => {
      const next = new Set(prev);
      next.add(n);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ponytail: ignore storage failure
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ completedStages, markStageDone, isLoading, stages, progress }),
    [completedStages, markStageDone, isLoading, stages, progress]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress harus dipakai di dalam <ProgressProvider>");
  }
  return ctx;
}
