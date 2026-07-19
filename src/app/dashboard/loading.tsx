export default function RootDashboardLoading() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar Skeleton */}
      <aside className="w-65 shrink-0 bg-brand-dark flex flex-col p-0 sticky top-0 h-screen overflow-y-auto max-[600px]:hidden animate-pulse">
        <div className="flex items-center gap-2.5 pt-6 px-5 pb-5 border-b border-white/8">
          <div className="w-9 h-9 rounded-2.5 bg-white/10 shrink-0" />
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-4.5 w-16 bg-white/15 rounded" />
            <div className="h-3 w-28 bg-white/10 rounded" />
          </div>
        </div>

        <div className="pt-4.5 px-3 flex-1">
          <div className="h-3 w-20 bg-white/10 rounded px-2.5 mb-4.5 mt-4.5" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9.5 w-full bg-white/5 rounded-2.5 mb-2" />
          ))}
        </div>

        <div className="p-4 px-3 border-t border-white/8 flex flex-col gap-2">
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-2.5 bg-white/5">
            <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-3.5 w-20 bg-white/15 rounded" />
              <div className="h-3 w-16 bg-white/10 rounded" />
            </div>
          </div>
          <div className="h-9.5 w-full bg-white/5 rounded-2.5" />
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 min-w-0 bg-canvas max-[600px]:w-full p-7 max-[600px]:p-4 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-64 bg-neutral-200 rounded-lg mb-2" />
          <div className="h-5 w-96 bg-neutral-100 rounded-md" />
        </div>

        {/* Content Blocks */}
        <div className="space-y-6">
          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white border border-neutral-border rounded-3.5" />
            ))}
          </div>

          {/* Main Card/Table Skeleton */}
          <div className="h-80 bg-white border border-neutral-border rounded-3.5" />
        </div>
      </div>
    </div>
  );
}
