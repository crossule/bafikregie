import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const TAGS = [
  "SIO",
  "SAFO",
  "AFRICARDIO",
  "Multiplex (Sanofi, Bayer)",
  "Ophtalmologie",
  "Cardiologie",
];

export function ExperienceStrip() {
  const t = useTranslations("home.experience");

  return (
    <Section tone="navy">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow tone="aqua">{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-balance">{t("title")}</h2>
              <p className="mt-5 text-white/75">{t("subtitle")}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-aqua/30 bg-aqua/10 px-3.5 py-1.5 text-xs font-semibold text-aqua"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
                alt=""
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 to-transparent" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
