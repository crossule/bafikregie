import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-soft",
        hover &&
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-light hover:shadow-lift",
        "before:absolute before:left-0 before:top-0 before:h-1 before:w-full before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-teal before:to-aqua before:transition-transform before:duration-500",
        hover && "hover:before:scale-x-100",
        className
      )}
    >
      {children}
    </div>
  );
}
