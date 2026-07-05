import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Masuk - SIBITA",
  description: "Masuk ke akun SIBITA Anda untuk mengelola bimbingan tugas akhir.",
};

export default function MasukPage() {
  return <AuthForm mode="masuk" />;
}
