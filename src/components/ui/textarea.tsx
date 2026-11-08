import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[90px] w-full rounded-lg border border-white/10 bg-[#090d16] px-4 py-3 text-sm text-foreground placeholder:text-slate-500 font-sans transition-all duration-200 focus-visible:outline-none focus-visible:border-cyan-glow focus-visible:ring-1 focus-visible:ring-cyan-glow/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
