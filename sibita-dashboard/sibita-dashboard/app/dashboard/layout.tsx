import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressProvider } from "@/components/providers/ProgressProvider";

/**
 * Layout ini tetap ter-mount saat berpindah antara /dashboard dan
 * /dashboard/tahap/[id], sehingga ProgressProvider (client state) tidak
 * perlu remount setiap kali mahasiswa membuka detail tahap.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider>
      <div className="flex min-h-screen w-full bg-canvas">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </ProgressProvider>
  );
}
