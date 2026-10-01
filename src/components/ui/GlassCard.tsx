"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted ? resolvedTheme === "dark" : true;

    return (
      <div
        ref={ref}
        className={cn(
          "relative isolate rounded-2xl overflow-hidden",
          isDark
            ? "bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent before:pointer-events-none before:-z-10"
            : "bg-white backdrop-blur-xl border border-zinc-200 shadow-[0_10px_40px_rgba(0,0,0,0.10),0_1px_0_rgba(0,0,0,0.06)] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white before:to-zinc-50/70 before:pointer-events-none before:-z-10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
