import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <span className="nav-brand-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8.5h6M8 11.5h4" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </span>
          SIBITA
        </Link>
        <Link href="/masuk" className="nav-btn">
          Masuk ›
        </Link>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <h1>Selesaikan Skripsi Lebih Cepat dengan <span className="accent">Bimbingan Terstruktur</span></h1>
              <p>SIBITA membantu mahasiswa melacak setiap tahapan tugas akhir, dari diskusi konsep hingga ujian akhir, dengan timeline, deadline, dan komunikasi dosen pembimbing dalam satu platform.</p>
              <div className="hero-actions">
                <Link href="/masuk" className="btn-primary-landing">
                  Mulai Sekarang
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <button className="btn-outline-landing">Lihat Panduan</button>
              </div>
            </div>

            <div className="hero-visual">
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
        </section>

        <section className="stats">
          <div className="stats-grid">
            <div className="stat-item stat-item-1">
              <div className="stat-label">Mahasiswa Aktif</div>
              <div className="stat-main">
                <span className="stat-value">2.500+</span>
                <div className="stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M19 8v6M22 11h-6M11 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="stat-sub">+12% Bulan ini</div>
            </div>
            <div className="stat-item stat-item-2">
              <div className="stat-label">Tingkat Kelulusan</div>
              <div className="stat-main">
                <span className="stat-value">100%</span>
                <div className="stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M22 10 12 5 2 10l10 5 10-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="stat-sub">Tepat waktu semester ini</div>
            </div>
            <div className="stat-item stat-item-3">
              <div className="stat-label">Hari Rata-rata Selesai</div>
              <div className="stat-main">
                <span className="stat-value">140</span>
                <div className="stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="stat-sub">Lebih cepat 30 hari</div>
            </div>
            <div className="stat-item stat-item-4">
              <div className="stat-label">Rating Pengguna</div>
              <div className="stat-main">
                <span className="stat-value">4.9/5</span>
                <div className="stat-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5 14.7 8 21 9l-4.5 4.4 1 6.1-5.5-3-5.5 3 1-6.1L3 9l6.3-1L12 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="stat-sub">Dari 500+ ulasan</div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-head">
            <span className="features-eyebrow">Fitur Utama</span>
            <h2>Semua yang Kamu Butuhkan untuk Menyelesaikan Skripsi</h2>
            <p className="sub">Satu platform untuk melacak progres, menyimpan referensi, dan berkoordinasi dengan dosen pembimbing — dari diskusi konsep sampai ujian akhir.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 5h13l3 3-3 3H4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3>Timeline 16 Tahapan</h3>
              <p>Lacak seluruh tahapan tugas akhir dalam satu tampilan visual yang jelas, lengkap dengan status, progres, dan tenggat waktu setiap tahap secara real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12h6M9 16h6M9 8h2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3>Referensi Jurnal</h3>
              <p>Cari, simpan, dan kelola referensi jurnal ilmiah dari Scopus, SINTA, dan DOAJ, lengkap dengan generator sitasi APA, IEEE, dan Harvard.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </div>
              <h3>Konsultasi Terstruktur</h3>
              <p>Dokumentasikan setiap sesi bimbingan dengan dosen pembimbing, catat masukan, lacak revisi, dan kelola persetujuan secara digital.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-premium">
        <div className="footer-premium-inner">
          <div className="footer-col-brand">
            <div className="footer-brand">
              <span className="footer-brand-mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 6.5C4 5.12 5.12 4 6.5 4H17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M4 17.5C4 16.12 5.12 15 6.5 15H18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              SIBITA
            </div>
            <p className="footer-desc">
              Sistem Bimbingan Tugas Akhir platform terintegrasi yang membantu mahasiswa dan dosen menyelesaikan skripsi dengan proses yang lebih cepat, rapi, dan terstruktur.
            </p>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-heading">Eksplorasi</h4>
            <ul>
              <li><a href="#">Beranda</a></li>
              <li><a href="#">Panduan Skripsi</a></li>
              <li><a href="#">Cari Jurnal</a></li>
              <li><a href="#">FAQ Mahasiswa</a></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-heading">Layanan</h4>
            <ul>
              <li><a href="#">Pusat Bantuan</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Hubungi Admin</a></li>
            </ul>
          </div>

          <div className="footer-col-contact">
            <h4 className="footer-heading">Hubungi Kami</h4>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Jl.Kaliurang Yogyakarta </span>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>0000000000</span>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>sibita@google.com</span>
            </div>
          </div>
        </div>

        <div className="footer-premium-bottom">
          <div className="fp-bottom-inner">
            <span>&copy; 2026 SIBITA</span>
          </div>
        </div>
      </footer>
    </>
  );
}
