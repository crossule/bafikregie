"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Mail,
  Users,
  Database,
  RefreshCw,
  LogOut,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

type Quote = {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  event_type: string;
  event_title: string;
  expected_date: string;
  expected_attendees: number;
  services: string[];
  city_country: string;
  budget_range?: string;
  message?: string;
  status: "pending" | "reviewed" | "quoted" | "accepted" | "rejected";
  notes?: string;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  created_at: string;
};

type Subscriber = {
  id: string;
  email: string;
  locale: string;
  status: string;
  created_at: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"quotes" | "messages" | "subscribers" | "system">("quotes");

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [healthData, setHealthData] = useState<any>(null);

  // Filters
  const [quoteFilter, setQuoteFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);

  // Load Data
  const loadDashboard = async () => {
    try {
      setLoading(true);

      // Verify Auth
      const authRes = await fetch("/api/auth/me");
      if (!authRes.ok) {
        router.push("/admin/login");
        return;
      }
      const authData = await authRes.json();
      setAdminUser(authData.user);

      // Fetch Stats
      const statsRes = await fetch("/api/admin/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      // Fetch Quotes
      const quotesRes = await fetch("/api/quotes");
      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        setQuotes(quotesData.quotes || []);
      }

      // Fetch Messages
      const msgRes = await fetch("/api/contact");
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages || []);
      }

      // Fetch Subscribers
      const subRes = await fetch("/api/newsletter");
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData.subscribers || []);
      }

      // Fetch Health
      const healthRes = await fetch("/api/health");
      if (healthRes.ok) {
        const hData = await healthRes.json();
        setHealthData(hData);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    startTransition(() => {
      router.push("/admin/login");
    });
  };

  const handleUpdateQuoteStatus = async (
    id: string,
    newStatus: Quote["status"],
    notes?: string
  ) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
        // Refresh stats
        const statsRes = await fetch("/api/admin/stats");
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData.stats);
        }
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce devis ?")) return;
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
      }
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const handleUpdateMsgStatus = async (
    id: string,
    newStatus: "unread" | "read" | "archived"
  ) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch {
      alert("Erreur de mise à jour");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      alert("Erreur de suppression");
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus =
      quoteFilter === "all" ? true : q.status === quoteFilter;
    const matchesSearch =
      !searchQuery ||
      q.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.event_title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Quote["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
            <Clock size={12} /> En attente
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
            En examen
          </span>
        );
      case "quoted":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30">
            Devis transmis
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
            <CheckCircle size={12} /> Validé
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/15 px-3 py-1 text-xs font-bold text-slate-400 border border-slate-500/30">
            Refusé / Archivé
          </span>
        );
    }
  };

  if (loading && !adminUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-teal-400 font-semibold text-sm">
          <RefreshCw className="animate-spin" size={20} />
          Chargement du tableau de bord BAFIK...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-slate-950 font-black text-sm">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm tracking-wide">
                  BAFIK
                </span>
                <span className="rounded bg-teal-500/20 px-1.5 py-0.5 text-[10px] font-bold text-teal-300">
                  BACKEND ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Medical Congress Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <span>Voir le site</span>
              <ExternalLink size={14} />
            </a>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{adminUser?.name}</p>
              <p className="text-[10px] text-slate-400">{adminUser?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition"
              title="Déconnexion"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Devis reçus
              </span>
              <FileText size={18} className="text-teal-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats?.quotes?.total ?? 0}
              </span>
              {stats?.quotes?.pending > 0 && (
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-400">
                  {stats.quotes.pending} en attente
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Messages
              </span>
              <Mail size={18} className="text-sky-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {stats?.messages?.total ?? 0}
              </span>
              {stats?.messages?.unread > 0 && (
                <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[11px] font-bold text-sky-400">
                  {stats.messages.unread} non lus
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Abonnés Newsletter
              </span>
              <Users size={18} className="text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white">
                {stats?.subscribers ?? 0}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Projets au catalogue
              </span>
              <Briefcase size={18} className="text-purple-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white">
                {stats?.projects ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("quotes")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "quotes"
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <FileText size={15} />
              Demandes de Devis ({quotes.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "messages"
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Mail size={15} />
              Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "subscribers"
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Users size={15} />
              Abonnés ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "system"
                  ? "bg-teal-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Database size={15} />
              Base & Diagnostics
            </button>
          </div>

          <button
            onClick={loadDashboard}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            <RefreshCw size={12} />
            Actualiser
          </button>
        </div>

        {/* Tab 1: Quotes */}
        {activeTab === "quotes" && (
          <div className="mt-6 space-y-4">
            {/* Filter bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Tous" },
                  { id: "pending", label: "En attente" },
                  { id: "reviewed", label: "En examen" },
                  { id: "quoted", label: "Devis transmis" },
                  { id: "accepted", label: "Validés" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setQuoteFilter(f.id)}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                      quoteFilter === f.id
                        ? "bg-slate-800 text-teal-400 border border-teal-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="Rechercher référence, nom, société..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-72 rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Quotes List */}
            {filteredQuotes.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-12 text-center text-slate-500 text-sm">
                Aucune demande de devis ne correspond aux critères.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQuotes.map((q) => {
                  const isExpanded = expandedQuoteId === q.id;
                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-slate-700"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-teal-400">
                              {q.reference}
                            </span>
                            {getStatusBadge(q.status)}
                            <span className="text-xs text-slate-400">
                              {new Date(q.created_at).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <h4 className="mt-1.5 text-base font-bold text-white">
                            {q.event_title}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {q.name} · <span className="text-slate-300 font-medium">{q.organization}</span> · {q.city_country}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={q.status}
                            onChange={(e) =>
                              handleUpdateQuoteStatus(
                                q.id,
                                e.target.value as Quote["status"]
                              )
                            }
                            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 outline-none focus:border-teal-500"
                          >
                            <option value="pending">En attente</option>
                            <option value="reviewed">En examen</option>
                            <option value="quoted">Devis transmis</option>
                            <option value="accepted">Validé</option>
                            <option value="rejected">Refusé / Archivé</option>
                          </select>

                          <button
                            onClick={() =>
                              setExpandedQuoteId(isExpanded ? null : q.id)
                            }
                            className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                          >
                            <span>Détails</span>
                            {isExpanded ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {isExpanded && (
                        <div className="mt-5 border-t border-slate-800/80 pt-5 space-y-4">
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl bg-slate-900/60 p-4 text-xs">
                            <div>
                              <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                                Email & Tél
                              </p>
                              <p className="mt-0.5 text-white font-medium">
                                <a
                                  href={`mailto:${q.email}`}
                                  className="text-teal-400 hover:underline"
                                >
                                  {q.email}
                                </a>
                              </p>
                              <p className="text-slate-300">{q.phone}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                                Date prévisionnelle
                              </p>
                              <p className="mt-0.5 text-white font-medium">
                                {q.expected_date}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                                Participants
                              </p>
                              <p className="mt-0.5 text-white font-medium">
                                {q.expected_attendees} personnes
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                                Budget indicatif
                              </p>
                              <p className="mt-0.5 text-white font-medium">
                                {q.budget_range || "Non renseigné"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-400 mb-2">
                              Services demandés :
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {q.services.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-lg bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 text-xs font-medium text-teal-300"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          {q.message && (
                            <div>
                              <p className="text-xs font-semibold text-slate-400 mb-1">
                                Message / Cahier des charges :
                              </p>
                              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-300 whitespace-pre-wrap">
                                {q.message}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <a
                              href={`mailto:${q.email}?subject=Suite à votre demande de devis ${q.reference} - BAFIK`}
                              className="rounded-xl bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400 transition"
                            >
                              Répondre par email
                            </a>
                            <a
                              href={`https://wa.me/${q.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition"
                            >
                              Contacter sur WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Messages */}
        {activeTab === "messages" && (
          <div className="mt-6 space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-12 text-center text-slate-500 text-sm">
                Aucun message reçu.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{m.name}</span>
                        {m.status === "unread" && (
                          <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-400">
                            Nouveau
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {new Date(m.created_at).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <p className="text-xs text-teal-400 font-medium">{m.email} {m.phone && `· ${m.phone}`}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {m.status === "unread" ? (
                        <button
                          onClick={() => handleUpdateMsgStatus(m.id, "read")}
                          className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                        >
                          Marquer comme lu
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">Lu</span>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 text-xs text-slate-200">
                    <p className="font-semibold text-white mb-1">Objet : {m.subject}</p>
                    <p className="whitespace-pre-wrap text-slate-300">{m.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Subscribers */}
        {activeTab === "subscribers" && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Liste des abonnés</h3>
                <p className="text-xs text-slate-400">
                  Personnes inscrites pour recevoir les actualités scientifiques
                </p>
              </div>
              <button
                onClick={() => {
                  const dataStr =
                    "data:text/json;charset=utf-8," +
                    encodeURIComponent(JSON.stringify(subscribers, null, 2));
                  const downloadAnchor = document.createElement("a");
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "subscribers-bafik.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="rounded-xl bg-teal-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-teal-400 transition"
              >
                Exporter JSON
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Langue</th>
                    <th className="py-2.5">Statut</th>
                    <th className="py-2.5">Date d'inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {subscribers.map((s) => (
                    <tr key={s.id}>
                      <td className="py-3 font-medium text-white">{s.email}</td>
                      <td className="py-3 uppercase text-slate-400">{s.locale}</td>
                      <td className="py-3">
                        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">
                        {new Date(s.created_at).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: System & Diagnostics */}
        {activeTab === "system" && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-4">
              <div className="flex items-center gap-2 text-teal-400">
                <Database size={20} />
                <h3 className="font-bold text-white text-base">
                  Moteur de Base de Données
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Moteur</span>
                  <span className="font-mono text-white">SQLite (Node.js Native Synchronous)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Emplacement</span>
                  <span className="font-mono text-slate-300">/data/bafik.db</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Mode Journal</span>
                  <span className="font-mono text-emerald-400 font-bold">WAL (Write-Ahead Logging)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Statut de connexion</span>
                  <span className="text-emerald-400 font-semibold">Opérationnel (OK)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-white font-mono">{Math.floor(healthData?.uptime || 0)}s</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-4">
              <div className="flex items-center gap-2 text-teal-400">
                <Sparkles size={20} />
                <h3 className="font-bold text-white text-base">
                  Endpoints API Actifs
                </h3>
              </div>
              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">POST /api/quotes</span>
                  <span className="text-slate-500">Demande de devis</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">GET, PATCH, DELETE /api/quotes/[id]</span>
                  <span className="text-slate-500">Gestion devis</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">POST /api/contact</span>
                  <span className="text-slate-500">Messages direct</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">POST /api/newsletter</span>
                  <span className="text-slate-500">Inscriptions</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">GET /api/projects</span>
                  <span className="text-slate-500">Catalogue projets</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">POST /api/auth/login</span>
                  <span className="text-slate-500">Session JWT</span>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-2 flex justify-between">
                  <span className="text-teal-400">GET /api/health</span>
                  <span className="text-slate-500">Santé du système</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
