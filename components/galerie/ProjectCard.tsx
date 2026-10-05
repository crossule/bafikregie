import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  size = "md",
}: {
  project: Project;
  size?: "sm" | "md" | "lg";
}) {
  const heights = {
    sm: "aspect-[4/3]",
    md: "aspect-[4/3]",
    lg: "aspect-[16/10]",
  };

  return (
    <Link
      href={`/galerie/${project.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className={`relative overflow-hidden ${heights[size]}`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-teal/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {project.type}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {project.specialty}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
          <div>
            <p className="text-xs font-medium text-white/75">
              {project.city} · {project.year}
            </p>
            <h3 className="mt-1 text-xl font-extrabold">{project.title}</h3>
            <p className="mt-0.5 text-xs text-white/80">{project.subtitle}</p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-aqua group-hover:text-navy">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-navy/5 border-t border-navy/5">
        {project.stats.map((s) => (
          <div key={s.label} className="px-3 py-3 text-center">
            <div className="text-sm font-black text-teal">{s.value}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wider text-grey">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
