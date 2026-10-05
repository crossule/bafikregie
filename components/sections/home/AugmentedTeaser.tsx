import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const STEPS = ["j7", "j15", "j30", "j90"] as const;

export function AugmentedTeaser() {
  const t = useTranslations("home.augmentedTeaser");

  return (
    <Section tone="default">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-balance">{t("title")}</h2>
              <p className="mt-5 text-grey">{t("subtitle")}</p>
              <p className="mt-4 text-grey">{t("description")}</p>

              <div className="mt-8">
                <Button href="/congres-augmente" variant="primary" size="lg">
                  {t("cta")}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative pl-8">
              {/* Vertical line */}
              <div
                aria-hidden
                className="absolute left-2 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-teal to-teal/10"
              />

              <div className="space-y-6">
                {STEPS.map((step, i) => (
                  <div key={step} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-8 top-2 grid h-4 w-4 place-items-center rounded-full border-2 border-teal bg-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    </span>
                    <div className="rounded-2xl border border-navy/5 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-block rounded-full bg-teal px-3 py-0.5 text-xs font-bold tracking-wider text-white">
                          {t(`steps.${step}.badge`)}
                        </span>
                        <span className="text-xs font-medium text-grey">
                          0{i + 1} / 04
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-bold text-navy">
                        {t(`steps.${step}.title`)}
                      </h3>
                      <p className="mt-1.5 text-sm text-grey">
                        {t(`steps.${step}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
