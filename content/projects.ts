export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectPhoto = {
  src: string;
  caption: string;
};

export type ProjectVideo = {
  youtubeId: string;
  title: string;
  /** "bestof" | "expert" | "capsule" | "sponsor" | "session" */
  category: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  specialty: string;   // "Ophtalmologie" | "Cardiologie" | ...
  type: string;        // "Congrès" | "Symposium" | "Masterclass"
  city: string;
  country: string;
  year: number;
  cover: string;
  featured?: boolean;
  stats: ProjectStat[];
  photos: ProjectPhoto[];
  videos: ProjectVideo[];
  services: string[];  // Human-readable tags
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    videoId?: string;
  };
};

// ============================================================
// PROJECT DATA
// Replace `cover`, `photos[].src`, and `videos[].youtubeId`
// with real assets. Captions are already structured.
// ============================================================

export const projects: Project[] = [
  {
    slug: "sio-2024",
    title: "SIO 2024",
    subtitle: "Société Ivoirienne d'Ophtalmologie",
    specialty: "Ophtalmologie",
    type: "Congrès",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    year: 2024,
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Jours", value: "3" },
      { label: "Sessions filmées", value: "12" },
      { label: "Intervenants", value: "45" },
      { label: "Vues replay", value: "8 000+" },
    ],
    photos: [
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
        caption: "Session plénière d'ouverture — SIO 2024, Abidjan",
      },
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        caption: "Intervention du Pr. Koné en session principale",
      },
      {
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
        caption: "Table ronde — Innovations en chirurgie oculaire",
      },
      {
        src: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
        caption: "Régie scientifique BAFIK pendant le congrès",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        caption: "Salle plénière — plus de 400 participants",
      },
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
        caption: "Interviews d'experts à l'issue des sessions",
      },
    ],
    videos: [
      { youtubeId: "dQw4w9WgXcQ", title: "Best Of — SIO 2024", category: "bestof" },
      { youtubeId: "dQw4w9WgXcQ", title: "Paroles d'experts — Pr. Koné", category: "expert" },
      { youtubeId: "dQw4w9WgXcQ", title: "Key Messages — Ophtalmologie", category: "capsule" },
    ],
    services: [
      "Régie scientifique",
      "Captation multi-caméras",
      "Streaming",
      "Post-congrès",
    ],
    testimonial: {
      quote:
        "BAFIK a su comprendre les exigences d'un congrès scientifique. La coordination a été irréprochable et les contenus post-congrès prolongent réellement notre impact.",
      author: "Pr. Aïcha Traoré",
      role: "Présidente du comité scientifique — SIO",
    },
  },
  {
    slug: "safo-2024",
    title: "SAFO 2024",
    subtitle: "Société Africaine Francophone d'Ophtalmologie",
    specialty: "Ophtalmologie",
    type: "Congrès",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    year: 2024,
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Jours", value: "4" },
      { label: "Sessions filmées", value: "18" },
      { label: "Intervenants", value: "60" },
      { label: "Vues replay", value: "12 000+" },
    ],
    photos: [
      {
        src: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
        caption: "Cérémonie d'ouverture — SAFO 2024",
      },
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
        caption: "Symposium satellite — innovations thérapeutiques",
      },
      {
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
        caption: "Atelier pratique — chirurgie de la cataracte",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        caption: "Session plénière — 60 intervenants internationaux",
      },
    ],
    videos: [
      { youtubeId: "dQw4w9WgXcQ", title: "Best Of — SAFO 2024", category: "bestof" },
      { youtubeId: "dQw4w9WgXcQ", title: "Interview — Pr. Diallo", category: "expert" },
    ],
    services: [
      "Régie scientifique",
      "Captation multi-caméras",
      "Streaming",
      "Post-congrès",
    ],
    testimonial: {
      quote:
        "Une équipe locale, réactive et parfaitement au fait des réalités des congrès médicaux africains.",
      author: "Dr. Mamadou Diallo",
      role: "Secrétaire général — SAFO",
    },
  },
  {
    slug: "africardio-2024",
    title: "AFRICARDIO 2024",
    subtitle: "Congrès Africain de Cardiologie",
    specialty: "Cardiologie",
    type: "Congrès",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    year: 2024,
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Jours", value: "3" },
      { label: "Sessions filmées", value: "15" },
      { label: "Intervenants", value: "50" },
      { label: "Vues replay", value: "10 000+" },
    ],
    photos: [
      {
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
        caption: "Session plénière d'ouverture — AFRICARDIO 2024",
      },
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
        caption: "Symposium — cardiologie interventionnelle",
      },
      {
        src: "https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=80",
        caption: "Table ronde — prévention cardiovasculaire en Afrique",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        caption: "Cocktail de clôture et remise des prix",
      },
    ],
    videos: [
      { youtubeId: "dQw4w9WgXcQ", title: "Best Of — AFRICARDIO 2024", category: "bestof" },
      { youtubeId: "dQw4w9WgXcQ", title: "Paroles d'experts — Pr. N'Guessan", category: "expert" },
      { youtubeId: "dQw4w9WgXcQ", title: "Capsule — Prévention cardiovasculaire", category: "capsule" },
    ],
    services: [
      "Production audiovisuelle",
      "Streaming",
      "Post-congrès",
    ],
    testimonial: {
      quote:
        "Grâce à BAFIK, notre congrès a touché un public bien au-delà de la salle. Le replay est devenu un outil pédagogique précieux.",
      author: "Pr. Yao N'Guessan",
      role: "Président — AFRICARDIO",
    },
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Unique specialties across all projects (for filters). */
export function getAllSpecialties(): string[] {
  return Array.from(new Set(projects.map((p) => p.specialty))).sort();
}

/** Unique types across all projects (for filters). */
export function getAllTypes(): string[] {
  return Array.from(new Set(projects.map((p) => p.type))).sort();
}

/** Unique services across all projects (for filters). */
export function getAllServices(): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.services))).sort();
}
