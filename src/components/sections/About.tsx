"use client";

import { useState, useEffect } from "react";
import { MapPin, School } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GitHubStats } from "@/components/ui/GitHubStats";
import { personalInfo } from "@/lib/data";
import { springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section id="tentang" className="py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section head — minimal, tanpa badge box */}
        <div className="flex items-center gap-3 mb-8">
          <span className={cn("h-px w-8", isDark ? "bg-white/15" : "bg-black/10")} />
          <span className={cn("text-[11px] font-bold tracking-[0.18em]", isDark ? "text-white/35" : "text-black/35")}>
            {t.about.sectionNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...springConfig, delay: 0.05 }}
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className={cn("h-[8px]", isDark ? "bg-white" : "bg-neutral-900")} />
              <div className="p-7">
                {/* foto profile — pure black/white aesthetic */}
                <div className="relative">
                  <div
                    className={cn(
                      "w-[88px] h-[88px] rounded-2xl overflow-hidden border-[3px] shadow-[4px_4px_0px_rgba(0,0,0,0.2)]",
                      isDark ? "border-white bg-black" : "border-black bg-white"
                    )}
                  >
                    <img
                      src="/wahyu.png"
                      alt="I Kadek Wahyu Arta Pratama"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 18%" }}
                      draggable={false}
                    />
                  </div>
                  {/* dot status kecil */}
                  <span
                    className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 grid place-items-center",
                      isDark ? "bg-white border-black" : "bg-black border-white"
                    )}
                    aria-hidden
                  >
                    <span className={cn("w-2 h-2 rounded-full", isDark ? "bg-black" : "bg-white")} />
                  </span>
                </div>

                <h3 className={cn("mt-5 font-black tracking-tighter leading-none text-[22px]", isDark ? "text-white" : "text-black")}>
                  DEWAHYU
                  <br />
                  <span className={cn(isDark ? "text-white" : "text-black")}>DEVELOPER</span>
                </h3>
                <p className={cn("mt-1 text-[11px] font-black tracking-[0.18em]", isDark ? "text-white/45" : "text-black/45")}>
                  {personalInfo.fullName.toUpperCase()}
                </p>
                <p className={cn("mt-1 text-[11px] font-bold tracking-widest", isDark ? "text-white/50" : "text-black/50")}>
                  {t.about.role}
                </p>

                <div className="mt-6 space-y-3 text-[13px] leading-6">
                  <div className={cn("flex gap-3", isDark ? "text-white/75" : "text-black/75")}>
                    <School className={cn("w-4 h-4 mt-0.5 shrink-0", isDark ? "text-white" : "text-black")} />
                    <span>{t.about.school}</span>
                  </div>
                  <div className={cn("flex gap-3", isDark ? "text-white/75" : "text-black/75")}>
                    <MapPin className={cn("w-4 h-4 mt-0.5 shrink-0", isDark ? "text-white" : "text-black")} />
                    <span>{t.about.location}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={cn("px-3 py-1 rounded-full text-[11px] font-black tracking-widest border", isDark ? "bg-white text-black border-white" : "bg-neutral-900 text-white border-neutral-900")}>
                    {t.about.badgeRpl}
                  </span>
                  <span className={cn("px-3 py-1 rounded-full text-[11px] font-black tracking-widest", isDark ? "bg-white text-black" : "bg-black text-white")}>
                    {t.about.badgeYear}
                  </span>
                </div>
              </div>

              {/* bottom slash */}
              <div className={cn("h-[3px]", isDark ? "bg-white/10" : "bg-black/10")} />
              <div className="px-7 py-3 flex items-center justify-between">
                <span className={cn("text-[11px] font-bold tracking-[0.16em]", isDark ? "text-white/40" : "text-black/40")}>
                  {t.about.cardFooterSchool}
                </span>
                <span className={cn("text-[11px] font-black tracking-widest", isDark ? "text-white" : "text-black")}>
                  {t.about.cardFooterCity}
                </span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Story */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...springConfig, delay: 0.15 }}
            className="h-full"
          >
            <GlassCard className="p-7 sm:p-8 h-full">
              <div className={cn("inline-flex skew-x-[-8deg] px-3 py-1.5", isDark ? "bg-white" : "bg-black")}>
                <span className={cn("skew-x-[8deg] text-[11px] font-black tracking-[0.16em]", isDark ? "text-black" : "text-white")}>
                  {t.about.storyLabel}
                </span>
              </div>

              <div className={cn("mt-5 space-y-4 text-[14px] leading-7", isDark ? "text-white/75" : "text-black/75")}>
                <p>
                  {t.about.p1.a}{" "}
                  <span className={cn("font-semibold", isDark ? "text-white" : "text-black")}>
                    {t.about.p1.school}
                  </span>{" "}
                  {t.about.p1.b}
                </p>
                <p>
                  {t.about.p2.a}{" "}
                  <span className={cn("font-semibold", isDark ? "text-white" : "text-black")}>
                    {t.about.p2.bold}
                  </span>{" "}
                  {t.about.p2.b}
                </p>
                <p className={cn(isDark ? "text-white/60" : "text-black/60")}>
                  {t.about.p3}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.about.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-3 py-1.5 text-[11px] font-black tracking-widest skew-x-[-8deg] border-l-[3px]",
                      isDark
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black"
                    )}
                  >
                    <span className="skew-x-[8deg] inline-block">{tag}</span>
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* GitHub Stats — full width di bawah Story */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...springConfig, delay: 0.25 }}
            className="lg:col-span-2 mt-6"
          >
            <GitHubStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
