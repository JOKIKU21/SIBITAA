// ponytail: Server Component — pure presentation

export function AdminStatCards({ stats }: { stats: { totalDosen: number; totalMahasiswa: number; totalBimbinganBerjalan: number; totalBimbingan: number } }) {
  const items = [
    {
      label: "Total Dosen",
      value: stats.totalDosen,
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
      label: "Total Mahasiswa",
      value: stats.totalMahasiswa,
      iconBg: "bg-success-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-success">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Bimbingan Berjalan",
      value: stats.totalBimbinganBerjalan,
      iconBg: "bg-warning-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-warning">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Total Bimbingan",
      value: stats.totalBimbingan,
      iconBg: "bg-success-bg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5 text-success">
          <path d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
          </div>
        </div>
      ))}
    </div>
  );
}

