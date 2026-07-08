// ponytail: Server Component — no 'use client'

import Link from "next/link";
import type { MahasiswaBimbingan } from "@/lib/dosen-data";

const STATUS_BADGE: Record<MahasiswaBimbingan["status"], { cls: string; label: string }> = {
  aktif: { cls: "bg-success-bg text-success", label: "Aktif" },
  "mendekati-tenggat": { cls: "bg-warning-bg text-warning", label: "Mendekati Tenggat" },
  terlambat: { cls: "bg-danger-bg text-danger", label: "Terlambat" },
};

export function BimbinganTable({
  mahasiswa,
  showHeader = true,
}: {
  mahasiswa: MahasiswaBimbingan[];
  showHeader?: boolean;
}) {
  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      {showHeader ? (
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Mahasiswa Bimbingan</h3>
          <Link
            href="/dashboard/dosen/bimbingan"
            className="text-[13px] text-brand font-semibold hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Judul / Topik</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tahapan Aktif</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((m) => {
              const badge = STATUS_BADGE[m.status];
              return (
                <tr key={m.userId} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-linear-to-br ${m.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                        {m.nama.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13.5px] font-bold text-neutral-text">{m.nama}</div>
                        <div className="text-[11.5px] text-neutral-muted">NIM {m.nim} · {m.prodi}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[13px] text-neutral-text font-medium max-w-60 truncate">{m.judul}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[13px] text-neutral-text font-medium">Tahap {m.tahapanAktif}</div>
                    <div className="text-[11.5px] text-neutral-muted">{m.tahapanNama}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-bold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/dashboard/dosen/bimbingan/${m.userId}`}
                      className="inline-flex items-center gap-1.5 bg-brand-bg text-brand text-[12.5px] font-bold py-1.75 px-3.5 rounded-2 hover:bg-brand hover:text-white transition-colors duration-200"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                      Detail
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
