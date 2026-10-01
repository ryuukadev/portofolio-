"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { flushSync } from "react-dom";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10" />;
  }

  const next = lang === "id" ? "en" : "id";

  const handleLang = (e: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void | Promise<void>) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      setLang(next);
      return;
    }
    // circular reveal tipis khusus bahasa — lebih cepat & subtle dari theme
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = doc.startViewTransition(() => {
      flushSync(() => setLang(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" } as unknown as KeyframeAnimationOptions
      );
    });
  };

  return (
    <motion.button
      onClick={handleLang}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={cn(
        "w-10 h-10 grid place-items-center rounded-xl border text-[11px] font-black tracking-widest transition-colors",
        isDark
          ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
          : "bg-neutral-200 border-neutral-300 text-neutral-800 hover:bg-neutral-300"
      )}
      aria-label={lang === "id" ? "Ganti ke English" : "Switch to Bahasa Indonesia"}
      title={lang === "id" ? "Switch to EN" : "Ganti ke ID"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lang}
          initial={{ opacity: 0, scale: 0.6, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {lang.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
