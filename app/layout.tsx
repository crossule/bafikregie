import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "BAFIK accompagne les sociétés savantes, établissements de santé et laboratoires dans la production, la diffusion et la valorisation de leurs événements scientifiques en Afrique.",
  keywords: [
    "congrès médical",
    "congrès scientifique",
    "production audiovisuelle",
    "régie scientifique",
    "streaming congrès",
    "Abidjan",
    "Côte d'Ivoire",
    "Afrique",
    "BAFIK",
  ],
  authors: [{ name: "BAFIK Medical Congress" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Production, diffusion et valorisation de vos congrès scientifiques en Afrique.",
    images: ["/images/og/home.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
