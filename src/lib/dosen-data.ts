// ponytail: dummy data for dosen dashboard — frontend only
import { STAGES } from "./stages";
export interface MahasiswaBimbingan {
  userId: string; // PK from student_profile
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  tahapanAktif: number;
  tahapanNama: string;
  status: "aktif" | "mendekati-tenggat" | "terlambat";
  progress: number; // 0-100
  avatarColor: string;
}

export interface DosenProfile {
  nama: string;
  nidn: string;
  email: string;
  prodi: string;
}

export const DOSEN_PROFILE: DosenProfile = {
  nama: "Dr. Rizal Fauzi, M.Kom",
  nidn: "0012345678",
  email: "rizal.fauzi@uin-mataram.ac.id",
  prodi: "Sistem Informasi",
};

export const MAHASISWA_BIMBINGAN: MahasiswaBimbingan[] = [
  {
    userId: "usr_af032",
    nim: "210101032",
    nama: "Ahmad Fauzi",
    prodi: "Sistem Informasi",
    judul: "Implementasi JWT pada REST API Node.js",
    tahapanAktif: 11,
    tahapanNama: "Konsultasi ke-3",
    status: "aktif",
    progress: 75,
    avatarColor: "from-[#818CF8] to-[#6366F1]",
  },
  {
    userId: "usr_sr045",
    nim: "210101045",
    nama: "Siti Rahayu",
    prodi: "Teknik Informatika",
    judul: "Analisis Sentimen Ulasan Aplikasi Mobile",
    tahapanAktif: 9,
    tahapanNama: "Pengujian & Analisis Data",
    status: "mendekati-tenggat",
    progress: 42,
    avatarColor: "from-[#A78BFA] to-[#7C3AED]",
  },
  {
    userId: "usr_bs078",
    nim: "210101078",
    nama: "Budi Santoso",
    prodi: "Sistem Informasi",
    judul: "Rancang Bangun Sistem Informasi Perpustakaan",
    tahapanAktif: 5,
    tahapanNama: "Seminar Proposal",
    status: "aktif",
    progress: 30,
    avatarColor: "from-[#34D399] to-[#059669]",
  },
  {
    userId: "usr_rw091",
    nim: "210101091",
    nama: "Rina Wulandari",
    prodi: "Teknik Informatika",
    judul: "Pengembangan Chatbot Akademik Berbasis NLP",
    tahapanAktif: 3,
    tahapanNama: "Bimbingan Proposal",
    status: "mendekati-tenggat",
    progress: 18,
    avatarColor: "from-[#F472B6] to-[#EC4899]",
  },
  {
    userId: "usr_hg056",
    nim: "210101056",
    nama: "Hendra Gunawan",
    prodi: "Sistem Informasi",
    judul: "Sistem Monitoring IoT untuk Smart Farming",
    tahapanAktif: 2,
    tahapanNama: "Pengajuan Judul",
    status: "terlambat",
    progress: 8,
    avatarColor: "from-[#FB923C] to-[#EA580C]",
  },
  {
    userId: "usr_dl023",
    nim: "210101023",
    nama: "Dewi Lestari",
    prodi: "Teknik Informatika",
    judul: "Klasifikasi Citra Penyakit Tanaman dengan CNN",
    tahapanAktif: 14,
    tahapanNama: "Penyusunan Laporan Akhir",
    status: "aktif",
    progress: 88,
    avatarColor: "from-[#2DD4BF] to-[#0D9488]",
  },
  {
    userId: "usr_fp067",
    nim: "210101067",
    nama: "Fajar Pratama",
    prodi: "Sistem Informasi",
    judul: "Aplikasi E-Commerce UMKM Berbasis Web",
    tahapanAktif: 7,
    tahapanNama: "Implementasi Sistem",
    status: "aktif",
    progress: 50,
    avatarColor: "from-[#60A5FA] to-[#2563EB]",
  },
  {
    userId: "usr_nh089",
    nim: "210101089",
    nama: "Nur Hidayah",
    prodi: "Teknik Informatika",
    judul: "Deteksi Objek Real-time dengan YOLOv8",
    tahapanAktif: 6,
    tahapanNama: "Revisi Proposal",
    status: "aktif",
    progress: 38,
    avatarColor: "from-[#FBBF24] to-[#D97706]",
  },
  {
    userId: "usr_ra034",
    nim: "210101034",
    nama: "Rizky Aditya",
    prodi: "Sistem Informasi",
    judul: "Dashboard Analitik Data Penjualan",
    tahapanAktif: 12,
    tahapanNama: "Bimbingan Skripsi ke-1",
    status: "aktif",
    progress: 70,
    avatarColor: "from-[#C084FC] to-[#9333EA]",
  },
  {
    userId: "usr_ap012",
    nim: "210101012",
    nama: "Anisa Putri",
    prodi: "Teknik Informatika",
    judul: "Sistem Rekomendasi Film dengan Collaborative Filtering",
    tahapanAktif: 16,
    tahapanNama: "Sidang Skripsi",
    status: "aktif",
    progress: 95,
    avatarColor: "from-[#6FE3A6] to-[#16A34A]",
  },
  {
    userId: "usr_yp099",
    nim: "210101099",
    nama: "Yoga Permana",
    prodi: "Sistem Informasi",
    judul: "Integrasi Payment Gateway pada Aplikasi Mobile",
    tahapanAktif: 4,
    tahapanNama: "Penyusunan Proposal",
    status: "mendekati-tenggat",
    progress: 22,
    avatarColor: "from-[#F87171] to-[#DC2626]",
  },
  {
    userId: "usr_ms041",
    nim: "210101041",
    nama: "Maya Sari",
    prodi: "Teknik Informatika",
    judul: "Prediksi Cuaca dengan Machine Learning",
    tahapanAktif: 10,
    tahapanNama: "Analisis Hasil",
    status: "aktif",
    progress: 62,
    avatarColor: "from-[#38BDF8] to-[#0284C7]",
  },
];

