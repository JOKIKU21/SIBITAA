"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Plus, ArrowUp } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useChatMessages, useSendChatMessage } from "@/hooks/useStudent";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface MahasiswaChatPanelProps {
  stageId?: string;
}

export function MahasiswaChatPanel({ stageId }: MahasiswaChatPanelProps) {
  const [msg, setMsg] = useState("");
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  // Student hooks
  const studentChat = useChatMessages(stageId);
  const studentSend = useSendChatMessage();

  const chatData = studentChat.data;
  const isLoading = studentChat.isLoading;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(() => chatData?.messages || [], [chatData?.messages]);
  const advisor = (chatData as any)?.advisor;

  // Auto scroll to bottom when messages load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!msg.trim() || !stageId) return;
    
    studentSend.mutate({
      stageId,
      payload: {
        message: msg.trim(),
      },
    }, {
      onSuccess: () => {
        setMsg("");
      }
    });
  };

  const chats = messages.map((m) => {
    const dateObj = new Date(m.createdAt);
    const timeFormatted = dateObj.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      id: m.id,
      text: m.message || "",
      time: timeFormatted,
      me: m.senderId === currentUserId,
      senderName: m.sender?.name || "Pengguna",
      senderImage: m.sender?.image || "",
    };
  });

  const isPending = studentSend.isPending;

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col min-h-95 h-auto">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border flex justify-between items-center">
        <span>Bimbingan Chat</span>
        {advisor && (
          <span className="text-[12.5px] text-neutral-muted font-semibold">
            Dosen: {advisor.name}
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
            Belum ada pesan. Mulai diskusi Anda dengan dosen pembimbing di bawah.
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
                    {c.text}
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

      <div className="py-3.5 px-6 pb-5 border-t border-neutral-border flex items-center gap-2.5">
        <Button
          variant="neutral"
          size="icon"
          className="w-8.5 h-8.5 rounded-full shrink-0"
          type="button"
        >
          <Plus size={18} />
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
          disabled={!stageId || !msg.trim()}
          type="button"
        >
          <ArrowUp size={18} />
        </Button>
      </div>
    </div>
  );
}
