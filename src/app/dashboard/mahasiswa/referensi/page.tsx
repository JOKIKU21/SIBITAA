"use client";

import { useState } from "react";

const REFS = [
  { id: 1, title: "Metodologi Penelitian Kuantitatif", desc: "Panduan lengkap metodologi penelitian kuantitatif mencakup desain penelitian, pengumpulan data, dan analisis statistik.", tag: "Metodologi", file: "metodologi-kuantitatif.pdf", author: "Prof. Sugiyono", year: "2023" },
  { id: 2, title: "Penulisan Karya Ilmiah Akademik", desc: "Buku panduan penulisan skripsi, tesis, dan disertasi sesuai kaidah akademik yang berlaku di perguruan tinggi.", tag: "Penulisan", file: "karya-ilmiah.pdf", author: "Dr. Suharsimi", year: "2022" },
  { id: 3, title: "Analisis Data dengan SPSS", desc: "Panduan praktis analisis data kuantitatif menggunakan SPSS dari dasar hingga mahir, disertai contoh kasus nyata.", tag: "Statistik", file: "analisis-spss.pdf", author: "Imam Ghozali", year: "2023" },
  { id: 4, title: "Tinjauan Pustaka Sistematis", desc: "Teknik systematic literature review untuk menemukan, mengevaluasi, dan mensintesis penelitian-penelitian terdahulu.", tag: "Literatur", file: "tinjauan-pustaka.pdf", author: "Dr. Ridwan", year: "2022" },
  { id: 5, title: "Etika Penelitian & Plagiarisme", desc: "Panduan etika dalam penelitian ilmiah dan cara mencegah plagiarisme, termasuk penggunaan manajemen referensi.", tag: "Etika", file: "etika-penelitian.pdf", author: "Tim Akademik", year: "2024" },
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
    <div className="content-page active">
      <div className="content-inner">
        <div className="dash-header">
          <h2>Referensi Buku & Jurnal</h2>
          <p>Materi pendukung dari dosen pembimbing untuk membantu tugas akhir Anda</p>
        </div>
        <div className="ref-toolbar">
          <div className="ref-search">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Cari referensi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="ref-list">
          {filtered.map((r) => (
            <div className="ref-card" key={r.id}>
              <div className="ref-ico">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" stroke="#2B3BAF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ref-body">
                <div className="ref-title">{r.title}</div>
                <div className="ref-desc">{r.desc}</div>
                <div className="ref-meta">
                  <span className="ref-tag">{r.tag}</span>
                  <span>{r.author}</span>
                  <span>{r.year}</span>
                </div>
              </div>
              <button className="btn-ref-dl" type="button" onClick={() => alert(`Mengunduh: ${r.title}`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Unduh
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
              Tidak ada referensi yang ditemukan untuk "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
