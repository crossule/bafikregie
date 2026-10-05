import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/config";
import { Phone, ArrowRight } from "lucide-react";

export function GalerieHero() {
  const t = useTranslations("galerie.hero");

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-32 pb-20 text-white md:pt-40 md:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-2 to-teal/60"
      />
      <div
        aria-hidden
        className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-aqua/20 blur-3xl"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-aqua">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-balance text-4xl font-extrabold md:text-6xl">
              {t("title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/80">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink()}
                external
                variant="whatsapp"
                size="lg"
              >
                <Phone size={18} />
                {t("cta")}
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                {t("ctaSecondary")}
                <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
