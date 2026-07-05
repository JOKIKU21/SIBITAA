"use client";

import { useState } from "react";
import { Plus, ArrowUp } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export function ChatPanel() {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([
    { id: 1, text: "I'm gyuuddddd.....", time: "15.20", me: false },
    { id: 2, text: "Hallo! How are you?", time: "15.20", me: true },
  ]);

  const handleSend = () => {
    if (!msg.trim()) return;
    setChats([
      ...chats,
      {
        id: Date.now(),
        text: msg.trim(),
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        me: true,
      },
    ]);
    setMsg("");
  };

  return (
    <div className="bg-white rounded-3.5 border border-neutral-border overflow-hidden mb-5 flex flex-col min-h-95 h-auto">
      <div className="py-4.5 px-6 font-display text-4 font-extrabold border-b border-neutral-border">
        Chatting
      </div>
      <div className="py-4.5 px-6 flex flex-col gap-3.5 max-h-100 overflow-y-auto flex-1">
        <div className="text-center mb-1">
          <span className="bg-[#1F2937] text-white text-2.75 py-0.75 px-3 rounded-3">Hari Ini</span>
        </div>

        {chats.map((c) => (
          <div
            key={c.id}
            className={`flex items-end gap-2 max-w-[80%] ${c.me ? "self-end flex-row-reverse" : ""}`}
          >
            {!c.me && <div className="w-7.5 h-7.5 rounded-full bg-neutral-bg shrink-0" />}
            <div>
              <div className={`py-2.5 px-3.5 rounded-3.5 text-[13.5px] leading-[1.4] relative ${c.me ? "bg-brand text-white rounded-br-xs" : "bg-[#EAF0FB] text-neutral-text rounded-bl-xs"}`}>
                {c.text}
                <span className="block text-2.5 opacity-70 mt-0.75">
                  {c.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-3.5 px-6 pb-5 border-t border-neutral-border flex items-center gap-2.5">
        <Button
          variant="neutral"
          size="icon"
          className="w-8.5 h-8.5 rounded-full"
        >
          <Plus size={18} />
        </Button>
        <Input
          type="text"
          variant="custom"
          className="flex-1 bg-neutral-bg border-none rounded-full py-2.5 px-4 text-[13.5px] outline-none font-sans"
          placeholder="Write a message........"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          fullWidth={false}
        />
        <Button
          variant="brand"
          size="icon"
          onClick={handleSend}
          className="w-9 h-9 rounded-full"
        >
          <ArrowUp size={18} />
        </Button>
      </div>
    </div>
  );
}
