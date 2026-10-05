import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/content/services";

const STEPS = ["brief", "preparation", "execution", "livraison"] as const;

export function ServiceProcess({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}.process`);

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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-sm font-black text-white">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-navy">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm text-grey">
                  {t(`steps.${step}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
