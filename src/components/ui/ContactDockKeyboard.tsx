"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn, springConfig } from "@/lib/utils";
import { handleSmartClick } from "@/components/ui/SocialLink";
import { personalInfo } from "@/lib/data";
import { Instagram, Github } from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";

const socials = [
  { name: "TikTok", href: personalInfo.tiktok, icon: <TikTokIcon /> },
  { name: "WhatsApp", href: personalInfo.whatsapp, icon: <WhatsAppIcon /> },
  { name: "Instagram", href: personalInfo.instagram, icon: <Instagram className="w-[22px] h-[22px]" /> },
  { name: "GitHub", href: personalInfo.github || "https://github.com/ryuukadev", icon: <Github className="w-[22px] h-[22px]" /> },
];

export function ContactDockKeyboard() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.div
      className="relative flex justify-start sm:justify-center items-center my-8 sm:my-12 -mx-1 px-1 overflow-x-auto scrollbar-hide"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springConfig, delay: 0.2 }}
    >
      {/* Dock Container */}
      <div
        className={cn(
          "relative flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 border rounded-[18px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-fit max-w-full",
          isDark
            ? "bg-gradient-to-b from-neutral-800 to-neutral-900 border-white/10"
            : "bg-gradient-to-b from-neutral-200 to-neutral-100 border-neutral-300"
        )}
      >
        {/* Left "C" */}
        <motion.div
          className={cn(
            "hidden min-[380px]:flex items-center justify-center h-16 sm:h-[4.5rem] px-5 sm:px-6 rounded-xl font-black text-lg sm:text-xl shadow-inner shrink-0",
            isDark
              ? "bg-neutral-200 text-neutral-950"
              : "bg-neutral-300 text-neutral-900"
          )}
          whileHover={{ scale: 1.03 }}
        >
          C
        </motion.div>

        {/* Socials */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              onClick={(e) => handleSmartClick(e, social.href)}
              className="relative flex items-center justify-center w-12 h-12 sm:w-20 sm:h-16"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.82, rotate: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {/* Key Cap */}
              <motion.div
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-xl transition-shadow",
                  isDark
                    ? "bg-neutral-100 text-neutral-950 shadow-[0_7px_0_#d3d0cb,_0_12px_18px_rgba(0,0,0,0.25)]"
                    : "bg-neutral-200 text-neutral-800 shadow-[0_7px_0_#cbd5e1,_0_12px_18px_rgba(0,0,0,0.1)] border border-neutral-300"
                )}
                whileHover={{
                  rotateX: 8,
                  boxShadow: "0 4px 0 #cbd5e1, 0 18px 25px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {social.icon}
              </motion.div>

              {/* Tooltip */}
              <motion.span
                className={cn(
                  "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 text-xs rounded-lg opacity-0 pointer-events-none whitespace-nowrap",
                  isDark
                    ? "bg-neutral-800 text-neutral-200"
                    : "bg-neutral-700 text-neutral-100"
                )}
                whileHover={{ opacity: 1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {social.name}
              </motion.span>
            </motion.a>
          ))}
        </div>

        {/* Right "T" */}
        <motion.div
          className={cn(
            "hidden min-[380px]:flex items-center justify-center h-16 sm:h-[4.5rem] px-5 sm:px-6 rounded-xl font-black text-lg sm:text-xl shadow-inner shrink-0",
            isDark
              ? "bg-neutral-200 text-neutral-950"
              : "bg-neutral-300 text-neutral-900"
          )}
          whileHover={{ scale: 1.03 }}
        >
          T
        </motion.div>
      </div>
    </motion.div>
  );
}
