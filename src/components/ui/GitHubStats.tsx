"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { githubUsername } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/context";

export function GitHubStats() {
  const [chartError, setChartError] = useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [ghMounted, setGhMounted] = useState(false);
  useEffect(() => setGhMounted(true), []);
  const isDark = ghMounted ? resolvedTheme === "dark" : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn(
        "skew-x-[-8deg] rounded-2xl p-0.5 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] w-full",
        isDark ? "bg-white" : "bg-neutral-100"
      )}
    >
      <div
        className={cn(
          "skew-x-[8deg] rounded-xl p-5 sm:p-6",
          isDark ? "bg-neutral-900/95" : "bg-white"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", isDark ? "bg-white/10" : "bg-neutral-100")}>
              <Github className={cn("w-5 h-5", isDark ? "text-neutral-300" : "text-neutral-700")} />
            </div>
            <div>
              <h3 className={cn("font-black text-[14px] tracking-wider", isDark ? "text-white" : "text-neutral-800")}>
                @{githubUsername}
              </h3>
              <p className={cn("text-[11px]", isDark ? "text-white/50" : "text-neutral-500")}>
                {t.github.contributions} · {t.github.lastYear}
              </p>
            </div>
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.github.viewProfile} @${githubUsername}`}
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors",
              isDark
                ? "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
            )}
          >
            {t.github.profile}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grafik kontribusi — full width */}
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.github.viewProfile} @${githubUsername} — ${t.github.contributionsSuffix}`}
          title={t.github.contributionsHint}
          className={cn(
            "block rounded-xl overflow-hidden p-3 sm:p-4 transition-colors",
            isDark ? "bg-white/[0.03] hover:bg-white/[0.06]" : "bg-neutral-100/70 hover:bg-neutral-100"
          )}
        >
          {!chartError ? (
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt={`${t.github.chartAlt} @${githubUsername}`}
              loading="lazy"
              draggable={false}
              className="w-full h-auto"
              onError={() => setChartError(true)}
            />
          ) : (
            <p className={cn("py-6 text-center text-[12px]", isDark ? "text-white/40" : "text-neutral-500")}>
              {t.github.chartFailed}
            </p>
          )}
        </a>
      </div>
    </motion.div>
  );
}
