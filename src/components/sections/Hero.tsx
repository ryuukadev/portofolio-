"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Mail, MapPin } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SmartSocialLink } from "@/components/ui/SocialLink";
import { personalInfo } from "@/lib/data";
import dynamic from "next/dynamic";
import { springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => null,
});

const techStack = ["NEXT.JS", "TAILWIND", "JAVASCRIPT", "FIGMA", "TYPESCRIPT", "REACT"];

export function Hero() {
  const { t } = useLanguage();
  const rotatingWords = t.hero.rotatingWords;
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yHeading = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yAvatar = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const textControls = useAnimationControls();
  const badgeControls = useAnimationControls();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setTimeout(() => {
      badgeControls.start({
        opacity: [0, 1],
        y: [-10, 0],
        rotate: [-10, 0],
        scale: [0.8, 1],
        transition: { ...springConfig, delay: 0.1 },
      });
      textControls.start({
        opacity: [0, 1],
        y: [-20, 0],
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      });
    }, 100);
  }, [textControls, badgeControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const [particles, setParticles] = useState<Array<{ id: number; size: number; x: number; y: number; delay: number; duration: number }>>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <section
      id="beranda"
      ref={containerRef}
      className="relative pt-[72px] sm:pt-[84px] pb-10 sm:pb-16 overflow-visible"
    >
      {/* Running marquee — aesthetic behind BG */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {/* Row 1 — scroll left */}
        <motion.div
          className="absolute top-[12%] left-0 flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <span
              key={dup}
              className="flex items-center gap-4 pr-4 text-[26px] xs:text-[34px] sm:text-[46px] md:text-[60px] lg:text-[78px] xl:text-[92px] font-black tracking-tighter leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: isDark ? "1px rgba(255,255,255,0.07)" : "1px rgba(0,0,0,0.07)",
              }}
            >
              WEB DEV &nbsp;•&nbsp; UI/UX &nbsp;•&nbsp; FRONTEND &nbsp;•&nbsp; CREATIVE &nbsp;•&nbsp; DESIGN &nbsp;•&nbsp; CODE &nbsp;•&nbsp; NEXT.JS &nbsp;•&nbsp; REACT &nbsp;•&nbsp;
            </span>
          ))}
        </motion.div>
        {/* Row 2 — scroll right */}
        <motion.div
          className="absolute top-[40%] left-0 flex whitespace-nowrap will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <span
              key={dup}
              className="flex items-center gap-4 pr-4 text-[26px] xs:text-[34px] sm:text-[46px] md:text-[60px] lg:text-[78px] xl:text-[92px] font-black tracking-tighter leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: isDark ? "1px rgba(255,255,255,0.05)" : "1px rgba(0,0,0,0.05)",
              }}
            >
              FIGMA &nbsp;•&nbsp; TAILWIND &nbsp;•&nbsp; JAVASCRIPT &nbsp;•&nbsp; TYPESCRIPT &nbsp;•&nbsp; PORTFOLIO &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; SHIP &nbsp;•&nbsp;
            </span>
          ))}
        </motion.div>
        {/* Row 3 — scroll left slow */}
        <motion.div
          className="absolute top-[68%] left-0 flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <span
              key={dup}
              className="flex items-center gap-4 pr-4 text-[22px] xs:text-[30px] sm:text-[40px] md:text-[52px] lg:text-[66px] xl:text-[80px] font-black tracking-tighter leading-none opacity-60"
              style={{
                color: "transparent",
                WebkitTextStroke: isDark ? "0.8px rgba(255,255,255,0.04)" : "0.8px rgba(0,0,0,0.04)",
              }}
            >
              DEWAHYU &nbsp;•&nbsp; DEVELOPER &nbsp;•&nbsp; KLUNGKUNG &nbsp;•&nbsp; BALI &nbsp;•&nbsp; RPL 11 &nbsp;•&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* Background particles */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={cn("absolute rounded-full", isDark ? "bg-white/5" : "bg-black/[0.06]")}
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glow — monochrome */}
      <motion.div
        className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] -z-10", isDark ? "bg-white/[0.04]" : "bg-black/[0.06]")}
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <div className="relative max-w-[1280px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.18fr_0.82fr] gap-6 lg:gap-8 items-start py-4 xs:py-5 sm:py-8">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              style={{ y: yBadge }}
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={badgeControls}
              transition={{ ...springConfig, delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-2 skew-x-[-8deg] px-3 py-1 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]",
                  isDark ? "bg-neutral-100" : "bg-neutral-900"
                )}
              >
                <span
                  className={cn(
                    "skew-x-[8deg] inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.16em]",
                    isDark ? "text-neutral-950" : "text-neutral-50"
                  )}
                >
                  <motion.span
                    className={cn("w-2 h-2 rounded-full", isDark ? "bg-neutral-950" : "bg-white")}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span>{t.hero.badgeSchool}</span>
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              style={{ y: yHeading }}
              className={cn("font-black tracking-tighter leading-[0.92] mb-2", isDark ? "text-white" : "text-black")}
              initial="hidden"
              animate={textControls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              }}
            >
              <motion.span
                className="block text-[30px] xs:text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px]"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ ...springConfig, delay: 0.3 }}
              >
                {t.hero.greeting}
              </motion.span>

              {/* DEWAHYUDEV — nyambung, editorial aesthetic */}
              <motion.span
                className={cn(
                  "mt-1 relative inline-flex flex-wrap items-baseline gap-0 font-black leading-none",
                  "text-[32px] xs:text-[38px] sm:text-[46px] md:text-[54px] lg:text-[60px]"
                )}
              >
                <span className="relative inline-block">
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-x-[2px] translate-y-[2px] select-none pointer-events-none hidden sm:block"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: isDark ? "1px rgba(255,255,255,0.11)" : "1px rgba(0,0,0,0.08)",
                    }}
                  >
                    DEWAHYU
                  </span>
                  <span className={cn("relative tracking-[-0.06em]", isDark ? "text-white" : "text-neutral-900")}>DEWAHYU</span>
                </span>

                <motion.span
                  whileHover={{ y: -2, rotate: -0.7 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={cn(
                    "relative skew-x-[-12deg] -ml-1 px-2.5 sm:px-3.5 sm:px-4 py-1 sm:py-1.5 shadow-[6px_6px_0px_rgba(0,0,0,0.2)] border",
                    isDark ? "bg-white border-white" : "bg-neutral-900 border-neutral-900"
                  )}
                >
                  {/* inner top highlight */}
                  <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-white/30 hidden sm:block" />
                  <span className={cn("skew-x-[12deg] inline-block tracking-[-0.03em]", isDark ? "text-black" : "text-white")}>DEV</span>
                </motion.span>

                <span
                  className={cn(
                    "pointer-events-none absolute -bottom-2 left-0 h-px w-[88%]",
                    isDark ? "bg-gradient-to-r from-white/40 via-white/10 to-transparent" : "bg-gradient-to-r from-black/20 via-black/8 to-transparent"
                  )}
                />
              </motion.span>
            </motion.h1>

            <motion.p
              className={cn("mt-2 text-[11px] sm:text-[12px] font-black tracking-[0.28em]", isDark ? "text-white/60" : "text-black/50")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {personalInfo.fullName.toUpperCase()}
            </motion.p>

            {/* Rotating tagline */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={wordIndex}
                className={cn(
                  "mt-3 inline-block text-transparent bg-clip-text bg-gradient-to-r font-black text-[20px] sm:text-[24px] lg:text-[28px]",
                  isDark
                    ? "from-neutral-100 via-neutral-300 to-neutral-50"
                    : "from-neutral-700 via-neutral-800 to-neutral-900"
                )}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ ...springConfig, duration: 0.4 }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>

            {/* Description */}
            <motion.p
              className={cn("mt-3 sm:mt-5 max-w-[560px] text-[13px] xs:text-[14px] sm:text-[15px] leading-6 sm:leading-7", isDark ? "text-white/80" : "text-black/80")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.6 }}
            >
              {t.hero.descriptionPrefix}{" "}
              <span className={cn("font-semibold", isDark ? "text-white" : "text-black")}>
                {t.hero.descriptionSchool}
              </span>
              {t.hero.descriptionSuffix}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className={cn("mt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm", isDark ? "text-white/60" : "text-black/60")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.7 }}
            >
              <motion.span
                className="flex items-center gap-2"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Mail className={cn("w-4 h-4 shrink-0", isDark ? "text-white" : "text-black")} />
                {personalInfo.email}
              </motion.span>
              <motion.span
                className="flex items-center gap-2"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <MapPin className={cn("w-4 h-4 shrink-0", isDark ? "text-white" : "text-black")} />
                {t.hero.location}
              </motion.span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-5 sm:mt-7 flex flex-wrap gap-2.5 sm:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.8 }}
            >
              <motion.a
                href="#kontak"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={cn("skew-x-[-8deg] px-4 xs:px-5 sm:px-6 py-2.5 sm:py-3.5 inline-flex items-center gap-2 shadow-[4px_4px_0px_black] sm:shadow-[5px_5px_0px_black]", isDark ? "bg-white" : "bg-black")}
              >
                <span className={cn("skew-x-[8deg] inline-flex items-center gap-2 text-[11px] xs:text-[12px] sm:text-[13px] font-black tracking-widest", isDark ? "text-black" : "text-white")}>
                  {t.hero.ctaContact} <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.a>

              <motion.a
                href="#karya"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={cn("skew-x-[-8deg] px-4 xs:px-5 sm:px-6 py-2.5 sm:py-3.5 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] sm:shadow-[5px_5px_0px_rgba(0,0,0,0.15)] inline-flex items-center gap-2 border", isDark ? "bg-white border-white/5" : "bg-black border-black/10")}
              >
                <span className={cn("skew-x-[8deg] inline-flex items-center gap-2 text-[11px] xs:text-[12px] sm:text-[13px] font-black tracking-widest", isDark ? "text-black" : "text-white")}>
                  {t.hero.ctaProjects}
                </span>
              </motion.a>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2 text-[11px] font-bold tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, ...springConfig }}
            >
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.06, ...springConfig }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={cn(
                    "px-3 py-1.5 border rounded-full transition-all",
                    i === 3
                      ? "bg-white text-black border-black"
                      : isDark
                        ? "text-white/80 bg-white/10 hover:bg-white/15 border-white/10"
                        : "text-black/80 bg-black/5 hover:bg-black/10 border-black/10"
                  )}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, ...springConfig }}
            >
              {[
                { name: "GitHub", href: personalInfo.github, icon: <Github className="w-5 h-5" /> },
                { name: "WhatsApp", href: personalInfo.whatsapp, icon: <WhatsAppIcon className="w-5 h-5" /> },
                { name: "Instagram", href: personalInfo.instagram, icon: <Instagram className="w-5 h-5" /> },
                { name: "TikTok", href: personalInfo.tiktok, icon: <TikTokIcon className="w-5 h-5" /> },
              ].map((social, i) => (
                <SmartSocialLink
                  key={social.name}
                  href={social.href}
                  label={social.name}
                  index={i}
                  className={cn(
                    "w-10 h-10 grid place-items-center rounded-xl transition-colors",
                    isDark
                      ? "bg-white/5 text-neutral-300 hover:text-neutral-100 hover:bg-white/10 border border-white/10"
                      : "bg-neutral-200/50 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 border border-neutral-300"
                  )}
                >
                  {social.icon}
                </SmartSocialLink>
              ))}
            </motion.div>
          </div>

          {/* Right — LANYARD PHYSICS (React Bits) — desktop */}
          <div className="hidden lg:flex justify-end self-start pt-[2px] xl:pt-[6px]">
            <div className="w-[460px] h-[560px] -mr-2 xl:mr-0">
              <Lanyard
                position={[0, 0, 12]}
                gravity={[0, -40, 0]}
                fov={30}
                transparent
                frontImage="/wahyu.png"
                lanyardWidth={1.8}
              />
            </div>
          </div>
          {/* Mobile / tablet — physics juga */}
          <motion.div
            style={{ y: yAvatar }}
            className="lg:hidden w-full flex flex-col items-center mt-2 sm:mt-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springConfig, delay: 0.45 }}
          >
            <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] h-[400px] xs:h-[460px] sm:h-[520px] origin-center">
              <Lanyard
                position={[0, 0, 12]}
                gravity={[0, -40, 0]}
                fov={30}
                transparent
                frontImage="/wahyu.png"
                lanyardWidth={1.8}
              />
            </div>
            <p className={cn("mt-1 text-center text-[10px] font-bold tracking-[0.16em]", isDark ? "text-white/35" : "text-black/40")}>
              DRAG KARTU • GOYANGKAN
            </p>
            <p className={cn("mt-1 text-center text-[11px] font-semibold tracking-[0.18em]", isDark ? "text-white/45" : "text-black/45")}>
              {t.hero.locationShort}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
