"use client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import type { ReactNode } from "react";

export default function MahasiswaDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProgressProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex-1 min-w-0 bg-[#F0F2F9] max-[600px]:w-full">
          <Topbar title="Dashboard" />
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}
