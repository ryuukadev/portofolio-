"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

// Logo code — </> monogram
function WLogo({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={cn(
        "relative skew-x-[-10deg] w-10 h-10 grid place-items-center shadow-[3px_3px_0px_rgba(0,0,0,0.3)] border-2",
        isDark ? "bg-white border-white" : "bg-neutral-100 border-neutral-300"
      )}
    >
      <span
        className={cn(
          "skew-x-[10deg] font-black text-[18px] leading-none tracking-tighter",
          isDark ? "text-black" : "text-neutral-800"
        )}
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      >
        &lt;/&gt;
      </span>
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full border border-white" />
    </div>
  );
}

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
          {/* Logo — DW monogram only */}
          <motion.a href="#beranda" className="flex items-center gap-3 group" whileHover={{ scale: 1.02 }}>
            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
              <WLogo isDark={isDark} />
            </motion.div>
          </motion.a>

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
                { name: "LinkedIn", href: "https://linkedin.com/in/ikadekwa", icon: <Linkedin className="w-4 h-4" /> },
                { name: "Instagram", href: "https://instagram.com/ikadekwa", icon: <Instagram className="w-4 h-4" /> },
              ].map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1, y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={cn(
                    "w-8 h-8 grid place-items-center rounded-lg transition-all",
                    isDark
                      ? "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                      : "bg-neutral-200/50 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 border border-neutral-300"
                  )}
                  aria-label={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <LanguageToggle />
            <ThemeToggle />

            <motion.a
              href="#kontak"
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={cn(
                "ml-3 skew-x-[-8deg] px-5 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.4)] transition-shadow",
                isDark ? "bg-white" : "bg-neutral-900"
              )}
            >
              <span
                className={cn(
                  "skew-x-[8deg] inline-block text-[12px] font-black tracking-widest uppercase",
                  isDark ? "text-black" : "text-white"
                )}
              >
                {t.nav.cta}
              </span>
            </motion.a>
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
              className={cn("md:hidden overflow-hidden border-t", isDark ? "border-white/10" : "border-neutral-300")}
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
                    { name: "LinkedIn", href: "https://linkedin.com/in/ikadekwa", icon: <Linkedin className="w-4 h-4" /> },
                    { name: "Instagram", href: "https://instagram.com/ikadekwa", icon: <Instagram className="w-4 h-4" /> },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "w-8 h-8 grid place-items-center rounded-lg transition-all",
                        isDark
                          ? "bg-white/5 text-white/60 hover:text-white border border-white/10"
                          : "bg-neutral-200/50 text-neutral-600 hover:text-neutral-800 border border-neutral-300"
                      )}
                      aria-label={s.name}
                    >
                      {s.icon}
                    </a>
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
