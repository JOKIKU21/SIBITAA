import { Sidebar } from "@/components/dashboard/Sidebar";
import type { ReactNode } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full">
        {children}
      </div>
    </div>
  );
}
