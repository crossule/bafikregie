"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Send, Check } from "lucide-react";
import { whatsappLink } from "@/lib/config";

const SERVICE_OPTIONS = [
  { id: "regie-scientifique", label: "Régie scientifique & gestion des abstracts" },
  { id: "production-audiovisuelle", label: "Captation & production audiovisuelle (Best of, interviews)" },
  { id: "streaming-hybride", label: "Retransmission streaming & format hybride" },
  { id: "congres-augmente", label: "Congrès augmenté & valorisation post-événement" },
  { id: "scenographie-technique", label: "Scénographie, écrans LED & sonorisation" },
];

const EVENT_TYPES = [
  { id: "congres", label: "Congrès médical / international" },
  { id: "symposium", label: "Symposium scientifique" },
  { id: "masterclass", label: "Masterclass ou atelier pratique" },
  { id: "webinar", label: "Webinaire / E-conférence" },
  { id: "autre", label: "Autre événement médical" },
];

export function ContactForm() {
  const t = useTranslations("contact");
  const [mode, setMode] = useState<"quote" | "message">("quote");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{
    reference?: string;
    message: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    eventType: "congres",
    eventTitle: "",
    expectedDate: "",
    expectedAttendees: 200,
    services: ["regie-scientifique", "production-audiovisuelle"],
    cityCountry: "",
    budgetRange: "",
    message: "",
  });

  // Message Form State
  const [msgForm, setMsgForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const toggleService = (id: string) => {
    setQuoteForm((prev) => {
      const exists = prev.services.includes(id);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== id)
          : [...prev.services, id],
      };
    });
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteForm),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        }
        throw new Error(data.message || data.error || "Une erreur est survenue");
      }

      setSuccessData({
        reference: data.reference,
        message: data.message || "Votre demande de devis a été transmise avec succès.",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Impossible d'envoyer la demande. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const handleMsgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgForm),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.details) {
          setFieldErrors(data.details);
        }
        throw new Error(data.message || data.error || "Une erreur est survenue");
      }

      setSuccessData({
        message: data.message || "Votre message a été transmis avec succès.",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Impossible d'envoyer le message. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-navy/10 bg-white p-6 shadow-xl md:p-10">
      {/* Mode Switcher */}
      <div className="mb-8 flex rounded-2xl bg-navy/5 p-1.5">
        <button
          type="button"
          onClick={() => {
            setMode("quote");
            setSuccessData(null);
            setErrorMsg(null);
          }}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
            mode === "quote"
              ? "bg-teal text-white shadow-md shadow-teal/20"
              : "text-navy/70 hover:text-navy"
          }`}
        >
          {t("quoteTab")}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("message");
            setSuccessData(null);
            setErrorMsg(null);
          }}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all ${
            mode === "message"
              ? "bg-navy text-white shadow-md shadow-navy/20"
              : "text-navy/70 hover:text-navy"
          }`}
        >
          {t("messageTab")}
        </button>
      </div>

      {/* Success Notification */}
      {successData && (
        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-7 w-7 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-emerald-900">Demande confirmée !</h3>
              <p className="mt-1 text-sm text-emerald-800">{successData.message}</p>
              {successData.reference && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-1.5 font-mono text-sm font-bold text-emerald-800">
                  Numéro de dossier : {successData.reference}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  href={whatsappLink(`Bonjour BAFIK, je viens de déposer la demande ${successData.reference || ""}`)}
                  external
                  variant="whatsapp"
                  size="sm"
                >
                  Confirmer sur WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={() => setSuccessData(null)}
                  className="rounded-full border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                >
                  Envoyer une autre demande
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quote Form */}
      {mode === "quote" && !successData && (
        <form onSubmit={handleQuoteSubmit} className="space-y-6">
          <div className="border-b border-navy/10 pb-4">
            <h3 className="text-lg font-bold text-navy">1. Vos coordonnées</h3>
            <p className="text-xs text-grey">Informations de contact pour le devis</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.name")} *
              </label>
              <input
                type="text"
                required
                value={quoteForm.name}
                onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                placeholder="ex. Prof. Diallo"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-rose-500">{fieldErrors.name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.email")} *
              </label>
              <input
                type="email"
                required
                value={quoteForm.email}
                onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                placeholder="contact@societe-savante.org"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-rose-500">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.phone")} *
              </label>
              <input
                type="tel"
                required
                value={quoteForm.phone}
                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                placeholder="+225 07 00 00 00 00"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.org")} *
              </label>
              <input
                type="text"
                required
                value={quoteForm.organization}
                onChange={(e) =>
                  setQuoteForm({ ...quoteForm, organization: e.target.value })
                }
                placeholder="ex. Société Ouest-Africaine d'Ophtalmologie"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>

          <div className="border-b border-navy/10 pt-4 pb-4">
            <h3 className="text-lg font-bold text-navy">2. L'événement</h3>
            <p className="text-xs text-grey">Format, dimension et calendrier</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.eventType")} *
              </label>
              <select
                value={quoteForm.eventType}
                onChange={(e) => setQuoteForm({ ...quoteForm, eventType: e.target.value })}
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              >
                {EVENT_TYPES.map((et) => (
                  <option key={et.id} value={et.id}>
                    {et.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.eventTitle")} *
              </label>
              <input
                type="text"
                required
                value={quoteForm.eventTitle}
                onChange={(e) =>
                  setQuoteForm({ ...quoteForm, eventTitle: e.target.value })
                }
                placeholder="ex. 12ème Congrès National de Pédiatrie"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.expectedDate")} *
              </label>
              <input
                type="text"
                required
                value={quoteForm.expectedDate}
                onChange={(e) =>
                  setQuoteForm({ ...quoteForm, expectedDate: e.target.value })
                }
                placeholder="ex. Novembre 2026 (3 jours)"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.expectedAttendees")} *
              </label>
              <input
                type="number"
                min="10"
                required
                value={quoteForm.expectedAttendees}
                onChange={(e) =>
                  setQuoteForm({
                    ...quoteForm,
                    expectedAttendees: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.cityCountry")} *
              </label>
              <input
                type="text"
                required
                value={quoteForm.cityCountry}
                onChange={(e) =>
                  setQuoteForm({ ...quoteForm, cityCountry: e.target.value })
                }
                placeholder="ex. Abidjan, Côte d'Ivoire"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.budget")} (facultatif)
              </label>
              <input
                type="text"
                value={quoteForm.budgetRange}
                onChange={(e) =>
                  setQuoteForm({ ...quoteForm, budgetRange: e.target.value })
                }
                placeholder="ex. 10M - 20M FCFA"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
              {t("fields.services")} *
            </label>
            <div className="space-y-2.5">
              {SERVICE_OPTIONS.map((srv) => {
                const checked = quoteForm.services.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all ${
                      checked
                        ? "border-teal bg-teal/5 font-semibold text-navy"
                        : "border-navy/10 bg-white text-ink/70 hover:border-navy/20"
                    }`}
                  >
                    <div
                      className={`grid h-5 w-5 place-items-center rounded-md border transition-all ${
                        checked
                          ? "border-teal bg-teal text-white"
                          : "border-navy/20 bg-white"
                      }`}
                    >
                      {checked && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span>{srv.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              {t("fields.message")}
            </label>
            <textarea
              rows={4}
              value={quoteForm.message}
              onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
              placeholder="Précisez votre demande, vos besoins techniques ou particularités..."
              className="w-full rounded-xl border border-navy/15 bg-white p-4 text-sm text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-teal py-4 text-base font-bold text-white shadow-xl shadow-teal/30 transition hover:bg-teal-dark disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? t("fields.submitting") : t("fields.submitQuote")}
          </button>
        </form>
      )}

      {/* General Message Form */}
      {mode === "message" && !successData && (
        <form onSubmit={handleMsgSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.name")} *
              </label>
              <input
                type="text"
                required
                value={msgForm.name}
                onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                placeholder="Votre nom"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.email")} *
              </label>
              <input
                type="email"
                required
                value={msgForm.email}
                onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                placeholder="votre@email.com"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.phone")}
              </label>
              <input
                type="tel"
                value={msgForm.phone}
                onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })}
                placeholder="+225 00 00 00 00"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
                {t("fields.subject")} *
              </label>
              <input
                type="text"
                required
                value={msgForm.subject}
                onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                placeholder="Demande d'information générale"
                className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">
              {t("fields.message")} *
            </label>
            <textarea
              rows={5}
              required
              value={msgForm.message}
              onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
              placeholder="Écrivez votre message ici..."
              className="w-full rounded-xl border border-navy/15 bg-white p-4 text-sm text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-4 text-base font-bold text-white shadow-xl shadow-navy/30 transition hover:bg-navy-2 disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? t("fields.submitting") : t("fields.submitMessage")}
          </button>
        </form>
      )}
    </div>
  );
}
