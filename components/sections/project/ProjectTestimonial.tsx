"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { VideoModal } from "@/components/galerie/VideoModal";
import { Play, Quote } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectTestimonial({ project }: { project: Project }) {
  const t = useTranslations("galerie.projectPage.testimonial");
  const [videoOpen, setVideoOpen] = useState(false);
  const test = project.testimonial;
  if (!test) return null;

  return (
    <Section tone="navy">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {test.videoId && (
            <Reveal>
              <button
                onClick={() => setVideoOpen(true)}
                className="group relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src={`https://img.youtube.com/vi/${test.videoId}/maxresdefault.jpg`}
                  alt="Témoignage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/40 transition-colors group-hover:bg-navy/30" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur-md ring-2 ring-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-aqua group-hover:text-navy">
                    <Play size={26} fill="currentColor" />
                  </span>
                </span>
              </button>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className={test.videoId ? "" : "lg:col-span-2"}>
              <Quote className="text-aqua" size={32} />
              <blockquote className="mt-4 text-xl font-medium italic leading-relaxed text-white md:text-2xl">
                “{test.quote}”
              </blockquote>
              <div className="mt-6">
                <p className="text-base font-bold text-white">{test.author}</p>
                <p className="text-sm text-white/70">{test.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <VideoModal
        youtubeId={videoOpen ? test.videoId! : null}
        title={test.author}
        onClose={() => setVideoOpen(false)}
      />
    </Section>
  );
}
