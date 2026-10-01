"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function LanyardCard() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.35 }}
      className="shrink-0"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="relative"
      >
        {/* glow belakang foto */}
        <div
          className="absolute inset-0 blur-3xl opacity-20 scale-110 rounded-full -z-10"
          style={{ background: isDark ? "white" : "black" }}
        />
        {/* ring luar */}
        <div
          className={cn("rounded-full p-[4px]", isDark ? "bg-white" : "bg-neutral-900")}
          style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.12)" }}
        >
          <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full overflow-hidden bg-neutral-900 relative">
            <img
              src="/wahyu.png"
              alt="I Kadek Wahyu Arta Pratama"
              className="w-full h-full object-cover"
              style={{ objectPosition: "72% 38%" }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
