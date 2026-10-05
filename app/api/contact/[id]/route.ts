import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";
import { updateMessageStatusSchema } from "@/lib/validations";

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
    const parsed = updateMessageStatusSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = db
      .prepare("UPDATE contact_messages SET status = ? WHERE id = ?")
      .run(parsed.data.status, id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Statut du message mis à jour",
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
    const result = db
      .prepare("DELETE FROM contact_messages WHERE id = ?")
      .run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Message supprimé avec succès",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
