"use client";

import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Radio, Tv, Sparkles, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/config";

const PACKS = [
  {
    name: "ESSENTIEL",
    badge: "Essentiel",
    Icon: Tv,
    description: "Régie scientifique + captation & diffusion",
    features: [
      "Collecte et classement des présentations",
      "Gestion des PowerPoint & régie de diffusion",
      "Coordination des salles et intervenants",
      "Captation vidéo et projection écran",
    ],
  },
  {
    name: "LIVE",
    badge: "Le plus demandé",
    popular: true,
    Icon: Radio,
    description: "Régie scientifique, captation et diffusion + intervention à distance",
    features: [
      "Tout le pack Essentiel inclus",
      "Diffusion streaming en direct",
      "Connexion des intervenants à distance",
      "Enregistrement intégral & replays",
    ],
  },
  {
    name: "360°",
    badge: "Complet & Post-Congrès",
    Icon: Sparkles,
    description: "Production complète + contenus post-congrès",
    features: [
      "Tout le pack Live inclus",
      "Best Of : film court des temps forts",
      "Paroles d'experts : interviews des intervenants",
      "Capsules thématiques de formation continue",
      "Valorisation des partenaires et sponsors",
    ],
  },
];

export function ModularOffers() {
  return (
    <Section tone="tinted" size="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <Eyebrow>Offres Modulaires</Eyebrow>
            <h2 className="mt-4 text-3xl font-black text-navy md:text-4xl">
              Choisissez le niveau d'accompagnement adapté
            </h2>
            <p className="mt-4 text-grey">
              Des solutions professionnelles, flexibles et adaptées à la taille,
              aux besoins et au budget de votre événement scientifique.
            </p>
          </div>
        </Reveal>

        {/* 3 Modular Packs */}
        <div className="grid gap-8 lg:grid-cols-3">
          {PACKS.map((pack, i) => {
            const { Icon } = pack;
            return (
              <Reveal key={pack.name} delay={i * 0.1}>
                <div
                  className={`relative flex h-full flex-col justify-between rounded-3xl bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    pack.popular
                      ? "border-2 border-teal ring-4 ring-teal/10"
                      : "border border-navy/10"
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal to-aqua px-4 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                      Recommandé
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-grey">
                        Pack 0{i + 1}
                      </span>
                      <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy">
                        {pack.badge}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-light text-teal-dark">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-navy">
                        {pack.name}
                      </h3>
                    </div>

                    <p className="mt-4 font-semibold text-sm text-teal-dark border-l-2 border-teal pl-3">
                      {pack.description}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {pack.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-grey sm:text-sm">
                          <Check size={16} className="mt-0.5 shrink-0 text-teal" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-navy/5">
                    <Button
                      href={whatsappLink(`Bonjour BAFIK, je souhaite un devis pour le pack ${pack.name}`)}
                      external
                      variant={pack.popular ? "primary" : "ghost"}
                      size="sm"
                      className="w-full justify-center"
                    >
                      Demander ce pack
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Valorisez aussi vos partenaires */}
        <Reveal delay={0.35}>
          <div className="mt-12 overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aqua">
                  <Handshake size={18} />
                  <span>Partenaires & Sponsors Industriels</span>
                </div>
                <h3 className="mt-2 text-2xl font-black">
                  Valorisez aussi vos partenaires
                </h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  Optimisez l'engagement de vos sponsors (laboratoires pharmaceutiques, entreprises MedTech) grâce à la réalisation de films sponsors dédiés, l'habillage des écrans d'accueil et des capsules d'expertise associées.
                </p>
              </div>

              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="self-start md:self-center shrink-0"
              >
                Échanger avec nous
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
