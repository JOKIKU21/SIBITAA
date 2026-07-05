"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/Button";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname() || "";

  // ponytail: use authClient session hook to display user details dynamically in the sidebar footer
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    try {
      await authService.signOut();
      router.push("/masuk");
    } catch (error) {
      console.error("Gagal keluar:", error);
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Mahasiswa";
      case "lecturer":
        return "Dosen";
      case "admin":
        return "Admin";
      case "superadmin":
        return "Superadmin";
      default:
        return role;
    }
  };

  const name = session?.user?.name || "Pengguna";
  const userRole = (session?.user as { role?: string })?.role;
  const roleLabel = userRole ? getRoleLabel(userRole) : "";
  const avatarLetter = name.charAt(0).toUpperCase();

  const isHomeActive = pathname === "/dashboard/mahasiswa" || pathname.startsWith("/dashboard/mahasiswa/tahap");
  const isRefActive = pathname === "/dashboard/mahasiswa/referensi";
  const isProfileActive = pathname === "/dashboard/mahasiswa/profil";

  return (
    <aside className="w-65 shrink-0 bg-brand-dark flex flex-col p-0 sticky top-0 h-screen overflow-y-auto max-[600px]:hidden">
      <div className="flex items-center gap-2.5 pt-6 px-5 pb-5 border-b border-white/8">
        <span className="w-9 h-9 rounded-2.5 bg-white/13 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4.75 h-4.75">
            <path
              d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
              stroke="white"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M4 17.5C4 16.12 5.12 15 6.5 15H18"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <div className="font-display font-extrabold text-[17px] text-white">SIBITA</div>
          <div className="text-2.5 text-white/45 font-medium mt-px">Bimbingan Tugas Akhir</div>
        </div>
      </div>

      <nav className="pt-4.5 px-3 pb-0 flex-1">
        <div className="text-2.5 font-bold tracking-widest uppercase text-white/35 px-2.5 mb-1.5 mt-4.5">Menu Utama</div>
        <Link
          href="/dashboard/mahasiswa"
          className={`flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${
            isHomeActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${isHomeActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
            <rect
              x="3"
              y="3"
              width="7"
              height="7"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="14"
              y="3"
              width="7"
              height="7"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="3"
              y="14"
              width="7"
              height="7"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect
              x="14"
              y="14"
              width="7"
              height="7"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          Dashboard
        </Link>
        <Link
          href="/dashboard/mahasiswa/referensi"
          className={`flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${
            isRefActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${isRefActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Referensi
        </Link>
        <Link
          href="/dashboard/mahasiswa/profil"
          className={`flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${
            isProfileActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${isProfileActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Profil
        </Link>
      </nav>

      <div className="p-4 px-3 border-t border-white/8">
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-2.5 mb-1.5 bg-white/5">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-3.5 font-bold text-white shrink-0 overflow-hidden">{isPending ? "..." : avatarLetter}</div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{isPending ? "Memuat..." : name}</div>
            <div className="text-2.75 text-white/50 whitespace-nowrap overflow-hidden text-ellipsis">{isPending ? "" : roleLabel}</div>
          </div>
        </div>
        <Button
          variant="danger-light"
          size="custom"
          fullWidth
          className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-2.5 text-[13.5px] font-semibold"
          type="button"
          onClick={handleLogout}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Keluar
        </Button>
      </div>
    </aside>
  );
}
