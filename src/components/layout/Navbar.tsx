"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Instagram } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { WLogo } from "@/components/ui/WLogo";
import { NavCta } from "@/components/ui/NavCta";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SmartSocialLink } from "@/components/ui/SocialLink";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
        scrolled
          ? isDark
            ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-white/90 backdrop-blur-xl border-b border-neutral-300/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
          {/* Logo — animated </> monogram */}
          <a href="#beranda" className="flex items-center gap-3" aria-label="Ke beranda">
            <WLogo isDark={isDark} />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {t.nav.links.map((l) => (
              <motion.a
                key={l.name}
                href={l.href}
                whileHover={{ y: -1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "relative px-4 py-2 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors",
                  isDark ? "text-white/60 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {l.name}
              </motion.a>
            ))}

            {/* Social icons */}
            <div className="flex items-center gap-1.5 mx-1">
              {[
                { name: "GitHub", href: personalInfo.github, icon: <Github className="w-4 h-4" /> },
                { name: "WhatsApp", href: personalInfo.whatsapp, icon: <WhatsAppIcon className="w-4 h-4" /> },
                { name: "Instagram", href: personalInfo.instagram, icon: <Instagram className="w-4 h-4" /> },
                { name: "TikTok", href: personalInfo.tiktok, icon: <TikTokIcon className="w-4 h-4" /> },
              ].map((s, i) => (
                <SmartSocialLink
                  key={s.name}
                  href={s.href}
                  label={s.name}
                  index={i}
                  className={cn(
                    "w-8 h-8 grid place-items-center rounded-lg transition-all",
                    isDark
                      ? "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                      : "bg-neutral-200/50 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 border border-neutral-300"
                  )}
                >
                  {s.icon}
                </SmartSocialLink>
              ))}
            </div>

            <LanguageToggle />
            <ThemeToggle />

            <NavCta label={t.nav.cta} isDark={isDark} />
          </div>

          {/* Mobile: lang + theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={cn(
                "w-10 h-10 grid place-items-center rounded-xl transition-all",
                isDark
                  ? "bg-white/[0.06] border border-white/10 text-white"
                  : "bg-neutral-200/50 border border-neutral-300 text-neutral-800"
              )}
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className={cn("md:hidden overflow-hidden overflow-y-auto max-h-[calc(100dvh-64px)] border-t", isDark ? "border-white/10" : "border-neutral-300")}
            >
              <div className="py-3">
                {t.nav.links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-2 py-3 text-[13px] font-semibold tracking-widest uppercase transition-colors",
                      isDark ? "text-white/70 hover:text-white" : "text-neutral-700 hover:text-neutral-900"
                    )}
                  >
                    {l.name}
                  </a>
                ))}

                <div className="flex items-center gap-2 mt-2 px-2 pb-3">
                  {[
                    { name: "GitHub", href: personalInfo.github, icon: <Github className="w-4 h-4" /> },
                    { name: "WhatsApp", href: personalInfo.whatsapp, icon: <WhatsAppIcon className="w-4 h-4" /> },
                    { name: "Instagram", href: personalInfo.instagram, icon: <Instagram className="w-4 h-4" /> },
                    { name: "TikTok", href: personalInfo.tiktok, icon: <TikTokIcon className="w-4 h-4" /> },
                  ].map((s, i) => (
                    <SmartSocialLink
                      key={s.name}
                      href={s.href}
                      label={s.name}
                      index={i}
                      entrance={false}
                      onNavigate={() => setIsOpen(false)}
                      className={cn(
                        "w-8 h-8 grid place-items-center rounded-lg transition-all",
                        isDark
                          ? "bg-white/5 text-white/60 hover:text-white border border-white/10"
                          : "bg-neutral-200/50 text-neutral-600 hover:text-neutral-800 border border-neutral-300"
                      )}
                    >
                      {s.icon}
                    </SmartSocialLink>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
