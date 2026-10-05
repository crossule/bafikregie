import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Stat({
  value,
  label,
  tone = "light",
  className,
}: {
  value: ReactNode;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 backdrop-blur-sm",
        tone === "light"
          ? "border-white/15 bg-white/5"
          : "border-navy/8 bg-white",
        className
      )}
    >
      <strong
        className={cn(
          "block text-2xl font-black leading-none",
          tone === "light" ? "text-aqua" : "text-teal"
        )}
      >
        {value}
      </strong>
      <span
        className={cn(
          "mt-1.5 block text-xs font-medium",
          tone === "light" ? "text-white/70" : "text-grey"
        )}
      >
        {label}
      </span>
    </div>
  );
}
