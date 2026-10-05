import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Vertical padding */
  size?: "sm" | "md" | "lg";
  /** Section background */
  tone?: "default" | "dark" | "tinted" | "navy";
  id?: string;
};

const paddings = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

const tones = {
  default: "bg-bg text-ink",
  dark: "bg-navy text-white",
  navy: "bg-navy-3 text-white",
  tinted: "bg-teal-light/40 text-ink",
};

export function Section({
  children,
  className,
  size = "md",
  tone = "default",
  id,
}: Props) {
  return (
    <section
      id={id}
      className={cn(paddings[size], tones[tone], "relative", className)}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-bafik", className)}>{children}</div>;
}
