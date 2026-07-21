"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Plus, ArrowUp, Paperclip, X, Loader2, FileText, FileVideo, FileAudio, Image as ImageIcon, File as FileIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useLecturerChatMessages, useLecturerSendChatMessage } from "@/hooks/useLecturer";
import { apiUpload } from "@/lib/api-client";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface DosenChatPanelProps {
  stageId?: string;
  studentId: string;
  readOnly?: boolean;
}

interface AttachedFile {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export function DosenChatPanel({ stageId, studentId, readOnly = false }: DosenChatPanelProps) {
  const [msg, setMsg] = useState("");
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  // Lecturer hooks
  const lecturerChat = useLecturerChatMessages(studentId, stageId);
  const lecturerSend = useLecturerSendChatMessage();

  const chatData = lecturerChat.data;
  const isLoading = lecturerChat.isLoading;

  const messages = useMemo(() => chatData?.messages || [], [chatData?.messages]);
  const student = (chatData as any)?.student;

  // Auto scroll to bottom when messages load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const res = await apiUpload(file, "chat");
      setAttachedFile({
        fileName: res.fileName || file.name,
        fileUrl: res.fileUrl,
        fileType: res.fileType || file.type,
        fileSize: res.fileSize || file.size,
      });
    } catch (err: any) {
      setUploadError(err?.message || "Gagal mengunggah berkas");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSend = () => {
    if ((!msg.trim() && !attachedFile) || !stageId) return;

    const payload: any = {};
    if (msg.trim()) payload.message = msg.trim();
    if (attachedFile) {
      payload.fileName = attachedFile.fileName;
      payload.fileUrl = attachedFile.fileUrl;
      payload.fileType = attachedFile.fileType;
      payload.fileSize = attachedFile.fileSize;
    }

    lecturerSend.mutate(
      {
        studentId,
        stageId,
        payload,
      },
      {
        onSuccess: () => {
          setMsg("");
          setAttachedFile(null);
        },
      }
    );
  };

  const chats = useMemo(() => {
    return messages.map((m) => {
      const dateObj = new Date(m.createdAt);
      const timeFormatted = dateObj.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: m.id,
        text: m.message || "",
        fileName: m.fileName,
        fileUrl: m.fileUrl,
        fileType: m.fileType,
        fileSize: m.fileSize,
        time: timeFormatted,
        me: m.senderId === currentUserId,
        senderName: m.sender?.name || "Pengguna",
        senderImage: m.sender?.image || "",
      };
    });
  }, [messages, currentUserId]);

  const isPending = lecturerSend.isPending;

