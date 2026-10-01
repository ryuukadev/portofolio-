"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "glow" | "persona";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted ? resolvedTheme === "dark" : true;

    const base = "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase";

    const variants: Record<string, string> = {
      default: "bg-white/5 text-neutral-400 border border-white/10 rounded-full",
      outline: "bg-transparent text-neutral-500 border border-white/15 rounded-full",
      glow: "bg-neutral-300/10 text-neutral-300 border border-neutral-400/30 rounded-full",
      persona: "bg-white text-black rounded-none skew-x-[-8deg] border-l-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)]",
    };

    // persona inner needs un-skew
    if (variant === "persona") {
      return (
        <span ref={ref} className={cn(base, variants[variant], className)} {...props}>
          <span className="skew-x-[8deg] inline-flex items-center gap-1.5">
            {children}
          </span>
        </span>
      );
    }

    return (
      <span ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
