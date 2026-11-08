import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "green" | "amber" | "purple" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "cyan", className }: BadgeProps) {
  const variants = {
    cyan: "text-cyan-glow border-cyan-glow/40 bg-cyan-glow/10",
    green: "text-emerald-glow border-emerald-glow/40 bg-emerald-glow/10",
    amber: "text-amber-glow border-amber-glow/40 bg-amber-glow/10",
    purple: "text-purple-glow border-purple-glow/40 bg-purple-glow/10",
    neutral: "text-slate-400 border-white/10 bg-white/5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] font-semibold tracking-wider uppercase border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
