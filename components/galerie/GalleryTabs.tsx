"use client";

import { cn } from "@/lib/utils";
import { Image as ImageIcon, Video, FolderOpen } from "lucide-react";

export type TabKey = "photos" | "videos" | "projets";

const TABS: { key: TabKey; label: string; Icon: typeof ImageIcon }[] = [
  { key: "photos", label: "Photos", Icon: ImageIcon },
  { key: "videos", label: "Vidéos", Icon: Video },
  { key: "projets", label: "Projets", Icon: FolderOpen },
];

export function GalleryTabs({
  active,
  onChange,
  counts,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
  counts: Record<TabKey, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-navy/5 bg-white p-1.5 shadow-soft">
      {TABS.map(({ key, label, Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
            active === key
              ? "bg-navy text-white shadow-md"
              : "text-grey hover:bg-navy/5 hover:text-navy"
          )}
        >
          <Icon size={16} />
          <span>{label}</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold",
              active === key ? "bg-white/20 text-white" : "bg-navy/5 text-grey"
            )}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
