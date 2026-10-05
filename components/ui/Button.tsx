import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-lg shadow-teal/30 hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-xl hover:shadow-teal/40",
  ghost:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white",
  outline:
    "bg-transparent text-teal border-2 border-teal hover:bg-teal hover:text-white",
  whatsapp:
    "bg-whatsapp text-white shadow-lg shadow-whatsapp/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-whatsapp/40",
  dark:
    "bg-navy text-white shadow-lg shadow-navy/20 hover:-translate-y-0.5 hover:bg-navy-2 hover:shadow-xl",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  external?: boolean;
};

type ButtonAsNextLink = CommonProps & {
  href: string;
  external?: false;
};

type Props = ButtonAsButton | ButtonAsLink;

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props as any;

  const classes = cn(
    base,
    variants[variant as Variant],
    sizes[size as Size],
    className
  );

  // External link (WhatsApp, mailto, http…)
  if ("href" in props && props.href) {
    const { href, external, ...anchorRest } = rest;
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
