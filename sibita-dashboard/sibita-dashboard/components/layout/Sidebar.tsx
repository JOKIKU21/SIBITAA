import Link from "next/link";
import { LayoutGrid, BookOpen, LogOut } from "lucide-react";

/**
 * Sidebar dashboard mahasiswa. Server Component murni (statis),
 * tidak butuh interaktivitas sehingga tidak perlu "use client".
 */
export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col bg-brand-dark">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/15">
          <BookOpen className="text-white" size={18} />
        </span>
        <div>
          <div className="font-display text-[17px] font-extrabold text-white">
            SIBITA
          </div>
          <div className="text-[10px] font-medium text-white/45">
            Bimbingan Tugas Akhir
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 pt-4">
        <div className="mb-1.5 px-2.5 pt-2 text-[10px] font-bold uppercase tracking-wider text-white/35">
          Menu Utama
        </div>
        <Link
          href="/dashboard"
          className="mb-1 flex items-center gap-3 rounded-[10px] bg-white/15 px-3.5 py-2.5 text-sm font-semibold text-white"
        >
          <LayoutGrid size={18} className="opacity-90" />
          Dashboard
        </Link>
        <Link
          href="/dashboard"
          className="mb-1 flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <BookOpen size={18} className="opacity-70" />
          Referensi
        </Link>
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-1.5 flex items-center gap-3 rounded-[10px] bg-white/5 px-3 py-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-brand-light text-sm font-bold text-white">
            T
          </div>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-bold text-white">
              Tih Indriani
            </div>
            <div className="truncate text-[11px] text-white/50">
              Sistem Informasi
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-[10px] bg-red-500/10 px-3.5 py-2.5 text-[13.5px] font-semibold text-red-300 transition-colors hover:bg-red-500/20"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
