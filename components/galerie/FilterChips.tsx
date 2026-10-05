"use client";

import { cn } from "@/lib/utils";

type Props = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  allLabel?: string;
};

export function FilterChips({ options, value, onChange, allLabel = "Tous" }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        {allLabel}
      </Chip>
      {options.map((o) => (
        <Chip
          key={o.value}
          active={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
        active
          ? "border-teal bg-teal text-white shadow-md shadow-teal/25"
          : "border-navy/10 bg-white text-grey hover:border-teal hover:text-teal"
      )}
    >
      {children}
    </button>
  );
}
