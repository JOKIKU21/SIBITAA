// ponytail: Server Component — dosen list with bimbingan count + progress bar

import Link from "next/link";
import type { LecturerItem } from "@/services/admin";

const AVATAR_COLORS = [
  "from-[#818CF8] to-[#6366F1]",
  "from-[#34D399] to-[#059669]",
  "from-[#FB923C] to-[#EA580C]",
  "from-[#F472B6] to-[#EC4899]",
  "from-[#60A5FA] to-[#2563EB]",
  "from-[#A78BFA] to-[#7C3AED]",
];

function getAvatarColor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function DosenBimbinganList({ lecturerList }: { lecturerList: LecturerItem[] }) {
  return (
    <div className="bg-white border border-neutral-border rounded-3.5 overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h3 className="font-display text-[15px] font-extrabold text-neutral-text">Dosen & Bimbingan</h3>
        <Link
          href="/dashboard/admin/manajemen-dosen"
          className="text-[13px] text-brand font-semibold hover:underline"
        >
          Kelola →
        </Link>
      </div>

      <div className="px-6 pb-5 flex flex-col gap-4">
        {lecturerList.map((lecturer) => {
          const avatarColor = getAvatarColor(lecturer.name);
          return (
            <div key={lecturer.id} className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-full bg-linear-to-br ${avatarColor} flex items-center justify-center text-[14px] font-bold text-white shrink-0`}>
                {lecturer.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13.5px] font-bold text-neutral-text">{lecturer.name}</div>
                    <div className="text-[11.5px] text-neutral-muted">{lecturer.department}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-[13px] font-bold text-neutral-text">{lecturer.activeAdviseeCount} mhs</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {lecturerList.length === 0 && (
          <div className="text-center py-6 text-[13px] text-neutral-muted">Tidak ada dosen pembimbing.</div>
        )}
      </div>
    </div>
  );
}

