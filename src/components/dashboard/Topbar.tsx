import Button from "@/components/Button";

export function Topbar({ title }: { title: string }) {
  return (
    <div className="bg-white border-b border-neutral-border px-7 py-0 h-16 flex items-center justify-between sticky top-0 z-10">
      <span className="font-display text-[17px] font-extrabold text-neutral-text">{title}</span>
      <div className="flex items-center gap-3">
        <Button
          variant="brand-bg"
          size="custom"
          className="w-9 h-9 rounded-2.25 p-0 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#2B3BAF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Button>
        <div className="w-8.5 h-8.5 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-[13px] font-bold text-white cursor-pointer overflow-hidden">T</div>
      </div>
    </div>
  );
}
