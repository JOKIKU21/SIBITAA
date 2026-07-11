"use client";

import Link from "next/link";
import { Paperclip, ChevronRight, MessageSquare, AlertCircle } from "lucide-react";
import { useLecturerChatThreads } from "@/hooks/useLecturer";

const AVATAR_GRADIENTS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#A78BFA] to-[#7C3AED]",
  "from-[#34D399] to-[#059669]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#2DD4BF] to-[#0D9488]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#FBBF24] to-[#D97706]",
  "from-[#C084FC] to-[#9333EA]",
  "from-[#6FE3A6] to-[#16A34A]",
  "from-[#F87171] to-[#DC2626]",
  "from-[#38BDF8] to-[#0284C7]",
];

const getAvatarColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
};

function formatMessageTime(dateString?: string) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    const timeStr = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check if it is today
    if (date.toDateString() === now.toDateString()) {
      return `Hari ini, ${timeStr}`;
    }
    
    // Check if it is yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Kemarin, ${timeStr}`;
    }
    
    // Default format: d Mmm yyyy, HH:MM
    const dateStr = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    
    return `${dateStr}, ${timeStr}`;
  } catch (e) {
    return "";
  }
}

export function DosenChatThreadsClient() {
  const { data: threadsData, isLoading, error } = useLecturerChatThreads();

  const threads = threadsData?.threads ?? [];

  if (isLoading) {
    return (
      <div className="p-7 max-[600px]:p-4">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 w-64 bg-neutral-200 rounded animate-pulse mb-2" />
          <div className="h-4.5 w-96 bg-neutral-100 rounded animate-pulse" />
        </div>

        {/* Threads List Skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-border rounded-3.5 p-5 flex items-center gap-4 animate-pulse"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-200 shrink-0" />
              <div className="flex-1">
                <div className="h-4.5 w-40 bg-neutral-200 rounded mb-2" />
                <div className="h-4 w-72 bg-neutral-100 rounded" />
              </div>
              <div className="w-16 h-4 bg-neutral-100 rounded self-start" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-7 max-[600px]:p-4">
        <div className="flex flex-col items-center justify-center py-16 bg-white border border-neutral-border rounded-3.5 text-center px-4">
          <AlertCircle className="w-12 h-12 text-danger mb-4" />
          <h3 className="font-display text-4.5 font-extrabold text-neutral-text mb-1">
            Gagal Memuat Percakapan
          </h3>
          <p className="text-3.5 text-neutral-muted max-w-sm">
            Terjadi kesalahan saat mengambil daftar chat mahasiswa bimbingan Anda. Silakan coba beberapa saat lagi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="p-7 max-[600px]:p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">
            Chat Mahasiswa
          </h2>
          <p className="text-3.5 text-neutral-muted">
            Pantau dan balas pesan bimbingan mahasiswa Anda pada tiap tahapan tugas akhir.
          </p>
        </div>

        {/* Threads List */}
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-neutral-border rounded-3.5 text-center px-4">
            <MessageSquare className="w-12 h-12 text-neutral-light mb-4" />
            <h3 className="font-display text-4.5 font-extrabold text-neutral-text mb-1">
              Tidak Ada Percakapan
            </h3>
            <p className="text-3.5 text-neutral-muted max-w-sm">
              Belum ada mahasiswa yang memulai percakapan bimbingan.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {threads.map((thread) => {
              const latestMsg = thread.latestMessage;
              const hasFile = latestMsg?.fileName || latestMsg?.fileUrl;
              const avatarBg = getAvatarColor(thread.student.userId);
              const destinationStageOrder = latestMsg?.stageOrder || 1;
              const destinationUrl = `/dashboard/dosen/bimbingan/${thread.student.userId}/tahap/${destinationStageOrder}`;

              return (
                <Link
                  key={thread.student.userId}
                  href={destinationUrl}
                  className="bg-white border border-neutral-border rounded-3.5 p-4.5 flex items-center gap-4 transition-all duration-200 hover:border-brand hover:shadow-md group cursor-pointer"
                >
                  {/* Student Avatar */}
                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-linear-to-br ${avatarBg} flex items-center justify-center text-4.5 font-bold text-white overflow-hidden shadow-inner`}>
                      {thread.student.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thread.student.image}
                          alt={thread.student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        thread.student.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    {thread.totalMessages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        {thread.totalMessages}
                      </span>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h4 className="text-[14.5px] font-bold text-neutral-text group-hover:text-brand transition-colors truncate">
                        {thread.student.name}
                      </h4>
                      {latestMsg?.createdAt && (
                        <span className="text-[11.5px] text-neutral-muted whitespace-nowrap">
                          {formatMessageTime(latestMsg.createdAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="inline-block bg-brand-bg text-brand text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        Tahap {destinationStageOrder}
                      </span>
                      {latestMsg?.stage?.name && (
                        <span className="text-[12px] text-neutral-muted font-medium truncate">
                          {latestMsg.stage.name}
                        </span>
                      )}
                    </div>

                    <p className="text-[13px] text-neutral-muted truncate max-w-full flex items-center gap-1">
                      {hasFile && <Paperclip className="w-3.5 h-3.5 shrink-0 text-brand" />}
                      {latestMsg ? (
                        <span>
                          {hasFile ? (
                            <span className="font-medium text-brand-light">
                              {latestMsg.message ? `${latestMsg.message} (${latestMsg.fileName})` : latestMsg.fileName}
                            </span>
                          ) : (
                            latestMsg.message
                          )}
                        </span>
                      ) : (
                        <span className="italic">Belum ada pesan terkirim.</span>
                      )}
                    </p>
                  </div>

                  {/* Action Icon */}
                  <div className="text-neutral-light group-hover:text-brand transition-colors pl-2">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
