import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    slug: "regie-scientifique",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "production-audiovisuelle",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "streaming-hybride",
    image:
      "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export function ServicesTeaser() {
  const t = useTranslations("home.servicesTeaser");

  return (
    <Section tone="tinted">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
            <p className="mt-5 text-grey">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map(({ slug, image }, i) => (
            <Reveal key={slug} delay={i * 0.1}>
              <Link
                href={`/services/${slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">
                    {t(`items.${slug}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-grey">
                    {t(`items.${slug}.description`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-transform duration-300 group-hover:translate-x-1">
                    {t("learnMore")} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/services" variant="outline" size="lg">
              {t("viewAll")}
              <ArrowRight size={18} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
