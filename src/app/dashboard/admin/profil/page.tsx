import type { Metadata } from "next";
import ProfilForm from "@/components/dashboard/ProfilForm";

export const metadata: Metadata = {
  title: "Profil Saya | SIBITA",
};

export default function ProfilAdminPage() {
  return <ProfilForm initialRole="admin" />;
}
