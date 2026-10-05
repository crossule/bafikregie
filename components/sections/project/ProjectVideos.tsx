"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { VideoThumb } from "@/components/galerie/VideoThumb";
import { VideoModal } from "@/components/galerie/VideoModal";
import type { Project } from "@/content/projects";

export function ProjectVideos({ project }: { project: Project }) {
  const t = useTranslations("galerie.projectPage.videos");
  const [active, setActive] = useState<{ youtubeId: string; title: string } | null>(
    null
  );

  if (project.videos.length === 0) return null;

  return (
    <Section tone="tinted">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.videos.map((v, i) => (
            <Reveal key={`${v.youtubeId}-${i}`} delay={i * 0.08}>
              <VideoThumb
                youtubeId={v.youtubeId}
                title={v.title}
                category={v.category}
                onClick={() =>
                  setActive({ youtubeId: v.youtubeId, title: v.title })
                }
              />
            </Reveal>
          ))}
        </div>
      </Container>

      <VideoModal
        youtubeId={active?.youtubeId ?? null}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </Section>
  );
}
