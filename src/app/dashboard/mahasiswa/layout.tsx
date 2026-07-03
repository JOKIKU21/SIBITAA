"use client";
import "../dashboard.css";
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
      <div className="app-shell">
        <Sidebar />
        <div className="content">
          <Topbar title="Dashboard" />
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}
