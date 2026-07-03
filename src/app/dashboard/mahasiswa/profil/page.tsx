"use client";

import { useState } from "react";

export default function ProfilPage() {
  const [nama, setNama] = useState("Tih Indriani");
  const [prodi, setProdi] = useState("Sistem Informasi");
  const [kampus, setKampus] = useState("UIN Mataram");

  return (
    <div className="content-page active">
      <div className="content-inner">
        <div className="dash-header">
          <h2>Profil Saya</h2>
          <p>Kelola informasi akun dan keamanan Anda</p>
        </div>
        <div className="profil-grid">
          {/* left: avatar */}
          <div className="profil-left">
            <div className="profil-avatar-wrap">
              <div className="profil-avatar-img" id="pf-avatar-big">
                {nama.charAt(0).toUpperCase()}
              </div>
              <label className="profil-avatar-btn" title="Ubah foto">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <input type="file" accept="image/*" onChange={() => alert("Upload foto!")} />
              </label>
            </div>
            <div className="profil-name-big">{nama}</div>
            <div className="profil-prodi">{prodi} &middot; {kampus}</div>
            <span className="profil-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5" stroke="#2B3BAF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mahasiswa Aktif
            </span>
          </div>

          {/* right */}
          <div className="profil-right">
            <div className="profil-section">
              <h3>Informasi Pribadi</h3>
              <div className="pf-grid">
                <div className="pf-group">
                  <label>Nama Lengkap</label>
                  <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div className="pf-group">
                  <label>NIM</label>
                  <input type="text" value="200101012" readOnly />
                </div>
                <div className="pf-group">
                  <label>Email</label>
                  <input type="email" defaultValue="tih.indriani@uin-mataram.ac.id" />
                </div>
                <div className="pf-group">
                  <label>No. HP</label>
                  <input type="text" defaultValue="081234567890" />
                </div>
                <div className="pf-group">
                  <label>Program Studi</label>
                  <input type="text" value={prodi} onChange={(e) => setProdi(e.target.value)} />
                </div>
                <div className="pf-group">
                  <label>Asal Kampus</label>
                  <input type="text" value={kampus} onChange={(e) => setKampus(e.target.value)} />
                </div>
                <div className="pf-group" style={{ gridColumn: "1/-1" }}>
                  <label>Dosen Pembimbing</label>
                  <input type="text" value="Dr. Ahmad Fauzi, M.T." readOnly />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <button className="btn-pf-save" onClick={() => alert("Profil berhasil disimpan!")}>Simpan Perubahan</button>
              </div>
            </div>

            <div className="profil-section">
              <h3>Ubah Password</h3>
              <div className="pw-fields">
                <div className="pf-group">
                  <label>Password Saat Ini</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="pf-group">
                  <label>Password Baru</label>
                  <input type="password" placeholder="Minimal 8 karakter" />
                </div>
                <div className="pf-group">
                  <label>Konfirmasi Password Baru</label>
                  <input type="password" placeholder="Ulangi password baru" />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <button className="btn-pf-save" onClick={() => alert("Password berhasil diubah!")}>Ubah Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
