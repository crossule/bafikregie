import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/config";
import { ArrowRight, Phone } from "lucide-react";
import type { Service } from "@/content/services";

export function ServiceHero({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}`);
  const { Icon } = service;

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-32 pb-20 text-white md:pt-40 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={service.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-teal/70" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-aqua/30 bg-aqua/10 px-4 py-1.5">
                <Icon size={16} className="text-aqua" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-aqua">
                  {t("eyebrow")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold md:text-5xl">
                {t("title")}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg text-white/80">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={whatsappLink(
                    `Bonjour BAFIK, je souhaite en savoir plus sur votre service : ${t("title")}.`
                  )}
                  external
                  variant="whatsapp"
                  size="lg"
                >
                  <Phone size={18} />
                  {t("ctaPrimary")}
                </Button>
                <Button href="/contact" variant="ghost" size="lg">
                  {t("ctaSecondary")}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Overview card */}
          <Reveal delay={0.3}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-2 to-navy p-8 shadow-2xl">
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-aqua/25 blur-3xl"
              />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua">
                {t("card.eyebrow")}
              </p>
              <h3 className="mt-3 text-2xl font-extrabold">
                {t("card.title")}
              </h3>
              <p className="mt-3 text-sm text-white/75">{t("card.body")}</p>

              <ul className="relative mt-6 space-y-3 text-sm text-white/85">
                {service.features.slice(0, 4).map((f) => (
                  <li key={f.key} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua/15 text-xs font-black text-aqua">
                      ✓
                    </span>
                    <span>{t(`features.${f.key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
