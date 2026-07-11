"use client";

import { useState, useRef, useEffect } from "react";
import { useReferenceFiles } from "@/hooks/useReferenceFiles";

interface ReferensiItem {
  id: string;
  judul: string;
  deskripsi: string;
  namaFile: string;
  ukuran: string;
}

export function ReferensiManager() {
  const { data, isLoading, error, refetch } = useReferenceFiles();
  const [referensiList, setReferensiList] = useState<ReferensiItem[]>([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }

  function handleUpload() {
    if (!judul || !deskripsi || !fileName) {
      alert("Lengkapi semua field yang wajib diisi.");
      return;
    }
    const newRef: ReferensiItem = {
      id: `ref-${Date.now()}`,
      judul,
      deskripsi,
      namaFile: fileName,
      ukuran: "1.2 MB",
    };
    setReferensiList([newRef, ...referensiList]);
    setJudul("");
    setDeskripsi("");
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleDelete(id: string) {
    setReferensiList(referensiList.filter((r) => r.id !== id));
  }

  function handleBatal() {
    setJudul("");
    setDeskripsi("");
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
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
            <label className="text-[12.5px] font-semibold text-neutral-muted">
              Dokumen <span className="text-danger">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-3 py-8 px-4 text-center cursor-pointer transition-colors duration-200 ${
                isDragging ? "border-brand bg-brand-bg/50" : "border-neutral-border hover:border-brand-light hover:bg-neutral-bg/50"
              }`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.doc,.zip"
                className="hidden"
                onChange={handleFileChange}
              />
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-neutral-light mx-auto mb-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {fileName ? (
                <div className="text-[13px] font-bold text-brand">{fileName}</div>
              ) : (
                <>
                  <div className="text-[13px] text-neutral-muted font-medium">Pilih file atau drag & drop di sini</div>
                  <div className="text-[11.5px] text-neutral-light mt-1">PDF, DOCX, maksimal 10MB</div>
                </>
              )}
            </div>
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
      <div>
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text mb-4">Referensi Tersedia</h3>
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
            <div className="text-center py-10 text-[13px] text-neutral-muted">Belum ada referensi yang diunggah.</div>
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
