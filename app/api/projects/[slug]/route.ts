import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDb();
    const row = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug) as any;

    if (!row) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }

    const project = JSON.parse(row.data);
    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();
    const db = getDb();

    const existing = db
      .prepare("SELECT id FROM projects WHERE slug = ?")
      .get(slug) as { id: string } | undefined;

    if (!existing) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE projects
      SET title = ?, subtitle = ?, type = ?, specialty = ?, year = ?,
          city = ?, country = ?, cover = ?, featured = ?, data = ?, updated_at = ?
      WHERE id = ?
    `).run(
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
      existing.id
    );

    return NextResponse.json({ success: true, message: "Projet mis à jour" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { slug } = await params;
    const db = getDb();
    const result = db.prepare("DELETE FROM projects WHERE slug = ?").run(slug);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Projet supprimé avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
