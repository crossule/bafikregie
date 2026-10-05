"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  youtubeId: string;
  title: string;
  category?: string;
  onClick: () => void;
  className?: string;
};

export function VideoThumb({
  youtubeId,
  title,
  category,
  onClick,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-navy text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // Fallback thumbnail
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />

        {/* Play button */}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur-md ring-2 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-aqua group-hover:text-navy group-hover:ring-aqua">
            <Play size={22} fill="currentColor" />
          </span>
        </span>

        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-teal/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            {category}
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
      </div>
    </button>
  );
}