// ponytail: derived stats from data
export function getDosenStats() {
  const total = MAHASISWA_BIMBINGAN.length;
  const aktif = MAHASISWA_BIMBINGAN.filter((m) => m.status === "aktif").length;
  const mendekatTenggat = MAHASISWA_BIMBINGAN.filter((m) => m.status === "mendekati-tenggat").length;
  const terlambat = MAHASISWA_BIMBINGAN.filter((m) => m.status === "terlambat").length;
  const selesai = MAHASISWA_BIMBINGAN.filter((m) => m.progress >= 90).length;
  return { total, aktif, mendekatTenggat, terlambat, selesai };
}

// ponytail: group mahasiswa by tahapan for bar chart
export function getTahapanDistribution() {
  const groups: Record<string, { aktif: number; mendekatTenggat: number; terlambat: number }> = {};
  for (const m of MAHASISWA_BIMBINGAN) {
    const key = `Tahap ${m.tahapanAktif}`;
    if (!groups[key]) groups[key] = { aktif: 0, mendekatTenggat: 0, terlambat: 0 };
    if (m.status === "aktif") groups[key].aktif++;
    else if (m.status === "mendekati-tenggat") groups[key].mendekatTenggat++;
    else groups[key].terlambat++;
  }
  return groups;
}

export function getMahasiswaByUserId(userId: string) {
  return MAHASISWA_BIMBINGAN.find((m) => m.userId === userId) ?? null;
}

// ponytail: mock submission data dynamically generated from stage fields
export function getSubmissionByUserIdAndStage(userId: string, stageN: number) {
  const stage = STAGES.find(s => s.n === stageN);
  if (!stage) return [];
  
  return stage.fields
    .filter(f => f.type !== "file")
    .map(f => {
      let val = `Mahasiswa (${userId}) telah mengisi bagian ${f.label} pada tahapan ini. Ini adalah data dummy yang digenerate otomatis berdasarkan tipe field.`;
      
      // Override specific values based on field type
      if (f.type === "readonly-list" && f.items) {
        val = f.items.map(i => `✓ ${i}`).join("\n");
      }
      
      return {
        label: f.label,
        value: val
      };
    });
}

export function getFilesByUserIdAndStage(userId: string, stageN: number) {
  const stage = STAGES.find(s => s.n === stageN);
  if (!stage) return [];
  
  return stage.fields
    .filter(f => f.type === "file")
    .map((f, i) => ({
      name: `${f.label.replace(/\s+/g, "_")}_${userId}_v1.pdf`,
      url: "#",
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`
    }));
}
