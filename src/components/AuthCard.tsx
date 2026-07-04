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
    <div className="min-h-screen bg-[#F0F4FF] flex items-center justify-center py-[40px] px-[16px]">
      <div className="bg-white rounded-[20px] py-[40px] px-[36px] w-full max-w-[420px] shadow-[0_8px_40px_rgba(43,59,175,0.12)] border-[1.5px] border-[#e0e7ff] text-center">
        <div className="w-[72px] h-[72px] bg-neutral-bg rounded-[14px] mx-auto mb-[20px] flex items-center justify-center">{icon}</div>
        <h1 className="text-[22px] font-extrabold text-neutral-text mb-[28px]">{title}</h1>
        {children}
      </div>
    </div>
  );
}
