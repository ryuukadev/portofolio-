"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";
import { XIcon, InstagramIcon, GithubIcon } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px] shrink-0">
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.4 2 1.8 6.6 1.8 12.23c0 1.8.47 3.56 1.37 5.11L2 22l4.75-1.25a9.86 9.86 0 0 0 5.28 1.45h.01c5.63 0 10.23-4.6 10.23-10.23 0-2.73-1.06-5.3-2.99-7.22l.77.06Zm-7.02 15c-1.37 0-2.71-.37-3.88-1.07l-.28-.17-2.8.74.72-2.73-.18-.28a8.18 8.18 0 0 1-1.26-4.37c0-4.52 3.68-8.2 8.21-8.2a8.2 8.2 0 0 1 8.2 8.2c0 4.53-3.68 8.21-8.2 8.21l-.53-.33Zm6.25-6.14c-.34-.17-2-1-2.31-1.11-.31-.11-.53-.17-.76.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.75-1.69-1.02-.91-1.71-2.03-1.91-2.37-.2-.34-.02-.53.15-.7.15-.15.34-.39.51-.58.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.76-1.83-1.04-2.51-.27-.65-.55-.56-.76-.57h-.65c-.23 0-.6.09-.91.43-.31.34-1.19 1.16-1.19 2.82s1.22 3.27 1.39 3.5c.17.23 2.39 3.65 5.8 5.11.81.35 1.44.56 1.93.71.81.26 1.55.23 2.13.14.65-.1 2-.82 2.28-1.61.28-.79.28-1.47.2-1.61-.08-.14-.3-.22-.64-.39Z" />
  </svg>
);

const socials = [
  { name: "X", href: personalInfo.twitter || "https://x.com/ikadekwa", icon: <XIcon className="w-[22px] h-[22px]" /> },
  { name: "WhatsApp", href: "https://wa.me/6281234567890", icon: <WhatsAppIcon /> },
  { name: "Instagram", href: personalInfo.instagram || "https://instagram.com/ikadekwa", icon: <InstagramIcon className="w-[22px] h-[22px]" /> },
  { name: "GitHub", href: personalInfo.github || "https://github.com/ryuukadev", icon: <GithubIcon className="w-[22px] h-[22px]" /> },
];

export function ContactDock() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.div
      className="relative flex justify-center items-center my-8 sm:my-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 border rounded-[18px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
          isDark
            ? "bg-gradient-to-b from-neutral-800 to-neutral-900 border-white/10"
            : "bg-gradient-to-b from-neutral-200 to-neutral-100 border-neutral-300"
        )}
      >
        <motion.div
          className={cn(
            "flex items-center justify-center h-16 sm:h-[4.5rem] px-5 sm:px-6 rounded-xl font-black text-lg sm:text-xl shadow-inner",
            isDark
              ? "bg-neutral-200 text-neutral-950"
              : "bg-neutral-300 text-neutral-900"
          )}
          whileHover={{ scale: 1.03 }}
        >
          C
        </motion.div>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="relative flex items-center justify-center w-20 h-16 sm:w-24 sm:h-[4.5rem]"
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.div
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-xl transition-shadow",
                  isDark
                    ? "bg-neutral-100 text-neutral-950 shadow-[0_7px_0_#d3d0cb,_0_12px_18px_rgba(0,0,0,0.25)]"
                    : "bg-neutral-200 text-neutral-800 shadow-[0_7px_0_#cbd5e1,_0_12px_18px_rgba(0,0,0,0.1)] border border-neutral-300"
                )}
                whileHover={{
                  rotateX: 8,
                  boxShadow: "0 4px 0 #cbd5e1, 0 18px 25px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {social.icon}
              </motion.div>

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

        <motion.div
          className={cn(
            "flex items-center justify-center h-16 sm:h-[4.5rem] px-5 sm:px-6 rounded-xl font-black text-lg sm:text-xl shadow-inner",
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
