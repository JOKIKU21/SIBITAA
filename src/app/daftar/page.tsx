import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Daftar Akun - SIBITA",
  description: "Daftar akun SIBITA baru untuk melacak progres tugas akhir dan berdiskusi dengan pembimbing.",
};

export default function DaftarPage() {
  return <AuthForm mode="daftar" />;
}
