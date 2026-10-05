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
  tagline: "Des congrès au service d'une santé meilleure",
  description:
    "Production, diffusion et valorisation de vos congrès scientifiques en Afrique.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bafik.com",

  contact: {
    /** WhatsApp number in international format WITHOUT + or spaces. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "22500000000",
    /** Default WhatsApp pre-filled message. */
    whatsappMessage:
      "Bonjour BAFIK, je souhaite discuter de mon prochain congrès scientifique.",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@bafik.com",
    phone: process.env.NEXT_PUBLIC_PHONE || "+225 XX XX XX XX XX",
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
