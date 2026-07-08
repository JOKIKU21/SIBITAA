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
        credentials: "include",
        cache: "no-store",
      });

      const session = res.ok ? await res.json() : null;
      const hasActiveSession = session && session.user;

      const rolePaths: Record<string, string> = {
        student: "/dashboard/mahasiswa",
        lecturer: "/dashboard/dosen",
        admin: "/dashboard/admin",
        superadmin: "/dashboard/superadmin",
      };

      if (hasActiveSession) {
        const role = session.user.role || "student";
        const targetPath = rolePaths[role] || "/dashboard/mahasiswa";

        // Redirect logged-in users away from auth pages to their dashboard
        if (isAuthPath) {
          return NextResponse.redirect(new URL(targetPath, request.url));
        }

        // Redirect root dashboard path to role-specific dashboard
        if (pathname === "/dashboard" || pathname === "/dashboard/") {
          return NextResponse.redirect(new URL(targetPath, request.url));
        }

        // Route protection based on roles
        const pathRoleMap = [
          { prefix: "/dashboard/mahasiswa", allowedRole: "student" },
          { prefix: "/dashboard/dosen", allowedRole: "lecturer" },
          { prefix: "/dashboard/admin", allowedRole: "admin" },
          { prefix: "/dashboard/superadmin", allowedRole: "superadmin" },
        ];

        for (const rule of pathRoleMap) {
          if (pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")) {
            if (role !== rule.allowedRole) {
              return NextResponse.redirect(new URL(targetPath, request.url));
            }
          }
        }
      } else {
        if (isDashboardPath) {
          return NextResponse.redirect(new URL("/masuk", request.url));
        }
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