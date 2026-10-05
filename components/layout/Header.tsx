"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

const SERVICES = [
  { slug: "regie-scientifique", labelKey: "regie-scientifique" },
  { slug: "production-audiovisuelle", labelKey: "production-audiovisuelle" },
  { slug: "streaming-hybride", labelKey: "streaming-hybride" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-navy/95 backdrop-blur-md"
          : "bg-navy/80 backdrop-blur-sm"
      )}
    >
      <div className="container-bafik flex items-center justify-between py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal to-aqua text-lg font-black shadow-lg shadow-teal/40">
            B
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-wider text-white">BAFIK</span>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-aqua" style={{ color: "#3fe0e0" }}>
              MEDICAL CONGRESS
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex text-aqua">
          <NavLink href="/" label={t("home")} />
          <NavLink href="/a-propos" label={t("about")} />

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              style={{ color: "#3fe0e0" }}
              className="bafik-nav-link flex items-center gap-1.5 text-sm font-semibold text-aqua transition-colors hover:text-white"
            >
              {t("services")}
              <svg
                className={cn(
                  "h-3.5 w-3.5 transition-transform text-aqua",
                  servicesOpen && "rotate-180"
                )}
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#3fe0e0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <div
              className={cn(
                "absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200",
                servicesOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              )}
            >
              <div className="min-w-[260px] rounded-2xl border border-white/10 bg-navy p-2 shadow-2xl">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    style={{ color: "#3fe0e0" }}
                    className="bafik-nav-link block rounded-xl px-4 py-2.5 text-sm font-semibold text-aqua transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t(`servicesList.${s.labelKey}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink href="/galerie" label={t("gallery")} />
          <NavLink href="/congres-augmente" label={t("augmented")} />
          <NavLink href="/blog" label={t("blog")} />
          <NavLink href="/contact" label={t("contact")} />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition-all hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-xl hover:shadow-teal/40 md:inline-flex"
          >
            {t("cta")}
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transition-all",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transition-all",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-white transition-all",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      style={{ color: "#3fe0e0" }}
      className={cn(
        "bafik-nav-link relative text-sm font-semibold text-aqua transition-colors hover:text-white",
        "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-aqua after:transition-all",
        active ? "after:w-full font-bold" : "after:w-0 hover:after:w-full"
      )}
    >
      {label}
    </Link>
  );
}
