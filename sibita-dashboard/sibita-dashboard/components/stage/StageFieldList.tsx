import { Circle, Upload, CheckSquare } from "lucide-react";
import type { StageField } from "@/lib/stages";

function FieldRow({ field }: { field: StageField }) {
  if (field.type === "readonly-list") {
    return (
      <div className="rounded-[10px] border border-neutral-border bg-white p-4">
        <div className="mb-2.5 text-[13px] font-bold text-neutral-text">
          {field.label}
        </div>
        <div className="flex flex-col gap-2">
          {field.items?.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-[8px] bg-neutral-bg px-3 py-2 text-[13px] text-neutral-text"
            >
              <CheckSquare size={15} className="flex-shrink-0 text-brand" />
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div className="rounded-[10px] border border-dashed border-neutral-border bg-white p-4">
        <div className="mb-2 flex items-center gap-2 text-[13px] font-bold text-neutral-text">
          <Upload size={15} className="text-brand" />
          {field.label}
        </div>
        <p className="text-[12.5px] text-neutral-muted">
          Belum ada dokumen diunggah untuk bagian ini.
        </p>
      </div>
    );
  }

  // text / textarea — ditampilkan sebagai info field read-only
  return (
    <div className="rounded-[10px] border border-neutral-border bg-white p-4">
      <div className="mb-1.5 flex items-center gap-2 text-[13px] font-bold text-neutral-text">
        <Circle size={7} className="flex-shrink-0 fill-brand-light text-brand-light" />
        {field.label}
      </div>
      <p className="text-[12.5px] text-neutral-muted">
        Belum diisi.
      </p>
    </div>
  );
}

export function StageFieldList({ fields }: { fields: StageField[] }) {
  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) => (
        <FieldRow key={field.label} field={field} />
      ))}
    </div>
  );
}
