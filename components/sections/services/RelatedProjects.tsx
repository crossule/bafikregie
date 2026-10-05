import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Play } from "lucide-react";
import { projects } from "@/content/projects";
import type { Service } from "@/content/services";

export function RelatedProjects({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}.relatedSection`);

  const related = service.relatedProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  if (related.length === 0) return null;

  return (
    <Section tone="navy">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow tone="aqua">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-balance">{t("title")}</h2>
            </div>
            <Button href="/galerie" variant="ghost">
              {t("viewAll")} <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link
                href={`/galerie/${p.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-aqua">
                      {p.specialty} · {p.city}
                    </p>
                    <p className="mt-1 text-xl font-bold">{p.title}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-aqua group-hover:text-navy">
                    <Play size={16} fill="currentColor" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
