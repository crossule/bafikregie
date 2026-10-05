import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getService, getAllServiceSlugs } from "@/content/services";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceFeatures } from "@/components/sections/services/ServiceFeatures";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceGallery } from "@/components/sections/services/ServiceGallery";
import { RelatedProjects } from "@/components/sections/services/RelatedProjects";
import { CTABanner } from "@/components/sections/shared/CTABanner";

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const t = await getTranslations({
    locale,
    namespace: `services.items.${slug}`,
  });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceHero service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess service={service} />
      <ServiceGallery service={service} />
      <RelatedProjects service={service} />
      <CTABanner />
    </>
  );
}
