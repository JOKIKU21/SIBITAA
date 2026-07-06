"use client";

import { useQuery } from "@tanstack/react-query";
import { referenceService } from "@/services/reference";

export const referenceKeys = {
  all: ["references"] as const,
  list: () => [...referenceKeys.all, "list"] as const,
};

/** Hook to fetch reference files from the API. */
export function useReferenceFiles() {
  return useQuery({
    queryKey: referenceKeys.list(),
    queryFn: () => referenceService.getReferenceFiles(),
  });
}
