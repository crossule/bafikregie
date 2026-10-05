import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";

export function ProjectNavigation({ currentSlug }: { currentSlug: string }) {
  const t = useTranslations("galerie.projectPage.nav");
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <section className="border-t border-navy/5 bg-bg py-12">
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <NavCard project={prev} direction="prev" label={t("previous")} />
          </Reveal>
          <Reveal delay={0.08}>
            <NavCard project={next} direction="next" label={t("next")} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function NavCard({
  project,
  direction,
  label,
}: {
  project: (typeof projects)[number];
  direction: "prev" | "next";
  label: string;
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/galerie/${project.slug}`}
      className={`group flex items-center gap-4 rounded-2xl border border-navy/5 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        isPrev ? "" : "md:flex-row-reverse md:text-right"
      }`}
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
          {isPrev && <ArrowLeft size={12} />}
          {label}
          {!isPrev && <ArrowRight size={12} />}
        </p>
        <p className="mt-1 truncate font-bold text-navy">{project.title}</p>
        <p className="truncate text-xs text-grey">{project.subtitle}</p>
      </div>
    </Link>
  );
}
