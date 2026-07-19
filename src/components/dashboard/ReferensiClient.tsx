"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useReferenceFiles } from "@/hooks/useReferenceFiles";
import { useDebounce } from "@/hooks/useDebounce";

export default function ReferensiClient() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading, isError, error, refetch } = useReferenceFiles(undefined, debouncedQuery);

  const referenceFiles = data?.referenceFiles ?? [];

  const filtered = referenceFiles.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase()) ||
      r.author.toLowerCase().includes(query.toLowerCase()),
  );

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

  const getBadgeStyles = (type: string) => {
    const t = type?.toLowerCase() || "";
    if (t === "guideline" || t === "panduan") {
      return "bg-brand-bg text-brand";
    }
    if (t === "book" || t === "buku") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200/40";
    }
    if (t === "journal" || t === "jurnal") {
      return "bg-purple-50 text-purple-700 border border-purple-200/40";
    }
    if (t === "template" || t === "templat") {
      return "bg-amber-50 text-amber-700 border border-amber-200/40";
    }
    return "bg-neutral-bg text-neutral-text border border-neutral-border/50";
  };

  const formatType = (type: string) => {
    if (!type) return "";
    if (type.toLowerCase() === "guideline") return "Panduan";
    if (type.toLowerCase() === "book") return "Buku";
    if (type.toLowerCase() === "journal") return "Jurnal";
    if (type.toLowerCase() === "template") return "Templat";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-extrabold mb-1">
            Referensi Buku & Jurnal
          </h2>
          <p className="text-lg text-neutral-muted">
            Materi pendukung dari dosen pembimbing untuk membantu tugas akhir
            Anda
          </p>
        </div>
        <div className="flex gap-3 mb-5.5 flex-wrap">
          <Input
            variant="bordered"
            type="text"
            placeholder="Cari referensi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-neutral-muted"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m21 21-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            }
            wrapperClassName="flex-1 min-w-50"
            className="bg-white h-10.5 py-0 rounded-2.5"
          />
        </div>
        <div className="flex flex-col gap-3.5">
          {isLoading && referenceFiles.length === 0 ? (
            <div className="flex flex-col gap-3.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-border rounded-3.5 p-5 px-5.5 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-2.75 bg-neutral-100 animate-pulse shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-5 w-1/3 bg-neutral-100 rounded animate-pulse mb-2.5" />
                    <div className="h-4 w-3/4 bg-neutral-50 rounded animate-pulse mb-3.5" />
                    <div className="h-6.5 w-48 bg-neutral-50 border border-neutral-border/60 rounded-2 animate-pulse mb-3.5" />
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="h-5.5 w-16 bg-neutral-100 rounded-full animate-pulse" />
                      <span className="text-neutral-border/60">•</span>
                      <div className="h-4 w-28 bg-neutral-100 rounded animate-pulse" />
                      <span className="text-neutral-border/60">•</span>
                      <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-9.25 w-20 bg-neutral-100 rounded-2 animate-pulse shrink-0 self-start" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="bg-white border border-neutral-border rounded-4 p-6.5 max-w-md">
              <h2 className="font-display text-4.5 font-extrabold mb-1">
                Gagal memuat referensi
              </h2>
              <p className="text-lg text-neutral-muted mb-4">
                {error instanceof Error
                  ? error.message
                  : "Terjadi kesalahan saat mengambil data referensi."}
              </p>
              <Button variant="brand" size="md" onClick={() => refetch()}>
                Coba Lagi
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-neutral-muted font-medium">
              Tidak ada referensi yang ditemukan untuk &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((r) => (
              <div
                className="bg-white border border-neutral-border rounded-3.5 p-5 px-5.5 flex items-start gap-4 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(43,59,175,0.09)]"
                key={r.id}
              >
                <div className="w-11 h-11 rounded-2.75 bg-brand-bg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5.5 h-5.5">
                    <path
                      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"
                      stroke="#2B3BAF"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[15px] font-bold mb-1">
                    {r.title}
                  </div>
                  <div className="text-[13px] text-neutral-muted leading-[1.55] mb-2">
                    {r.description}
                  </div>

                  {/* File Attachment Info */}
                  {r.fileName && (
                    <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 bg-neutral-bg border border-neutral-border/60 rounded-2 text-[12px] text-neutral-muted">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-3.5 h-3.5 text-neutral-muted/80"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="truncate max-w-50 sm:max-w-75"
                        title={r.fileName}
                      >
                        {r.fileName}
                      </span>
                      {r.fileSize && (
                        <span className="text-neutral-muted/60">
                          ({formatFileSize(r.fileSize)})
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-3 text-neutral-muted flex-wrap">
                    <span
                      className={`py-0.5 px-2.25 rounded-full font-semibold ${getBadgeStyles(r.type)}`}
                    >
                      {formatType(r.type)}
                    </span>
                    <span className="text-neutral-border/60">•</span>
                    <span>{r.author}</span>
                    <span className="text-neutral-border/60">•</span>
                    <span>{formatUploadDate(r.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start shrink-0">
                  <Button
                    variant="neutral"
                    size="custom"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-2 text-[13px] font-bold no-underline whitespace-nowrap"
                    href={r.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat
                  </Button>
                  <Button
                    variant="brand"
                    size="custom"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-2 text-[13px] font-bold no-underline whitespace-nowrap"
                    href={r.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    Unduh
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
