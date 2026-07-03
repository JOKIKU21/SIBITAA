"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname() || "";
  
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/><path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <div>
          <div className="sidebar-logo-txt">SIBITA</div>
          <div className="sidebar-logo-sub">Bimbingan Tugas Akhir</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Menu Utama</div>
        <Link href="/dashboard/mahasiswa" className={`sn-link ${pathname === "/dashboard/mahasiswa" || pathname.startsWith("/dashboard/mahasiswa/tahap") ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>
          Dashboard
        </Link>
        <Link href="/dashboard/mahasiswa/referensi" className={`sn-link ${pathname === "/dashboard/mahasiswa/referensi" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Referensi
        </Link>
        <Link href="/dashboard/mahasiswa/profil" className={`sn-link ${pathname === "/dashboard/mahasiswa/profil" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Profil
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="sf-user">
          <div className="sf-avatar">T</div>
          <div className="sf-info">
            <div className="sf-name">Tih Indriani</div>
            <div className="sf-prodi">Sistem Informasi</div>
          </div>
        </div>
        <button className="btn-logout" type="button">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
