import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/content/services";

export function ServiceGallery({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}.gallerySection`);

  return (
    <Section tone="default">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {service.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
