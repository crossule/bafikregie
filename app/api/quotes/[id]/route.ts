import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";
import { updateQuoteStatusSchema } from "@/lib/validations";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    const row = db.prepare("SELECT * FROM quotes WHERE id = ?").get(id) as any;

    if (!row) {
      return NextResponse.json(
        { error: "Demande introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quote: {
        ...row,
        services: JSON.parse(row.services || "[]"),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const json = await req.json();
    const parsed = updateQuoteStatusSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const db = getDb();
    const now = new Date().toISOString();
    const existing = db
      .prepare("SELECT id, reference FROM quotes WHERE id = ?")
      .get(id) as { id: string; reference: string } | undefined;

    if (!existing) {
      return NextResponse.json(
        { error: "Demande introuvable" },
        { status: 404 }
      );
    }

    db.prepare(`
      UPDATE quotes
      SET status = ?, notes = COALESCE(?, notes), updated_at = ?
      WHERE id = ?
    `).run(parsed.data.status, parsed.data.notes || null, now, id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, actor, action, target_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      admin.email,
      "UPDATE_QUOTE_STATUS",
      "quote",
      id,
      `Statut passé à "${parsed.data.status}" pour le devis ${existing.reference}`,
      now
    );

    return NextResponse.json({
      success: true,
      message: "Statut mis à jour avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    const existing = db
      .prepare("SELECT id, reference FROM quotes WHERE id = ?")
      .get(id) as { id: string; reference: string } | undefined;

    if (!existing) {
      return NextResponse.json(
        { error: "Demande introuvable" },
        { status: 404 }
      );
    }

    db.prepare("DELETE FROM quotes WHERE id = ?").run(id);

    db.prepare(`
      INSERT INTO audit_logs (id, actor, action, target_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      admin.email,
      "DELETE_QUOTE",
      "quote",
      id,
      `Suppression du devis ${existing.reference}`,
      new Date().toISOString()
    );

    return NextResponse.json({
      success: true,
      message: "Devis supprimé avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
