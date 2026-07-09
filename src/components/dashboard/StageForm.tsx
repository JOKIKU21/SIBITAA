"use client";

import { useState, useEffect } from "react";
import type { Stage } from "@/lib/stages";
import { snakeToTitleCase, getStageMetadata } from "@/lib/stages";
import type { StageNote, StageFile } from "@/services/student";
import { useCreateNote, useUpdateNote, useCreateFile, useDeleteFile } from "@/hooks/useStudentBimbingan";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useToast } from "@/components/providers/ToastProvider";

interface StageFormProps {
  stage: Omit<Stage, "icon">;
  stageId?: string;
  existingNote?: StageNote;
  existingFiles?: StageFile[];
}

export function StageForm({ stage, stageId, existingNote, existingFiles = [] }: StageFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const toast = useToast();
  const createNoteMut = useCreateNote();
  const updateNoteMut = useUpdateNote();
  const createFileMut = useCreateFile();
  const deleteFileMut = useDeleteFile();

  const loading = createNoteMut.isPending || updateNoteMut.isPending;

  const metadata = getStageMetadata(stage.n);

  // Initialize form data from existing note in backend
  useEffect(() => {
    if (existingNote?.data) {
      setFormData(existingNote.data as Record<string, string>);
    } else {
      setFormData({});
    }
  }, [existingNote]);

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
        },
        onError: (err) => {
          toast.error("Gagal menyimpan data", {
            description: err instanceof Error ? err.message : undefined,
          });
        }
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !stageId) return;

    createFileMut.mutate({
      stageId,
      payload: {
        fileName: file.name,
        fileUrl: `https://storage.sibita.com/files/${Date.now()}_${encodeURIComponent(file.name)}`,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
      },
    }, {
      onSuccess: () => {
        toast.success("File berhasil diunggah!");
      },
      onError: (err) => {
        toast.error("Gagal mengunggah file", {
          description: err instanceof Error ? err.message : undefined,
        });
      }
    });
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

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border">
        {metadata.name}
      </div>
      <div className="py-5 px-6 pb-6">
        <form onSubmit={handleSubmit}>
          {otherFields.map((field, idx) => {
            const value = formData[field.key] || "";
            const label = snakeToTitleCase(field.key);
            return (
              <div key={idx} className="mb-4.5">
                <label className="block text-[13.5px] font-semibold mb-2 text-neutral-text">
                  {label} <span className="text-danger">*</span>
                </label>

                {field.type === "file" ? (
                  <div className="flex flex-col gap-3">
                    <label className="border-[1.5px] border-dashed border-[#C7CCE0] bg-neutral-bg rounded-2 py-7 px-3.5 text-center text-[13.5px] text-neutral-muted cursor-pointer transition-[background,border-color] duration-200 hover:bg-[#ECEEF7] hover:border-brand-light block">
                      Choose a file or drag & drop it here
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={createFileMut.isPending}
                      />
                    </label>

                    {createFileMut.isPending && (
                      <div className="text-[12.5px] text-neutral-muted italic">Mengunggah file...</div>
                    )}

                    {existingFiles.length > 0 && (
                      <div className="mt-2 flex flex-col gap-2">
                        {existingFiles.map((file) => (
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
                              onClick={() => handleDeleteFile(file.id)}
                              disabled={deleteFileMut.isPending}
                              className="text-danger hover:text-danger-dark text-[12px] font-semibold bg-transparent border-none cursor-pointer disabled:opacity-50"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full bg-neutral-bg border-[1.5px] border-transparent rounded-2 py-3 px-3.5 text-3.5 text-neutral-text outline-none font-sans transition-[border-color,background] duration-200 focus:border-brand-light focus:bg-[#f8f9ff] resize-y min-h-20"
                    placeholder={`Masukkan ${label}`}
                    required
                  />
                ) : (
                  <Input
                    type="text"
                    variant="default"
                    value={value}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={`Masukkan ${label}`}
                    required
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
              onClick={() => {
                if (existingNote?.data) {
                  setFormData(existingNote.data as Record<string, string>);
                } else {
                  setFormData({});
                }
              }}
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
              Simpan Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
