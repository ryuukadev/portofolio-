"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = ["<", "/", ">"] as const;
const GLYPH_H = 18; // sinkron dengan h-[18px] tiap glyph

/**
 * Logo navbar — animasi pakai framer-motion (tanpa dependensi baru):
 * - Intro: drop-in memantul + glyphs stagger naik + kilau menyapu sekali
 * - Idle: glyphs ngambang seperti ombak + dot berdenyut
 * - Hover: spin 360° + glyph slot-machine acak + dot pop
 * Hormati prefers-reduced-motion (tampil statis).
 */
export function WLogo({ isDark }: { isDark: boolean }) {
  const reduce = useReducedMotion();
  const boxControls = useAnimationControls();
  const dotControls = useAnimationControls();
  const [slots, setSlots] = useState<number[]>([0, 1, 2]);
  const timeouts = useRef<number[]>([]);

  // Bersihkan timeout saat unmount
  useEffect(() => {
    const stash = timeouts.current;
    return () => {
      stash.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Intro: kotak jatuh dari atas dengan pegas memantul
  useEffect(() => {
    if (reduce) return;
    boxControls.start({
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 280, damping: 12 },
    });
  }, [boxControls, reduce]);

  const shuffle = () => {
    if (reduce) return;
    // Spin kotak 360° — controls, jadi bisa diulang tiap hover
    boxControls.start({
      rotate: [0, 360],
      transition: { duration: 0.7, ease: "easeInOut" },
    });
    // Dot pop
    dotControls.start({
      scale: [1, 2, 1],
      transition: { duration: 0.36, ease: "easeOut" },
    });
    // Slot-machine: tiap kolom berhenti di glyph acak, lalu kembali
    setSlots([0, 1, 2].map(() => Math.floor(Math.random() * GLYPHS.length)));
    const id = window.setTimeout(() => setSlots([0, 1, 2]), 700);
    timeouts.current.push(id);
  };

  return (
    <div className="relative">
      <motion.div
        animate={boxControls}
        initial={reduce ? false : { y: -46, rotate: -14, scale: 0.6, opacity: 0 }}
        onMouseEnter={shuffle}
        className="relative cursor-pointer"
      >
        <div
          className={cn(
            "relative skew-x-[-10deg] w-10 h-10 grid place-items-center overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,0.3)] border-2",
            isDark ? "bg-white border-white" : "bg-neutral-100 border-neutral-300"
          )}
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          {/* Slot glyphs: tiap kolom strip vertikal berisi 3 glyph, tampil 1 */}
          <span
            className={cn(
              "skew-x-[10deg] flex font-black text-[18px] leading-none tracking-tighter",
              isDark ? "text-black" : "text-neutral-800"
            )}
          >
            {GLYPHS.map((g, i) => (
              <motion.span
                key={i}
                animate={reduce ? undefined : { y: [0, -2.5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  delay: 1.6 + i * 0.18,
                  ease: "easeInOut",
                }}
                className="inline-block h-[18px] w-[10px] overflow-hidden"
              >
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.09, ease: "backOut" }}
                  className="block"
                >
                  <span
                    className="flex flex-col transition-transform duration-300 ease-out"
                    style={{ transform: `translateY(${-slots[i] * GLYPH_H}px)` }}
                  >
                    {GLYPHS.map((glyph, j) => (
                      <span
                        key={j}
                        className="block h-[18px] w-[10px] leading-[18px] text-center"
                      >
                        {glyph}
                      </span>
                    ))}
                    <span className="sr-only">{g}</span>
                  </span>
                </motion.span>
              </motion.span>
            ))}
          </span>

          {/* kilau menyapu sekali saat intro */}
          <motion.span
            aria-hidden
            initial={reduce ? false : { x: "-160%", skewX: -20 }}
            animate={{ x: "320%", skewX: -20 }}
            transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/40"
          />
        </div>
      </motion.div>

      {/* dot status */}
      <motion.span animate={dotControls} className="absolute -top-1 -right-1">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className={cn(
            "block w-2 h-2 rounded-full border",
            isDark ? "bg-black border-white" : "bg-neutral-800 border-white"
          )}
        />
      </motion.span>
    </div>
  );
}
