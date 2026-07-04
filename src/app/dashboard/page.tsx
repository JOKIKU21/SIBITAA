import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

// ponytail: dedicated page for /dashboard route that checks the session server-side and redirects to the correct role path
export default async function DashboardPage() {
  const reqHeaders = await headers();
  const cookieHeader = reqHeaders.get("cookie") || "";

  try {
    const { data: sessionData } = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie: cookieHeader,
        },
      },
    });

    if (!sessionData || !sessionData.user) {
      redirect("/masuk");
    }

    const role = (sessionData.user as { role?: string }).role || "student";

    // Redirection routing map based on user role
    const rolePaths: Record<string, string> = {
      student: "/dashboard/mahasiswa",
      lecturer: "/dashboard/dosen",
      admin: "/dashboard/admin",
      superadmin: "/dashboard/superadmin",
    };

    const targetPath = rolePaths[role] || "/dashboard/mahasiswa";
    redirect(targetPath);
  } catch (error) {
    console.error("Dashboard root redirect failed:", error);
    redirect("/masuk");
  }
}
