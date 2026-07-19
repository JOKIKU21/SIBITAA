export default function AdminDashboardLoading() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-neutral-200 rounded-lg mb-2" />
          <div className="h-4.5 w-80 bg-neutral-100 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white border border-neutral-border rounded-3.5" />
            ))}
          </div>

          {/* Dosen Bimbingan List Skeleton */}
          <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
            <div className="px-6 pt-5 pb-4">
              <div className="h-5.5 w-44 bg-neutral-200 rounded-md" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-t border-b border-neutral-border bg-neutral-bg/50">
                    <th className="py-3 px-6"><div className="h-3.5 w-16 bg-neutral-200 rounded" /></th>
                    <th className="py-3 px-4"><div className="h-3.5 w-20 bg-neutral-200 rounded" /></th>
                    <th className="py-3 px-4"><div className="h-3.5 w-24 bg-neutral-200 rounded" /></th>
                    <th className="py-3 px-4"><div className="h-3.5 w-16 bg-neutral-200 rounded" /></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-neutral-border last:border-b-0">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-neutral-200 shrink-0" />
                          <div className="h-4 w-32 bg-neutral-200 rounded" />
                        </div>
                      </td>
                      <td className="py-3.5 px-4"><div className="h-4 w-28 bg-neutral-100 rounded" /></td>
                      <td className="py-3.5 px-4"><div className="h-4.5 w-12 bg-neutral-200 rounded-full" /></td>
                      <td className="py-3.5 px-4"><div className="h-8.25 w-20 bg-neutral-200 rounded-2" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
