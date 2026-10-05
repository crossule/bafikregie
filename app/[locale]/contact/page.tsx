import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/contact/ContactForm";

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
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-balance text-3xl font-black text-navy md:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-base text-grey md:text-lg">
                {t("subtitle")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
