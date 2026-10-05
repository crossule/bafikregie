import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { quoteSchema } from "@/lib/validations";
import { sendQuoteEmails } from "@/lib/email";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = quoteSchema.safeParse(json);

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

    // Generate unique reference
    const year = new Date().getFullYear();
    const countRow = db
      .prepare(
        "SELECT COUNT(*) as count FROM quotes WHERE created_at LIKE ?"
      )
      .get(`${year}%`) as { count: number };
    const sequence = (countRow?.count || 0) + 1;
    const reference = `BFK-${year}-${String(sequence).padStart(4, "0")}`;

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO quotes (
        id, reference, name, email, phone, organization, event_type, event_title,
        expected_date, expected_attendees, services, city_country, budget_range,
        message, status, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      reference,
      data.name,
      data.email,
      data.phone,
      data.organization,
      data.eventType,
      data.eventTitle,
      data.expectedDate,
      data.expectedAttendees,
      JSON.stringify(data.services),
      data.cityCountry,
      data.budgetRange || null,
      data.message || null,
      "pending",
      null,
      now,
      now
    );

    // Record audit log
    db.prepare(`
      INSERT INTO audit_logs (id, actor, action, target_type, target_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      data.email,
      "SUBMIT_QUOTE",
      "quote",
      id,
      `Demande ${reference} soumise par ${data.name} (${data.organization})`,
      now
    );

    // Dispatch notifications
    await sendQuoteEmails({
      reference,
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      eventType: data.eventType,
      eventTitle: data.eventTitle,
      expectedDate: data.expectedDate,
      expectedAttendees: data.expectedAttendees,
      services: data.services,
      cityCountry: data.cityCountry,
      budgetRange: data.budgetRange,
      message: data.message,
    });

    return NextResponse.json(
      {
        success: true,
        reference,
        message: "Votre demande de devis a été enregistrée avec succès.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API_QUOTES_POST]", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const db = getDb();
    let query = "SELECT * FROM quotes";
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== "all") {
      conditions.push("status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push(
        "(reference LIKE ? OR name LIKE ? OR email LIKE ? OR organization LIKE ? OR event_title LIKE ?)"
      );
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const rows = db.prepare(query).all(...params) as any[];
    const quotes = rows.map((r) => ({
      ...r,
      services: JSON.parse(r.services || "[]"),
    }));

    return NextResponse.json({
      success: true,
      count: quotes.length,
      quotes,
    });
  } catch (error: any) {
    console.error("[API_QUOTES_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
