import { NextResponse } from "next/server";
import { services, type Service } from "@/content/services";

export async function GET() {
  const serialized = services.map((s: Service) => ({
    slug: s.slug,
    cover: s.cover,
    gallery: s.gallery,
    features: s.features,
    relatedProjects: s.relatedProjects,
    accent: s.accent,
  }));

  return NextResponse.json({
    success: true,
    count: serialized.length,
    services: serialized,
  });
}
