import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export default async function DashboardPage() {
  const reqHeaders = await headers();
  const cookieHeader = reqHeaders.get("cookie") || "";

  let targetPath = "/dashboard/mahasiswa";
  try {
    const { data: sessionData } = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie: cookieHeader,
        },
      },
    });

    if (!sessionData || !sessionData.user) {
      targetPath = "/masuk";
    } else {
      const role = (sessionData.user as { role?: string }).role || "student";

      const rolePaths: Record<string, string> = {
        student: "/dashboard/mahasiswa",
        lecturer: "/dashboard/dosen",
        admin: "/dashboard/admin",
        superadmin: "/dashboard/superadmin",
      };

      targetPath = rolePaths[role] || "/dashboard/mahasiswa";
    }
  } catch (error) {
    console.error("Dashboard root redirect failed:", error);
    targetPath = "/masuk";
  }

  redirect(targetPath);
}
