"use client";

import { useState } from "react";
import { MAHASISWA_LIST, type MahasiswaItem } from "@/lib/admin-data";

export function ManajemenMahasiswaList() {
  const [prodiFilter, setProdiFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtering logic
  const filteredMahasiswa = MAHASISWA_LIST.filter((m) => {
    const matchesProdi = prodiFilter === "All" || m.prodi === prodiFilter;
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesProdi && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-wrap gap-4 items-center justify-start">
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Prodi Filter */}
          <div className="flex flex-col gap-1">
            <select
              value={prodiFilter}
              onChange={(e) => setProdiFilter(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 py-2.5 px-4 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer font-semibold text-neutral-text"
            >
              <option value="All">Semua Program Studi</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.5 py-2.5 px-4 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light cursor-pointer font-semibold text-neutral-text"
            >
              <option value="All">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Mahasiswa</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Mahasiswa</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen Pembimbing</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Progres Bimbingan</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Kontak</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMahasiswa.map((m) => {
                const percent = Math.round((m.tahap / 17) * 100);
                return (
                  <tr
                    key={m.nim}
                    className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150"
                  >
                    {/* Mahasiswa Info */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full bg-linear-to-br ${m.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}
                        >
                          {m.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-bold text-neutral-text">{m.nama}</div>
                          <div className="text-[11.5px] text-neutral-muted">NIP/NIM {m.nim}</div>
                        </div>
                      </div>
                    </td>

                    {/* Prodi */}
                    <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                      {m.prodi}
                    </td>

                    {/* Dosen Pembimbing */}
                    <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">
                      {m.dosenNama}
                    </td>

                    {/* Progres Bimbingan */}
                    <td className="py-3.5 px-4 min-w-45">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-bg overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[11.5px] font-bold text-brand shrink-0">
                          {percent}%
                        </span>
                      </div>
                    </td>

                    {/* Kontak */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5 text-[12.5px]">
                        <span className="text-neutral-text font-medium">{m.email}</span>
                        <span className="text-neutral-muted">{m.phone}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[12px] font-bold py-1 px-2.5 rounded-full ${
                          m.status === "aktif"
                            ? "bg-success-bg text-success"
                            : "bg-brand-bg text-brand"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            m.status === "aktif" ? "bg-success" : "bg-brand"
                          }`}
                        />
                        {m.status === "aktif" ? "Aktif" : "Selesai"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredMahasiswa.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[13.5px] text-neutral-muted">
                    Tidak ada data mahasiswa yang cocok dengan kriteria filter Anda.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
