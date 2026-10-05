import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const specialty = searchParams.get("specialty");
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");

    const db = getDb();
    let query = "SELECT * FROM projects";
    const conditions: string[] = [];
    const params: any[] = [];

    if (featured === "true") {
      conditions.push("featured = 1");
    }

    if (specialty && specialty !== "all") {
      conditions.push("specialty = ?");
      params.push(specialty);
    }

    if (type && type !== "all") {
      conditions.push("type = ?");
      params.push(type);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY year DESC, created_at DESC";

    if (limit) {
      query += " LIMIT ?";
      params.push(parseInt(limit, 10));
    }

    const rows = db.prepare(query).all(...params) as any[];
    const projects = rows.map((r) => {
      try {
        return JSON.parse(r.data);
      } catch {
        return r;
      }
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error: any) {
    console.error("[API_PROJECTS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.slug || !body.title) {
      return NextResponse.json(
        { error: "Slug et Titre requis" },
        { status: 400 }
      );
    }

    const db = getDb();
    const existing = db
      .prepare("SELECT id FROM projects WHERE slug = ?")
      .get(body.slug);

    if (existing) {
      return NextResponse.json(
        { error: "Un projet avec ce slug existe déjà" },
        { status: 409 }
      );
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO projects (
        id, slug, title, subtitle, type, specialty, year, city, country, cover, featured, data, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.slug,
      body.title,
      body.subtitle || "",
      body.type || "Congrès",
      body.specialty || "Médical",
      body.year || new Date().getFullYear(),
      body.city || "",
      body.country || "",
      body.cover || "",
      body.featured ? 1 : 0,
      JSON.stringify(body),
      now,
      now
    );

    return NextResponse.json(
      { success: true, message: "Projet créé avec succès" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
