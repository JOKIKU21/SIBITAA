import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIBITA - Sistem Bimbingan Tugas Akhir",
  description:
    "Platform terintegrasi yang membantu mahasiswa dan dosen menyelesaikan skripsi dengan proses yang lebih cepat, rapi, dan terstruktur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
