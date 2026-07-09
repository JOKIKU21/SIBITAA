"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import type { StageFile } from "@/services/student";

interface DosenFileUploadProps {
  existingFiles?: StageFile[];
}

export function DosenFileUpload({ existingFiles = [] }: DosenFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<StageFile[]>(existingFiles);

  // Synchronise files with prop when it loads/changes
  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  const handleUpload = (file: File) => {
    const newFile: StageFile = {
      id: Math.random().toString(),
      studentId: "",
      stageId: "",
      fileName: file.name,
      fileUrl: "#",
      fileSize: file.size,
      type: "lecturer",
      createdAt: new Date().toISOString(),
    };
    setFiles((prev) => [...prev, newFile]);
    alert(`File berhasil diunggah: ${file.name}`);
  };

  const handleDelete = (fileId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus file lampiran ini?")) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      alert("File berhasil dihapus!");
    }
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-brand-bg/30">
        Unggah File (Dosen)
      </div>
      <div className="p-6">
        <p className="text-[12.5px] text-neutral-muted mb-4">
          Unggah file revisi, referensi, atau dokumen lain untuk mahasiswa (Max 10MB).
        </p>
        <label
          className={`border-[1.5px] border-dashed rounded-2.5 p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-200 cursor-pointer ${
            isDragging ? "border-brand bg-brand-bg" : "border-[#C7CCE0] bg-neutral-bg hover:bg-[#ECEEF7] hover:border-brand-light"
          } block`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) {
              handleUpload(file);
            }
          }}
        >
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleUpload(file);
              }
            }}
          />
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mx-auto">
            <Upload size={20} className="text-brand" />
          </div>
          <div className="text-center">
            <span className="text-[13.5px] font-bold text-brand">Pilih File</span>
            <span className="text-[13.5px] text-neutral-muted"> atau drag & drop ke sini</span>
          </div>
        </label>

        {/* List of uploaded files */}
        {files.length > 0 && (
          <div className="mt-4.5 flex flex-col gap-2">
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider mb-1">
              File Lampiran Anda:
            </div>
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-neutral-bg border border-neutral-border rounded-2 p-3"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-brand shrink-0">
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="min-w-0">
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-semibold text-brand hover:underline block truncate max-w-60"
                    >
                      {file.fileName}
                    </a>
                    <span className="text-[11px] text-neutral-muted block">
                      {file.fileSize
                        ? (file.fileSize / 1024).toFixed(1) + " KB"
                        : "Unknown size"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(file.id)}
                  className="text-danger hover:text-danger-dark text-[12px] font-semibold bg-transparent border-none cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
