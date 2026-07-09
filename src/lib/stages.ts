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
  key: string;
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
  icon: LucideIcon;
  fields: StageField[];
  comparison?: StageComparison;
}

// Fallback details when data is not loaded from backend or for mock/dosen views
export const FALLBACK_STAGE_DETAILS: Record<number, { name: string; desc: string; days: number }> = {
  1: {
    name: "Pengajuan Topik Skripsi", days: 14,
    desc: "Mahasiswa mengajukan judul skripsi beserta rumusan masalah."
  },
  2: {
    name: "Penyusunan Proposal Penelitian", days: 14,
    desc: "Susun BAB I–III sebagai dasar proposal yang akan diajukan ke pembimbing."
  },
  3: {
    name: "Konsultasi Dosen Pembimbing (ke-1)", days: 7,
    desc: "Ajukan proposal ke pembimbing untuk mendapatkan masukan pertama."
  },
  4: {
    name: "Revisi Proposal Penelitian", days: 7,
    desc: "Perbaiki proposal sesuai masukan dosen pada konsultasi pertama."
  },
  5: {
    name: "Persiapan dan Ujian Proposal", days: 7,
    desc: "Siapkan berkas dan presentasi untuk ujian proposal penelitian."
  },
  6: {
    name: "Penyusunan Instrumen Penelitian", days: 7,
    desc: "Buat instrumen (kuesioner/wawancara) sesuai metodologi yang telah disetujui."
  },
  7: {
    name: "Konsultasi Dosen Pembimbing (ke-2)", days: 7,
    desc: "Validasikan instrumen penelitian bersama dosen pembimbing."
  },
  8: {
    name: "Pengambilan Data Penelitian", days: 21,
    desc: "Lakukan pengumpulan data di lapangan sesuai instrumen yang telah divalidasi."
  },
  9: {
    name: "Pengolahan Data Penelitian", days: 7,
    desc: "Analisis dan olah data yang telah dikumpulkan menggunakan metode yang dipilih."
  },
  10: {
    name: "Penyusunan BAB IV (Hasil & Pembahasan)", days: 14,
    desc: "Tulis hasil analisis dan pembahasan penelitian secara komprehensif."
  },
  11: {
    name: "Konsultasi Dosen Pembimbing (ke-3)", days: 7,
    desc: "Konsultasikan BAB IV kepada dosen untuk mendapatkan masukan."
  },
  12: {
    name: "Revisi BAB IV", days: 7,
    desc: "Perbaiki BAB IV berdasarkan masukan dari dosen pembimbing."
  },
  13: {
    name: "Penyusunan BAB V (Kesimpulan & Saran)", days: 7,
    desc: "Tulis kesimpulan dan saran berdasarkan temuan penelitian."
  },
  14: {
    name: "Penyusunan BAB I s.d. BAB V (Draft Final)", days: 7,
    desc: "Gabungkan seluruh bab menjadi satu naskah utuh dan periksa konsistensinya."
  },
  15: {
    name: "Konsultasi Dosen Pembimbing (ke-4)", days: 7,
    desc: "Ajukan draft final untuk persetujuan akhir sebelum sidang."
  },
  16: {
    name: "Persiapan Ujian Akhir", days: 7,
    desc: "Lengkapi administrasi sidang dan siapkan berkas pendaftaran ujian akhir."
  },
  17: {
    name: "Ujian Akhir & Revisi Naskah Akhir", days: 7,
    desc: "Ikuti ujian akhir/sidang dan lakukan revisi naskah akhir sesuai masukan penguji."
  }
};

