"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export function DosenFileUpload() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-brand-bg/30">
        Unggah File (Dosen)
      </div>
      <div className="p-6">
        <p className="text-[12.5px] text-neutral-muted mb-4">
          Unggah file revisi, referensi, atau dokumen lain untuk mahasiswa (Max 10MB).
        </p>
        <div
          className={`border-[1.5px] border-dashed rounded-2.5 p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200 cursor-pointer ${
            isDragging ? "border-brand bg-brand-bg" : "border-[#C7CCE0] bg-neutral-bg hover:bg-[#ECEEF7] hover:border-brand-light"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            alert(`File dropped: ${e.dataTransfer.files[0]?.name}`);
          }}
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Upload size={20} className="text-brand" />
          </div>
          <div className="text-center">
            <span className="text-[13.5px] font-bold text-brand">Pilih File</span>
            <span className="text-[13.5px] text-neutral-muted"> atau drag & drop ke sini</span>
          </div>
        </div>
      </div>
    </div>
  );
}
