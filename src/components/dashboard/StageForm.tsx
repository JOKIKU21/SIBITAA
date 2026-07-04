"use client";

import { useState } from "react";
import type { Stage } from "@/lib/stages";

export function StageForm({ stage }: { stage: Omit<Stage, "icon"> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Tersimpan!");
    }, 600);
  };

  const otherFields = stage.fields.filter((f) => f.type !== "readonly-list");

  return (
    <div className="bg-white rounded-[14px] border border-neutral-border overflow-hidden mb-[20px] flex flex-col">
      <div className="py-[18px] px-[24px] font-display text-[16px] font-extrabold border-b border-neutral-border">
        {stage.name}
      </div>
      <div className="py-[20px] px-[24px] pb-[24px]">
        <form onSubmit={handleSubmit}>
          {otherFields.map((field, idx) => {
            return (
              <div key={idx} className="mb-[18px]">
                <label className="block text-[13.5px] font-semibold mb-[8px] text-neutral-text">
                  {field.label} <span className="text-danger">*</span>
                </label>

                {field.type === "file" ? (
                  <div className="border-[1.5px] border-dashed border-[#C7CCE0] bg-neutral-bg rounded-[8px] py-[28px] px-[14px] text-center text-[13.5px] text-neutral-muted cursor-pointer transition-[background,border-color] duration-200 hover:bg-[#ECEEF7] hover:border-brand-light">
                    Choose a file or drag & drop it here
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-[8px] py-[12px] px-[14px] text-[14px] text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff] resize-y min-h-[80px]" />
                ) : (
                  <input
                    type="text"
                    className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-[8px] py-[12px] px-[14px] text-[14px] text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff]"
                  />
                )}
              </div>
            );
          })}

          <div className="flex gap-[12px] mt-[22px]">
            <button
              type="button"
              className="flex-1 bg-white border-[1.5px] border-brand text-brand font-bold text-[14px] p-[12px] rounded-[9px] cursor-pointer transition-[background] duration-200 hover:bg-[#f0f3ff]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-brand border-none text-white font-bold text-[14px] p-[12px] rounded-[9px] cursor-pointer transition-[background] duration-200 hover:bg-brand-dark disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Selesai"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
