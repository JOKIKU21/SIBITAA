export default function ReferensiLoading() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold mb-1">Referensi Buku & Jurnal</h2>
          <p className="text-lg text-neutral-muted">Materi pendukung dari dosen pembimbing untuk membantu tugas akhir Anda</p>
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex gap-3 mb-5.5 flex-wrap">
          <div className="h-10.5 w-full max-w-md bg-neutral-100 border border-neutral-border rounded-2.5 animate-pulse" />
        </div>

        {/* List Skeletons */}
        <div className="flex flex-col gap-3.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-border rounded-3.5 p-5 px-5.5 flex items-start gap-4"
            >
              {/* Icon placeholder */}
              <div className="w-11 h-11 rounded-2.75 bg-neutral-200 animate-pulse shrink-0" />
              
              {/* Content placeholder */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <div className="h-5 w-1/3 bg-neutral-200 rounded animate-pulse mb-2.5" />
                {/* Description */}
                <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse mb-3.5" />
                
                {/* File badge placeholder */}
                <div className="h-6.5 w-48 bg-neutral-50 border border-neutral-border/60 rounded-2 animate-pulse mb-3.5" />
                
                {/* Meta details */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="h-5.5 w-16 bg-neutral-200 rounded-full animate-pulse" />
                  <span className="text-neutral-border/60">•</span>
                  <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse" />
                  <span className="text-neutral-border/60">•</span>
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Action Button placeholder */}
              <div className="h-9.25 w-20 bg-neutral-200 rounded-2 animate-pulse shrink-0 self-start" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
