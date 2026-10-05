import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  tone = "teal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "teal" | "aqua" | "navy" | "outline";
}) {
  const tones = {
    teal: "bg-teal text-white",
    aqua: "bg-aqua/15 text-teal-dark border border-aqua/30",
    navy: "bg-navy text-white",
    outline: "border border-navy/15 text-grey",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
