import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand/97 backdrop-blur-md px-[5vw] h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-white font-display font-extrabold text-[19px] tracking-[0.01em] no-underline">
          <span className="w-8.5 h-8.5 rounded-2.25 bg-white/14 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8.5h6M8 11.5h4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </span>
          SIBITA
        </Link>
        <Link href="/masuk" className="bg-white text-brand border-none py-2.5 px-5.5 rounded-2.25 text-3.5 font-bold cursor-pointer flex items-center gap-1.5 transition-[transform,box-shadow] duration-150 no-underline hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
          Masuk ›
        </Link>
      </nav>

      <main>
        <section className="hero relative min-h-[calc(100vh-72px)] px-[5vw] flex items-center overflow-hidden">
          <div className="relative z-1 w-full max-w-[1280px] mx-auto flex items-center justify-between gap-14 flex-wrap max-[860px]:justify-center max-[860px]:text-center">
            <div className="max-w-[540px] -mt-7 max-[860px]:max-w-full max-[860px]:mt-0">
              <h1 className="font-display text-[clamp(34px,4.4vw,52px)] font-extrabold leading-[1.12] -tracking-[0.01em] text-white mb-5.5">Selesaikan Skripsi Lebih Cepat dengan <span className="bg-gradient-to-r from-[#8FE3C0] to-[#6FE3A6] bg-clip-text text-transparent">Bimbingan Terstruktur</span></h1>
              <p className="text-[16.5px] text-white/78 mb-8.5 leading-[1.65] max-w-[460px] max-[860px]:mx-auto">SIBITA membantu mahasiswa melacak setiap tahapan tugas akhir, dari diskusi konsep hingga ujian akhir, dengan timeline, deadline, dan komunikasi dosen pembimbing dalam satu platform.</p>
              <div className="flex gap-3.5 flex-wrap max-[860px]:justify-center max-[480px]:flex-col max-[480px]:w-full">
                <Link href="/masuk" className="bg-white text-brand border-none py-[15px] px-7 rounded-2.75 text-[14.5px] font-bold cursor-pointer flex items-center gap-2 transition-[transform,box-shadow] duration-150 no-underline hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] max-[480px]:w-full max-[480px]:justify-center">
                  Mulai Sekarang
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <button className="bg-transparent text-white border-[1.5px] border-white/40 py-[15px] px-7 rounded-2.75 text-[14.5px] font-bold cursor-pointer transition-[background,border-color] duration-200 hover:bg-white/8 hover:border-white/70 max-[480px]:w-full max-[480px]:justify-center">Lihat Panduan</button>
              </div>
            </div>

            <div className="hero-visual relative shrink-0 w-[min(420px,38vw)] max-[860px]:hidden">
              <svg viewBox="0 0 420 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="18" width="376" height="424" rx="22" fill="white" fillOpacity="0.06"/>
                <rect x="22" y="18" width="376" height="424" rx="22" stroke="white" strokeOpacity="0.18"/>
                <rect x="46" y="46" width="328" height="56" rx="12" fill="white" fillOpacity="0.95"/>
                <circle cx="74" cy="74" r="14" fill="#6FE3A6"/>
                <path d="M68 74l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="100" y="64" width="160" height="9" rx="4" fill="#1A2580"/>
                <rect x="100" y="80" width="100" height="7" rx="3" fill="#9CA3AF"/>
                <rect x="46" y="118" width="328" height="56" rx="12" fill="white" fillOpacity="0.95"/>
                <circle cx="74" cy="146" r="14" fill="#2B3BAF"/>
                <text x="74" y="151" fontSize="13" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial">5</text>
                <rect x="100" y="136" width="180" height="9" rx="4" fill="#1A2580"/>
                <rect x="100" y="152" width="120" height="7" rx="3" fill="#9CA3AF"/>
                <rect x="46" y="190" width="328" height="56" rx="12" fill="white" fillOpacity="0.55"/>
                <circle cx="74" cy="218" r="14" fill="white" fillOpacity="0.6"/>
                <text x="74" y="223" fontSize="13" fontWeight="700" fill="#2B3BAF" textAnchor="middle" fontFamily="Arial">6</text>
                <rect x="100" y="208" width="150" height="9" rx="4" fill="white" fillOpacity="0.7"/>
                <rect x="100" y="224" width="90" height="7" rx="3" fill="white" fillOpacity="0.4"/>
                <rect x="46" y="270" width="328" height="120" rx="14" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.16"/>
                <text x="64" y="296" fontSize="12" fontWeight="700" fill="white" fillOpacity="0.8" fontFamily="Arial">PROGRES KESELURUHAN</text>
                <rect x="64" y="308" width="284" height="10" rx="5" fill="white" fillOpacity="0.15"/>
                <rect x="64" y="308" width="167" height="10" rx="5" fill="#6FE3A6"/>
                <text x="64" y="345" fontSize="26" fontWeight="800" fill="white" fontFamily="Arial">59%</text>
                <text x="64" y="368" fontSize="11" fill="white" fillOpacity="0.6" fontFamily="Arial">9 dari 16 tahap selesai</text>
              </svg>
            </div>
          </div>
          <div className="absolute left-1/2 bottom-7 -translate-x-1/2 flex flex-col items-center gap-2 text-white/55 text-2.75 tracking-[0.08em] z-1 animate-[floatY_2.4s_ease-in-out_infinite]">
            <span>GULIR KE BAWAH</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </section>

        <section className="stats py-16 px-[5vw] pb-[88px] relative max-[768px]:py-10 max-[768px]:px-[4vw]">
          <div className="max-w-[1140px] mx-auto relative z-2 grid grid-cols-4 gap-4.5 max-[860px]:grid-cols-2 max-[768px]:grid-cols-2 max-[768px]:gap-4 max-[480px]:grid-cols-1">
            <div className="stat-item stat-item-1 relative text-left py-6 px-5.5 rounded-5 border-none text-white overflow-hidden bg-gradient-to-br from-[#FF6B9E] to-[#B450E1] shadow-[0_16px_32px_rgba(180,80,225,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
              <div className="relative text-3.5 font-semibold text-white/90 mb-2">Mahasiswa Aktif</div>
              <div className="relative flex items-center justify-between mb-1.5">
                <span className="font-display text-9 font-extrabold text-white -tracking-[0.01em] leading-[1.1]">2.500+</span>
                <div className="w-11 h-11 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white/85" viewBox="0 0 24 24" fill="none"><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M19 8v6M22 11h-6M11 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="relative text-[13px] text-white/80 font-medium">+12% Bulan ini</div>
            </div>
            <div className="stat-item stat-item-2 relative text-left py-6 px-5.5 rounded-5 border-none text-white overflow-hidden bg-gradient-to-br from-[#9C41F4] to-[#5D54F6] shadow-[0_16px_32px_rgba(93,84,246,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
              <div className="relative text-3.5 font-semibold text-white/90 mb-2">Tingkat Kelulusan</div>
              <div className="relative flex items-center justify-between mb-1.5">
                <span className="font-display text-9 font-extrabold text-white -tracking-[0.01em] leading-[1.1]">100%</span>
                <div className="w-11 h-11 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white/85" viewBox="0 0 24 24" fill="none"><path d="M22 10 12 5 2 10l10 5 10-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="relative text-[13px] text-white/80 font-medium">Tepat waktu semester ini</div>
            </div>
            <div className="stat-item stat-item-3 relative text-left py-6 px-5.5 rounded-5 border-none text-white overflow-hidden bg-gradient-to-br from-[#4FA4F8] to-[#37D5ED] shadow-[0_16px_32px_rgba(55,213,237,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
              <div className="relative text-3.5 font-semibold text-white/90 mb-2">Hari Rata-rata Selesai</div>
              <div className="relative flex items-center justify-between mb-1.5">
                <span className="font-display text-9 font-extrabold text-white -tracking-[0.01em] leading-[1.1]">140</span>
                <div className="w-11 h-11 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white/85" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="relative text-[13px] text-white/80 font-medium">Lebih cepat 30 hari</div>
            </div>
            <div className="stat-item stat-item-4 relative text-left py-6 px-5.5 rounded-5 border-none text-white overflow-hidden bg-gradient-to-br from-[#4CE0A6] to-[#34B192] shadow-[0_16px_32px_rgba(52,177,146,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
              <div className="relative text-3.5 font-semibold text-white/90 mb-2">Rating Pengguna</div>
              <div className="relative flex items-center justify-between mb-1.5">
                <span className="font-display text-9 font-extrabold text-white -tracking-[0.01em] leading-[1.1]">4.9/5</span>
                <div className="w-11 h-11 flex items-center justify-center">
                  <svg className="w-9 h-9 text-white/85" viewBox="0 0 24 24" fill="none"><path d="M12 2.5 14.7 8 21 9l-4.5 4.4 1 6.1-5.5-3-5.5 3 1-6.1L3 9l6.3-1L12 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="relative text-[13px] text-white/80 font-medium">Dari 500+ ulasan</div>
            </div>
          </div>
        </section>

        <section className="py-20 px-[5vw] pb-24 bg-gradient-to-b from-[#F8F9FD] to-white max-[768px]:py-10 max-[768px]:px-[4vw]">
          <div className="text-center max-w-[620px] mx-auto mb-[52px]">
            <span className="inline-block text-brand text-[12.5px] font-bold tracking-[0.08em] uppercase mb-3.5">Fitur Utama</span>
            <h2 className="font-display text-[clamp(26px,3vw,34px)] font-extrabold -tracking-[0.01em] text-neutral-text mb-3 leading-[1.25] max-[768px]:text-6">Semua yang Kamu Butuhkan untuk Menyelesaikan Skripsi</h2>
            <p className="text-[15px] text-neutral-muted leading-[1.6]">Satu platform untuk melacak progres, menyimpan referensi, dan berkoordinasi dengan dosen pembimbing — dari diskusi konsep sampai ujian akhir.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 max-w-[1080px] mx-auto">
            <div className="feature-card relative bg-gradient-to-br from-[#3244CA] to-[#1A2580] border-none rounded-5 py-9 px-7 text-left text-white overflow-hidden shadow-[0_16px_32px_rgba(26,37,128,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_20px_48px_rgba(26,37,128,0.35)] hover:-translate-y-[8px]">
              <div className="relative w-[52px] h-[52px] rounded-3.5 bg-white/12 border border-white/20 mb-6 flex items-center justify-center backdrop-blur-[4px]">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 5h13l3 3-3 3H4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="relative font-display text-4.5 font-bold mb-3 text-white">Timeline 16 Tahapan</h3>
              <p className="relative text-[14.5px] text-white/80 leading-[1.65]">Lacak seluruh tahapan tugas akhir dalam satu tampilan visual yang jelas, lengkap dengan status, progres, dan tenggat waktu setiap tahap secara real-time.</p>
            </div>
            <div className="feature-card relative bg-gradient-to-br from-[#3244CA] to-[#1A2580] border-none rounded-5 py-9 px-7 text-left text-white overflow-hidden shadow-[0_16px_32px_rgba(26,37,128,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_20px_48px_rgba(26,37,128,0.35)] hover:-translate-y-[8px]">
              <div className="relative w-[52px] h-[52px] rounded-3.5 bg-white/12 border border-white/20 mb-6 flex items-center justify-center backdrop-blur-[4px]">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none"><path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12h6M9 16h6M9 8h2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 className="relative font-display text-4.5 font-bold mb-3 text-white">Referensi Jurnal</h3>
              <p className="relative text-[14.5px] text-white/80 leading-[1.65]">Cari, simpan, dan kelola referensi jurnal ilmiah dari Scopus, SINTA, dan DOAJ, lengkap dengan generator sitasi APA, IEEE, dan Harvard.</p>
            </div>
            <div className="feature-card relative bg-gradient-to-br from-[#3244CA] to-[#1A2580] border-none rounded-5 py-9 px-7 text-left text-white overflow-hidden shadow-[0_16px_32px_rgba(26,37,128,0.2)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_20px_48px_rgba(26,37,128,0.35)] hover:-translate-y-[8px]">
              <div className="relative w-[52px] h-[52px] rounded-3.5 bg-white/12 border border-white/20 mb-6 flex items-center justify-center backdrop-blur-[4px]">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="relative font-display text-4.5 font-bold mb-3 text-white">Konsultasi Terstruktur</h3>
              <p className="relative text-[14.5px] text-white/80 leading-[1.65]">Dokumentasikan setiap sesi bimbingan dengan dosen pembimbing, catat masukan, lacak revisi, dan kelola persetujuan secara digital.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f1430] text-white py-12 px-[5vw] pb-0 font-body border-t border-white/5 max-[768px]:py-10 max-[768px]:px-[4vw] max-[768px]:pb-0">
        <div className="max-w-[1200px] mx-auto grid grid-cols-[2.2fr_1fr_1fr_1.5fr] gap-8 pb-8 max-[860px]:grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:gap-6">
          <div className="pr-5 max-[768px]:pr-0">
            <div className="flex items-center gap-3 font-display text-5 font-extrabold mb-4">
              <span className="w-9 h-9 rounded-2.5 bg-gradient-to-br from-white/15 to-white/2 border border-white/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              SIBITA
            </div>
            <p className="text-[13.5px] text-white/65 leading-[1.6]">
              Sistem Bimbingan Tugas Akhir platform terintegrasi yang membantu mahasiswa dan dosen menyelesaikan skripsi dengan proses yang lebih cepat, rapi, dan terstruktur.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white mb-4">Eksplorasi</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-1">Beranda</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-1">Panduan Skripsi</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">Cari Jurnal</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">FAQ Mahasiswa</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white mb-4">Layanan</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">Pusat Bantuan</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-white/65 no-underline text-[13.5px] transition-[color,transform] duration-200 inline-block hover:text-white hover:translate-x-[4px]">Hubungi Admin</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-white mb-4">Hubungi Kami</h4>
            <div className="flex items-start gap-3 text-[13.5px] text-white/70 leading-[1.5]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white opacity-50 shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Jl.Kaliurang Yogyakarta </span>
            </div>
            <div className="flex items-start gap-3 text-[13.5px] text-white/70 leading-[1.5]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white opacity-50 shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>0000000000</span>
            </div>
            <div className="flex items-start gap-3 text-[13.5px] text-white/70 leading-[1.5]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white opacity-50 shrink-0 mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>sibita@google.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 py-4.5 px-[5vw] bg-[#0b0f24]">
          <div className="max-w-[1200px] mx-auto flex justify-center items-center text-[13px] text-white/50 flex-wrap gap-4">
            <span>&copy; 2026 SIBITA</span>
          </div>
        </div>
      </footer>
    </>
  );
}
