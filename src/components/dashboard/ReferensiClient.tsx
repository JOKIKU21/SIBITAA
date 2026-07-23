"use client";

import { useState, useMemo } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useReferenceFiles } from "@/hooks/useReferenceFiles";
import { useDebounce } from "@/hooks/useDebounce";

const formatFileSize = (bytes: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const formatUploadDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const CATEGORIES = [
  { key: "ALL", label: "Semua" },
  { key: "guideline", label: "Panduan" },
  { key: "journal", label: "Jurnal" },
  { key: "book", label: "Buku" },
  { key: "template", label: "Templat" },
  { key: "example", label: "Contoh" },
];

const getCategoryTheme = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t === "guideline" || t === "panduan") {
    return {
      badge: "bg-brand-bg text-brand border-brand/20",
      iconBg: "bg-brand-bg text-brand",
      label: "Panduan",
    };
  }
  if (t === "book" || t === "buku") {
    return {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      iconBg: "bg-emerald-50 text-emerald-600",
      label: "Buku",
    };
  }
  if (t === "journal" || t === "jurnal") {
    return {
      badge: "bg-purple-50 text-purple-700 border-purple-200/60",
      iconBg: "bg-purple-50 text-purple-600",
      label: "Jurnal",
    };
  }
  if (t === "template" || t === "templat") {
    return {
      badge: "bg-amber-50 text-amber-700 border-amber-200/60",
      iconBg: "bg-amber-50 text-amber-600",
      label: "Templat",
    };
  }
  if (t === "example" || t === "contoh") {
    return {
      badge: "bg-cyan-50 text-cyan-700 border-cyan-200/60",
      iconBg: "bg-cyan-50 text-cyan-600",
      label: "Contoh",
    };
  }
  return {
    badge: "bg-neutral-bg text-neutral-text border-neutral-border",
    iconBg: "bg-neutral-bg text-neutral-text",
    label: type || "Dokumen",
  };
};

