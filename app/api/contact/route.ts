import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const db = getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO contact_messages (id, name, email, phone, subject, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'unread', ?)
    `).run(
      id,
      data.name,
      data.email,
      data.phone || null,
      data.subject,
      data.message,
      now
    );

    // Record audit
    db.prepare(`
      INSERT INTO audit_logs (id, actor, action, target_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.email,
      "CONTACT_MESSAGE",
      "contact_message",
      id,
      `Nouveau message de ${data.name} : "${data.subject}"`,
      now
    );

    // Send notifications
    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Votre message a bien été envoyé. Notre équipe vous répondra rapidement.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API_CONTACT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const db = getDb();
    let query = "SELECT * FROM contact_messages";
    const params: any[] = [];

    if (status && status !== "all") {
      query += " WHERE status = ?";
      params.push(status);
    }

    query += " ORDER BY created_at DESC";

    const messages = db.prepare(query).all(...params);

    return NextResponse.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
