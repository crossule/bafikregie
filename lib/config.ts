/**
 * BAFIK Medical Congress — Global configuration
 *
 * Everything you'll want to change later (WhatsApp, email, domain, socials)
 * lives here. Edit once, updates everywhere.
 *
 * Values are pulled from .env.local when present, with sensible fallbacks.
 */

export const siteConfig = {
  name: "BAFIK Medical Congress",
  shortName: "BAFIK",
  company: "BAFIK SARL",
  tagline: "Capter · Partager · Valoriser",
  subtitle: "Communication Santé Audiovisuel Digital",
  description:
    "Production audiovisuelle • Régie scientifique • Streaming • Contenus experts • Valorisation sponsors",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bafiksarl.com",

  contact: {
    /** WhatsApp number in international format WITHOUT + or spaces. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2250707806207",
    /** Default WhatsApp pre-filled message. */
    whatsappMessage:
      "Bonjour BAFIK, je souhaite discuter de mon prochain congrès scientifique.",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "fadikamohamed@yahoo.fr",
    phone: process.env.NEXT_PUBLIC_PHONE || "+225 07 07 80 62 07",
    location: "Abidjan, Côte d'Ivoire",
  },

  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  },
} as const;

/**
 * Build a wa.me link with optional pre-filled message.
 * @example whatsappLink("Bonjour !") → "https://wa.me/22500000000?text=Bonjour%20!"
 */
export function whatsappLink(message?: string): string {
  const number = siteConfig.contact.whatsapp;
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}
