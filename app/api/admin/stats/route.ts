import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/session";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = getDb();

    // Quotes counts
    const totalQuotes = (
      db.prepare("SELECT COUNT(*) as c FROM quotes").get() as { c: number }
    ).c;
    const pendingQuotes = (
      db
        .prepare("SELECT COUNT(*) as c FROM quotes WHERE status = 'pending'")
        .get() as { c: number }
    ).c;
    const acceptedQuotes = (
      db
        .prepare("SELECT COUNT(*) as c FROM quotes WHERE status = 'accepted'")
        .get() as { c: number }
    ).c;

    // Messages counts
    const totalMessages = (
      db.prepare("SELECT COUNT(*) as c FROM contact_messages").get() as {
        c: number;
      }
    ).c;
    const unreadMessages = (
      db
        .prepare(
          "SELECT COUNT(*) as c FROM contact_messages WHERE status = 'unread'"
        )
        .get() as { c: number }
    ).c;

    // Subscribers count
    const totalSubscribers = (
      db.prepare("SELECT COUNT(*) as c FROM subscribers").get() as { c: number }
    ).c;

    // Projects count
    const totalProjects = (
      db.prepare("SELECT COUNT(*) as c FROM projects").get() as { c: number }
    ).c;

    // Recent quotes (last 5)
    const recentQuotes = db
      .prepare(
        "SELECT id, reference, name, organization, event_title, expected_date, status, created_at FROM quotes ORDER BY created_at DESC LIMIT 5"
      )
      .all();

    // Recent audit logs (last 10)
    const recentLogs = db
      .prepare(
        "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10"
      )
      .all();

    return NextResponse.json({
      success: true,
      stats: {
        quotes: {
          total: totalQuotes,
          pending: pendingQuotes,
          accepted: acceptedQuotes,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
        },
        subscribers: totalSubscribers,
        projects: totalProjects,
      },
      recentQuotes,
      recentLogs,
    });
  } catch (error: any) {
    console.error("[API_ADMIN_STATS]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
