# Spec Design: Redesign Halaman Data Referensi (Mahasiswa & Admin)

**Tanggal:** 23 Juli 2026  
**Status:** Approved by User  
**Target Komponen:**
- `src/components/dashboard/ReferensiClient.tsx` (Halaman Referensi Mahasiswa)
- `src/components/dashboard/admin/ReferensiManager.tsx` (Halaman Kelola Referensi Admin)

---

## 1. Ringkasan Fitur & Tujuan
Melakukan redesign visual dan peningkatan UX pada halaman Data Referensi di SIBITA untuk sisi Mahasiswa dan Admin. Redesign ini bertujuan menyajikan materi referensi tugas akhir (buku, jurnal, panduan, templat) secara modern, intuitif, dan menarik.

---

## 2. Desain Tampilan Mahasiswa (`ReferensiClient.tsx`)

### 2.1 Top Stats Summary Bar
Menampilkan 3 kartu statistik ringkas di bagian atas:
1. **Total Referensi**: Jumlah dokumen yang tersedia.
2. **Panduan & Templat**: Jumlah pedoman dan format penulisan.
3. **Buku & Jurnal**: Jumlah bahan literatur ilmiah.

### 2.2 Search, Filter, & Layout Controls
- **Live Search**: Input pencarian dengan ikon kaca pembesar dan tombol reset.
- **Category Tabs**: Tab kategori filter interaktif (`Semua`, `Panduan`, `Jurnal`, `Buku`, `Templat`, `Contoh`).
- **View Toggle**: Mode tampilan Grid (default 3-kolom) dan Mode List ringkas.

### 2.3 Document Card Grid & List
- **Visual Card**:
  - Badge tipe file visual (PDF / DOCX / MP4) dengan warna kontras sesuai kategori (Panduan: Brand, Buku: Emerald, Jurnal: Purple, Templat: Amber).
  - Judul referensi dengan huruf tebal dan font display.
  - Deskripsi singkat materi.
  - Meta badge: Penulis/Dosen, Ukuran Berkas, Tanggal Upload.
  - Tombol Aksi menggunakan komponen `<Button>` dari `@/components/Button` (`Lihat` dan `Unduh`).
- **Loading & Empty State**:
  - Skeleton grid animasi saat data dimuat.
  - State kosong yang informatif saat pencarian tidak ditemukan.

---

## 3. Desain Tampilan Admin (`ReferensiManager.tsx`)

### 3.1 Admin Stats Overview
Menampilkan ringkasan data referensi admin:
- Total Dokumen Terunggah
- Kategori Referensi Terpopuler
- Total Est. Ukuran Berkas

### 3.2 Form Upload Referensi Modern
- **Card Panel Form**:
  - Input Judul Referensi (`<Input>`).
  - Dropdown Kategori (`Panduan`, `Jurnal`, `Buku`, `Templat`, `Contoh`).
  - Textarea Deskripsi Singkat.
  - Drag-and-drop file uploader dengan komponen `FileUploader`.
  - Tombol aksi `Batal` (`<Button variant="outline-neutral">`) dan `Upload Referensi` (`<Button variant="brand">`).

### 3.3 Daftar & Kelola Referensi
- **Pencarian & Filter Admin**: Live search & dropdown filter per kategori.
- **Card List Dokumen Admin**:
  - Menampilkan judul, deskripsi, nama file, ukuran, dan tanggal upload.
  - Tombol `Pratinjau/Unduh` dan tombol `Hapus` dengan warna `danger-light` dan modal konfirmasi.

---

## 4. Komponen & Arsitektur Kode
- **Komponen Button**: Menggunakan `Button` dari `src/components/Button.tsx`.
- **Komponen Input**: Menggunakan `Input` dari `src/components/Input.tsx`.
- **Komponen FileUploader**: Menggunakan `FileUploader` dari `src/components/FileUploader.tsx`.
- **Hooks & State**: `useReferenceFiles`, `useCreateReferenceFile`, `useDeleteReferenceFile`, `useDebounce`.
- **Styling**: Tailwind CSS dengan skema warna sistem SIBITA (`brand`, `neutral`, `emerald`, `purple`, `amber`).
