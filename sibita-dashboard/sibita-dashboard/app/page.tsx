import { redirect } from "next/navigation";

// Sesuai permintaan: tidak ada landing page atau halaman login.
// Membuka "/" langsung membawa mahasiswa ke dashboard.
export default function RootPage() {
  redirect("/dashboard");
}
