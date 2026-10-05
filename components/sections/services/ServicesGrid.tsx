import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";

export function ServicesGrid() {
  const t = useTranslations("services.overview");

  return (
    <Section tone="default">
      <Container>
        <div className="grid gap-8">
          {services.map((service, i) => {
            const st = useTranslations(`services.items.${service.slug}`);
            const { Icon } = service;
            const reversed = i % 2 === 1;

            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:grid-cols-2"
                >
                  <div
                    className={`relative aspect-[4/3] md:aspect-auto ${
                      reversed ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy/50 to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="inline-flex items-center gap-2 self-start rounded-full bg-teal-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-dark">
                      <Icon size={14} />
                      0{i + 1}
                    </span>

                    <h3 className="mt-5 text-2xl font-extrabold text-navy md:text-3xl">
                      {st("title")}
                    </h3>
                    <p className="mt-4 text-grey">{st("subtitle")}</p>

                    <ul className="mt-6 space-y-2">
                      {service.features.slice(0, 3).map((f) => (
                        <li
                          key={f.key}
                          className="flex items-start gap-2 text-sm text-grey"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          {st(`features.${f.key}`)}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal transition-transform duration-300 group-hover:translate-x-1">
                      {t("learnMore")} <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
