import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration — BAFIK Medical Congress",
  description: "Portail d'administration et de gestion des demandes BAFIK",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased font-sans">
      {children}
    </div>
  );
}
