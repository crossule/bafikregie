import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { siteConfig, whatsappLink } from "@/lib/config";
import { Phone, Mail, Globe, MapPin, MessageSquare } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact.hero" });

  return (
    <main className="min-h-screen bg-bg pt-28 pb-20">
      <Section size="sm" tone="default">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-10">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-balance text-3xl font-black text-navy md:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-base text-grey md:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </Reveal>

          {/* Direct Contact Cards from Brochure */}
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-4xl mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-lift"
              >
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <Phone size={20} />
                  </div>
                  <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-grey">
                    Téléphone / WhatsApp
                  </h3>
                  <p className="mt-1 font-mono text-sm font-bold text-navy">
                    {siteConfig.contact.phone}
                  </p>
                </div>
                <span className="mt-3 text-xs font-semibold text-teal group-hover:underline">
                  Discuter sur WhatsApp →
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-lift"
              >
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-aqua/20 text-teal-dark transition-colors group-hover:bg-teal group-hover:text-white">
                    <Mail size={20} />
                  </div>
                  <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-grey">
                    E-mail
                  </h3>
                  <p className="mt-1 text-sm font-bold text-navy break-all">
                    {siteConfig.contact.email}
                  </p>
                </div>
                <span className="mt-3 text-xs font-semibold text-teal group-hover:underline">
                  Envoyer un email →
                </span>
              </a>

              <div className="flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                    <Globe size={20} />
                  </div>
                  <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-grey">
                    Site Web / LinkedIn
                  </h3>
                  <p className="mt-1 font-mono text-sm font-bold text-navy">
                    bafiksarl.com
                  </p>
                </div>
                <span className="mt-3 text-xs text-grey">
                  BAFIK SARL
                </span>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 shadow-soft">
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                    <MapPin size={20} />
                  </div>
                  <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-grey">
                    Localisation
                  </h3>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {siteConfig.contact.location}
                  </p>
                </div>
                <span className="mt-3 text-xs text-grey">
                  Côte d'Ivoire & Afrique
                </span>
              </div>
            </div>
          </Reveal>

          {/* Brochure Quote Banner */}
          <Reveal delay={0.15}>
            <div className="mx-auto max-w-4xl mb-12 rounded-3xl bg-gradient-to-r from-navy via-navy-2 to-teal-dark p-6 sm:p-8 text-white shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua">
                Communication Santé Audiovisuel Digital
              </p>
              <blockquote className="mt-3 text-lg font-extrabold sm:text-xl">
                « Votre congrès ne doit pas s'arrêter à la fermeture des portes. »
              </blockquote>
              <p className="mt-2 text-xs text-white/80 sm:text-sm">
                BAFIK transforme vos conférences, échanges d'experts et communications scientifiques en contenus capables d'informer, de former et de prolonger l'impact de votre événement.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-aqua">
                <span>CONGRÈS</span>
                <span>•</span>
                <span>SYMPOSIUMS</span>
                <span>•</span>
                <span>JOURNÉES SCIENTIFIQUES</span>
                <span>•</span>
                <span>MASTERCLASS</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
