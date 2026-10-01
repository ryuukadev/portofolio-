"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function BackgroundPattern() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div
      className={cn(
        "fixed inset-0 -z-20 transition-colors duration-300",
        isDark ? "bg-neutral-950" : "bg-neutral-50"
      )}
    >
      {/* Monochrome ambient — white glow di overlay hitam */}
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-3xl",
            "bg-gradient-to-b from-neutral-200/[0.04] via-neutral-300/[0.02] to-transparent",
            !isDark && "from-neutral-200/[0.06] via-neutral-300/[0.03] to-transparent"
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full blur-3xl",
            "bg-gradient-to-tl from-neutral-300/[0.03] to-transparent",
            !isDark && "from-neutral-400/[0.05] to-transparent"
          )}
        />
      </div>

      {/* Halftone dot pattern */}
      <div
        className={cn("absolute inset-0", isDark ? "opacity-[0.03]" : "opacity-[0.02]")}
        style={{
          backgroundImage: `radial-gradient(circle, ${
            isDark ? "white" : "rgba(10,10,10,0.1)"
          } 1.2px, transparent 1.2px)`,
          backgroundSize: `22px 22px`,
        }}
      />

      {/* Diagonal slash accent — monochrome */}
      <div
        className={cn(
          "absolute top-0 right-0 w-[45%] h-[2px] bg-gradient-to-l",
          "from-neutral-400 to-transparent",
          isDark ? "opacity-40" : "opacity-30"
        )}
      />
      <div
        className={cn(
          "absolute top-6 right-0 w-[30%] h-[1px]",
          "bg-gradient-to-l from-white/10 to-transparent",
          !isDark && "from-neutral-400/30 to-transparent"
        )}
      />

      {/* Bottom frost */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          isDark
            ? "from-neutral-950 via-transparent to-transparent"
            : "from-neutral-50 via-transparent to-transparent"
        )}
      />
    </div>
  );
}
