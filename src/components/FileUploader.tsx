"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  Loader2, 
  File,
  AlertCircle,
  FileVideo,
  FileAudio,
  Image as ImageIcon
} from "lucide-react";

export interface UploadedFile {
  id: string;
  fileName: string;
  fileUrl?: string;
  fileSize?: number;
  uploadedById?: string;
  studentId?: string;
}

export interface FileUploaderProps {
  id?: string;
  label?: React.ReactNode;
  subLabel?: string;
  accept?: string;
  disabled?: boolean;
  isLoading?: boolean;
  files?: UploadedFile[];
  onFileSelect?: (file: File) => void;
  onDeleteFile?: (fileId: string) => void;
  isDeleting?: boolean;
  maxSizeMB?: number;
  hideDropzone?: boolean;
}

/**
 * Reusable and highly interactive FileUploader component
 * with beautiful micro-animations, drag & drop support,
 * visual upload status, and automatic file list rendering.
 */
export default function FileUploader({
  id = "file-uploader",
  label,
  subLabel,
  accept = ".pdf,.docx,.png,.jpg,.jpeg,.mp4,.mp3,.m4a",
  disabled = false,
  isLoading = false,
  files = [],
  onFileSelect,
  onDeleteFile,
  isDeleting = false,
  maxSizeMB = 10,
  hideDropzone = false,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Helper to get corresponding file icon
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    
    if (ext === "pdf") {
      return <FileText className="w-5 h-5 text-danger shrink-0" />;
    }
    if (ext === "docx") {
      return <FileText className="w-5 h-5 text-brand-light shrink-0" />;
    }
    if (ext === "mp4") {
      return <FileVideo className="w-5 h-5 text-success shrink-0" />;
    }
    if (["mp3", "m4a", "wav", "aac", "ogg"].includes(ext)) {
      return <FileAudio className="w-5 h-5 text-purple-500 shrink-0" />;
    }
    if (["png", "jpg", "jpeg", "webp"].includes(ext)) {
      return <ImageIcon className="w-5 h-5 text-warning shrink-0" />;
    }
    return <File className="w-5 h-5 text-brand shrink-0" />;
  };

  // Process file selection and validate size/type
  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrorMessage(`Ukuran file melebihi batas maksimum ${maxSizeMB}MB.`);
      return;
    }

    // System-wide allowed formats: docx, pdf, mp4, mp3, m4a, png, jpg, jpeg, webp
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const allowedExtensions = ["docx", "pdf", "mp4", "mp3", "m4a", "wav", "aac", "ogg", "png", "jpg", "jpeg", "webp"];
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage("Format file tidak didukung. Hanya file PDF, DOCX, PNG, JPG, JPEG, MP4, MP3, dan M4A yang diperbolehkan.");
      return;
    }

    // Validate accept type if provided
    if (accept) {
      const acceptedTypes = accept.split(",").map(t => t.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileExtensionWithDot = `.${fileExtension}`;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith(".")) {
          return fileExtensionWithDot === type;
        }
        if (type.endsWith("/*")) {
          const prefix = type.replace("/*", "");
          return fileType.startsWith(prefix);
        }
        return fileType === type;
      });

      if (!isAccepted) {
        setErrorMessage(`Format file tidak didukung. Harap unggah format: ${accept}`);
        return;
      }
    }

    onFileSelect?.(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled || isLoading) return;
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || isLoading) return;
    
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full text-left font-sans">
      {label && (
        <label className="block text-[13.5px] font-semibold text-neutral-text mb-2">
          {label}
        </label>
      )}

      {/* Main Drag-and-Drop Area */}
      {!hideDropzone && (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Unggah atau seret berkas di sini"
          className={`border-2 border-dashed rounded-3 p-7 flex flex-col items-center justify-center gap-3.5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
            disabled 
              ? "border-neutral-border bg-neutral-bg/30 cursor-not-allowed opacity-60" 
              : isDragging
                ? "border-brand bg-brand-bg scale-[1.01] shadow-[0_4px_16px_rgba(43,59,175,0.08)]"
                : "border-[#C7CCE0] bg-neutral-bg/20 hover:bg-neutral-bg/50 hover:border-brand-light"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && !isLoading && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled && !isLoading) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          {/* Hidden File Input */}
          <input
            id={id}
            type="file"
            ref={fileInputRef}
            accept={accept}
            disabled={disabled || isLoading}
            className="hidden"
            onChange={handleInputChange}
          />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="w-7 h-7 text-brand animate-spin" />
            <span className="text-[12.5px] font-semibold text-neutral-text animate-pulse">
              Mengunggah file...
            </span>
          </div>
        )}

        {/* Upload Icon/Circle */}
        <div className={`w-11.5 h-11.5 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(43,59,175,0.06)] transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}>
          <Upload size={18} className={isDragging ? "text-brand-light animate-bounce" : "text-brand"} />
        </div>

        {/* Labels & Instructions */}
        <div className="text-center">
          <span className="text-[13.5px] font-bold text-neutral-text block mb-1">
            <span className="text-brand hover:underline">Pilih File</span> atau drag & drop ke sini
          </span>
          {subLabel && (
            <p className="text-[11.5px] text-neutral-muted">{subLabel}</p>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-2.5 flex items-center gap-1.5 bg-danger-bg/40 border border-danger/25 rounded-2 p-3 text-[12.5px] text-danger font-medium animate-[fadeIn_0.2s_ease]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2.5">
          {files.map((file) => (
            <div
              key={file.id}
              className="group flex items-center justify-between bg-white border border-neutral-border rounded-2.5 p-3 hover:border-brand-light/40 hover:shadow-[0_2px_8px_rgba(43,59,175,0.04)] transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                {getFileIcon(file.fileName)}
                <div className="min-w-0">
                  {file.fileUrl && file.fileUrl !== "#" ? (
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-semibold text-brand hover:underline block truncate max-w-60"
                      title={file.fileName}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {file.fileName}
                    </a>
                  ) : (
                    <span className="text-[13px] font-semibold text-neutral-text block truncate max-w-60" title={file.fileName}>
                      {file.fileName}
                    </span>
                  )}
                  <span className="text-[11px] text-neutral-muted block mt-0.5">
                    {formatFileSize(file.fileSize)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 shrink-0">
                {file.fileUrl && file.fileUrl !== "#" && (
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark text-[12.5px] font-bold bg-neutral-bg border border-neutral-border py-1.25 px-3 rounded-1.5 cursor-pointer hover:bg-white transition-all shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Lihat
                  </a>
                )}
                {onDeleteFile && (
                  <button
                    type="button"
                    disabled={disabled || isDeleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(file.id);
                    }}
                    className="text-danger hover:text-danger-dark text-[12.5px] font-bold bg-transparent border-none cursor-pointer disabled:opacity-50 shrink-0"
                    title="Hapus file"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4.5 h-4.5 animate-spin text-danger" />
                    ) : (
                      "Hapus"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
