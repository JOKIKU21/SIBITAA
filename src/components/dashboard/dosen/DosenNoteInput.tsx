"use client";

import { useState } from "react";
import Button from "@/components/Button";

export function DosenNoteInput({ initialNote = "" }: { initialNote?: string }) {
  const [note, setNote] = useState(initialNote);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Catatan berhasil disimpan!");
    }, 600);
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-brand-bg/30">
        Catatan Dosen
      </div>
      <div className="p-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tulis catatan, masukan, atau arahan untuk mahasiswa..."
          className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2 py-3 px-3.5 text-[13.5px] text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff] resize-y min-h-24 mb-4"
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="brand"
            size="custom"
            className="py-2.5 px-5 rounded-2.25 text-[13px]"
            isLoading={saving}
            onClick={handleSave}
          >
            Simpan Catatan
          </Button>
        </div>
      </div>
    </div>
  );
}
