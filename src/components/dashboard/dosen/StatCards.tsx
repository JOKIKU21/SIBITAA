// ponytail: Server Component — pure presentation, no 'use client'

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  subtitle?: string;
}

export function StatCards({ stats }: { stats: { total: number; selesai: number; mendekatTenggat: number; terlambat: number } }) {
  const items: StatItem[] = [
    {
      label: "Mahasiswa Bimbingan",
      value: stats.total,
      iconBg: "bg-brand-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-brand">
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-1a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Mendekati Tenggat",
      value: stats.mendekatTenggat,
      iconBg: "bg-warning-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-warning">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Terlambat / Tidak Aktif",
      value: stats.terlambat,
      iconBg: "bg-danger-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-danger">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white border border-neutral-border rounded-3.5 py-5 px-5 flex items-center gap-4 transition-shadow duration-200 hover:shadow-[0_4px_18px_rgba(43,59,175,0.08)]"
        >
          <div className={`w-12 h-12 rounded-3 ${item.iconBg} flex items-center justify-center shrink-0`}>
            {item.icon}
          </div>
          <div>
            <div className="font-display text-6 font-extrabold text-neutral-text leading-none mb-1">{item.value}</div>
            <div className="text-[12.5px] text-neutral-muted font-medium">{item.label}</div>
            {item.subtitle ? (
              <div className="text-[11px] text-success font-semibold mt-0.5">{item.subtitle}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
