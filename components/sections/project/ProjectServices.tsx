import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/content/projects";

export function ProjectServices({ project }: { project: Project }) {
  const t = useTranslations("galerie.projectPage.services");

  return (
    <Section tone="default">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {project.services.map((s) => (
              <Badge key={s} tone="aqua" className="px-4 py-2 text-sm">
                {s}
              </Badge>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
