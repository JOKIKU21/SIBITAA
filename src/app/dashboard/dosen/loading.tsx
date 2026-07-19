export default function DosenDashboardLoading() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-64 bg-neutral-200 rounded-lg mb-2" />
          <div className="h-4.5 w-96 bg-neutral-100 rounded-md" />
        </div>

        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-6 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-border rounded-3.5 py-5 px-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-3 bg-neutral-200 shrink-0" />
              <div className="flex-1">
                <div className="h-6 w-12 bg-neutral-200 rounded mb-2" />
                <div className="h-4.5 w-32 bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
          <div className="px-6 pt-5 pb-4">
            <div className="h-5 w-48 bg-neutral-200 rounded" />
          </div>
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
                {Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="border-b border-neutral-border last:border-b-0">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
                        <div>
                          <div className="h-4.5 w-32 bg-neutral-200 rounded mb-1.5" />
                          <div className="h-3.5 w-48 bg-neutral-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-4 w-52 bg-neutral-100 rounded" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-4 w-24 bg-neutral-100 rounded" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-6 w-20 bg-neutral-200 rounded-full" />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="h-8.25 w-20 bg-neutral-200 rounded-2" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
