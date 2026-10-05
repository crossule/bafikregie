import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
  tone = "teal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "teal" | "aqua";
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold uppercase tracking-[0.18em]",
        tone === "teal" ? "text-teal" : "text-aqua",
        className
      )}
    >
      {children}
    </span>
  );
}
