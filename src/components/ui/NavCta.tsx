"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tombol CTA navbar (kanan atas) — animasi pakai framer-motion:
 * - Intro: slide-in dari kanan dengan pegas, berurutan setelah logo mendarat
 * - Idle: kilau menyapu berkala + glow berdenyut lembut
 * - Hover: terangkat + panah melesat diagonal + shadow membesar
 * Hormati prefers-reduced-motion (tampil statis).
 */
export function NavCta({ label, isDark }: { label: string; isDark: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href="#kontak"
      initial={reduce ? false : { x: 64, opacity: 0, rotate: 3 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.45 }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.05, y: -1 }}
      className={cn(
        "group relative ml-3 overflow-hidden skew-x-[-8deg] px-5 py-2",
        isDark ? "bg-white" : "bg-neutral-900"
      )}
      style={{
        boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
      }}
      aria-label={label}
    >
      {/* Teks + panah */}
      <span
        className={cn(
          "relative z-10 skew-x-[8deg] inline-flex items-center gap-1.5 text-[12px] font-black tracking-widest uppercase",
          isDark ? "text-black" : "text-white"
        )}
      >
        {label}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>

      {!reduce ? (
        <>
          {/* kilau menyapu berkala */}
          <motion.span
            aria-hidden
            initial={{ x: "-160%" }}
            animate={{ x: "320%" }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeInOut",
              delay: 1.4,
            }}
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent to-transparent",
              isDark ? "via-black/15" : "via-white/30"
            )}
          />
          {/* glow berdenyut lembut */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className={cn(
              "pointer-events-none absolute inset-0",
              isDark
                ? "bg-[radial-gradient(120px_40px_at_50%_0%,rgba(0,0,0,0.25),transparent)]"
                : "bg-[radial-gradient(120px_40px_at_50%_0%,rgba(255,255,255,0.35),transparent)]"
            )}
          />
        </>
      ) : null}
    </motion.a>
  );
}
