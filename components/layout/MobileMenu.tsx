"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/config";
import { useEffect } from "react";

const SERVICES = [
  "regie-scientifique",
  "production-audiovisuelle",
  "streaming-hybride",
] as const;

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-navy-3/60 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-[min(340px,85vw)] overflow-y-auto bg-navy p-6 pt-20 shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-1">
          <MobileLink href="/" onClick={onClose} label={t("home")} />
          <MobileLink href="/a-propos" onClick={onClose} label={t("about")} />

          <div className="py-2">
            <span
              className="px-3 text-xs font-bold uppercase tracking-wider text-aqua"
              style={{ color: "#3fe0e0" }}
            >
              {t("services")}
            </span>
            <div className="mt-1 flex flex-col">
              {SERVICES.map((s) => (
                <MobileLink
                  key={s}
                  href={`/services/${s}`}
                  onClick={onClose}
                  label={t(`servicesList.${s}`)}
                  sub
                />
              ))}
            </div>
          </div>

          <MobileLink href="/galerie" onClick={onClose} label={t("gallery")} />
          <MobileLink href="/congres-augmente" onClick={onClose} label={t("augmented")} />
          <MobileLink href="/blog" onClick={onClose} label={t("blog")} />
          <MobileLink href="/contact" onClick={onClose} label={t("contact")} />
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal/30"
        >
          {t("cta")}
        </a>
      </aside>
    </>
  );
}

function MobileLink({
  href,
  label,
  onClick,
  sub,
}: {
  href: string;
  label: string;
  onClick: () => void;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ color: "#3fe0e0" }}
      className={cn(
        "rounded-xl px-3 py-2.5 text-aqua transition-colors hover:bg-white/10 hover:text-white",
        sub ? "text-sm pl-5 text-aqua font-medium" : "text-base font-semibold text-aqua"
      )}
    >
      {label}
    </Link>
  );
}
