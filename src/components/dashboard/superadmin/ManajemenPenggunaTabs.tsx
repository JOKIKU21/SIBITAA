"use client";

// ponytail: manajemen admin with inline edit + add admin modal
import { useState } from "react";
import { ADMIN_LIST, type AdminItem } from "@/lib/superadmin-data";

export function ManajemenPenggunaTabs() {
  const [admins, setAdmins] = useState<AdminItem[]>(ADMIN_LIST);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editEmail, setEditEmail] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNama, setNewNama] = useState("");
  const [newEmail, setNewEmail] = useState("");

  function startEdit(admin: AdminItem) {
    setEditingId(admin.id);
    setEditNama(admin.nama);
    setEditEmail(admin.email);
  }

  function saveEdit() {
    if (!editingId) return;
    setAdmins(admins.map((a) =>
      a.id === editingId ? { ...a, nama: editNama, email: editEmail } : a
    ));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleAddAdmin() {
    if (!newNama || !newEmail) {
      alert("Lengkapi semua field yang wajib diisi.");
      return;
    }
    
    const newAdmin: AdminItem = {
      id: `adm-${Date.now()}`,
      nama: newNama,
      email: newEmail,
      tanggalDibuat: "Hari ini",
      loginTerakhir: "Belum login",
      status: "aktif",
      avatarColor: "from-brand to-brand-dark"
    };

    setAdmins([...admins, newAdmin]);
    alert(`Admin "${newNama}" berhasil ditambahkan!\nPassword default dikirim ke: ${newEmail}`);
    
    setNewNama("");
    setNewEmail("");
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border">
          <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Semua Admin</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand text-white border-none text-[12.5px] font-bold py-2 px-4 rounded-2 cursor-pointer hover:bg-brand-dark transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Tambah Admin
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-border bg-neutral-bg/50">
                <th className="py-3 px-6 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Admin</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Email</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Tanggal Dibuat</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Login Terakhir</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Status</th>
                <th className="py-3 px-4 text-[12px] font-bold text-neutral-muted uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                const isEditing = editingId === admin.id;
                return (
                  <tr key={admin.id} className="border-b border-neutral-border last:border-b-0 hover:bg-neutral-bg/30 transition-colors duration-150">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-linear-to-br ${admin.avatarColor} flex items-center justify-center text-[13px] font-bold text-white shrink-0`}>
                          {(isEditing ? editNama : admin.nama).charAt(0)}
                        </div>
                        <div>
                          {isEditing ? (
                            <input
                              className="bg-neutral-bg border-[1.5px] border-brand-light rounded-1.5 py-1 px-2.5 text-[13px] font-bold outline-none w-40"
                              value={editNama}
                              onChange={(e) => setEditNama(e.target.value)}
                              autoFocus
                            />
                          ) : (
                            <div className="text-[13.5px] font-bold text-neutral-text">{admin.nama}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          className="bg-neutral-bg border-[1.5px] border-brand-light rounded-1.5 py-1 px-2.5 text-[13px] outline-none w-52"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                      ) : (
                        <span className="text-[13px] text-neutral-muted">{admin.email}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{admin.tanggalDibuat}</td>
                    <td className="py-3.5 px-4 text-[13px] text-neutral-muted">{admin.loginTerakhir}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[12px] font-bold ${admin.status === "aktif" ? "text-success" : "text-neutral-muted"}`}>
                        <span className={`w-2 h-2 rounded-full ${admin.status === "aktif" ? "bg-success" : "bg-neutral-light"}`} />
                        {admin.status === "aktif" ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={saveEdit} className="bg-brand text-white text-[11.5px] font-bold py-1.5 px-3 rounded-1.5 border-none cursor-pointer hover:bg-brand-dark transition-colors duration-150">
                            Simpan
                          </button>
                          <button type="button" onClick={cancelEdit} className="bg-transparent text-neutral-muted text-[11.5px] font-bold py-1.5 px-3 rounded-1.5 border border-neutral-border cursor-pointer hover:bg-neutral-bg transition-colors duration-150">
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => startEdit(admin)} className="bg-transparent border border-neutral-border text-neutral-text text-[12.5px] font-bold py-1.5 px-3.5 rounded-2 cursor-pointer hover:bg-neutral-bg transition-colors duration-150">
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-4 w-full max-w-125 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-border">
              <h3 className="font-display text-[16px] font-extrabold text-neutral-text">Tambahkan Admin Baru</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-bg hover:bg-neutral-border text-neutral-muted hover:text-neutral-text transition-colors cursor-pointer border-none"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Nama Lengkap <span className="text-danger">*</span>
                  </label>
                  <input
                    className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                    type="text"
                    placeholder="Nama Lengkap, Gelar"
                    value={newNama}
                    onChange={(e) => setNewNama(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[12.5px] font-semibold text-neutral-muted">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className="bg-neutral-bg border-[1.5px] border-neutral-border rounded-2.25 py-2.75 px-3.5 text-3.5 outline-none transition-[border-color] duration-200 font-sans focus:border-brand-light"
                    type="email"
                    placeholder="nama@uin-mataram.ac.id"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>

                {/* Password info */}
                <div className="flex items-center gap-2 bg-warning-bg/50 text-warning text-[12.5px] font-medium py-2.5 px-3.5 rounded-2 mt-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Password default akan dikirim ke email: <span className="font-bold">12345678</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-transparent border border-neutral-border text-neutral-text text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-neutral-bg transition-colors duration-150">
                  Batal
                </button>
                <button type="button" onClick={handleAddAdmin} className="bg-brand text-white border-none text-[13px] font-bold py-2.5 px-5 rounded-2.25 cursor-pointer hover:bg-brand-dark transition-colors duration-200">
                  Simpan Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
