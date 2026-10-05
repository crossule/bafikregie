import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { projects } from "@/content/projects";
import { hashPassword } from "@/lib/auth/crypto";

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) {
    return dbInstance;
  }

  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "bafik.db");
  const db = new DatabaseSync(dbPath);

  // Performance and integrity pragmas
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA synchronous = NORMAL;");
  db.exec("PRAGMA foreign_keys = ON;");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      reference TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      organization TEXT NOT NULL,
      event_type TEXT NOT NULL,
      event_title TEXT NOT NULL,
      expected_date TEXT NOT NULL,
      expected_attendees INTEGER NOT NULL DEFAULT 0,
      services TEXT NOT NULL,
      city_country TEXT NOT NULL,
      budget_range TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      locale TEXT NOT NULL DEFAULT 'fr',
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      type TEXT NOT NULL,
      specialty TEXT NOT NULL,
      year INTEGER NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      cover TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      actor TEXT NOT NULL,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      details TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default admin if missing
  const adminCountRow = db
    .prepare("SELECT COUNT(*) as count FROM admin_users")
    .get() as { count: number };

  if (adminCountRow.count === 0) {
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@bafik.com";
    const adminPassword =
      process.env.ADMIN_DEFAULT_PASSWORD || "BafikMedical2026!";
    const { hash, salt } = hashPassword(adminPassword);

    db.prepare(`
      INSERT INTO admin_users (id, email, password_hash, salt, name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      adminEmail.toLowerCase().trim(),
      hash,
      salt,
      "Administrateur BAFIK",
      "admin",
      new Date().toISOString()
    );
  }

  // Seed projects from content/projects.ts if projects table is empty
  const projectCountRow = db
    .prepare("SELECT COUNT(*) as count FROM projects")
    .get() as { count: number };

  if (projectCountRow.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (
        id, slug, title, subtitle, type, specialty, year, city, country, cover, featured, data, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const p of projects) {
      insertProject.run(
        crypto.randomUUID(),
        p.slug,
        p.title,
        p.subtitle,
        p.type,
        p.specialty,
        p.year,
        p.city,
        p.country,
        p.cover,
        p.featured ? 1 : 0,
        JSON.stringify(p),
        now,
        now
      );
    }
  }

  // Seed a sample quote if quotes table is empty
  const quoteCountRow = db
    .prepare("SELECT COUNT(*) as count FROM quotes")
    .get() as { count: number };

  if (quoteCountRow.count === 0) {
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO quotes (
        id, reference, name, email, phone, organization, event_type, event_title,
        expected_date, expected_attendees, services, city_country, budget_range,
        message, status, notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      "BFK-2026-0001",
      "Prof. Mamadou Diallo",
      "contact@societe-cardio.org",
      "+225 07 12 34 56 78",
      "Société Africaine de Cardiologie",
      "congres",
      "Congrès Panafricain de Cardiologie 2026",
      "2026-11-15",
      650,
      JSON.stringify(["regie-scientifique", "streaming-hybride", "production-audiovisuelle"]),
      "Abidjan, Côte d'Ivoire",
      "15M - 25M FCFA",
      "Nous sollicitons l'expertise de BAFIK pour la captation multi-salles, la régie scientifique et la retransmission hybride en direct de notre congrès annuel.",
      "pending",
      "Contact préliminaire reçu lors du symposium précédent.",
      now,
      now
    );
  }

  dbInstance = db;
  return db;
}
