"use client";

import { useState } from "react";

const REFS = [
  { id: 1, title: "Metodologi Penelitian Kuantitatif", desc: "Panduan lengkap metodologi penelitian kuantitatif mencakup desain penelitian, pengumpulan data, dan analisis statistik.", tag: "Metodologi", file: "metodologi-kuantitatif.pdf", author: "Prof. Sugiyono", year: "2023" },
  { id: 2, title: "Penulisan Karya Ilmiah Akademik", desc: "Buku panduan penulisan skripsi, tesis, dan disertasi sesuai kaidah akademik yang berlaku di perguruan tinggi.", tag: "Penulisan", file: "karya-ilmiah.pdf", author: "Dr. Suharsimi", year: "2022" },
  { id: 3, title: "Analisis Data dengan SPSS", desc: "Panduan praktis analisis data kuantitatif menggunakan SPSS dari dasar hingga mahir, disertai contoh kasus nyata.", tag: "Statistik", file: "analisis-spss.pdf", author: "Imam Ghozali", year: "2023" },
  { id: 4, title: "Tinjauan Pustaka Sistematis", desc: "Teknik systematic literature review untuk menemukan, mengevaluasi, dan mensintesis penelitian-penelitian terdahulu.", tag: "Literatur", file: "tinjauan-pustaka.pdf", author: "Dr. Ridwan", year: "2022" },
  { id: 5, title: "Etika Penelitian & Plagiarisme", desc: "Panduan etika dalam penelitian ilmiah and cara mencegah plagiarisme, termasuk penggunaan manajemen referensi.", tag: "Etika", file: "etika-penelitian.pdf", author: "Tim Akademik", year: "2024" },
  { id: 6, title: "Instrumen dan Validitas Penelitian", desc: "Cara membuat, menguji validitas dan reliabilitas instrumen penelitian baik kuantitatif maupun kualitatif.", tag: "Instrumen", file: "instrumen-penelitian.pdf", author: "Prof. Arikunto", year: "2021" },
];

export default function ReferensiPage() {
  const [query, setQuery] = useState("");

  const filtered = REFS.filter(
    (r) =>
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.desc.toLowerCase().includes(query.toLowerCase()) ||
      r.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="block">
      <div className="p-[28px] max-[600px]:p-[16px]">
        <div className="mb-[24px]">
          <h2 className="font-display text-[22px] font-extrabold mb-[4px]">Referensi Buku & Jurnal</h2>
          <p className="text-[14px] text-neutral-muted">Materi pendukung dari dosen pembimbing untuk membantu tugas akhir Anda</p>
        </div>
        <div className="flex gap-[12px] mb-[22px] flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center gap-[10px] bg-white border border-neutral-border rounded-[10px] px-[14px] py-0 h-[42px]">
            <svg viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] text-neutral-muted shrink-0">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="border-none outline-none text-[14px] flex-1 bg-transparent text-neutral-text"
              placeholder="Cari referensi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[14px]">
          {filtered.map((r) => (
            <div className="bg-white border border-neutral-border rounded-[14px] p-[20px] px-[22px] flex items-start gap-[16px] transition-[box-shadow] duration-200 hover:shadow-[0_4px_16px_rgba(43,59,175,0.09)]" key={r.id}>
              <div className="w-[44px] h-[44px] rounded-[11px] bg-brand-bg flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" stroke="#2B3BAF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[15px] font-bold mb-[4px]">{r.title}</div>
                <div className="text-[13px] text-neutral-muted leading-[1.55] mb-[10px]">{r.desc}</div>
                <div className="flex items-center gap-[12px] text-[12px] text-neutral-muted">
                  <span className="bg-brand-bg text-brand py-[2px] px-[9px] rounded-full font-semibold">{r.tag}</span>
                  <span>{r.author}</span>
                  <span>{r.year}</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-[6px] bg-brand text-white border-none py-[8px] px-[16px] rounded-[8px] text-[13px] font-bold cursor-pointer no-underline whitespace-nowrap shrink-0 self-start transition-[background] duration-200 hover:bg-brand-dark" type="button" onClick={() => alert(`Mengunduh: ${r.title}`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Unduh
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-[40px] text-center text-neutral-muted">
              Tidak ada referensi yang ditemukan untuk `&quot;`{query}`&quot;`.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
