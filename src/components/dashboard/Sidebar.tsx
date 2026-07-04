"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";

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
    <aside className="w-[260px] shrink-0 bg-brand-dark flex flex-col p-0 sticky top-0 h-screen overflow-y-auto max-[600px]:hidden">
      <div className="flex items-center gap-[10px] pt-[24px] px-[20px] pb-[20px] border-b border-white/8">
        <span className="w-[36px] h-[36px] rounded-[10px] bg-white/13 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-[19px] h-[19px]">
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
          <div className="text-[10px] text-white/45 font-medium mt-[1px]">Bimbingan Tugas Akhir</div>
        </div>
      </div>

      <nav className="pt-[18px] px-[12px] pb-0 flex-1">
        <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/35 px-[10px] mb-[6px] mt-[18px]">Menu Utama</div>
        <Link
          href="/dashboard/mahasiswa"
          className={`flex items-center gap-[12px] py-[11px] px-[14px] rounded-[10px] text-[14px] font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-[4px] transition-[background,color] duration-150 group ${
            isHomeActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-[18px] h-[18px] shrink-0 transition-opacity duration-150 ${isHomeActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
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
          className={`flex items-center gap-[12px] py-[11px] px-[14px] rounded-[10px] text-[14px] font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-[4px] transition-[background,color] duration-150 group ${
            isRefActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-[18px] h-[18px] shrink-0 transition-opacity duration-150 ${isRefActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
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
          className={`flex items-center gap-[12px] py-[11px] px-[14px] rounded-[10px] text-[14px] font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-[4px] transition-[background,color] duration-150 group ${
            isProfileActive ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className={`w-[18px] h-[18px] shrink-0 transition-opacity duration-150 ${isProfileActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
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

      <div className="p-[16px] px-[12px] border-t border-white/8">
        <div className="flex items-center gap-[12px] py-[10px] px-[12px] rounded-[10px] mb-[6px] bg-white/5">
          <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#6FE3A6] to-[#4A5CDB] flex items-center justify-center text-[14px] font-bold text-white shrink-0 overflow-hidden">{isPending ? "..." : avatarLetter}</div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{isPending ? "Memuat..." : name}</div>
            <div className="text-[11px] text-white/50 whitespace-nowrap overflow-hidden text-ellipsis">{isPending ? "" : roleLabel}</div>
          </div>
        </div>
        <button className="flex items-center gap-[10px] w-full py-[10px] px-[14px] rounded-[10px] bg-[#DC2626]/12 text-[#fca5a5] text-[13.5px] font-semibold border-none cursor-pointer transition-[background] duration-200 hover:bg-[#DC2626]/22" type="button" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] shrink-0">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
