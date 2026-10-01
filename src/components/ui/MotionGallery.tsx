"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface MotionGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function MotionGallery({ items, className }: MotionGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const { resolvedTheme } = useTheme();
  const [mgMounted, setMgMounted] = useState(false);
  useEffect(() => setMgMounted(true), []);
  const isDark = mgMounted ? resolvedTheme === "dark" : true;

  const slideCount = items.length;

  const goToNext = useCallback(() => {
    setDirection("ltr");
    setCurrent((p) => (p + 1) % slideCount);
  }, [slideCount]);

  const goToPrev = () => {
    setDirection("rtl");
    setCurrent((p) => (p - 1 + slideCount) % slideCount);
  };

  const goTo = (idx: number) => {
    setCurrent(idx);
  };

  const itemVariants = {
    enter: (direction: "ltr" | "rtl") => ({
      x: direction === "ltr" ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: "ltr" | "rtl") => ({
      x: direction === "ltr" ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // Auto-rotate setiap 5 detik
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const currentItem = items[current];

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden border shadow-[6px_6px_0px_rgba(0,0,0,0.3)]",
        isDark
          ? "bg-neutral-900 border-white/10"
          : "bg-neutral-100 border-neutral-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Gambar utama */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            variants={itemVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradasi */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Info overlay */}
        {currentItem.title && (
          <motion.div
            key={`info-${currentItem.id}`}
            className="absolute bottom-0 left-0 right-0 p-5 text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <h4 className="text-[15px] font-black tracking-tighter">
              {currentItem.title}
            </h4>
            {currentItem.subtitle && (
              <p className="mt-1 text-[12px] font-semibold text-white/60">
                {currentItem.subtitle}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigasi */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between px-3 pointer-events-none">
        <motion.button
          onClick={goToPrev}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={cn(
            "pointer-events-auto w-9 h-9 grid place-items-center rounded-full border transition-colors",
            isDark
              ? "bg-white/10 hover:bg-white/20 border-white/10 text-neutral-300"
              : "bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700"
          )}
          aria-label="Sebelumnya"
        >
          <ChevronLeft className={cn("w-5 h-5", isDark ? "text-neutral-300" : "text-neutral-700")} />
        </motion.button>
        <motion.button
          onClick={goToNext}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={cn(
            "pointer-events-auto w-9 h-9 grid place-items-center rounded-full border transition-colors",
            isDark
              ? "bg-white/10 hover:bg-white/20 border-white/10 text-neutral-300"
              : "bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-700"
          )}
          aria-label="Berikutnya"
        >
          <ChevronRight className={cn("w-5 h-5", isDark ? "text-neutral-300" : "text-neutral-700")} />
        </motion.button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {items.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => goTo(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              idx === current
                ? "bg-neutral-300 w-6 h-2 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                : isDark
                  ? "bg-neutral-400/50 hover:bg-neutral-400"
                  : "bg-neutral-500 hover:bg-neutral-600"
            )}
            aria-label={`Ke slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className={cn("absolute top-3 right-3 text-[11px] font-bold tracking-widest", isDark ? "text-neutral-400" : "text-neutral-600")}>
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slideCount).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
