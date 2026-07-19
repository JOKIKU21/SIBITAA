import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "SIBITA - Sistem Bimbingan Tugas Akhir",
    template: "%s | SIBITA",
  },
  description:
    "Platform terintegrasi yang membantu mahasiswa dan dosen menyelesaikan skripsi dengan proses yang lebih cepat, rapi, dan terstruktur.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SIBITA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SIBITA - Sistem Bimbingan Tugas Akhir",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
