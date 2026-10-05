import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/shared/CTABanner";
import { ShieldCheck, Award, Globe, Video, Users, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="min-h-screen bg-bg pt-28">
      {/* Hero */}
      <Section size="sm" tone="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-balance text-3xl font-black text-navy md:text-5xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 text-base text-grey md:text-lg">
                {t("hero.subtitle")}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission */}
      <Section size="md" tone="tinted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div>
                <Eyebrow>{t("mission.eyebrow")}</Eyebrow>
                <h2 className="mt-4 text-2xl font-black text-navy md:text-4xl">
                  {t("mission.title")}
                </h2>
                <p className="mt-5 text-grey leading-relaxed">
                  {t("mission.p1")}
                </p>
                <p className="mt-4 text-grey leading-relaxed">
                  {t("mission.p2")}
                </p>
              </div>
            </Reveal>

            {/* Stats Cards */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                  <Award className="h-7 w-7 text-teal mb-3" />
                  <div className="text-3xl font-black text-navy">
                    {t("stats.congressCount")}
                  </div>
                  <div className="mt-1 text-xs text-grey">
                    {t("stats.congressLabel")}
                  </div>
                </div>

                <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                  <Users className="h-7 w-7 text-aqua mb-3" />
                  <div className="text-3xl font-black text-navy">
                    {t("stats.attendeesCount")}
                  </div>
                  <div className="mt-1 text-xs text-grey">
                    {t("stats.attendeesLabel")}
                  </div>
                </div>

                <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                  <Clock className="h-7 w-7 text-teal-dark mb-3" />
                  <div className="text-3xl font-black text-navy">
                    {t("stats.hoursCount")}
                  </div>
                  <div className="mt-1 text-xs text-grey">
                    {t("stats.hoursLabel")}
                  </div>
                </div>

                <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                  <Globe className="h-7 w-7 text-navy mb-3" />
                  <div className="text-3xl font-black text-navy">
                    {t("stats.countriesCount")}
                  </div>
                  <div className="mt-1 text-xs text-grey">
                    {t("stats.countriesLabel")}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Pillars / Values */}
      <Section size="md" tone="default">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>{t("pillars.eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-2xl font-black text-navy md:text-4xl">
                {t("pillars.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal mb-6">
                    <ShieldCheck size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    {t("pillars.p1.title")}
                  </h3>
                  <p className="mt-3 text-sm text-grey leading-relaxed">
                    {t("pillars.p1.description")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-aqua/15 text-navy mb-6">
                    <Video size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    {t("pillars.p2.title")}
                  </h3>
                  <p className="mt-3 text-sm text-grey leading-relaxed">
                    {t("pillars.p2.description")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-dark/10 text-teal-dark mb-6">
                    <Globe size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">
                    {t("pillars.p3.title")}
                  </h3>
                  <p className="mt-3 text-sm text-grey leading-relaxed">
                    {t("pillars.p3.description")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTABanner />
    </main>
  );
}
