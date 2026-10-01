"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { springConfig, cn } from "@/lib/utils";
import { useTheme } from "next-themes";

/* ————— Logo resmi (inline SVG, brand colors) ————— */
function PythonLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.2c-3.6 0-6.1 1.1-6.1 4v1.6c0 1 .8 1.8 1.8 1.8H12c1.6 0 2.9 1.3 2.9 2.9v1.1c0 .9-.7 1.6-1.6 1.6H9.2c-1 0-1.8.8-1.8 1.8v1.1c0 2.9 2.6 4 6.1 4 3.6 0 6.1-1.1 6.1-4v-3.3c0-1-.8-1.8-1.8-1.8H12c-1.6 0-2.9-1.3-2.9-2.9V5.6c0-.9.7-1.6 1.6-1.6h4.1c1 0 1.8-.8 1.8-1.8V2.2H12z"
        fill="#3776AB"
      />
      <path
        d="M12 21.8c3.6 0 6.1-1.1 6.1-4v-1.6c0-1-.8-1.8-1.8-1.8H12c-1.6 0-2.9-1.3-2.9-2.9V10.4c0-.9.7-1.6 1.6-1.6h4.1c1 0 1.8-.8 1.8-1.8V5.9c0-2.9-2.6-4-6.1-4"
        fill="#FFD43B"
        opacity="0.95"
      />
      <circle cx="9.6" cy="7.2" r="1.05" fill="white" />
      <circle cx="14.4" cy="16.8" r="1.05" fill="white" />
    </svg>
  );
}
function JSLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M14.6 17.2c-.7.8-1.6 1.1-2.6 1.1-1.9 0-3-1.1-3-3 0-3.5 4.8-3.3 4.8-5.7 0-.7-.5-1.2-1.5-1.2-.8 0-1.5.4-1.9.9l-1-.7c.6-.8 1.6-1.3 2.9-1.3 1.8 0 3 1 3 2.5 0 2.7-4.7 3-4.7 5.3 0 .5.3.9.9.9.6 0 1.1-.3 1.6-.8l1.5 1ZM7.8 17.1c-.6.7-1.3 1-2.2 1-1.5 0-2.4-1-2.4-2.6 0-3 4-2.9 4-5.1 0-.5-.4-.9-1.1-.9-.6 0-1.1.3-1.4.6l-.9-.6c.5-.6 1.3-1 2.3-1 1.5 0 2.4.8 2.4 2 0 2.4-3.9 2.7-3.9 4.8 0 .4.3.7.8.7.5 0 .9-.2 1.3-.6l1.1.7Z"
        fill="#000"
      />
    </svg>
  );
}
function AILogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="7" fill="url(#aiG)" />
      <path d="M12 6.5 13.4 9.2 16.5 9.6 14.3 11.7 14.8 14.8 12 13.3 9.2 14.8 9.7 11.7 7.5 9.6 10.6 9.2 12 6.5Z" fill="white" />
      <circle cx="12" cy="17.2" r="1.1" fill="white" opacity=".85" />
      <defs>
        <linearGradient id="aiG" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function ReactLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="1.7" fill="#61DAFB" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" stroke="#61DAFB" strokeWidth="1.35" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" stroke="#61DAFB" strokeWidth="1.35" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" stroke="#61DAFB" strokeWidth="1.35" transform="rotate(120 12 12)" />
    </svg>
  );
}
function PostgresLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.2c-3.8 0-7 2.2-7 6.2 0 2 .9 3.7 2.5 4.8l-.6 3.2 3.2-1.6c.6.2 1.2.3 1.9.3 3.8 0 7-2.2 7-6.2S15.8 2.2 12 2.2Z" fill="#336791" />
      <path d="M9.5 9.2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Z" fill="white" />
      <path d="M9.2 13.2c.4.7 1.3 1.2 2.8 1.2s2.4-.5 2.8-1.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10.2" cy="9.1" r=".7" fill="#336791" />
      <circle cx="13.8" cy="9.1" r=".7" fill="#336791" />
    </svg>
  );
}
function DockerLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#2496ED" />
      <path
        d="M7 14.5h1.6v-1.1H7v1.1Zm2.3 0H11v-1.1H9.3v1.1Zm2.4 0h1.7v-1.1h-1.7v1.1Zm-4.7-1.8H8.6v-1.1H7v1.1Zm2.3 0H11v-1.1H9.3v1.1Zm2.4 0h1.7v-1.1h-1.7v1.1Zm2.4 0H15v-1.1h-1.9v1.1ZM7.7 16.2c1.1 1.1 2.6 1.7 4.3 1.7 1.7 0 3.2-.6 4.3-1.7l.7-.7h-1.4l-.4.4c-.7.6-1.8 1-3.2 1-1.4 0-2.5-.4-3.2-1l-.4-.4H7l.7.7Z"
        fill="white"
      />
      <rect x="12.2" y="8.2" width="1.6" height="1.1" rx=".3" fill="white" />
    </svg>
  );
}

