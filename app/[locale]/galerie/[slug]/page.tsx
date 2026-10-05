import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getProject, getAllProjectSlugs } from "@/content/projects";
import { ProjectHero } from "@/components/sections/project/ProjectHero";
import { ProjectStats } from "@/components/sections/project/ProjectStats";
import { ProjectPhotos } from "@/components/sections/project/ProjectPhotos";
import { ProjectVideos } from "@/components/sections/project/ProjectVideos";
import { ProjectServices } from "@/components/sections/project/ProjectServices";
import { ProjectTestimonial } from "@/components/sections/project/ProjectTestimonial";
import { ProjectNavigation } from "@/components/sections/project/ProjectNavigation";
import { CTABanner } from "@/components/sections/shared/CTABanner";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: `${project.type} · ${project.specialty} · ${project.city} ${project.year}`,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectStats project={project} />
      <ProjectPhotos project={project} />
      <ProjectVideos project={project} />
      <ProjectServices project={project} />
      <ProjectTestimonial project={project} />
      <ProjectNavigation currentSlug={project.slug} />
      <CTABanner />
    </>
  );
}
