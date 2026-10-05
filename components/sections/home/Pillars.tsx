import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  Stethoscope,
  Users,
  MapPin,
  Sliders,
  type LucideIcon,
} from "lucide-react";

type PillarKey = "expertise" | "experience" | "proximity" | "flexibility";

const PILLARS: { key: PillarKey; Icon: LucideIcon }[] = [
  { key: "expertise", Icon: Stethoscope },
  { key: "experience", Icon: Users },
  { key: "proximity", Icon: MapPin },
  { key: "flexibility", Icon: Sliders },
];

export function Pillars() {
  const t = useTranslations("home.pillars");

  return (
    <Section tone="default" size="md">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
            <p className="mt-5 text-grey">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <Card className="h-full">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal-light text-teal-dark transition-transform duration-300 group-hover:rotate-[-6deg]">
                  <Icon size={26} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-navy">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-grey">
                  {t(`items.${key}.description`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
