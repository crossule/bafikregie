import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/config";
import { Phone, ArrowRight } from "lucide-react";

export function CTABanner() {
  const t = useTranslations("home.ctaBanner");

  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-2 to-teal/60"
      />
      <div
        aria-hidden
        className="absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-aqua/20 blur-3xl"
      />

      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-balance text-3xl md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-white/80">{t("subtitle")}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href={whatsappLink()}
                external
                variant="whatsapp"
                size="lg"
              >
                <Phone size={18} />
                {t("ctaWhatsapp")}
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                {t("ctaForm")}
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
