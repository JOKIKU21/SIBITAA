"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";

// ponytail: same pattern as mahasiswa Sidebar, paths adapted to /dashboard/dosen
export function DosenSidebar() {
  const router = useRouter();
  const pathname = usePathname() || "";

  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    try {
      await authService.signOut();
      router.push("/masuk");
    } catch (error) {
      console.error("Gagal keluar:", error);
    }
  }

  const name = session?.user?.name || "Dosen";
  const avatarLetter = name.charAt(0).toUpperCase();

  const isDashboardActive = pathname === "/dashboard/dosen";
  const isBimbinganActive = pathname.startsWith("/dashboard/dosen/bimbingan");
  const isChatActive = pathname.startsWith("/dashboard/dosen/chat");
  const isProfilActive = pathname === "/dashboard/dosen/profil";

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${active ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
    }`;

  const iconClass = (active: boolean) =>
    `w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`;

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
        <Link href="/dashboard/dosen" className={linkClass(isDashboardActive)}>
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(isDashboardActive)}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Dashboard
        </Link>
        <Link href="/dashboard/dosen/bimbingan" className={linkClass(isBimbinganActive)}>
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(isBimbinganActive)}>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Bimbingan
        </Link>
        <Link href="/dashboard/dosen/chat" className={linkClass(isChatActive)}>
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(isChatActive)}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chat Mahasiswa
        </Link>
        <Link href="/dashboard/dosen/profil" className={linkClass(isProfilActive)}>
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(isProfilActive)}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Profil & Akun
        </Link>
      </nav>

      <div className="p-4 px-3 border-t border-white/8">
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-2.5 mb-1.5 bg-white/5">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-3.5 font-bold text-white shrink-0 overflow-hidden">{isPending ? "..." : avatarLetter}</div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">{isPending ? "Memuat..." : name}</div>
            <div className="text-2.75 text-white/50 whitespace-nowrap overflow-hidden text-ellipsis">Dosen Pembimbing</div>
          </div>
        </div>
        <button className="flex items-center gap-2.5 w-full py-2.5 px-3.5 rounded-2.5 bg-danger/12 text-[#fca5a5] text-[13.5px] font-semibold border-none cursor-pointer transition-[background] duration-200 hover:bg-danger/22" type="button" onClick={handleLogout}>
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
        </button>
      </div>
    </aside>
  );
}
