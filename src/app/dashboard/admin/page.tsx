import { AdminDashboardContent } from "@/components/dashboard/admin/AdminDashboardContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin | SIBITA",
};

export default function AdminDashboardPage() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Dashboard Admin</h2>
          <p className="text-3.5 text-neutral-muted">Ringkasan dosen, bimbingan, dan progres mahasiswa.</p>
        </div>

        <AdminDashboardContent />
      </div>
    </div>
  );
}
