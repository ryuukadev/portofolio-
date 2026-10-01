"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CertificateGallery } from "@/components/ui/CertificateGallery";
import { springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Certificates() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section id="sertifikat" className="py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section head */}
        <div className="flex items-end gap-4 mb-8">
          <div className={cn("skew-x-[-8deg] px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]", isDark ? "bg-white" : "bg-neutral-900")}>
            <span className={cn("skew-x-[8deg] inline-block text-[12px] font-black tracking-[0.18em]", isDark ? "text-black" : "text-white")}>
              {t.certificates.sectionLabel}
            </span>
          </div>
          <div className={cn("hidden sm:block h-px flex-1 translate-y-[-10px]", isDark ? "bg-white/10" : "bg-neutral-300/50")} />
          <span className={cn("hidden sm:inline text-[11px] font-bold tracking-[0.18em] translate-y-[-6px]", isDark ? "text-white/40" : "text-neutral-400")}>
            {t.certificates.sectionNumber}
          </span>
        </div>

        {/* Section intro */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          <h2 className={cn("text-2xl sm:text-3xl font-black", isDark ? "text-white" : "text-neutral-800")}>
            {t.certificates.heading}
          </h2>
          <p className={cn("mt-2 text-[14px] max-w-2xl", isDark ? "text-white/60" : "text-neutral-600")}>
            {t.certificates.intro}
          </p>
        </motion.div>

        {/* Certificate Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springConfig, delay: 0.2 }}
        >
          <GlassCard className="p-7">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-xl grid place-items-center border",
                  isDark ? "bg-white/10 border-neutral-400/30" : "bg-neutral-200 border-neutral-400/50"
                )}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Award className={cn("w-5 h-5", isDark ? "text-neutral-300" : "text-neutral-700")} />
              </motion.div>
              <h3 className={cn("text-[18px] font-black tracking-tight", isDark ? "text-white" : "text-neutral-800")}>
                {t.certificates.galleryTitle}
              </h3>
            </div>

            <CertificateGallery />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
