"use client";

import { useState, useEffect } from "react";
import { 
  useReferenceFiles, 
  useCreateReferenceFile, 
  useDeleteReferenceFile 
} from "@/hooks/useReferenceFiles";
import { useDebounce } from "@/hooks/useDebounce";
import FileUploader from "@/components/FileUploader";
import { apiUpload } from "@/lib/api-client";
import { useToast } from "@/components/providers/ToastProvider";

interface ReferensiItem {
  id: string;
  judul: string;
  deskripsi: string;
  namaFile: string;
  ukuran: string;
}

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

  const [referensiList, setReferensiList] = useState<ReferensiItem[]>([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sync API reference files to local state so user can interactively add/remove locally
  useEffect(() => {
    if (data?.referenceFiles) {
      const mapped = data.referenceFiles.map((ref) => ({
        id: ref.id,
        judul: ref.title,
        deskripsi: ref.description,
        namaFile: ref.fileName,
        ukuran: ref.fileSize ? `${(ref.fileSize / (1024 * 1024)).toFixed(1)} MB` : "0.0 MB",
      }));
      setReferensiList(mapped);
    }
  }, [data]);

  async function handleUpload() {
    if (!judul || !deskripsi || !selectedFile) {
      toast.warning("Lengkapi semua field yang wajib diisi.");
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
        type: typeFilter === "All" ? "guideline" : typeFilter,
        fileName: uploadRes.fileName,
        fileUrl: uploadRes.fileUrl,
        fileType: uploadRes.fileType,
        fileSize: uploadRes.fileSize,
        author: "Admin SIBITA",
      });

      setJudul("");
      setDeskripsi("");
      setSelectedFile(null);
      toast.success("Referensi berhasil diunggah!");
    } catch (err: any) {
      toast.error("Gagal mengunggah referensi", {
        description: err.message || "Terjadi kesalahan.",
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Apakah Anda yakin ingin menghapus referensi ini?")) {
      try {
        await deleteRefMut.mutateAsync(id);
        toast.success("Referensi berhasil dihapus!");
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
  }

  return (
    <div className="grid grid-cols-[1.2fr_1fr] gap-5.5 items-start max-[900px]:grid-cols-1">
      {/* Upload form */}
      <div className="bg-white border border-neutral-border rounded-3.5 p-6">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text mb-5">Unggah Referensi Baru</h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Judul Referensi <span className="text-danger">*</span>
            </label>
            <input
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
              type="text"
              placeholder="Contoh: Panduan Penulisan Skripsi 2026"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Deskripsi Singkat <span className="text-danger">*</span>
            </label>
            <textarea
              className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light resize-y"
              rows={3}
              placeholder="Deskripsikan isi dokumen secara singkat..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <FileUploader
              id="referensi-file-uploader"
              label={<span>Dokumen <span className="text-danger">*</span></span>}
              subLabel="PDF, DOCX, MP4, maksimal 10MB"
              accept=".pdf,.docx,.mp4"
              files={selectedFile ? [{ id: "temp-selected", fileName: selectedFile.name, fileSize: selectedFile.size }] : []}
              onFileSelect={(file) => setSelectedFile(file)}
              onDeleteFile={() => setSelectedFile(null)}
              isLoading={isUploading || createRefMut.isPending}
              maxSizeMB={10}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleBatal}
            className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleUpload}
            className="bg-brand text-white border-none text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-brand-dark transition-colors duration-200"
          >
            Upload Referensi
          </button>
        </div>
      </div>

      {/* Referensi list */}
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Referensi Tersedia</h3>

        {/* Search & Filter Controls */}
        <div className="flex gap-2 max-[600px]:flex-col">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex-1 flex items-center pl-3 pointer-events-none text-neutral-muted">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari referensi, deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-border rounded-2.25 py-2 pl-9 pr-3 text-[12.5px] outline-none font-sans focus:border-brand-light transition-[border-color] duration-200 text-neutral-text placeholder-neutral-muted font-semibold"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-neutral-border rounded-2.25 py-2 px-3 text-[12.5px] outline-none font-sans focus:border-brand-light cursor-pointer font-semibold text-neutral-text"
          >
            <option value="All">Semua Kategori</option>
            <option value="guideline">Panduan</option>
            <option value="template">Template</option>
            <option value="example">Contoh</option>
          </select>
        </div>

        <div className="flex flex-col gap-3.5">
          {isLoading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-neutral-border rounded-3 p-5 animate-pulse space-y-2">
                <div className="h-4 bg-neutral-bg rounded w-3/4" />
                <div className="h-3 bg-neutral-bg rounded w-full" />
                <div className="h-3 bg-neutral-bg rounded w-5/6" />
              </div>
            ))
          ) : error ? (
            <div className="text-center py-6 text-danger bg-danger-bg/10 rounded-3 border border-danger/10">
              <p className="text-[12.5px] font-bold mb-2">Gagal memuat dokumen referensi.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-danger text-white border-none text-[11px] font-bold py-1 px-3 rounded cursor-pointer"
              >
                Coba Lagi
              </button>
            </div>
          ) : referensiList.length === 0 ? (
            <div className="text-center py-10 text-[13px] text-neutral-muted font-medium">
              {search || typeFilter !== "All" ? "Tidak ditemukan referensi yang cocok." : "Belum ada referensi yang diunggah."}
            </div>
          ) : (
            referensiList.map((ref) => (
              <div key={ref.id} className="bg-white border border-neutral-border rounded-3 p-5 transition-shadow duration-200 hover:shadow-[0_4px_18px_rgba(43,59,175,0.06)]">
                <div className="font-display text-[14px] font-extrabold text-neutral-text mb-1">{ref.judul}</div>
                <div className="text-[12.5px] text-neutral-muted leading-relaxed mb-3">{ref.deskripsi}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12px] text-neutral-muted">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {ref.namaFile} · {ref.ukuran}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(ref.id)}
                    className="text-danger text-[12.5px] font-bold bg-transparent border-none cursor-pointer hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
