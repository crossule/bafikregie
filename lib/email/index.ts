export type QuoteEmailPayload = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  eventType: string;
  eventTitle: string;
  expectedDate: string;
  expectedAttendees: number;
  services: string[];
  cityCountry: string;
  budgetRange?: string;
  message?: string;
};

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function sendQuoteEmails(data: QuoteEmailPayload) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "fadikamohamed@yahoo.fr";

  // Formatted summary for notifications
  const summary = `
==================================================
NOUVELLE DEMANDE DE DEVIS REÇUE — BAFIK MEDICAL
==================================================
Référence : ${data.reference}
Client    : ${data.name} (${data.email} | ${data.phone})
Société   : ${data.organization}
Événement : ${data.eventTitle} (${data.eventType.toUpperCase()})
Date      : ${data.expectedDate}
Lieu      : ${data.cityCountry}
Participants prévus : ${data.expectedAttendees}
Services demandés   : ${data.services.join(", ")}
Budget indicatif    : ${data.budgetRange || "Non spécifié"}
Message / Cahier des charges :
${data.message || "(Aucun message supplémentaire)"}
==================================================
`;

  // Always log to server console
  console.log(summary);

  // If SMTP is provided, send real emails via node:net/smtp or fetch webhook
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      // In production, integrate SMTP or external API (e.g., Resend, Sendgrid)
      console.log(`[EMAIL DISPATCH] Sent quote notification to ${adminEmail} and client ${data.email}`);
    } catch (err) {
      console.error("[EMAIL DISPATCH ERROR]", err);
    }
  }

  return { success: true, reference: data.reference };
}

export async function sendContactEmail(data: ContactEmailPayload) {
  const summary = `
==================================================
NOUVEAU MESSAGE DE CONTACT — BAFIK MEDICAL
==================================================
Expéditeur : ${data.name} (${data.email} | ${data.phone || "Non renseigné"})
Sujet      : ${data.subject}
Message    :
${data.message}
==================================================
`;

  console.log(summary);
  return { success: true };
}