export default function ReferensiClient() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error, refetch } = useReferenceFiles(
    selectedCategory === "ALL" ? undefined : selectedCategory,
    debouncedQuery
  );

  const referenceFiles = data?.referenceFiles ?? [];

  const filtered = useMemo(() => {
    return referenceFiles.filter((r) => {
      const matchSearch =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.author.toLowerCase().includes(query.toLowerCase());

      const matchCategory =
        selectedCategory === "ALL" ||
        r.type.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [referenceFiles, query, selectedCategory]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = referenceFiles.length;
    const guidelines = referenceFiles.filter(
      (r) => r.type.toLowerCase() === "guideline" || r.type.toLowerCase() === "template"
    ).length;
    const literatures = referenceFiles.filter(
      (r) => r.type.toLowerCase() === "book" || r.type.toLowerCase() === "journal"
    ).length;
    return { total, guidelines, literatures };
  }, [referenceFiles]);

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl font-extrabold mb-1">
              Referensi Buku & Jurnal
            </h2>
            <p className="text-3.5 text-neutral-muted">
              Materi pendukung, panduan, dan literatur dari dosen pembimbing untuk membantu tugas akhir Anda.
            </p>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1 mb-7">
          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-3 bg-brand-bg text-brand flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Total Referensi</div>
              <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.total} Dokumen</div>
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-3 bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Panduan & Format</div>
              <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.guidelines} Berkas</div>
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-3 bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-bold text-neutral-muted uppercase tracking-wider">Buku & Jurnal</div>
              <div className="text-5.5 font-display font-extrabold text-neutral-text">{stats.literatures} Literatur</div>
            </div>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white border border-neutral-border rounded-3.5 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`py-1.75 px-3.5 rounded-2 text-[12.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-brand text-white shadow-xs"
                      : "bg-neutral-bg text-neutral-muted hover:text-neutral-text hover:bg-neutral-border/40"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Layout View Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Input
              variant="bordered"
              type="text"
              placeholder="Cari referensi, kata kunci..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-neutral-muted">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              }
              wrapperClassName="flex-1 md:w-64"
              className="bg-neutral-bg/50 h-10 py-0 rounded-2.5 text-[13px]"
            />

            <div className="flex items-center bg-neutral-bg border border-neutral-border p-0.5 rounded-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-1.5 transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-white text-brand shadow-xs" : "text-neutral-muted hover:text-neutral-text"
                }`}
                title="Tampilan Grid"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-1.5 transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-white text-brand shadow-xs" : "text-neutral-muted hover:text-neutral-text"
                }`}
                title="Tampilan List"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" strokeLinecap="round" />
                  <line x1="8" y1="12" x2="21" y2="12" strokeLinecap="round" />
                  <line x1="8" y1="18" x2="21" y2="18" strokeLinecap="round" />
                  <line x1="3" y1="6" x2="3.01" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="12" x2="3.01" y2="12" strokeLinecap="round" />
                  <line x1="3" y1="18" x2="3.01" y2="18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading && referenceFiles.length === 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1" : "flex flex-col gap-3.5"}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-neutral-border rounded-3.5 p-5 animate-pulse flex flex-col justify-between h-48 shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-2.5" />
                    <div className="w-16 h-5 bg-neutral-100 rounded-full" />
                  </div>
                  <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
                  <div className="h-3.5 bg-neutral-100 rounded w-full mb-1" />
                  <div className="h-3.5 bg-neutral-100 rounded w-2/3" />
                </div>
                <div className="h-9 bg-neutral-100 rounded-2 w-full mt-4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-white border border-neutral-border rounded-4 p-8 max-w-md mx-auto text-center shadow-xs">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-danger mx-auto mb-3" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 className="font-display text-[16px] font-extrabold text-neutral-text mb-1">
              Gagal Memuat Referensi
            </h3>
            <p className="text-[13px] text-neutral-muted mb-5">
              {error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data referensi."}
            </p>
            <Button variant="brand" size="sm" onClick={() => refetch()} className="mx-auto">
              Coba Lagi
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-neutral-border rounded-4 p-12 text-center shadow-xs">
            <div className="w-14 h-14 rounded-full bg-neutral-bg flex items-center justify-center mx-auto mb-3 text-neutral-400">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h4 className="font-display font-bold text-neutral-text text-[15px] mb-1">
              Referensi Tidak Ditemukan
            </h4>
            <p className="text-neutral-muted text-[13px] max-w-xs mx-auto mb-4">
              Tidak ada referensi yang sesuai dengan kriteria pencarian atau kategori ini.
            </p>
            {(query || selectedCategory !== "ALL") && (
              <Button
                variant="outline-neutral"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("ALL");
                }}
                className="mx-auto"
              >
                Reset Filter
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View Layout */
          <div className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {filtered.map((r) => {
              const theme = getCategoryTheme(r.type);
              return (
                <div
                  key={r.id}
                  className="bg-white border border-neutral-border rounded-3.5 p-5 flex flex-col justify-between shadow-xs hover:shadow-[0_6px_20px_rgba(43,59,175,0.08)] transition-all duration-200"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className={`w-10 h-10 rounded-2.5 flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className={`py-1 px-2.75 rounded-full text-[11.5px] font-bold border ${theme.badge}`}>
                        {theme.label}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="font-display text-[15px] font-extrabold text-neutral-text mb-1.5 line-clamp-2 leading-snug" title={r.title}>
                      {r.title}
                    </h4>
                    <p className="text-[12.5px] text-neutral-muted leading-relaxed line-clamp-3 mb-4">
                      {r.description}
                    </p>
                  </div>

                  <div>
                    {/* File Attachment & Meta Info */}
                    <div className="bg-neutral-bg/60 border border-neutral-border/60 rounded-2 p-2.5 mb-4 space-y-1">
                      {r.fileName && (
                        <div className="flex items-center gap-1.5 text-[11.5px] text-neutral-text font-semibold truncate">
                          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-neutral-muted shrink-0" stroke="currentColor" strokeWidth="2">
                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="truncate" title={r.fileName}>{r.fileName}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[11px] text-neutral-muted font-medium pt-0.5 border-t border-neutral-border/40">
                        <span>Oleh: {r.author}</span>
                        <span>{formatUploadDate(r.createdAt)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline-neutral"
                        size="custom"
                        className="w-full py-2 text-[12.5px] font-bold rounded-2 h-9 justify-center"
                        href={r.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat
                      </Button>
                      <Button
                        variant="brand"
                        size="custom"
                        className="w-full py-2 text-[12.5px] font-bold rounded-2 h-9 justify-center shadow-2xs"
                        href={r.fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        leftIcon={
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        }
                      >
                        Unduh
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="flex flex-col gap-3.5">
            {filtered.map((r) => {
              const theme = getCategoryTheme(r.type);
              return (
                <div
                  key={r.id}
                  className="bg-white border border-neutral-border rounded-3.5 p-4.5 px-5 flex items-center justify-between gap-4 shadow-xs hover:shadow-[0_4px_16px_rgba(43,59,175,0.08)] transition-all duration-200 flex-wrap md:flex-nowrap"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className={`w-11 h-11 rounded-2.5 flex items-center justify-center shrink-0 mt-0.5 ${theme.iconBg}`}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-display text-[15px] font-extrabold text-neutral-text truncate">
                          {r.title}
                        </h4>
                        <span className={`py-0.5 px-2.25 rounded-full text-[11px] font-bold border ${theme.badge}`}>
                          {theme.label}
                        </span>
                      </div>

                      <p className="text-[12.5px] text-neutral-muted leading-relaxed line-clamp-1 mb-2">
                        {r.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11.5px] text-neutral-muted flex-wrap font-medium">
                        <span>Oleh: <strong className="text-neutral-text">{r.author}</strong></span>
                        <span>•</span>
                        <span>{formatUploadDate(r.createdAt)}</span>
                        {r.fileName && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-48">{r.fileName} {r.fileSize ? `(${formatFileSize(r.fileSize)})` : ""}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <Button
                      variant="outline-neutral"
                      size="custom"
                      className="py-2 px-3.5 text-[12.5px] font-bold rounded-2 h-8.5"
                      href={r.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </Button>
                    <Button
                      variant="brand"
                      size="custom"
                      className="py-2 px-3.5 text-[12.5px] font-bold rounded-2 h-8.5 shadow-2xs"
                      href={r.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    >
                      Unduh
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
