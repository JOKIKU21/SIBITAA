// ponytail: adapted from sibita-dashboard reference — lucide icons instead of SVG strings

import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  FileText,
  Users,
  PenLine,
  Target,
  ClipboardList,
  Search,
  Database,
  Calculator,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export type StageFieldType = "text" | "textarea" | "file" | "readonly-list";

export interface StageField {
  label: string;
  type: StageFieldType;
  items?: string[];
}

export interface StageComparison {
  before: string;
  after: string;
}

export interface Stage {
  n: number;
  slug: string;
  name: string;
  days: number;
  desc: string;
  icon: LucideIcon;
  fields: StageField[];
  comparison?: StageComparison;
}

export const STAGES: Stage[] = [
  {
    n: 1, slug: "diskusi-konsep-judul",
    name: "Diskusi Konsep dan Judul Penelitian", days: 7,
    desc: "Diskusikan topik, permasalahan, dan judul penelitian bersama dosen pembimbing.",
    icon: MessageCircle,
    fields: [
      { label: "Topik Penelitian", type: "text" },
      { label: "Permasalahan Penelitian", type: "textarea" },
      { label: "Judul Penelitian", type: "text" },
      { label: "Alasan Penelitian", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 2, slug: "penyusunan-proposal",
    name: "Penyusunan Proposal Penelitian", days: 14,
    desc: "Susun BAB I–III sebagai dasar proposal yang akan diajukan ke pembimbing.",
    icon: FileText,
    fields: [
      { label: "Ringkasan Proposal", type: "textarea" },
      { label: "Tujuan Penelitian", type: "textarea" },
      { label: "Kontribusi yang Diharapkan", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 3, slug: "konsultasi-pembimbing-1",
    name: "Konsultasi Dosen Pembimbing (ke-1)", days: 7,
    desc: "Ajukan proposal ke pembimbing untuk mendapatkan masukan pertama.",
    icon: Users,
    fields: [
      { label: "Catatan Diskusi", type: "textarea" },
      { label: "Pertanyaan untuk Pembimbing", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 4, slug: "revisi-proposal",
    name: "Revisi Proposal Penelitian", days: 7,
    desc: "Perbaiki proposal sesuai masukan dosen pada konsultasi pertama.",
    icon: PenLine,
    fields: [
      { label: "Ringkasan Revisi", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
    comparison: {
      before: "Bab I masih belum mencakup latar belakang yang komprehensif. Pernyataan masalah kurang spesifik dan tujuan penelitian belum terukur.",
      after: "Bab I telah diperluas dengan latar belakang yang kuat. Pernyataan masalah diperinci dan tujuan penelitian menggunakan indikator yang terukur.",
    },
  },
  {
    n: 5, slug: "persiapan-ujian-proposal",
    name: "Persiapan dan Ujian Proposal", days: 7,
    desc: "Siapkan berkas dan presentasi untuk ujian proposal penelitian.",
    icon: Target,
    fields: [
      { label: "Pilih Jadwal Ujian", type: "text" },
      { label: "Unggah Proposal Final", type: "file" },
      { label: "Unggah PPT Ujian", type: "file" },
    ],
  },
  {
    n: 6, slug: "penyusunan-instrumen",
    name: "Penyusunan Instrumen Penelitian", days: 7,
    desc: "Buat instrumen (kuesioner/wawancara) sesuai metodologi yang telah disetujui.",
    icon: ClipboardList,
    fields: [
      { label: "Jenis Instrumen", type: "text" },
      { label: "Metode Validasi", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 7, slug: "konsultasi-pembimbing-2",
    name: "Konsultasi Dosen Pembimbing (ke-2)", days: 7,
    desc: "Validasikan instrumen penelitian bersama dosen pembimbing.",
    icon: Search,
    fields: [
      { label: "Ringkasan Revisi", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
    comparison: {
      before: "Instrumen penelitian masih belum sepenuhnya mencerminkan indikator pada variabel penelitian. Beberapa butir pertanyaan bersifat ambigu dan berpotensi menimbulkan interpretasi ganda.",
      after: "Instrumen telah disesuaikan dengan indikator variabel penelitian. Redaksi pertanyaan diperjelas sehingga lebih mudah dipahami dan meminimalkan bias interpretasi.",
    },
  },
  {
    n: 8, slug: "pengambilan-data",
    name: "Pengambilan Data Penelitian", days: 21,
    desc: "Lakukan pengumpulan data di lapangan sesuai instrumen yang telah divalidasi.",
    icon: Database,
    fields: [
      { label: "Progres Pengambilan Data", type: "text" },
      { label: "Jumlah Partisipan", type: "text" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 9, slug: "pengolahan-data",
    name: "Pengolahan Data Penelitian", days: 7,
    desc: "Analisis dan olah data yang telah dikumpulkan menggunakan metode yang dipilih.",
    icon: Calculator,
    fields: [
      { label: "Metode Analisis", type: "text" },
      { label: "Ringkasan Temuan", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 10, slug: "penyusunan-bab-4",
    name: "Penyusunan BAB IV (Hasil & Pembahasan)", days: 14,
    desc: "Tulis hasil analisis dan pembahasan penelitian secara komprehensif.",
    icon: BookOpen,
    fields: [
      { label: "Temuan Utama", type: "textarea" },
      { label: "Ringkasan Pembahasan", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 11, slug: "konsultasi-pembimbing-3",
    name: "Konsultasi Dosen Pembimbing (ke-3)", days: 7,
    desc: "Konsultasikan BAB IV kepada dosen untuk mendapatkan masukan.",
    icon: Users,
    fields: [
      { label: "Ringkasan Revisi", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
    comparison: {
      before: "Tabel dan grafik telah disajikan, namun beberapa visualisasi belum memiliki interpretasi yang memadai. Pembaca masih kesulitan memahami makna dari data yang ditampilkan.",
      after: "Setiap tabel dan grafik telah dilengkapi dengan interpretasi yang jelas serta penjelasan mengenai implikasi hasil penelitian, sehingga informasi yang disajikan lebih mudah dipahami.",
    },
  },
  {
    n: 12, slug: "revisi-bab-4",
    name: "Revisi BAB IV", days: 7,
    desc: "Perbaiki BAB IV berdasarkan masukan dari dosen pembimbing.",
    icon: PenLine,
    fields: [
      {
        label: "Checklist Revisi", type: "readonly-list",
        items: [
          "Perbaikan sistematika penulisan hasil penelitian",
          "Penambahan analisis statistik yang diminta",
          "Revisi interpretasi data sesuai masukan",
          "Pembaruan tabel dan grafik",
          "Koreksi referensi pada Bab IV",
        ],
      },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 13, slug: "penyusunan-bab-5",
    name: "Penyusunan BAB V (Kesimpulan & Saran)", days: 7,
    desc: "Tulis kesimpulan dan saran berdasarkan temuan penelitian.",
    icon: FileText,
    fields: [
      { label: "Ringkasan Kesimpulan", type: "textarea" },
      { label: "Saran", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 14, slug: "draft-final",
    name: "Penyusunan BAB I s.d. BAB V (Draft Final)", days: 7,
    desc: "Gabungkan seluruh bab menjadi satu naskah utuh dan periksa konsistensinya.",
    icon: BookOpen,
    fields: [
      { label: "Catatan Draft Final", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 15, slug: "konsultasi-pembimbing-4",
    name: "Konsultasi Dosen Pembimbing (ke-4)", days: 7,
    desc: "Ajukan draft final untuk persetujuan akhir sebelum sidang.",
    icon: Users,
    fields: [
      { label: "Ringkasan Revisi", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
  {
    n: 16, slug: "ujian-akhir",
    name: "Persiapan Ujian Akhir & Revisi Naskah Akhir", days: 7,
    desc: "Lengkapi administrasi sidang, ikuti ujian akhir, dan revisi naskah sesuai catatan penguji.",
    icon: GraduationCap,
    fields: [
      {
        label: "Checklist Persyaratan Ujian", type: "readonly-list",
        items: [
          "Naskah tugas akhir telah disetujui oleh pembimbing",
          "Dokumen administrasi lengkap",
          "Slide presentasi sudah siap",
          "Formulir pendaftaran sidang telah diisi",
          "Bukti bebas teori",
        ],
      },
      { label: "Hasil Ujian", type: "text" },
      { label: "Ringkasan Revisi Akhir", type: "textarea" },
      { label: "Unggah Dokumen", type: "file" },
    ],
  },
];

export function getStageBySlug(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slug === slug);
}
