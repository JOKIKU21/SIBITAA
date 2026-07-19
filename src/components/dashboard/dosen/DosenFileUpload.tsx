"use client";

import { useState, useEffect } from "react";
import type { StageFile } from "@/services/student";
import FileUploader from "@/components/FileUploader";
import { apiUpload } from "@/lib/api-client";
import { useToast } from "@/components/providers/ToastProvider";

interface DosenFileUploadProps {
  existingFiles?: StageFile[];
  studentId?: string;
  stageId?: string;
  readOnly?: boolean;
}

export function DosenFileUpload({ existingFiles = [], studentId, stageId, readOnly = false }: DosenFileUploadProps) {
  const [files, setFiles] = useState<StageFile[]>(existingFiles);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  // Synchronise files with prop when it loads/changes
  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadRes = await apiUpload(file, "stages");
      const newFile: StageFile = {
        id: Math.random().toString(),
        studentId: studentId || "",
        stageOrder: stageId ? parseInt(stageId, 10) : 0,
        uploadedById: "lecturer",
        fileName: uploadRes.fileName,
        fileUrl: uploadRes.fileUrl,
        fileType: uploadRes.fileType || file.type || "application/octet-stream",
        fileSize: uploadRes.fileSize || file.size,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setFiles((prev) => [...prev, newFile]);
      toast.success(`File berhasil diunggah: ${file.name}`);
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengunggah file", {
        description: err.message || "Terjadi kesalahan.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (fileId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus file lampiran ini?")) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      toast.success("File berhasil dihapus!");
    }
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border bg-brand-bg/30">
        Unggah File (Dosen)
      </div>
      <div className="p-6">
        <FileUploader
          id="dosen-file-uploader"
          subLabel={readOnly ? "Tahapan telah disetujui. Unggah file tidak tersedia." : "Unggah file revisi, referensi, atau dokumen lain untuk mahasiswa (Format PDF, DOCX, MP4, Max 10MB)."}
          accept=".pdf,.docx,.mp4"
          files={files}
          onFileSelect={handleUpload}
          onDeleteFile={handleDelete}
          isLoading={isUploading}
          maxSizeMB={10}
          disabled={readOnly}
          hideDropzone={readOnly}
        />
      </div>
    </div>
  );
}


