import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/shared/CTABanner";
import { Film, Headphones, GraduationCap, Video, Calendar, Sparkles } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "augmented.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const TIMELINE = [
  {
    badge: "BEST OF",
    title: "Film Court des Temps Forts",
    desc: "Montage express et diffusion des temps forts, résumés des plénières d'ouverture et premières capsules pour entretenir l'engouement sur vos réseaux.",
  },
  {
    badge: "PAROLES D'EXPERTS",
    title: "Interviews des Principaux Intervenants",
    desc: "Interviews des orateurs clés, synthèses des recommandations thérapeutiques et mise en ligne des premières sessions plénières chapitrées.",
  },
  {
    badge: "CAPSULES",
    title: "Modules Thématiques & FMC",
    desc: "Modules thématiques pour la formation médicale continue des praticiens et intégration sur votre médiathèque scientifique sécurisée.",
  },
  {
    badge: "RÉSULTAT",
    title: "Visibilité & Valorisation Partenaires",
    desc: "Un congrès de quelques jours génère plusieurs mois de contenus scientifiques et de visibilité pérenne pour la société savante et ses partenaires.",
  },
];

export default async function AugmentedCongressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "augmented" });

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

      {/* Intro / Problem Statement */}
      <Section size="md" tone="tinted">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-2xl font-black text-navy md:text-4xl">
                {t("intro.title")}
              </h2>
              <p className="mt-5 text-grey leading-relaxed text-base md:text-lg">
                {t("intro.text")}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section size="lg" tone="default">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                <Sparkles size={14} /> Formats Post-Événement
              </span>
              <h2 className="mt-4 text-3xl font-black text-navy md:text-4xl">
                Faites vivre votre congrès après l'événement
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item, idx) => (
              <Reveal key={item.badge} delay={idx * 0.1}>
                <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-soft h-full flex flex-col justify-between hover:-translate-y-1 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-full bg-teal px-3 py-1 text-xs font-black text-white">
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-grey">Étape 0{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2.5 text-xs text-grey leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deliverables Section */}
      <Section size="md" tone="navy">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Eyebrow>{t("deliverables.eyebrow")}</Eyebrow>
              <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
                {t("deliverables.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-navy-2 p-8 shadow-xl">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/20 text-aqua mb-5">
                  <Film size={26} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {t("deliverables.items.replays.title")}
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {t("deliverables.items.replays.description")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-white/10 bg-navy-2 p-8 shadow-xl">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-aqua/20 text-aqua mb-5">
                  <Video size={26} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {t("deliverables.items.capsules.title")}
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {t("deliverables.items.capsules.description")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-white/10 bg-navy-2 p-8 shadow-xl">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/20 text-purple-300 mb-5">
                  <Headphones size={26} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {t("deliverables.items.podcast.title")}
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {t("deliverables.items.podcast.description")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="rounded-3xl border border-white/10 bg-navy-2 p-8 shadow-xl">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-300 mb-5">
                  <GraduationCap size={26} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {t("deliverables.items.cme.title")}
                </h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {t("deliverables.items.cme.description")}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTABanner />
    </main>
  );
}
