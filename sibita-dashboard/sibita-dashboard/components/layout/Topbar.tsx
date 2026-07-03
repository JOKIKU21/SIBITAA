import { Bell } from "lucide-react";

export function Topbar({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-border bg-white px-7">
      <span className="font-display text-[17px] font-extrabold text-neutral-text">
        {title}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-brand-bg"
          aria-label="Notifikasi"
        >
          <Bell size={18} className="text-brand" />
        </button>
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-brand-light text-[13px] font-bold text-white">
          T
        </div>
      </div>
    </div>
  );
}
