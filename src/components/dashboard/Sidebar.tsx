"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/Button";

interface MenuItem {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  icon: (active: boolean) => React.ReactNode;
}

export function Sidebar() {

  const pathname = usePathname() || "";

  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    try {
      // authService.signOut() does a hard redirect to /masuk via
      // fetchOptions.onSuccess after the session is invalidated.
      await authService.signOut();
    } catch (error) {
      console.error("Gagal keluar:", error);
      // Fallback: if signOut itself threw, force-redirect anyway
      // so the user isn't stuck on a dashboard with a broken session.
      window.location.href = "/masuk";
    }
  }

  const role = (session?.user as { role?: string })?.role || "student";
  
  const defaultNames: Record<string, string> = {
    student: "Pengguna",
    lecturer: "Dosen",
    admin: "Admin",
    superadmin: "Super Admin",
  };

  const name = session?.user?.name || defaultNames[role] || "Pengguna";
  const avatarLetter = name.charAt(0).toUpperCase();

  const getRoleLabel = (r: string) => {
    switch (r) {
      case "student":
        return "Mahasiswa";
      case "lecturer":
        return "Dosen Pembimbing";
      case "admin":
        return "Admin";
      case "superadmin":
        return "Administrator Utama";
      default:
        return r;
    }
  };

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 py-2.75 px-3.5 rounded-2.5 text-3.5 font-semibold bg-transparent border-none w-full text-left cursor-pointer mb-1 transition-[background,color] duration-150 group ${
      active ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
    }`;

  const iconClass = (active: boolean) =>
    `w-4.5 h-4.5 shrink-0 transition-opacity duration-150 ${
      active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
    }`;

  // Configuration for menus by role
  const menuConfig: Record<string, MenuItem[]> = {
    student: [
      {
        label: "Dashboard",
        href: "/dashboard/mahasiswa",
        match: (p) => p === "/dashboard/mahasiswa" || p.startsWith("/dashboard/mahasiswa/tahap"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        label: "Referensi",
        href: "/dashboard/mahasiswa/referensi",
        match: (p) => p === "/dashboard/mahasiswa/referensi",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        label: "Profil",
        href: "/dashboard/mahasiswa/profil",
        match: (p) => p === "/dashboard/mahasiswa/profil",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M4 20c0-4 3.58-7 8-7s8 3 8 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
    lecturer: [
      {
        label: "Dashboard",
        href: "/dashboard/dosen",
        match: (p) => p === "/dashboard/dosen",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        label: "Bimbingan",
        href: "/dashboard/dosen/bimbingan",
        match: (p) => p.startsWith("/dashboard/dosen/bimbingan"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Chat Mahasiswa",
        href: "/dashboard/dosen/chat",
        match: (p) => p.startsWith("/dashboard/dosen/chat"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: "Profil & Akun",
        href: "/dashboard/dosen/profil",
        match: (p) => p === "/dashboard/dosen/profil",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
    admin: [
      {
        label: "Dashboard",
        href: "/dashboard/admin",
        match: (p) => p === "/dashboard/admin",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        label: "Registrasi",
        href: "/dashboard/admin/registrasi",
        match: (p) => p.startsWith("/dashboard/admin/registrasi"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: "Pembayaran",
        href: "/dashboard/admin/pembayaran",
        match: (p) => p.startsWith("/dashboard/admin/pembayaran"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: "Data Dosen",
        href: "/dashboard/admin/manajemen-dosen",
        match: (p) => p.startsWith("/dashboard/admin/manajemen-dosen"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Data Mahasiswa",
        href: "/dashboard/admin/manajemen-mahasiswa",
        match: (p) => p.startsWith("/dashboard/admin/manajemen-mahasiswa"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path d="M22 10v6M2 10l10-5 10 5-10 5-10 5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: "Referensi",
        href: "/dashboard/admin/referensi",
        match: (p) => p.startsWith("/dashboard/admin/referensi"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 2v6h6M16 13H8M16 17H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        label: "Profil & Akun",
        href: "/dashboard/admin/profil",
        match: (p) => p === "/dashboard/admin/profil",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
    superadmin: [
      {
        label: "Dashboard",
        href: "/dashboard/superadmin",
        match: (p) => p === "/dashboard/superadmin",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ),
      },
      {
        label: "Manajemen Pengguna",
        href: "/dashboard/superadmin/manajemen-pengguna",
        match: (p) => p.startsWith("/dashboard/superadmin/manajemen-pengguna"),
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        label: "Profil & Akun",
        href: "/dashboard/superadmin/profil",
        match: (p) => p === "/dashboard/superadmin/profil",
        icon: (active) => (
          <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)}>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  };

  const activeMenu = menuConfig[role] || menuConfig.student;
  const roleLabel = getRoleLabel(role);

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
        <div className="text-2.5 font-bold tracking-widest uppercase text-white/35 px-2.5 mb-1.5 mt-4.5">
          Menu Utama
        </div>
        {activeMenu.map((item) => {
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive)}
            >
              {item.icon(isActive)}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 px-3 border-t border-white/8">
        <div className="flex items-center gap-3 py-2.5 px-3 rounded-2.5 mb-1.5 bg-white/5">
          {role === "superadmin" ? (
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-[14px] shrink-0 overflow-hidden">
              👑
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-3.5 font-bold text-white shrink-0 overflow-hidden">
              {isPending ? "..." : avatarLetter}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {isPending ? "Memuat..." : name}
            </div>
            <div className="text-2.75 text-white/50 whitespace-nowrap overflow-hidden text-ellipsis">
              {isPending ? "" : roleLabel}
            </div>
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
