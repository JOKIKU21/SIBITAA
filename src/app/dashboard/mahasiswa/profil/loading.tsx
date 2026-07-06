export default function ProfilLoading() {
  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-44 bg-neutral-200 rounded-lg animate-pulse mb-2" />
          <div className="h-5.5 w-80 bg-neutral-200 rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-5.5 items-start max-[900px]:grid-cols-1">
          {/* left: avatar skeleton */}
          <div className="bg-white border border-neutral-border rounded-4 py-7.5 px-6 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-neutral-200 animate-pulse mb-4" />
            <div className="h-6 w-36 bg-neutral-200 rounded-md animate-pulse mb-2" />
            <div className="h-4.5 w-48 bg-neutral-200 rounded-md animate-pulse mb-5" />
            <div className="h-7.5 w-32 bg-neutral-200 rounded-full animate-pulse" />
          </div>

          {/* right: forms skeleton */}
          <div className="flex flex-col gap-5">
            {/* Personal Info Card Skeleton */}
            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <div className="flex items-center justify-between gap-3 mb-4.5 pb-3 border-b border-neutral-border">
                <div className="h-5.5 w-32 bg-neutral-200 rounded-md animate-pulse" />
                <div className="h-8.5 w-16 bg-neutral-200 rounded-2.25 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="h-4.5 w-28 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-10.5 w-full bg-neutral-50 border border-neutral-border rounded-2.25 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Password Card Skeleton */}
            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <div className="h-5.5 w-32 bg-neutral-200 rounded-md animate-pulse mb-4.5 pb-3 border-b border-neutral-border" />
              <div className="flex flex-col gap-3.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="h-4.5 w-32 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-10.5 w-full bg-neutral-50 border border-neutral-border rounded-2.25 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-4.5">
                <div className="h-10.5 w-36 bg-neutral-200 rounded-2.25 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
