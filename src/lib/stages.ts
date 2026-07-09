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
  icon: LucideIcon;
  fields: StageField[];
  comparison?: StageComparison;
}


export const STAGES: Stage[] = [
  {
    n: 1,
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
    n: 2,
    icon: FileText,
    fields: [
      { key: "ringkasan_proposal", type: "textarea" },
      { key: "tujuan_penelitian", type: "textarea" },
      { key: "kontribusi_yang_diharapkan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 3,
    icon: Users,
    fields: [
      { key: "catatan_diskusi", type: "textarea" },
      { key: "pertanyaan_untuk_pembimbing", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 4,
    icon: PenLine,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 5,
    icon: Target,
    fields: [
      { key: "pilih_jadwal_ujian", type: "text" },
      { key: "unggah_proposal_final", type: "file" },
      { key: "unggah_ppt_ujian", type: "file" },
    ],
  },
  {
    n: 6,
    icon: ClipboardList,
    fields: [
      { key: "jenis_instrumen", type: "text" },
      { key: "metode_validasi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 7,
    icon: Search,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 8,
    icon: Database,
    fields: [
      { key: "progres_pengambilan_data", type: "text" },
      { key: "jumlah_partisipan", type: "text" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 9,
    icon: Calculator,
    fields: [
      { key: "metode_analisis", type: "text" },
      { key: "ringkasan_temuan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 10,
    icon: BookOpen,
    fields: [
      { key: "temuan_utama", type: "textarea" },
      { key: "ringkasan_pembahasan", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 11,
    icon: Users,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 12,
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
    n: 13,
    icon: FileText,
    fields: [
      { key: "ringkasan_kesimpulan", type: "textarea" },
      { key: "saran", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 14,
    icon: BookOpen,
    fields: [
      { key: "catatan_draft_final", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 15,
    icon: Users,
    fields: [
      { key: "ringkasan_revisi", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
  {
    n: 16,
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
    n: 17,
    icon: GraduationCap,
    fields: [
      { key: "hasil_ujian", type: "text" },
      { key: "ringkasan_revisi_akhir", type: "textarea" },
      { key: "unggah_dokumen", type: "file" },
    ],
  },
];


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
  return {
    name: backendStage?.name || `Tahap ${n}`,
    desc: backendStage?.description || "",
    days: backendStage?.durationDays || 7,
  };
}
