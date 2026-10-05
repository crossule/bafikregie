"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectPhoto } from "@/content/projects";
import { PhotoLightbox } from "./PhotoLightbox";

export function PhotoGrid({ photos }: { photos: ProjectPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-navy shadow-soft transition-all duration-300 hover:shadow-lift"
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {photo.caption && (
              <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-4 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        index={index}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
