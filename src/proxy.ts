import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAuthPath = ["/masuk", "/daftar", "/verifikasi"].includes(pathname);

  if (isDashboardPath || isAuthPath) {
    const cookieHeader = request.headers.get("cookie") || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiURL}/api/auth/get-session`, {
        headers: {
          cookie: cookieHeader,
        },
      });

      const session = res.ok ? await res.json() : null;
      const hasActiveSession = session && session.user;

      if (isDashboardPath && !hasActiveSession) {
        return NextResponse.redirect(new URL("/masuk", request.url));
      }

      if (isAuthPath && hasActiveSession) {
        return NextResponse.redirect(new URL("/dashboard/mahasiswa", request.url));
      }
    } catch (error) {
      console.error("Auth proxy session check failed:", error);
      if (isDashboardPath) {
        return NextResponse.redirect(new URL("/masuk", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/masuk",
    "/daftar",
    "/verifikasi",
  ],
};
