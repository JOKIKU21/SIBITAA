import { DosenDashboardClient } from "@/components/dashboard/dosen/DosenDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Dosen | SIBITA",
};

export default function DosenDashboardPage() {
  return <DosenDashboardClient />;
}