export const STAGES: Stage[] = [
  {
    n: 1, slug: "diskusi-konsep-judul",
    icon: MessageCircle,
    fields: [
      { key: "topik_penelitian", type: "text" },
      { key: "rumusan_masalah", type: "textarea" },
      { key: "judul_penelitian", type: "text" },
      { key: "alasan_penelitian", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 2, slug: "penyusunan-proposal",
    icon: FileText,
    fields: [
      { key: "ringkasan_proposal", type: "textarea" },
      { key: "tujuan_penelitian", type: "textarea" },
      { key: "kontribusi_yang_diharapkan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 3, slug: "konsultasi-pembimbing-1",
    icon: Users,
    fields: [
      { key: "catatan_diskusi", type: "textarea" },
      { key: "pertanyaan_untuk_pembimbing", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 4, slug: "revisi-proposal",
    icon: PenLine,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 5, slug: "persiapan-ujian-proposal",
    icon: Target,
    fields: [
      { key: "pilih_jadwal_ujian", type: "text" },
      { key: "unggah_proposal_final", type: "file" },
      { key: "unggah_ppt_ujian", type: "file" },
    ],
  },
  {
    n: 6, slug: "penyusunan-instrumen",
    icon: ClipboardList,
    fields: [
      { key: "jenis_instrumen", type: "text" },
      { key: "metode_validasi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 7, slug: "konsultasi-pembimbing-2",
    icon: Search,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 8, slug: "pengambilan-data",
    icon: Database,
    fields: [
      { key: "progres_pengambilan_data", type: "text" },
      { key: "jumlah_partisipan", type: "text" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 9, slug: "pengolahan-data",
    icon: Calculator,
    fields: [
      { key: "metode_analisis", type: "text" },
      { key: "ringkasan_temuan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 10, slug: "penyusunan-bab-4",
    icon: BookOpen,
    fields: [
      { key: "temuan_utama", type: "textarea" },
      { key: "ringkasan_pembahasan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 11, slug: "konsultasi-pembimbing-3",
    icon: Users,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 12, slug: "revisi-bab-4",
    icon: PenLine,
    fields: [
      {
        key: "checklist_revisi", type: "readonly-list",
        items: [
          "Perbaikan sistematika penulisan hasil penelitian",
          "Penambahan analisis statistik yang diminta",
          "Revisi interpretasi data sesuai masukan",
          "Pembaruan tabel dan grafik",
          "Koreksi referensi pada Bab IV",
        ],
      },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 13, slug: "penyusunan-bab-5",
    icon: FileText,
    fields: [
      { key: "ringkasan_kesimpulan", type: "textarea" },
      { key: "saran", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 14, slug: "draft-final",
    icon: BookOpen,
    fields: [
      { key: "catatan_draft_final", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 15, slug: "konsultasi-pembimbing-4",
    icon: Users,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 16, slug: "persiapan-ujian-akhir",
    icon: ClipboardList,
    fields: [
      {
        key: "checklist_persyaratan_ujian", type: "readonly-list",
        items: [
          "Naskah tugas akhir telah disetujui oleh pembimbing",
          "Dokumen administrasi lengkap",
          "Slide presentasi sudah siap",
          "Formulir pendaftaran sidang telah diisi",
          "Bukti bebas teori",
        ],
      },
      { key: "unggah_dokumen_persyaratan", type: "file" },
    ],
  },
  {
    n: 17, slug: "ujian-akhir",
    icon: GraduationCap,
    fields: [
      { key: "hasil_ujian", type: "text" },
      { key: "ringkasan_revisi_akhir", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
];

export function getStageBySlug(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slug === slug);
}

/**
 * Converts a snake_case key to a Title Case label.
 * Example: "topik_penelitian" -> "Topik Penelitian"
 */
export function snakeToTitleCase(str: string): string {
  if (!str) return "";
  return str
    .split("_")
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "ppt") return "PPT";
      if (lower === "bab") return "BAB";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Calculates the deadline date from the startedAt date and durationDays.
 */
export function calculateDeadline(startedAt: string | Date, durationDays: number): Date {
  const start = new Date(startedAt);
  return new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000);
}

/**
 * Calculates remaining days from the startedAt date and durationDays.
 */
export function calculateRemainingDays(startedAt: string | Date, durationDays: number): number {
  const deadline = calculateDeadline(startedAt, durationDays);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Helper to get fallback/merged stage metadata.
 */
export function getStageMetadata(
  n: number,
  backendStage?: { name: string; description: string | null; durationDays: number }
) {
  const fallback = FALLBACK_STAGE_DETAILS[n] || { name: `Tahap ${n}`, desc: "", days: 7 };
  return {
    name: backendStage?.name || fallback.name,
    desc: backendStage?.description || fallback.desc,
    days: backendStage?.durationDays || fallback.days,
  };
}
