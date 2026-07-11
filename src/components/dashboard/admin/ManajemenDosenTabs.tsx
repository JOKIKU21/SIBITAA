"use client";

import { useAdminLecturers } from "@/hooks/useAdmin";

const AVATAR_COLORS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#34D399] to-[#059669]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#A78BFA] to-[#7C3AED]",
];

function getAvatarColor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function ManajemenDosenTabs() {
  return <DaftarDosenTab />;
}

// ─── Tab 1: Daftar Dosen ───
function DaftarDosenTab() {
  const { data, isLoading, error, refetch } = useAdminLecturers();
  const lecturers = data?.lecturers || [];

  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Dosen</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
              <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Dosen</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">No. HP</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Prodi</th>
              <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Jml Bimbingan</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map((n) => (
                <tr key={n} className="border-b border-neutral-border animate-pulse">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-bg shrink-0" />
                      <div className="h-4 bg-neutral-bg rounded w-32" />
                    </div>
                  </td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-40" /></td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-28" /></td>
                  <td className="py-3.5 px-4"><div className="h-3.5 bg-neutral-bg rounded w-24" /></td>
                  <td className="py-3.5 px-4 text-center"><div className="h-4 bg-neutral-bg rounded w-6 mx-auto" /></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <p className="text-danger text-[13.5px] font-bold mb-2">Gagal mengambil data dosen.</p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="bg-danger text-white border-none text-[12px] font-bold py-1.5 px-4 rounded-2 cursor-pointer hover:bg-danger-dark"
                  >
                    Coba Lagi
                  </button>
                </td>
              </tr>
            ) : lecturers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[13.5px] text-neutral-muted">
                  Belum ada data dosen terdaftar.
                </td>
              </tr>
            ) : (
              lecturers.map((lecturer) => {
                const avatarColor = getAvatarColor(lecturer.name);
                return (
                  <tr key={lecturer.id} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                          {lecturer.name ? lecturer.name.charAt(0) : "?"}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-bold text-neutral-text">{lecturer.name || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{lecturer.email || "-"}</td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{lecturer.phoneNumber || "-"}</td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-text font-medium">{lecturer.department || "-"}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[13px] font-bold text-brand">{lecturer.activeAdviseeCount}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