  const renderAttachment = (c: typeof chats[0]) => {
    if (!c.fileUrl && !c.fileName) return null;
    const fileName = c.fileName || "Berkas Lampiran";
    const ext = fileName.split(".").pop()?.toUpperCase() || "FILE";
    const extLower = ext.toLowerCase();

    const getIcon = () => {
      if (extLower === "pdf") return <FileText size={16} className={c.me ? "text-red-200 shrink-0" : "text-danger shrink-0"} />;
      if (extLower === "docx" || extLower === "doc") return <FileText size={16} className={c.me ? "text-blue-200 shrink-0" : "text-brand shrink-0"} />;
      if (["png", "jpg", "jpeg", "webp"].includes(extLower)) return <ImageIcon size={16} className={c.me ? "text-amber-200 shrink-0" : "text-amber-500 shrink-0"} />;
      if (["mp3", "m4a", "wav", "aac", "ogg"].includes(extLower)) return <FileAudio size={16} className={c.me ? "text-purple-200 shrink-0" : "text-purple-500 shrink-0"} />;
      if (extLower === "mp4") return <FileVideo size={16} className={c.me ? "text-emerald-200 shrink-0" : "text-emerald-500 shrink-0"} />;
      return <Paperclip size={16} className="shrink-0 opacity-80" />;
    };

    return (
      <a
        href={c.fileUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2.5 p-2.5 rounded-2.5 mb-2 border text-[12.5px] font-medium transition-all group ${
          c.me
            ? "bg-white/15 border-white/25 text-white hover:bg-white/25"
            : "bg-white border-neutral-border text-neutral-text hover:border-brand/40 hover:shadow-xs"
        }`}
        title={`Buka berkas ${fileName}`}
      >
        {getIcon()}
        <div className="min-w-0 flex-1">
          <span className="block truncate font-semibold leading-tight max-w-56">{fileName}</span>
          <span className={`text-[10.5px] block mt-0.5 font-bold uppercase tracking-wider ${c.me ? "opacity-80" : "text-neutral-muted"}`}>
            {ext}
          </span>
        </div>
      </a>
    );
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col min-h-95 h-auto">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border flex justify-between items-center">
        <span>Bimbingan Chat</span>
        {student && (
          <span className="text-[12.5px] text-neutral-muted font-semibold">
            Mahasiswa: {student.name}
          </span>
        )}
      </div>

      <div className="py-4.5 px-6 flex flex-col gap-3.5 max-h-100 overflow-y-auto flex-1">
        {isLoading ? (
          <div className="text-center py-6 text-[13px] text-neutral-muted italic">
            Memuat percakapan...
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center py-8 text-[13px] text-neutral-muted">
            Belum ada pesan. Mulai diskusi Anda dengan mahasiswa di bawah.
          </div>
        ) : (
          <>
            {chats.map((c) => (
              <div
                key={c.id}
                className={`flex items-end gap-2 max-w-[85%] ${c.me ? "self-end flex-row-reverse" : ""}`}
              >
                {!c.me && (
                  <div className="w-7.5 h-7.5 rounded-full bg-linear-to-br from-[#6FE3A6] to-brand-light flex items-center justify-center text-[10.5px] font-bold text-white shrink-0 overflow-hidden">
                    {c.senderImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.senderImage} alt={c.senderName} className="w-full h-full object-cover" />
                    ) : (
                      c.senderName.charAt(0).toUpperCase()
                    )}
                  </div>
                )}
                <div>
                  <div className={`py-2.5 px-3.5 rounded-3.5 text-[13.5px] leading-[1.4] relative ${c.me ? "bg-brand text-white rounded-br-xs" : "bg-[#EAF0FB] text-neutral-text rounded-bl-xs"}`}>
                    {renderAttachment(c)}
                    {c.text && <div>{c.text}</div>}
                    <span className="block text-[9.5px] opacity-70 mt-1 text-right">
                      {c.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {readOnly ? (
        <div className="py-3.5 px-6 pb-5 border-t border-neutral-border">
          <div className="bg-neutral-bg rounded-full py-2.5 px-4 text-[13px] text-neutral-muted text-center font-medium">
            Tahapan telah disetujui. Chat tidak dapat ditambahkan.
          </div>
        </div>
      ) : (
        <div className="py-3.5 px-6 pb-5 border-t border-neutral-border flex flex-col gap-2">
          {/* File Attachment preview */}
          {attachedFile && (
            <div className="flex items-center justify-between bg-brand-bg/50 border border-brand/20 rounded-2.5 px-3 py-1.5 text-[12.5px] text-neutral-text">
              <div className="flex items-center gap-2 truncate">
                <Paperclip size={14} className="text-brand shrink-0" />
                <span className="truncate font-semibold">{attachedFile.fileName}</span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-neutral-muted hover:text-danger cursor-pointer p-0.5"
                title="Hapus lampiran"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {uploadError && (
            <div className="text-[12px] text-danger font-medium px-2">
              {uploadError}
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.docx,.png,.jpeg,.jpg,.mp4,.mp3,.m4a"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="neutral"
              size="icon"
              className="w-8.5 h-8.5 rounded-full shrink-0"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!stageId || isUploading || isPending}
              title="Unggah berkas/lampiran (PDF, DOCX, PNG, JPG, JPEG, MP4, MP3, M4A)"
            >
              {isUploading ? <Loader2 size={16} className="animate-spin text-brand" /> : <Plus size={18} />}
            </Button>
            <Input
              type="text"
              variant="custom"
              className="w-full bg-neutral-bg border-none rounded-full py-2.5 px-4 text-[13.5px] outline-none font-sans"
              placeholder="Tulis pesan bimbingan..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              fullWidth={false}
              wrapperClassName="flex-1"
              disabled={!stageId || isPending}
            />
            <Button
              variant="brand"
              size="icon"
              onClick={handleSend}
              className="w-9 h-9 rounded-full shrink-0"
              isLoading={isPending}
              disabled={!stageId || (!msg.trim() && !attachedFile) || isUploading}
              type="button"
            >
              <ArrowUp size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
