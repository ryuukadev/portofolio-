"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    try {
      if (localStorage.getItem("backToTopHidden") === "1") setDismissed(true);
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("backToTopHidden", "1");
    } catch {}
  };

  const handleRestore = () => {
    setDismissed(false);
    try {
      localStorage.removeItem("backToTopHidden");
    } catch {}
  };

  // Saat di-dismiss: tampilkan tombol mini restore (klik untuk munculkan lagi)
  if (dismissed) {
    return (
      <button
        onClick={handleRestore}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-11 h-11 grid place-items-center rounded-full border backdrop-blur transition-all",
          isDark
            ? "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
            : "bg-white border-neutral-300 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 shadow-sm"
        )}
        aria-label="Tampilkan tombol ke atas"
        title="Tampilkan tombol ke atas"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5"
        >
          <motion.a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.03, y: -1 }}
            className={cn(
              "hidden sm:inline-flex skew-x-[-8deg] px-4 py-2.5 items-center gap-2 transition-all duration-200",
              isDark
                ? "bg-white/10 hover:bg-white/20 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border border-white/10"
                : "bg-white hover:shadow-[5px_5px_0px_rgba(0,0,0,0.2)] shadow-[3px_3px_0px_rgba(0,0,0,0.15)] border border-neutral-300"
            )}
            aria-label="Kembali ke atas"
          >
            <span
              className={cn(
                "skew-x-[8deg] inline-flex items-center justify-center w-5 h-5 rounded",
                isDark ? "bg-white text-black" : "bg-black text-white"
              )}
            >
              <ArrowUp className="w-3 h-3" />
            </span>
            <span
              className={cn(
                "skew-x-[8deg] text-[12px] font-black tracking-widest",
                isDark ? "text-white" : "text-neutral-800"
              )}
            >
              ATAS
            </span>
          </motion.a>

          {/* Tombol X untuk hide — klik untuk sembunyikan, klik icon kecil untuk munculkan lagi */}
          <motion.button
            onClick={handleDismiss}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={cn(
              "hidden sm:grid place-items-center w-11 h-11 rounded-full border backdrop-blur transition-all",
              isDark
                ? "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                : "bg-white border-neutral-300 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 shadow-sm"
            )}
            aria-label="Sembunyikan tombol ke atas"
            title="Sembunyikan"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
