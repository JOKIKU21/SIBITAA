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
    <div className="panel chat-panel">
      <div className="panel-head">
        Chatting
      </div>
      <div className="chat-body">
        <div className="chat-date">
          <span>Hari Ini</span>
        </div>

        {chats.map((c) => (
          <div
            key={c.id}
            className={`chat-bubble ${c.me ? "me" : "other"}`}
          >
            {!c.me && <div className="chat-avatar" />}
            <div>
              <div className="chat-text">
                {c.text}
                <span className="chat-time">
                  {c.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-foot">
        <button className="chat-plus">
          <Plus size={18} />
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Write a message........"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="chat-send"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
