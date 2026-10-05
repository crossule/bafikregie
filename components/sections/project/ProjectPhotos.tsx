import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoGrid } from "@/components/galerie/PhotoGrid";
import type { Project } from "@/content/projects";

export function ProjectPhotos({ project }: { project: Project }) {
  const t = useTranslations("galerie.projectPage.photos");
  if (project.photos.length === 0) return null;

  return (
    <Section tone="default">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-balance">{t("title")}</h2>
          </div>
        </Reveal>

        <div className="mt-12">
          <PhotoGrid photos={project.photos} />
        </div>
      </Container>
    </Section>
  );
}
