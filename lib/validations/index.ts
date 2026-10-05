import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  organization: z.string().min(2, "Nom de l'organisation ou société savante requis"),
  eventType: z.enum(["congres", "symposium", "masterclass", "webinar", "autre"]),
  eventTitle: z.string().min(3, "Titre de l'événement requis"),
  expectedDate: z.string().min(4, "Date prévisionnelle requise"),
  expectedAttendees: z.coerce.number().min(1, "Nombre de participants requis"),
  services: z.array(z.string()).min(1, "Veuillez sélectionner au moins un service"),
  cityCountry: z.string().min(2, "Ville et pays requis"),
  budgetRange: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional().default(""),
  subject: z.string().min(3, "Objet du message requis"),
  message: z.string().min(10, "Votre message doit comporter au moins 10 caractères"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  locale: z.enum(["fr", "en"]).optional().default("fr"),
});

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export const updateQuoteStatusSchema = z.object({
  status: z.enum(["pending", "reviewed", "quoted", "accepted", "rejected"]),
  notes: z.string().optional(),
});

export const updateMessageStatusSchema = z.object({
  status: z.enum(["unread", "read", "archived"]),
});
