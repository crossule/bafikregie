import { cookies } from "next/headers";
import { verifySessionToken } from "./crypto";
import { getDb } from "@/lib/db";

export const AUTH_COOKIE_NAME = "bafik_admin_session";

export type AdminUserSession = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function getCurrentAdmin(): Promise<AdminUserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken<AdminUserSession>(token);
  if (!payload || !payload.id) return null;

  // Confirm user still exists in database
  const db = getDb();
  const user = db
    .prepare("SELECT id, email, name, role FROM admin_users WHERE id = ?")
    .get(payload.id) as AdminUserSession | undefined;

  if (!user) return null;

  return user;
}
