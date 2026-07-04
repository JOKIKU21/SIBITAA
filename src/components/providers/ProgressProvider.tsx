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

interface ProgressContextValue {
  completedStages: ReadonlySet<number>;
  markStageDone: (n: number) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const STORAGE_KEY = "sibita.completed-stages";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedStages, setCompletedStages] = useState<Set<number>>(
    () => new Set()
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompletedStages(new Set(JSON.parse(raw)));
      }
    } catch {
      // ponytail: localStorage not available — start empty
    }
  }, []);

  const markStageDone = useCallback((n: number) => {
    setCompletedStages((prev) => {
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
    () => ({ completedStages, markStageDone }),
    [completedStages, markStageDone]
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
