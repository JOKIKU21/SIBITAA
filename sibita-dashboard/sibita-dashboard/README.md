# SIBITA — Dashboard Mahasiswa (Next.js + Tailwind)

Dashboard mahasiswa untuk aplikasi SIBITA, dibangun dengan **Next.js (App Router)**,
**TypeScript**, dan **Tailwind CSS**. Desain visual mengikuti `sibita.html`
(warna, tipografi, layout sidebar/topbar/timeline), sementara konten tiap
tahap diambil dari form-form pada `index__6_.html`.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` — akan langsung redirect ke `/dashboard` (tidak
ada landing page atau halaman login).

## Struktur

```
app/
  layout.tsx                  Root layout (Server Component, load font)
  page.tsx                    Redirect "/" -> "/dashboard"
  dashboard/
    layout.tsx                Sidebar + satu-satunya client Provider
    page.tsx                  Halaman utama: daftar 16 tahap (timeline)
    tahap/[id]/
      page.tsx                Halaman detail per tahap (redirect target
                               saat sebuah tahap di-klik dari timeline)
      not-found.tsx

components/
  layout/       Sidebar, Topbar        — Server Components statis
  dashboard/    OverallCard, TimelineList, StageCard, StatusBadge
  stage/        StageHeader, StageFieldList, CompareRevision, MarkDoneButton
  providers/    ProgressProvider       — satu-satunya "use client" state

lib/
  stages.ts         Data 16 tahap (field & konten dari index__6_.html)
  stage-status.ts   Fungsi murni: window tanggal, status tahap, format
```

## Keputusan desain (mengikuti permintaan)

- **Tidak ada checklist tugas** — panel "Daftar Tugas" dari `sibita.html`
  dan `index__6_.html` dihilangkan sepenuhnya.
- **Tidak ada persentase** — baik progres per-tahap maupun progres
  keseluruhan. Status tahap (`belum-mulai` / `berlangsung` / `selesai`)
  dihitung murni dari urutan penyelesaian, bukan dari isian formulir.
- **Isi tiap tahap** diambil dari field-field form pada `index__6_.html`
  (mis. "Topik Penelitian", "Ringkasan Proposal", "Checklist Revisi", dsb),
  ditampilkan sebagai info read-only pada halaman detail tahap.
- **Setiap tahap = halaman sendiri** (`/dashboard/tahap/[slug]`), di-generate
  statis lewat `generateStaticParams` — klik kartu tahap di timeline akan
  redirect ke halaman tersebut, sesuai pola `index__6_.html`.
- **Dashboard mahasiswa langsung** — tidak ada landing page maupun login;
  `/` langsung redirect ke `/dashboard`.
- **Penomoran 2 digit tebal** — `formatStageNumber()` menghasilkan `01`–`16`,
  ditampilkan besar & bold (`font-extrabold`, warna brand) di setiap kartu.
- **Minim `use client`** — hanya 3 client component di seluruh app:
  `ProgressProvider` (state), `TimelineList` (baca status), `OverallCard`
  (baca jumlah selesai), dan `MarkDoneButton` (aksi tandai selesai +
  redirect). Semua layout, data-fetching, dan rendering lain adalah Server
  Component murni untuk performa terbaik (HTML statis, bundle JS minimal).
- **Reusable components** — `StatusBadge`, `StageCard`, `StageFieldList`,
  `CompareRevision`, `Sidebar`, `Topbar` dipakai ulang di dashboard maupun
  halaman detail tahap.

## Catatan

Status "selesai" disimpan di `localStorage` browser lewat `ProgressProvider`
(tanpa backend/database), sehingga progres bertahan selama browser yang sama
dipakai. Untuk produksi sungguhan, ganti `ProgressProvider` agar membaca/menulis
progres dari API atau database (Server Action / Route Handler).
