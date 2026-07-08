"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

export interface FileDropzoneProps {
  label: React.ReactNode;
  subLabel?: string;
  onFileSelect?: (file: File) => void;
}

export default function FileDropzone({ label, subLabel, onFileSelect }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  return (
    <div className="mb-6 text-left">
      <label className="block text-[13px] font-semibold text-neutral-text mb-2">
        {label}
      </label>
      <div
        className={`border-[1.5px] border-dashed rounded-2.5 p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200 cursor-pointer relative overflow-hidden shadow-sm ${
          isDragging ? "border-brand bg-brand-bg" : "border-[#cbd5e1] bg-[#f8fafc] hover:bg-[#f1f5f9] hover:border-brand-light"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleSelect}
        />
        
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(43,59,175,0.06)]">
          <Upload size={20} className={fileName ? "text-success" : "text-brand"} />
        </div>
        <div className="text-center">
          <span className="text-[13.5px] font-bold text-neutral-text">
            {fileName ? (
              <span className="text-brand truncate max-w-xs inline-block align-bottom">{fileName}</span>
            ) : (
              <>
                <span className="text-brand">Pilih File</span> atau drag & drop
              </>
            )}
          </span>
          {subLabel && !fileName && (
            <p className="text-[12.5px] text-neutral-muted mt-1">{subLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
