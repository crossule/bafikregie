import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/content/services";

export function ServiceFeatures({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}`);

  return (
    <Section tone="default">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("featuresSection.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">
              {t("featuresSection.title")}
            </h2>
            <p className="mt-5 text-grey">{t("featuresSection.subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, i) => (
            <Reveal key={feature.key} delay={i * 0.06}>
              <Card className="flex h-full items-start gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-light text-teal-dark">
                  <CheckCircle2 size={18} strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-medium text-navy">
                    {t(`features.${feature.key}`)}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