const TECH_STACK = [
  { name: "Python", desc: "Backend & Analitik Data", level: 82, logo: <PythonLogo /> },
  { name: "JavaScript", desc: "Frontend & Node.js", level: 85, logo: <JSLogo /> },
  { name: "AI Development", desc: "Pembelajaran Mesin & LLM", level: 70, logo: <AILogo /> },
  { name: "React / Next.js", desc: "UI Modern & Performant", level: 80, logo: <ReactLogo /> },
  { name: "PostgreSQL", desc: "Database & Desain Skema", level: 72, logo: <PostgresLogo /> },
  { name: "Docker & DevOps", desc: "Deployment & Scaling", level: 68, logo: <DockerLogo /> },
];

export function Skills() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <section
      id="keahlian"
      className={cn("py-14 sm:py-20 transition-colors duration-300", isDark ? "bg-[#09090b]" : "bg-[#fafafa]")}
    >
      <div className="max-w-[920px] mx-auto px-5 sm:px-8">
        {/* label */}
        <div className="flex items-center gap-3 mb-3">
          <span className={cn("h-px w-8", isDark ? "bg-zinc-700" : "bg-zinc-300")} />
          <span className={cn("font-mono text-[11px] tracking-[0.2em]", isDark ? "text-zinc-500" : "text-zinc-500")}>
            02 — KEAHLIAN
          </span>
        </div>

        <div className="mb-8">
          <h2
            className={cn("font-black tracking-tighter leading-none text-[30px] sm:text-[40px]", isDark ? "text-white" : "text-zinc-900")}
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Tech Stack<span className={cn(isDark ? "text-zinc-500" : "text-zinc-400")}>.</span>
          </h2>
          <p className={cn("mt-3 max-w-[520px] text-[14px] leading-6", isDark ? "text-zinc-400" : "text-zinc-600")}>
            Teknologi yang saya gunakan untuk membangun produk yang cepat, rapi, dan scalable.
          </p>
        </div>

        {/* Grid 2 kolom — rounded-2xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECH_STACK.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...springConfig, delay: i * 0.05 }}
              className={cn(
                "group relative flex gap-4 items-start p-5 sm:p-6 rounded-2xl border overflow-hidden transition-all duration-300",
                isDark
                  ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700 hover:bg-[#1f1f23] hover:shadow-[0_0_28px_rgba(255,255,255,0.06),0_12px_36px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
                  : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.03)] hover:-translate-y-0.5"
              )}
            >
              {/* top hairline */}
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity",
                  isDark ? "bg-gradient-to-r from-transparent via-white/10 to-transparent" : "bg-gradient-to-r from-transparent via-black/10 to-transparent"
                )}
              />
              {/* radial glow */}
              <span
                className={cn(
                  "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] h-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  isDark
                    ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]"
                    : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_70%)]"
                )}
              />

              {/* Icon — resmi */}
              <div
                className={cn(
                  "w-11 h-11 rounded-xl grid place-items-center shrink-0",
                  isDark
                    ? "bg-zinc-800 border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    : "bg-zinc-50 border border-zinc-200 shadow-sm"
                )}
              >
                {item.logo}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1 relative">
                <h3 className={cn("font-bold text-[15px] leading-none tracking-tight", isDark ? "text-white" : "text-zinc-900")}>
                  {item.name}
                </h3>
                <p className={cn("mt-1.5 text-[13px] leading-5", isDark ? "text-[#a1a1aa]" : "text-zinc-500")}>{item.desc}</p>

                {/* level bar */}
                <div className="mt-3 flex items-center gap-2">
                  <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", isDark ? "bg-white/10" : "bg-zinc-200")}>
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-white transition-all duration-700"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                  <span className={cn("text-[11px] font-black tabular-nums", isDark ? "text-white/70" : "text-zinc-500")}>
                    {item.level}%
                  </span>
                </div>
              </div>

              <span
                className={cn(
                  "hidden sm:grid w-7 h-7 rounded-full place-items-center shrink-0 text-[13px] border transition-colors",
                  isDark
                    ? "border-white/10 text-zinc-500 group-hover:text-white group-hover:border-white/20"
                    : "border-zinc-200 text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-300 bg-zinc-50"
                )}
              >
                ↗
              </span>
            </motion.div>
          ))}
        </div>

        <p className={cn("mt-6 text-center font-mono text-[11px] tracking-[0.14em]", isDark ? "text-zinc-600" : "text-zinc-400")}>
          HOVER KARTU UNTUK LIHAT SOFT GLOW • {TECH_STACK.length} STACK • RESPONSIVE 1 → 2 KOLOM
        </p>
      </div>
    </section>
  );
}
