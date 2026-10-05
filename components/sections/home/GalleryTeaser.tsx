import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

const PROJECTS = [
  {
    slug: "sio-2024",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    slug: "safo-2024",
    image:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1000&q=80",
    span: "",
  },
  {
    slug: "africardio-2024",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80",
    span: "",
  },
];

export function GalleryTeaser() {
  const t = useTranslations("home.galleryTeaser");

  return (
    <Section tone="default">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-balance">{t("title")}</h2>
              <p className="mt-5 text-grey">{t("subtitle")}</p>
            </div>
            <Button href="/galerie" variant="outline">
              {t("viewAll")} <ArrowRight size={16} />
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          {PROJECTS.map(({ slug, image, span }, i) => (
            <Reveal
              key={slug}
              delay={i * 0.08}
              className={`${span} min-h-[220px] md:min-h-0`}
            >
              <Link
                href={`/galerie/${slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl shadow-soft"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-aqua">
                      {t(`items.${slug}.specialty`)}
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {t(`items.${slug}.title`)}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-aqua group-hover:text-navy">
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
