import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectHero({ project }: { project: Project }) {
  const t = useTranslations("galerie.projectPage");

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-32 pb-20 text-white md:pt-40 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src={project.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-teal/60" />
      </div>

      <Container>
        <Reveal>
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            <Link href="/" className="hover:text-aqua">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight size={12} />
            <Link href="/galerie" className="hover:text-aqua">
              {t("breadcrumb.gallery")}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{project.title}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-teal/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {project.type}
            </span>
            <span className="rounded-full border border-aqua/40 bg-aqua/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-aqua">
              {project.specialty}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
              {project.city} · {project.year}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {project.subtitle}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
