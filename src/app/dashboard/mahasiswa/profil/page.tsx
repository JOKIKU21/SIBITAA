"use client";

import { useState } from "react";

export default function ProfilPage() {
  const [nama, setNama] = useState("Tih Indriani");
  const [prodi, setProdi] = useState("Sistem Informasi");
  const [kampus, setKampus] = useState("UIN Mataram");

  return (
    <div className="block">
      <div className="p-[28px] max-[600px]:p-[16px]">
        <div className="mb-[24px]">
          <h2 className="font-display text-[22px] font-extrabold mb-[4px]">Profil Saya</h2>
          <p className="text-[14px] text-neutral-muted">Kelola informasi akun dan keamanan Anda</p>
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-[22px] items-start max-[900px]:grid-cols-1">
          {/* left: avatar */}
          <div className="bg-white border border-neutral-border rounded-[16px] py-[30px] px-[24px] text-center">
            <div className="relative w-[96px] h-[96px] my-0 mx-auto mb-[16px]">
              <div className="w-[96px] h-[96px] rounded-full bg-gradient-to-br from-[#6FE3A6] to-[#4A5CDB] flex items-center justify-center text-[36px] font-bold text-white overflow-hidden" id="pf-avatar-big">
                {nama.charAt(0).toUpperCase()}
              </div>
              <label className="absolute bottom-[2px] right-[2px] w-[30px] h-[30px] rounded-full bg-brand border-2 border-white flex items-center justify-center cursor-pointer" title="Ubah foto">
                <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px] text-white">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <input type="file" accept="image/*" className="hidden" onChange={() => alert("Upload foto!")} />
              </label>
            </div>
            <div className="font-display text-[18px] font-extrabold mb-[4px]">{nama}</div>
            <div className="text-[13px] text-neutral-muted mb-[18px]">{prodi} &middot; {kampus}</div>
            <span className="inline-flex items-center gap-[6px] bg-brand-bg text-brand py-[6px] px-[14px] rounded-full text-[12.5px] font-bold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5" stroke="#2B3BAF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mahasiswa Aktif
            </span>
          </div>

          {/* right */}
          <div className="flex flex-col gap-[20px]">
            <div className="bg-white border border-neutral-border rounded-[16px] p-[26px]">
              <h3 className="font-display text-[15px] font-extrabold mb-[18px] pb-[12px] border-b border-neutral-border">Informasi Pribadi</h3>
              <div className="grid grid-cols-2 gap-[16px] max-[700px]:grid-cols-1">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Nama Lengkap</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">NIM</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light text-neutral-muted cursor-default bg-neutral-bg" type="text" value="200101012" readOnly />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Email</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="email" defaultValue="tih.indriani@uin-mataram.ac.id" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">No. HP</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="text" defaultValue="081234567890" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Program Studi</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="text" value={prodi} onChange={(e) => setProdi(e.target.value)} />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Asal Kampus</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="text" value={kampus} onChange={(e) => setKampus(e.target.value)} />
                </div>
                <div className="flex flex-col gap-[6px]" style={{ gridColumn: "1/-1" }}>
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Dosen Pembimbing</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light text-neutral-muted cursor-default bg-neutral-bg" type="text" value="Dr. Ahmad Fauzi, M.T." readOnly />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <button className="bg-brand text-white border-none py-[11px] px-[26px] rounded-[9px] text-[14px] font-bold cursor-pointer transition-[background] duration-200 hover:bg-brand-dark" onClick={() => alert("Profil berhasil disimpan!")}>Simpan Perubahan</button>
              </div>
            </div>

            <div className="bg-white border border-neutral-border rounded-[16px] p-[26px]">
              <h3 className="font-display text-[15px] font-extrabold mb-[18px] pb-[12px] border-b border-neutral-border">Ubah Password</h3>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Password Saat Ini</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="password" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Password Baru</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="password" placeholder="Minimal 8 karakter" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Konfirmasi Password Baru</label>
                  <input className="bg-[#F8F9FF] border-[1.5px] border-neutral-border rounded-[9px] py-[11px] px-[14px] text-[14px] outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light" type="password" placeholder="Ulangi password baru" />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <button className="bg-brand text-white border-none py-[11px] px-[26px] rounded-[9px] text-[14px] font-bold cursor-pointer transition-[background] duration-200 hover:bg-brand-dark" onClick={() => alert("Password berhasil diubah!")}>Ubah Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
