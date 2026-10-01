"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothSpring, smoothEase } from "@/lib/utils";

export function WelcomeOverlay() {
  const [show, setShow] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const duration = 2600;
    const start = performance.now();
    let raf = 0;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => {
        window.dispatchEvent(new CustomEvent("welcome:done"));
        setShow(false);
      }, 3800);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -56,
            filter: "blur(10px)",
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          transition={{ duration: 0.35, ease: smoothEase }}
          className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
          style={{ background: "#000000" }}
          aria-label="Loading"
        >
          {/* subtle depth — pure black & white only */}
          <div className="pointer-events-none absolute inset-0" style={{ background: "#000" }} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(800px 520px at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* center — minimal */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 sm:px-8 py-10">
            {/* progress — white only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothSpring, delay: 0.12 }}
              className="flex w-full max-w-[480px] items-center gap-3 sm:gap-4"
            >
              <span
                className="shrink-0 font-mono text-[11px] font-semibold tracking-wide tabular-nums sm:text-[12px]"
                style={{ color: "rgba(255,255,255,0.92)", minWidth: 36 }}
              >
                {String(percent).padStart(2, "0")}%
              </span>
              <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.08] sm:h-[5px]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{
                    width: `${percent}%`,
                    boxShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,255,255,0.3)",
                    transition: "width 60ms linear",
                  }}
                />
                <div
                  className="absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-white sm:h-[10px] sm:w-[10px]"
                  style={{
                    left: `calc(${percent}% - 5px)`,
                    boxShadow: "0 0 10px rgba(255,255,255,1), 0 0 18px rgba(255,255,255,0.6)",
                    opacity: percent === 0 ? 0 : 1,
                    transition: "left 60ms linear, opacity 120ms ease",
                  }}
                />
              </div>
              <span
                className="shrink-0 text-right font-mono text-[11px] font-semibold tracking-wide tabular-nums sm:text-[12px]"
                style={{ color: "rgba(255,255,255,0.92)", minWidth: 42 }}
              >
                100%
              </span>
            </motion.div>

            {/* central logo — only </> */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...smoothSpring, delay: 0.26 }}
              className="relative mt-10 sm:mt-12"
            >
              {/* soft white glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[32px]"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="relative">
                <div
                  className="absolute -inset-[1px] rounded-[22px] opacity-70"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.15))" }}
                />
                <div
                  className="relative grid h-[96px] w-[96px] place-items-center rounded-[20px] border bg-[#0A0A0A] sm:h-[104px] sm:w-[104px] sm:rounded-[22px]"
                  style={{
                    borderColor: "rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 40px rgba(0,0,0,0.7)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 55%)" }} />
                  <span
                    className="relative font-mono text-[28px] font-bold tracking-tighter text-white sm:text-[30px]"
                    style={{ letterSpacing: "-0.06em", textShadow: "0 0 12px rgba(255,255,255,0.35)" }}
                  >
                    &lt;/&gt;
                  </span>
                </div>
              </div>
            </motion.div>

            {/* WELCOME TO MY PORTFOLIO — main headline, minimal */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.6, ease: smoothEase }}
              className="mt-8 flex flex-col items-center text-center"
            >
              <h1 className="text-balance font-display text-[26px] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-[34px]">
                WELCOME TO MY
                <br />
                PORTFOLIO
              </h1>
            </motion.div>

            {/* loading status — minimal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.5, ease: smoothEase }}
              className="mt-8 font-mono text-[10px] tracking-[0.42em] text-white/30 sm:text-[11px]"
            >
              LOADING
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.68, duration: 0.5 }}
              className="mt-2 font-mono text-[10px] tracking-[0.18em] tabular-nums sm:text-[11px]"
              style={{ color: percent === 100 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)", letterSpacing: percent === 100 ? "0.22em" : "0.18em" }}
            >
              {percent < 100 ? `INITIALIZING — ${percent}%` : "READY • ENTERING →"}
            </motion.p>
          </div>

          {/* bottom — super minimal */}
          <div className="h-px w-full bg-white/[0.08]" />
          <div className="flex h-[22px] items-center justify-center px-4">
            <span className="font-mono text-[9px] tracking-[0.18em] text-white/25">© 2026 — BLACK & WHITE • MINIMAL</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
