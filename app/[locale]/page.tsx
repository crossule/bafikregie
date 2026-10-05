import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { ServicesTeaser } from "@/components/sections/home/ServicesTeaser";
import { AugmentedTeaser } from "@/components/sections/home/AugmentedTeaser";
import { GalleryTeaser } from "@/components/sections/home/GalleryTeaser";
import { ExperienceStrip } from "@/components/sections/home/ExperienceStrip";
import { CTABanner } from "@/components/sections/shared/CTABanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Pillars />
      <ServicesTeaser />
      <AugmentedTeaser />
      <GalleryTeaser />
      <ExperienceStrip />
      <CTABanner />
    </>
  );
}
