import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, whatsappLink } from "@/lib/config";

const SERVICE_LINKS = [
  "regie-scientifique",
  "production-audiovisuelle",
  "streaming-hybride",
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-3 text-white/70">
      <div className="container-bafik py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-aqua text-lg font-black">
                B
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold tracking-wider">
                  BAFIK
                </span>
                <span className="text-[10px] font-medium tracking-[0.14em] text-white/60">
                  MEDICAL CONGRESS
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm">
              {t("footer.description")}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-aqua">
              {t("footer.pillars")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><FooterLink href="/a-propos">{t("nav.about")}</FooterLink></li>
              <li><FooterLink href="/galerie">{t("nav.gallery")}</FooterLink></li>
              <li><FooterLink href="/congres-augmente">{t("nav.augmented")}</FooterLink></li>
              <li><FooterLink href="/blog">{t("nav.blog")}</FooterLink></li>
              <li><FooterLink href="/contact">{t("nav.contact")}</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-aqua"
                >
                  {t("common.whatsapp")} — {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-aqua"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-white/60">{siteConfig.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} BAFIK SARL — {t("footer.rights")}</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="transition-colors hover:text-aqua">
      {children}
    </Link>
  );
}
