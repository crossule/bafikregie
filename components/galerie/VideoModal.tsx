"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  youtubeId: string | null;
  title?: string;
  onClose: () => void;
};

export function VideoModal({ youtubeId, title, onClose }: Props) {
  const open = !!youtubeId;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-3/95 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <div
        className="w-[min(1100px,94vw)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title || "Vidéo BAFIK"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        {title && (
          <p className="mt-4 text-center text-sm font-medium text-white/85">
            {title}
          </p>
        )}
      </div>
    </div>
  );
}
