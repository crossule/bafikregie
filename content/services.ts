import type { LucideIcon } from "lucide-react";
import { Cog, Camera, Radio } from "lucide-react";

export type ServiceSlug =
  | "regie-scientifique"
  | "production-audiovisuelle"
  | "streaming-hybride";

export type ServiceFeature = {
  key: string;
};

export type Service = {
  slug: ServiceSlug;
  Icon: LucideIcon;
  /** Image URLs (replace with /images/services/xxx.jpg when assets ready) */
  cover: string;
  gallery: string[];
  /** Feature keys map to i18n: services.items.{slug}.features.{key} */
  features: ServiceFeature[];
  /** Related project slugs (from content/projects.ts) */
  relatedProjects: string[];
  /** Optional accent color for the card top border */
  accent: string;
};

export const services: Service[] = [
  {
    slug: "regie-scientifique",
    Icon: Cog,
    cover:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { key: "collecte" },
      { key: "powerpoint" },
      { key: "coordination" },
      { key: "accompagnement" },
      { key: "timing" },
      { key: "interface" },
    ],
    relatedProjects: ["sio-2024", "safo-2024"],
    accent: "from-teal to-aqua",
  },
  {
    slug: "production-audiovisuelle",
    Icon: Camera,
    cover:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { key: "captation" },
      { key: "multicam" },
      { key: "projection" },
      { key: "interviews" },
      { key: "tablesRondes" },
      { key: "filmRecap" },
    ],
    relatedProjects: ["sio-2024", "africardio-2024"],
    accent: "from-aqua to-teal",
  },
  {
    slug: "streaming-hybride",
    Icon: Radio,
    cover:
      "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      { key: "live" },
      { key: "remote" },
      { key: "replay" },
      { key: "multiplatform" },
      { key: "recording" },
      { key: "medialibrary" },
    ],
    relatedProjects: ["africardio-2024", "sio-2024"],
    accent: "from-teal to-navy-2",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return services.map((s) => s.slug);
}
