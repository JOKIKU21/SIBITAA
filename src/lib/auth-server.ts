import { headers } from "next/headers";
import { cache } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "lecturer" | "admin" | "superadmin";
  emailVerified: boolean;
  image?: string;
  phoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    userAgent?: string;
    ipAddress?: string;
    createdAt: string;
    updatedAt: string;
  };
  user: User;
}

/**
 * Get the active session in React Server Components (RSC).
 * Fetches the session from the backend by forwarding the cookies from the incoming request.
 * Wrapped in React.cache() to deduplicate session fetch calls within the same render pass.
 */
export const getServerSession = cache(async (): Promise<Session | null> => {
  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";
    
    // Fallback order matches middleware.ts
    const apiURL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${apiURL}/api/auth/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data && data.user) {
      return data as Session;
    }
    return null;
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE" || error?.message?.includes("Dynamic server usage")) {
      throw error;
    }
    console.error("getServerSession failed:", error);
    return null;
  }
});

