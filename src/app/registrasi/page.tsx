import { Metadata } from "next";
import RegistrationFlow from "@/components/onboarding/RegistrationFlow";
import { getServerSession } from "@/lib/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Registrasi Mahasiswa - SIBITA",
  description: "Lengkapi data diri dan administrasi untuk mulai menggunakan SIBITA.",
};

export default async function RegistrasiMahasiswaPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/masuk");
  }

  if (session.user.role !== "student") {
    redirect("/dashboard");
  }

  let shouldRedirectToDashboard = false;
  try {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie") || "";
    const apiURL = process.env.BACKEND_API_URL || "http://localhost:3000";

    const profileRes = await fetch(`${apiURL}/api/student/profile`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (profileRes.ok) {
      const profile = await profileRes.json();
      if (profile && profile.status === "active" && profile.advisor) {
        shouldRedirectToDashboard = true;
      }
    }
  } catch (error) {
    console.error("Student profile check in onboarding page failed:", error);
  }

  if (shouldRedirectToDashboard) {
    redirect("/dashboard/mahasiswa");
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
      <RegistrationFlow />
    </div>
  );
}

