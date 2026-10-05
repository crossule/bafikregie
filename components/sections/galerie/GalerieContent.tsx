"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryTabs, type TabKey } from "@/components/galerie/GalleryTabs";
import { FilterChips } from "@/components/galerie/FilterChips";
import { PhotoGrid } from "@/components/galerie/PhotoGrid";
import { VideoThumb } from "@/components/galerie/VideoThumb";
import { VideoModal } from "@/components/galerie/VideoModal";
import { ProjectCard } from "@/components/galerie/ProjectCard";
import {
  projects,
  getAllSpecialties,
  getAllTypes,
} from "@/content/projects";

export function GalerieContent() {
  const t = useTranslations("galerie");
  const [tab, setTab] = useState<TabKey>("projets");
  const [type, setType] = useState<string>("all");
  const [specialty, setSpecialty] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<{
    youtubeId: string;
    title: string;
  } | null>(null);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (specialty !== "all" && p.specialty !== specialty) return false;
      return true;
    });
  }, [type, specialty]);

  // Flatten photos/videos from filtered projects
  const allPhotos = useMemo(
    () => filteredProjects.flatMap((p) => p.photos),
    [filteredProjects]
  );

  const allVideos = useMemo(
    () =>
      filteredProjects.flatMap((p) =>
        p.videos.map((v) => ({ ...v, projectTitle: p.title }))
      ),
    [filteredProjects]
  );

  const typeOptions = useMemo(
    () => getAllTypes().map((x) => ({ value: x, label: x })),
    []
  );
  const specialtyOptions = useMemo(
    () => getAllSpecialties().map((x) => ({ value: x, label: x })),
    []
  );

  const counts = {
    photos: allPhotos.length,
    videos: allVideos.length,
    projets: filteredProjects.length,
  };

  const hasResults =
    filteredProjects.length > 0 ||
    allPhotos.length > 0 ||
    allVideos.length > 0;

  return (
    <Section tone="default" size="md">
      <Container>
        {/* Filters */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-navy/5 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-grey">
                  {t("filters.typeLabel")}
                </p>
                <div className="mt-2">
                  <FilterChips
                    options={typeOptions}
                    value={type}
                    onChange={setType}
                    allLabel={t("filters.all")}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-grey">
                  {t("filters.specialtyLabel")}
                </p>
                <div className="mt-2">
                  <FilterChips
                    options={specialtyOptions}
                    value={specialty}
                    onChange={setSpecialty}
                    allLabel={t("filters.all")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="mt-8">
            <GalleryTabs active={tab} onChange={setTab} counts={counts} />
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-10">
          {!hasResults && (
            <div className="rounded-2xl border border-navy/5 bg-white p-12 text-center shadow-soft">
              <p className="text-grey">{t("empty")}</p>
            </div>
          )}

          {hasResults && tab === "photos" && (
            <PhotoGrid photos={allPhotos} />
          )}

          {hasResults && tab === "videos" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allVideos.map((v, i) => (
                <Reveal key={`${v.youtubeId}-${i}`} delay={i * 0.05}>
                  <VideoThumb
                    youtubeId={v.youtubeId}
                    title={v.title}
                    category={v.projectTitle}
                    onClick={() =>
                      setActiveVideo({ youtubeId: v.youtubeId, title: v.title })
                    }
                  />
                </Reveal>
              ))}
            </div>
          )}

          {hasResults && tab === "projets" && (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>

      <VideoModal
        youtubeId={activeVideo?.youtubeId ?? null}
        title={activeVideo?.title}
        onClose={() => setActiveVideo(null)}
      />
    </Section>
  );
}
