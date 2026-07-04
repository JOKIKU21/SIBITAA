import type { ReactNode } from "react";

export default function AuthCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-5 py-10 px-9 w-full max-w-105 shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center">
        <div className="w-18 h-18 bg-neutral-bg rounded-3.5 mx-auto mb-5 flex items-center justify-center">{icon}</div>
        <h1 className="text-5.5 font-extrabold text-neutral-text mb-7">{title}</h1>
        {children}
      </div>
    </div>
  );
}
