import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { GalerieHero } from "@/components/sections/galerie/GalerieHero";
import { GalerieContent } from "@/components/sections/galerie/GalerieContent";
import { CTABanner } from "@/components/sections/shared/CTABanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galerie.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GalerieHero />
      <GalerieContent />
      <CTABanner />
    </>
  );
}
