"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  useReferenceFiles, 
  useCreateReferenceFile, 
  useDeleteReferenceFile 
} from "@/hooks/useReferenceFiles";
import { useDebounce } from "@/hooks/useDebounce";
import FileUploader from "@/components/FileUploader";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { apiUpload } from "@/lib/api-client";
import { useToast } from "@/components/providers/ToastProvider";

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const CATEGORIES = [
  { key: "guideline", label: "Panduan" },
  { key: "journal", label: "Jurnal" },
  { key: "book", label: "Buku" },
  { key: "template", label: "Templat" },
  { key: "example", label: "Contoh" },
];

export function ReferensiManager() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [typeFilter, setTypeFilter] = useState("All");

  const { data, isLoading, error, refetch } = useReferenceFiles(
    typeFilter === "All" ? undefined : typeFilter,
    debouncedSearch
  );
  const createRefMut = useCreateReferenceFile();
  const deleteRefMut = useDeleteReferenceFile();
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("guideline");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const referenceFiles = useMemo(() => data?.referenceFiles || [], [data]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalCount = referenceFiles.length;
    const totalBytes = referenceFiles.reduce((acc, f) => acc + (f.fileSize || 0), 0);
    const guidelines = referenceFiles.filter((f) => f.type.toLowerCase() === "guideline" || f.type.toLowerCase() === "template").length;
    return {
      totalCount,
      totalSize: formatFileSize(totalBytes),
      guidelinesCount: guidelines,
    };
  }, [referenceFiles]);

  async function handleUpload() {
    if (!judul.trim() || !deskripsi.trim() || !selectedFile) {
      toast.warning("Lengkapi judul, deskripsi, dan pilih berkas dokumen yang wajib diisi.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload binary file to VPS via POST /api/upload
      const uploadRes = await apiUpload(selectedFile, "references");

      // 2. Persist metadata to database via POST /api/reference-files
      await createRefMut.mutateAsync({
        title: judul,
        description: deskripsi,
        type: kategori,
        fileName: uploadRes.fileName,
        fileUrl: uploadRes.fileUrl,
        fileType: uploadRes.fileType,
        fileSize: uploadRes.fileSize,
        author: "Admin SIBITA",
      });

      setJudul("");
      setDeskripsi("");
      setSelectedFile(null);
      setKategori("guideline");
      toast.success("Dokumen referensi berhasil diunggah!");
    } catch (err: any) {
      toast.error("Gagal mengunggah referensi", {
        description: err.message || "Terjadi kesalahan sistem.",
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus referensi ini secara permanen?")) {
      try {
        await deleteRefMut.mutateAsync(id);
        toast.success("Dokumen referensi berhasil dihapus!");
      } catch (err: any) {
        toast.error("Gagal menghapus referensi", {
          description: err.message || "Terjadi kesalahan.",
        });
      }
    }
  }

  function handleBatal() {
    setJudul("");
    setDeskripsi("");
    setSelectedFile(null);
    setKategori("guideline");
  }

  return (
    <div className="block">
      {/* Admin Stats Overview */}
      <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1 mb-6">
        <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-3 bg-brand-bg text-brand flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Total Dokumen</div>
            <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.totalCount} Referensi</div>
          </div>
        </div>

        <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-3 bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Panduan & Format</div>
            <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.guidelinesCount} Berkas</div>
          </div>
        </div>

        <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-3 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Total Ukuran Berkas</div>
            <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.totalSize}</div>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-[1.1fr_1fr] gap-6 items-start max-[1024px]:grid-cols-1">
        {/* Upload Form Panel */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-neutral-border/60">
            <div className="w-8 h-8 rounded-2 bg-brand-bg text-brand flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-[16px] font-extrabold text-neutral-text">Unggah Referensi Baru</h3>
              <p className="text-[12px] text-neutral-muted">Tambahkan dokumen panduan, buku, atau contoh untuk mahasiswa.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-neutral-text">
                Judul Referensi <span className="text-danger">*</span>
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Contoh: Pedoman Penulisan Skripsi 2026"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="bg-neutral-bg/50 h-10.5 rounded-2.5 text-[13px]"
              />
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <label className="text-[13px] font-bold text-neutral-text">
                Kategori Dokumen <span className="text-danger">*</span>
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full bg-neutral-bg/50 border border-neutral-border rounded-2.5 h-10.5 px-3.5 text-[13px] outline-none font-sans focus:ring-2 focus:ring-brand-light cursor-pointer font-medium text-neutral-text"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-neutral-text">
                Deskripsi Singkat <span className="text-danger">*</span>
              </label>
              <textarea
                className="w-full bg-neutral-bg/50 border border-neutral-border rounded-2.5 p-3 text-[13px] outline-none transition-all duration-200 font-sans focus:ring-2 focus:ring-brand-light resize-y min-h-20"
                rows={3}
                placeholder="Jelaskan ringkasan materi atau tujuan dokumen ini..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <FileUploader
                id="referensi-file-uploader"
                label={<span>Berkas Dokumen <span className="text-danger">*</span></span>}
                subLabel="PDF, DOCX, MP4 (maksimal 20MB)"
                accept=".pdf,.docx,.mp4"
                files={selectedFile ? [{ id: "temp-selected", fileName: selectedFile.name, fileSize: selectedFile.size }] : []}
                onFileSelect={(file) => setSelectedFile(file)}
                onDeleteFile={() => setSelectedFile(null)}
                isLoading={isUploading || createRefMut.isPending}
                maxSizeMB={20}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-neutral-border/60">
            <Button
              type="button"
              variant="outline-neutral"
              size="sm"
              onClick={handleBatal}
              className="py-2.25 px-4.5 rounded-2 text-[12.5px]"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="brand"
              size="sm"
              onClick={handleUpload}
              disabled={isUploading || createRefMut.isPending || !judul.trim() || !deskripsi.trim() || !selectedFile}
              isLoading={isUploading || createRefMut.isPending}
              className="py-2.25 px-5.5 rounded-2 text-[12.5px] shadow-sm"
              leftIcon={
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              Simpan & Unggah
            </Button>
          </div>
        </div>

        {/* Existing References List Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[16px] font-extrabold text-neutral-text">Dokumen Tersedia</h3>
            <span className="text-[12px] font-bold text-neutral-muted bg-white border border-neutral-border py-1 px-3 rounded-full">
              {referenceFiles.length} Dokumen
            </span>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-2 max-[600px]:flex-col">
            <Input
              variant="bordered"
              type="text"
              placeholder="Cari judul/deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-neutral-muted" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
              wrapperClassName="flex-1"
              className="bg-white h-9.5 py-0 rounded-2 text-[12.5px]"
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-neutral-border rounded-2 py-1.5 px-3 text-[12.5px] outline-none font-sans focus:ring-2 focus:ring-brand-light cursor-pointer font-semibold text-neutral-text shrink-0"
            >
              <option value="All">Semua Kategori</option>
              <option value="guideline">Panduan</option>
              <option value="journal">Jurnal</option>
              <option value="book">Buku</option>
              <option value="template">Templat</option>
              <option value="example">Contoh</option>
            </select>
          </div>

          {/* Referensi Cards List */}
          <div className="flex flex-col gap-3">
            {isLoading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-neutral-border rounded-3 p-4 animate-pulse space-y-2 shadow-xs">
                  <div className="h-4 bg-neutral-100 rounded w-3/4" />
                  <div className="h-3 bg-neutral-50 rounded w-full" />
                  <div className="h-3 bg-neutral-50 rounded w-1/2" />
                </div>
              ))
            ) : error ? (
              <div className="text-center py-8 text-danger bg-danger/5 rounded-3.5 border border-danger/15 p-4">
                <p className="text-[13px] font-bold mb-2">Gagal memuat dokumen referensi.</p>
                <Button variant="danger-light" size="sm" onClick={() => refetch()} className="mx-auto">
                  Coba Lagi
                </Button>
              </div>
            ) : referenceFiles.length === 0 ? (
              <div className="bg-white border border-neutral-border rounded-3.5 p-8 text-center text-[13px] text-neutral-muted font-medium shadow-xs">
                {search || typeFilter !== "All" ? "Tidak ditemukan referensi yang cocok." : "Belum ada referensi yang diunggah."}
              </div>
            ) : (
              referenceFiles.map((ref) => (
                <div
                  key={ref.id}
                  className="bg-white border border-neutral-border rounded-3.5 p-4 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(43,59,175,0.06)] shadow-xs flex flex-col justify-between"
                >
                  <div className="mb-2">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-display text-[14.5px] font-extrabold text-neutral-text leading-snug">
                        {ref.title}
                      </h4>
                      <span className="py-0.5 px-2 rounded-full text-[10.5px] font-bold bg-neutral-bg text-neutral-muted border border-neutral-border shrink-0 uppercase tracking-wider">
                        {ref.type}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-neutral-muted leading-relaxed line-clamp-2">
                      {ref.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-neutral-border/50 flex items-center justify-between gap-2 flex-wrap text-[11.5px] text-neutral-muted">
                    <div className="flex items-center gap-1.5 truncate max-w-64">
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-neutral-400 shrink-0" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
                        <path d="M14 2v6h6" />
                      </svg>
                      <span className="truncate font-medium">{ref.fileName}</span>
                      {ref.fileSize && (
                        <span className="text-neutral-400 font-semibold shrink-0">({formatFileSize(ref.fileSize)})</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        href={ref.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2 text-[11.5px] font-bold text-brand h-7"
                      >
                        Pratinjau
                      </Button>
                      <Button
                        variant="danger-light"
                        size="sm"
                        onClick={() => handleDelete(ref.id)}
                        disabled={deleteRefMut.isPending}
                        className="py-1 px-2.5 text-[11.5px] font-bold h-7"
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
