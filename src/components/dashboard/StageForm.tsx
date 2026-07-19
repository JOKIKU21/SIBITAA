"use client";

import { useState, useEffect } from "react";
import type { Stage } from "@/lib/stages";
import { snakeToTitleCase } from "@/lib/stages";
import type { StageNote, StageFile } from "@/services/student";
import { useCreateNote, useUpdateNote, useCreateFile, useDeleteFile } from "@/hooks/useStudent";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useToast } from "@/components/providers/ToastProvider";
import FileUploader from "@/components/FileUploader";
import { apiUpload } from "@/lib/api-client";

interface StageFormProps {
  stage: Omit<Stage, "icon">;
  stageId?: string;
  existingNote?: StageNote;
  existingFiles?: StageFile[];
  readOnly?: boolean;
  stageName?: string;
}

export function StageForm({
  stage,
  stageId,
  existingNote,
  existingFiles = [],
  readOnly = false,
  stageName,
}: StageFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const toast = useToast();
  const createNoteMut = useCreateNote();
  const updateNoteMut = useUpdateNote();
  const createFileMut = useCreateFile();
  const deleteFileMut = useDeleteFile();
  const [isUploading, setIsUploading] = useState(false);

  // Filter student and lecturer files at the top
  const studentFiles = existingFiles.filter((file) => file.uploadedById === file.studentId);
  const lecturerFiles = existingFiles.filter((file) => file.uploadedById !== file.studentId);

  const loading = createNoteMut.isPending || updateNoteMut.isPending;

  const name = stageName ?? `Tahap ${stage.n}`;

  // Check if student has inputted any form note data or uploaded files
  const hasExistingData = (() => {
    const hasNoteData = !!existingNote?.data && Object.values(existingNote.data).some(
      (val) => val !== undefined && val !== null && String(val).trim() !== ""
    );
    const hasFiles = studentFiles.length > 0;
    return hasNoteData || hasFiles;
  })();

  const [isEditing, setIsEditing] = useState(!hasExistingData);

  // Initialize form data and auto-toggle isEditing based on data presence
  useEffect(() => {
    const hasNoteData = !!existingNote?.data && Object.values(existingNote.data).some(
      (val) => val !== undefined && val !== null && String(val).trim() !== ""
    );
    const hasFiles = existingFiles.some((file) => file.uploadedById === file.studentId);
    const hasAnyData = hasNoteData || hasFiles;

    if (existingNote?.data) {
      setFormData(existingNote.data as Record<string, string>);
    } else {
      setFormData({});
    }
    
    setIsEditing(!hasAnyData);
  }, [existingNote, existingFiles]);

  const handleInputChange = (fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageId) return;

    if (existingNote) {
      updateNoteMut.mutate({
        stageId,
        noteId: existingNote.id,
        payload: { data: formData },
      }, {
        onSuccess: () => {
          toast.success("Data berhasil diperbarui!");
          setIsEditing(false);
        },
        onError: (err) => {
          toast.error("Gagal memperbarui data", {
            description: err instanceof Error ? err.message : undefined,
          });
        }
      });
    } else {
      createNoteMut.mutate({
        stageId,
        data: formData,
      }, {
        onSuccess: () => {
          toast.success("Data berhasil disimpan!");
          setIsEditing(false);
        },
        onError: (err) => {
          toast.error("Gagal menyimpan data", {
            description: err instanceof Error ? err.message : undefined,
          });
        }
      });
    }
  };

  const handleUploadFile = async (file: File) => {
    if (!file || !stageId) return;

    setIsUploading(true);
    try {
      const uploadRes = await apiUpload(file, "stages");

      createFileMut.mutate({
        stageId,
        payload: {
          fileName: uploadRes.fileName,
          fileUrl: uploadRes.fileUrl,
          fileType: uploadRes.fileType,
          fileSize: uploadRes.fileSize,
        },
      }, {
        onSuccess: () => {
          toast.success("File berhasil diunggah!");
        },
        onError: (err) => {
          toast.error("Gagal menyimpan metadata file", {
            description: err instanceof Error ? err.message : undefined,
          });
        }
      });
    } catch (err: any) {
      toast.error("Gagal mengunggah file", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah file.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (!stageId) return;
    if (confirm("Apakah Anda yakin ingin menghapus file ini?")) {
      deleteFileMut.mutate({
        stageId,
        fileId,
      }, {
        onSuccess: () => {
          toast.success("File berhasil dihapus!");
        },
        onError: (err) => {
          toast.error("Gagal menghapus file", {
            description: err instanceof Error ? err.message : undefined,
          });
        }
      });
    }
  };

  const otherFields = stage.fields.filter((f) => f.type !== "readonly-list");

  const isFormDisabled = readOnly || !isEditing;
  const hasLecturerFeedback = !!(existingNote?.comment || lecturerFiles.length > 0);

  return (
    <>
      <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col">
        <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border">
          {name}
        </div>
        <div className="py-5 px-6 pb-6">
          <form onSubmit={handleSubmit}>
            {otherFields.map((field, idx) => {
              const value = formData[field.key] || "";
              const label = snakeToTitleCase(field.key);
              return (
                <div key={idx} className="mb-4.5">
                  <label className="block text-[13.5px] font-semibold mb-2 text-neutral-text">
                    {label} {!isFormDisabled && <span className="text-danger">*</span>}
                  </label>

                  {field.type === "file" ? (
                    <div className="flex flex-col gap-3">
                      <FileUploader
                        id={`stage-file-${field.key}`}
                        subLabel="Unggah file bimbingan (Format PDF, DOCX, MP4, maksimal 10MB)"
                        accept=".pdf,.docx,.mp4"
                        disabled={isFormDisabled}
                        hideDropzone={isFormDisabled}
                        isLoading={createFileMut.isPending || isUploading}
                        files={studentFiles}
                        onFileSelect={handleUploadFile}
                        onDeleteFile={handleDeleteFile}
                        isDeleting={deleteFileMut.isPending}
                        maxSizeMB={10}
                      />
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2 py-3 px-3.5 text-3.5 text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff] resize-y min-h-20 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder={isFormDisabled ? "-" : `Masukkan ${label}`}
                      required={!isFormDisabled}
                      disabled={isFormDisabled}
                      readOnly={isFormDisabled}
                    />
                  ) : (
                    <Input
                      type="text"
                      variant="default"
                      value={value}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={isFormDisabled ? "-" : `Masukkan ${label}`}
                      required={!isFormDisabled}
                      disabled={isFormDisabled}
                      readOnly={isFormDisabled}
                    />
                  )}
                </div>
              );
            })}

            {!readOnly && (
              <div className="flex gap-3 mt-5.5">
                {!isEditing ? (
                  <Button
                    type="button"
                    variant="brand"
                    size="custom"
                    className="flex-1 p-3 rounded-2.25 font-bold transition-all duration-200"
                    onClick={() => setIsEditing(true)}
                  >
                    Ubah Data
                  </Button>
                ) : (
                  <>
                    {hasExistingData && (
                      <Button
                        type="button"
                        variant="outline"
                        size="custom"
                        className="flex-1 p-3 rounded-2.25 font-bold text-neutral-muted hover:text-neutral-text transition-all duration-200"
                        onClick={() => {
                          if (existingNote?.data) {
                            setFormData(existingNote.data as Record<string, string>);
                          } else {
                            setFormData({});
                          }
                          setIsEditing(false);
                        }}
                      >
                        Batal
                      </Button>
                    )}
                    <Button
                      type="submit"
                      variant="brand"
                      size="custom"
                      className="flex-1 p-3 rounded-2.25 font-bold transition-all duration-200"
                      isLoading={loading}
                    >
                      Simpan Data
                    </Button>
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {hasLecturerFeedback && (
        <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col shadow-xs">
          <div className="py-4 px-6 font-display text-[15px] font-extrabold border-b border-neutral-border bg-neutral-bg flex items-center gap-2 text-brand">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-brand shrink-0">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Catatan & Feedback Dosen Pembimbing
          </div>
          <div className="py-5 px-6 flex flex-col gap-4">
            {existingNote?.comment && (
              <div className="bg-brand-bg/40 border border-brand/10 rounded-2.5 p-4 text-[13.5px] leading-relaxed text-neutral-text">
                <div className="font-semibold text-brand text-[12.5px] mb-1.5 flex items-center gap-1">
                  <span>Catatan Dosen:</span>
                  {existingNote.status === "approved" && (
                    <span className="bg-success/15 text-success font-bold text-[10.5px] px-2 py-0.5 rounded-full uppercase tracking-wider ml-2">
                      Disetujui ✓
                    </span>
                  )}
                  {existingNote.status === "rejected" && (
                    <span className="bg-danger/15 text-danger font-bold text-[10.5px] px-2 py-0.5 rounded-full uppercase tracking-wider ml-2">
                      Ditolak ✗
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-line font-medium">{existingNote.comment}</p>
              </div>
            )}

            {lecturerFiles.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-[12.5px] font-bold text-neutral-muted uppercase tracking-wider">
                  File Lampiran dari Dosen:
                </div>
                <div className="grid gap-2">
                  {lecturerFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-neutral-bg border border-neutral-border rounded-2 p-3 hover:border-brand/35 transition-all"
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
                            className="text-[13px] font-bold text-brand hover:underline block truncate max-w-xs md:max-w-md"
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
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-dark text-[12px] font-bold bg-neutral-bg border border-neutral-border py-1.5 px-3 rounded-1.5 cursor-pointer hover:bg-white transition-all"
                        >
                          Lihat
                        </a>
                        <a
                          href={file.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-dark text-[12px] font-bold bg-neutral-bg border border-neutral-border py-1.5 px-3 rounded-1.5 cursor-pointer hover:bg-white transition-all"
                        >
                          Unduh
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
