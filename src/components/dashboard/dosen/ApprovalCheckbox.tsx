"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Check } from "lucide-react";

export function ApprovalCheckbox({ initialApproved = false }: { initialApproved?: boolean }) {
  const [approved, setApproved] = useState(initialApproved);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(approved ? "Tahapan berhasil disetujui!" : "Persetujuan dibatalkan.");
    }, 600);
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border p-6 flex items-center justify-between">
      <label className="flex items-center gap-3 cursor-pointer group select-none">
        <div className={`w-6 h-6 rounded-1 flex items-center justify-center border-2 transition-colors ${
          approved ? "bg-success border-success" : "bg-transparent border-neutral-border group-hover:border-success/50"
        }`}>
          {approved && <Check size={16} className="text-white" />}
        </div>
        <span className={`text-[14px] font-bold transition-colors ${approved ? "text-success" : "text-neutral-text"}`}>
          {approved ? "Tahapan Disetujui ✓" : "Setujui Tahapan Ini"}
        </span>
      </label>
      <Button
        variant={approved ? "outline" : "brand"}
        size="custom"
        className={`py-2 px-4 rounded-2 text-[12.5px] ${approved ? "text-neutral-muted border-neutral-border" : ""}`}
        onClick={() => {
          setApproved(!approved);
          handleSave(); // auto-save on toggle for better UX
        }}
        isLoading={saving}
      >
        {approved ? "Batalkan" : "Approve & Simpan"}
      </Button>
    </div>
  );
}
