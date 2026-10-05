import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/content/projects";

export function ProjectStats({ project }: { project: Project }) {
  return (
    <section className="relative -mt-12 z-10 pb-4">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-navy/5 bg-white p-6 shadow-lift md:grid-cols-4">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="text-center md:border-r md:border-navy/5 md:last:border-r-0"
              >
                <div className="text-2xl font-black text-teal md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-grey">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
