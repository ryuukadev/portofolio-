"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <footer className="relative mt-6">
      {/* accent line */}
      <div className={cn("h-[3px]", isDark ? "bg-white" : "bg-neutral-900")} />
      <div className={cn("h-px", isDark ? "bg-white/10" : "bg-neutral-300/60")} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            className={`text-[12px] font-bold tracking-[0.14em] ${
              isDark ? "text-white/60" : "text-neutral-500"
            }`}
          >
            © {new Date().getFullYear()}{" "}
            <span className={isDark ? "text-white" : "text-neutral-800"}>I Kadek Wahyu Arta Pratama</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function cn(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}
