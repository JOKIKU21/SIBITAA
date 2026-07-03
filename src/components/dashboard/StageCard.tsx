import { useRouter } from "next/navigation";
import type { Stage } from "@/lib/stages";
import type { StageStatus, StageWindow } from "@/lib/stage-status";
import { formatStageDate, formatStageNumber } from "@/lib/stage-status";

function getBadgeInfo(status: StageStatus) {
  if (status === "belum-mulai") return { cls: "badge-grey", label: "Belum Mulai" };
  if (status === "berlangsung") return { cls: "badge-blue", label: "Berlangsung" };
  return { cls: "badge-green", label: "Selesai ✓" };
}

function getItemClass(status: StageStatus) {
  if (status === "selesai") return "st-done-green";
  if (status === "berlangsung") return "st-active";
  return "";
}

// Map the STAGE_ICONS from the HTML exactly based on stage.n
const RAW_ICONS = [
  `<svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M16 13H8M16 17H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="currentColor" stroke-width="1.8"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none"><path d="M22 10 12 5 2 10l10 5 10-5ZM6 12.5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
];

export function StageCard({ stage, status, window }: { stage: Stage; status: StageStatus; window: StageWindow }) {
  const router = useRouter();
  const badge = getBadgeInfo(status);
  const itcls = getItemClass(status);
  const rawSvg = RAW_ICONS[stage.n - 1] || "";
  
  // Note: we're using "use client" in the wrapper or using onClick to navigate to preserve the exact HTML structure
  // but to keep it RSC we can use a Link or just a regular div with a router push if client-side
  // Since TimelineList is a client component, we can safely use useRouter here.
  
  let daysLabel = "";
  if (status === "berlangsung") {
    // Fake the days left as per HTML logic
    daysLabel = `Sisa ${stage.days} hari`;
  } else if (status === "belum-mulai") {
    daysLabel = `Mulai hari ke-${window.start}`;
  }

  return (
    <div className={`tl-item ${itcls}`}>
      <div className="tl-left">
        <div className="tl-icon" dangerouslySetInnerHTML={{ __html: rawSvg }} />
        <div className="tl-line" />
      </div>
      <div style={{ flex: 1 }}>
        <div className="tl-card" onClick={() => router.push(`/dashboard/mahasiswa/tahap/${stage.slug}`)}>
          <div className="tl-card-head">
            <span className="tl-num">{String(stage.n).padStart(2, "0")}</span>
            <span className={`tl-badge ${badge.cls}`}>{badge.label}</span>
          </div>
          <div className="tl-title">{stage.name}</div>
          <div className="tl-dates">{formatStageDate(window.start)} – {formatStageDate(window.end)}</div>
          <div className="tl-desc">{stage.desc}</div>
          {status !== "belum-mulai" && (
            <div className="tl-foot">
              <span className="tl-days-left">{daysLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
