import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-orbitron font-bold transition-all duration-200 rounded-md focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-glow to-sky-400 text-black hover:shadow-cyan-glow hover:-translate-y-0.5",
    secondary:
      "bg-emerald-glow text-black hover:shadow-green-glow hover:-translate-y-0.5",
    outline:
      "border border-cyan-glow/40 bg-surface/80 text-cyan-glow hover:bg-cyan-glow/10 hover:border-cyan-glow",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
