// ponytail: Server Component — simple list display
import { Circle } from "lucide-react";

export function SubmissionDisplay({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: string }[];
}) {
  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-neutral-bg/50">
        {title}
      </div>
      <div className="p-6 flex flex-col gap-4">
        {data.length === 0 ? (
          <p className="text-[13px] text-neutral-muted">Belum ada data.</p>
        ) : (
          data.map((item, idx) => (
            <div key={idx} className="rounded-2.5 border border-neutral-border bg-neutral-bg p-4">
              <div className="mb-2 flex items-center gap-2 text-[13px] font-bold text-neutral-text">
                <Circle size={7} className="shrink-0 fill-brand-light text-brand-light" />
                {item.label}
              </div>
              <p className="text-[13px] text-neutral-text whitespace-pre-wrap leading-relaxed pl-4">
                {item.value}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
