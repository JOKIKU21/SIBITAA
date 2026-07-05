"use client";

import { useState } from "react";
import type { Stage } from "@/lib/stages";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border">
        {stage.name}
      </div>
      <div className="py-5 px-6 pb-6">
        <form onSubmit={handleSubmit}>
          {otherFields.map((field, idx) => {
            return (
              <div key={idx} className="mb-4.5">
                <label className="block text-[13.5px] font-semibold mb-2 text-neutral-text">
                  {field.label} <span className="text-danger">*</span>
                </label>

                {field.type === "file" ? (
                  <div className="border-[1.5px] border-dashed border-[#C7CCE0] bg-neutral-bg rounded-2 py-7 px-3.5 text-center text-[13.5px] text-neutral-muted cursor-pointer transition-[background,border-color] duration-200 hover:bg-[#ECEEF7] hover:border-brand-light">
                    Choose a file or drag & drop it here
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2 py-3 px-3.5 text-3.5 text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff] resize-y min-h-20" />
                ) : (
                  <Input
                    type="text"
                    variant="default"
                  />
                )}
              </div>
            );
          })}

          <div className="flex gap-3 mt-5.5">
            <Button
              type="button"
              variant="outline"
              size="custom"
              className="flex-1 p-3 rounded-2.25"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="custom"
              className="flex-1 p-3 rounded-2.25"
              isLoading={loading}
            >
              Selesai
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
