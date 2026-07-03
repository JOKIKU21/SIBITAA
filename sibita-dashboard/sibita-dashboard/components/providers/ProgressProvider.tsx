"use client";

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

/**
 * Menyediakan status "tahap selesai" ke seluruh dashboard.
 * Ini SATU-SATUNYA client boundary untuk state interaktif — dibungkus
 * di dashboard layout supaya tetap hidup saat berpindah antar halaman
 * (dashboard <-> detail tahap) tanpa perlu prop-drilling atau refetch.
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedStages, setCompletedStages] = useState<Set<number>>(
    () => new Set()
  );

  // Muat progres tersimpan dari localStorage sekali saat mount di client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCompletedStages(new Set(JSON.parse(raw)));
    } catch {
      // localStorage tidak tersedia — abaikan, mulai dari kosong.
    }
  }, []);

  const markStageDone = useCallback((n: number) => {
    setCompletedStages((prev) => {
      const next = new Set(prev);
      next.add(n);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // abaikan kegagalan penyimpanan
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
