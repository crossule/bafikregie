import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = newsletterSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const locale = parsed.data.locale || "fr";
    const db = getDb();

    // Check if already subscribed
    const existing = db
      .prepare("SELECT id, status FROM subscribers WHERE email = ?")
      .get(email) as { id: string; status: string } | undefined;

    if (existing) {
      if (existing.status !== "active") {
        db.prepare("UPDATE subscribers SET status = 'active' WHERE id = ?").run(
          existing.id
        );
      }
      return NextResponse.json({
        success: true,
        message: "Vous êtes déjà inscrit à nos actualités.",
      });
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO subscribers (id, email, locale, status, created_at)
      VALUES (?, ?, ?, 'active', ?)
    `).run(id, email, locale, now);

    return NextResponse.json(
      {
        success: true,
        message: "Merci pour votre inscription à la lettre d'information BAFIK.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = getDb();
    const subscribers = db
      .prepare("SELECT * FROM subscribers ORDER BY created_at DESC")
      .all();

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
