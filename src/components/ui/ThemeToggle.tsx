"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void | Promise<void>) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 680,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        } as unknown as KeyframeAnimationOptions
      );
    });
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 animate-pulse" />;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.86 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "relative w-10 h-10 grid place-items-center rounded-xl border overflow-hidden isolate transition-colors duration-300",
        isDark
          ? "bg-white/[0.06] border-white/10 text-white hover:bg-white/[0.10] hover:border-white/15"
          : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm"
      )}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      {/* bulet ngembang di DALAM tombol — biar kerasa keluar dari logo */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "burst-dark" : "burst-light"}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 2.2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className={cn("pointer-events-none absolute inset-0 rounded-full -z-0", isDark ? "bg-white/15" : "bg-zinc-900/10")}
          style={{ transformOrigin: "center" }}
        />
      </AnimatePresence>

      {/* icon — masuk dari dalam (scale 0 + blur) */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ scale: 0, rotate: -90, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0, rotate: 90, opacity: 0, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 360, damping: 22, mass: 0.7 }}
            className="grid place-items-center relative z-10"
          >
            <Moon className="w-[18px] h-[18px] text-zinc-100" strokeWidth={1.9} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ scale: 0, rotate: -90, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0, rotate: 90, opacity: 0, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 360, damping: 22, mass: 0.7 }}
            className="grid place-items-center relative z-10"
          >
            <Sun className="w-[18px] h-[18px] text-zinc-800" strokeWidth={1.9} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
