"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function ProfilPage() {
  const [nama, setNama] = useState("Tih Indriani");
  const [prodi, setProdi] = useState("Sistem Informasi");
  const [kampus, setKampus] = useState("UIN Mataram");

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Profil Saya</h2>
          <p className="text-3.5 text-neutral-muted">Kelola informasi akun dan keamanan Anda</p>
        </div>
        <div className="grid grid-cols-[300px_1fr] gap-5.5 items-start max-[900px]:grid-cols-1">
          {/* left: avatar */}
          <div className="bg-white border border-neutral-border rounded-4 py-7.5 px-6 text-center">
            <div className="relative w-24 h-24 my-0 mx-auto mb-4">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-9 font-bold text-white overflow-hidden" id="pf-avatar-big">
                {nama.charAt(0).toUpperCase()}
              </div>
              <label className="absolute bottom-0.5 right-0.5 w-7.5 h-7.5 rounded-full bg-brand border-2 border-white flex items-center justify-center cursor-pointer" title="Ubah foto">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <Input type="file" accept="image/*" className="hidden" onChange={() => alert("Upload foto!")} />
              </label>
            </div>
            <div className="font-display text-4.5 font-extrabold mb-1">{nama}</div>
            <div className="text-[13px] text-neutral-muted mb-4.5">{prodi} &middot; {kampus}</div>
            <span className="inline-flex items-center gap-1.5 bg-brand-bg text-brand py-1.5 px-3.5 rounded-full text-[12.5px] font-bold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5" stroke="#2B3BAF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Mahasiswa Aktif
            </span>
          </div>

          {/* right */}
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <h3 className="font-display text-[15px] font-extrabold mb-4.5 pb-3 border-b border-neutral-border">Informasi Pribadi</h3>
              <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Nama Lengkap</label>
                  <Input variant="bordered" type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">NIM</label>
                  <Input variant="bordered" type="text" value="200101012" readOnly className="text-neutral-muted cursor-default" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Email</label>
                  <Input variant="bordered" type="email" defaultValue="tih.indriani@uin-mataram.ac.id" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">No. HP</label>
                  <Input variant="bordered" type="text" defaultValue="081234567890" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Program Studi</label>
                  <Input variant="bordered" type="text" value={prodi} onChange={(e) => setProdi(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Asal Kampus</label>
                  <Input variant="bordered" type="text" value={kampus} onChange={(e) => setKampus(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5" style={{ gridColumn: "1/-1" }}>
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Dosen Pembimbing</label>
                  <Input variant="bordered" type="text" value="Dr. Ahmad Fauzi, M.T." readOnly className="text-neutral-muted cursor-default" />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <Button variant="brand" size="custom" className="py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold" onClick={() => alert("Profil berhasil disimpan!")}>Simpan Perubahan</Button>
              </div>
            </div>

            <div className="bg-white border border-neutral-border rounded-4 p-6.5">
              <h3 className="font-display text-[15px] font-extrabold mb-4.5 pb-3 border-b border-neutral-border">Ubah Password</h3>
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Password Saat Ini</label>
                  <Input variant="bordered" type="password" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Password Baru</label>
                  <Input variant="bordered" type="password" placeholder="Minimal 8 karakter" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">Konfirmasi Password Baru</label>
                  <Input variant="bordered" type="password" placeholder="Ulangi password baru" />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "18px" }}>
                <Button variant="brand" size="custom" className="py-2.75 px-6.5 rounded-2.25 text-3.5 font-bold" onClick={() => alert("Password berhasil diubah!")}>Ubah Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
