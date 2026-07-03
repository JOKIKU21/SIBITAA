import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIBITA — Dashboard Mahasiswa",
  description: "Dashboard Bimbingan Tugas Akhir untuk Mahasiswa",
};

// Root layout tetap Server Component murni — tidak ada "use client" di sini,
// sehingga HTML awal selalu dirender di server untuk performa terbaik.
// Font dimuat lewat <link> (sama seperti sibita.html) alih-alih next/font,
// supaya build tidak bergantung pada akses ke Google Fonts saat proses build.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
