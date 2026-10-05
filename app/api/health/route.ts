import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const quoteCount = (
      db.prepare("SELECT COUNT(*) as count FROM quotes").get() as { count: number }
    ).count;
    const projectCount = (
      db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number }
    ).count;
    const adminCount = (
      db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number }
    ).count;

    return NextResponse.json({
      status: "ok",
      service: "bafik-medical-backend",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        engine: "sqlite",
        connected: true,
        stats: {
          quotes: quoteCount,
          projects: projectCount,
          admins: adminCount,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Database connection failure",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
