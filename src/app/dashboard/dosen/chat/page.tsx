import { DosenChatThreadsClient } from "@/components/dashboard/dosen/DosenChatThreadsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Mahasiswa | SIBITA",
};

export default function DosenChatPage() {
  return <DosenChatThreadsClient />;
}
