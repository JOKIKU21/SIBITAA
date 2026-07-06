"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "@/lib/api-client";

/**
 * App-wide TanStack Query provider.
 *
 * The `QueryClient` is created lazily in state so it is instantiated once per
 * browser tab and never re-created across renders (a new client on every render
 * would drop the cache). Defaults are tuned for this dashboard: data stays
 * fresh for a minute, we don't refetch on window focus, and 4xx responses are
 * not retried (they won't succeed on retry).
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (error instanceof ApiError && error.status < 500) {
                return false;
              }
              return failureCount < 2; // retry up to 2 times for server errors (5xx)
            },
          },
          mutations: {
            retry: false, // mutations are usually user actions, so don't retry
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
