import { GET as getHealth } from "@/app/api/health/route";
import { POST as postQuote } from "@/app/api/quotes/route";
import { POST as postContact } from "@/app/api/contact/route";
import { POST as postNewsletter } from "@/app/api/newsletter/route";
import { POST as postLogin } from "@/app/api/auth/login/route";
import { NextRequest } from "next/server";

async function runTests() {
  console.log("=== TESTING API ROUTE HANDLERS ===");

  // 1. Health Endpoint
  const healthRes = await getHealth();
  const healthData = await healthRes.json();
  console.log("✓ GET /api/health:", healthData.status === "ok" ? "PASSED" : "FAILED", healthData);

  // 2. Quote Submission
  const quoteReq = new NextRequest("http://localhost:3000/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Dr. Aïssatou Traoré",
      email: "a.traore@pediatrie-ci.org",
      phone: "+225 05 98 76 54 32",
      organization: "Association Ivoirienne de Pédiatrie",
      eventType: "congres",
      eventTitle: "7èmes Journées Nationales de Pédiatrie",
      expectedDate: "2026-12-05",
      expectedAttendees: 350,
      services: ["regie-scientifique", "streaming-hybride"],
      cityCountry: "Yamoussoukro, Côte d'Ivoire",
      budgetRange: "8M - 15M FCFA",
      message: "Besoin d'un accompagnement complet pour la gestion des soumissions et la retransmission en direct.",
    }),
  });

  const quoteRes = await postQuote(quoteReq);
  const quoteData = await quoteRes.json();
  console.log("✓ POST /api/quotes:", quoteData.success ? `PASSED (${quoteData.reference})` : "FAILED");

  // 3. Contact Submission
  const contactReq = new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jean-Paul Kouassi",
      email: "jp.kouassi@labo-sante.com",
      phone: "+225 01 02 03 04 05",
      subject: "Partenariat diffusion symposium",
      message: "Bonjour, nous aimerions convenir d'un rendez-vous pour discuter de la captation de notre prochain symposium.",
    }),
  });

  const contactRes = await postContact(contactReq);
  const contactData = await contactRes.json();
  console.log("✓ POST /api/contact:", contactData.success ? "PASSED" : "FAILED");

  // 4. Newsletter Signup
  const newsReq = new NextRequest("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "medecin.chercheur@univ-felix.ci",
      locale: "fr",
    }),
  });

  const newsRes = await postNewsletter(newsReq);
  const newsData = await newsRes.json();
  console.log("✓ POST /api/newsletter:", newsData.success ? "PASSED" : "FAILED");

  // 5. Admin Login
  const loginReq = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@bafik.com",
      password: "BafikMedical2026!",
    }),
  });

  const loginRes = await postLogin(loginReq);
  const loginData = await loginRes.json();
  console.log("✓ POST /api/auth/login:", loginData.success ? `PASSED (User: ${loginData.user.email})` : "FAILED");

  console.log("=== ALL API TESTS COMPLETED SUCCESSFULLY ===");
}

runTests().catch(console.error);
