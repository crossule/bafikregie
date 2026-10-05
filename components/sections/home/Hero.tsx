import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { whatsappLink } from "@/lib/config";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-32 pb-24 text-white md:pt-40 md:pb-32">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-teal/70" />
        <div
          aria-hidden
          className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-aqua/20 blur-3xl"
        />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left column */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-aqua/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-aqua">
                <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
                {t("eyebrow")}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold md:text-6xl">
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
                  href={whatsappLink()}
                  external
                  variant="primary"
                  size="lg"
                >
                  {t("ctaPrimary")}
                  <span aria-hidden>→</span>
                </Button>
                <Button href="/services" variant="ghost" size="lg">
                  {t("ctaSecondary")}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat value="SIO · SAFO" label="Ophtalmologie" />
                <Stat value="AFRICARDIO" label="Cardiologie" />
                <Stat value="J+7 → J+90" label="Post-congrès" />
                <Stat value="Abidjan" label="Côte d'Ivoire" />
              </div>
            </Reveal>
          </div>

          {/* Right column — poster card */}
          <Reveal delay={0.3}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-2 to-navy p-8 shadow-2xl">
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-aqua/25 blur-3xl"
              />

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-aqua">
                Africa Health Congress
              </p>
              <h3 className="mt-3 text-2xl font-extrabold">
                Science · People · Impact
              </h3>
              <p className="mt-3 text-sm text-white/75">
                Une expertise locale au service de la science. Des solutions
                professionnelles, flexibles et adaptées aux réalités africaines.
              </p>

              <ul className="relative mt-6 space-y-3 text-sm text-white/85">
                {[
                  "Production audiovisuelle & multi-caméras",
                  "Régie scientifique & coordination des salles",
                  "Streaming, hybride et replay",
                  "Contenus experts & valorisation sponsors",
                  "Congrès, symposiums, masterclass",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua/15 text-xs font-black text-aqua">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Bottom wave */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-bg"
        style={{
          clipPath: "ellipse(75% 100% at 50% 100%)",
        }}
      />
    </section>
  );
}
