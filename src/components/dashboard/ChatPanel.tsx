"use client";

import { useState } from "react";
import { Plus, ArrowUp } from "lucide-react";

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
    <div className="bg-white rounded-[14px] border border-neutral-border overflow-hidden mb-[20px] flex flex-col min-h-[380px] h-auto">
      <div className="py-[18px] px-[24px] font-display text-[16px] font-extrabold border-b border-neutral-border">
        Chatting
      </div>
      <div className="py-[18px] px-[24px] flex flex-col gap-[14px] max-h-[400px] overflow-y-auto flex-1">
        <div className="text-center mb-[4px]">
          <span className="bg-[#1F2937] text-white text-[11px] py-[3px] px-[12px] rounded-[12px]">Hari Ini</span>
        </div>

        {chats.map((c) => (
          <div
            key={c.id}
            className={`flex items-end gap-[8px] max-w-[80%] ${c.me ? "self-end flex-row-reverse" : ""}`}
          >
            {!c.me && <div className="w-[30px] h-[30px] rounded-full bg-neutral-bg shrink-0" />}
            <div>
              <div className={`py-[10px] px-[14px] rounded-[14px] text-[13.5px] leading-[1.4] relative ${c.me ? "bg-brand text-white rounded-br-[2px]" : "bg-[#EAF0FB] text-neutral-text rounded-bl-[2px]"}`}>
                {c.text}
                <span className="block text-[10px] opacity-70 mt-[3px]">
                  {c.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-[14px] px-[24px] pb-[20px] border-t border-neutral-border flex items-center gap-[10px]">
        <button className="w-[34px] h-[34px] rounded-full bg-neutral-bg border-none text-[18px] text-neutral-muted cursor-pointer shrink-0 flex items-center justify-center">
          <Plus size={18} />
        </button>
        <input
          type="text"
          className="flex-1 bg-neutral-bg border-none rounded-full py-[10px] px-[16px] text-[13.5px] outline-none font-sans"
          placeholder="Write a message........"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="w-[36px] h-[36px] rounded-full bg-brand border-none text-white text-[16px] cursor-pointer shrink-0 flex items-center justify-center transition-[background] duration-200 hover:bg-brand-dark"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
