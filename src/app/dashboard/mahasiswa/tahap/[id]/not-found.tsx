import Link from "next/link";

export default function StageNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <h1 className="font-display text-xl font-extrabold text-neutral-text">
        Tahap tidak ditemukan
      </h1>
      <p className="text-sm text-neutral-muted">
        Tahap yang Anda cari tidak tersedia.
      </p>
      <Link
        href="/dashboard/mahasiswa"
        className="mt-2 rounded-[9px] bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-brand-dark"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
