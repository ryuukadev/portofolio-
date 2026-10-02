"use client";

import { useState, type ReactNode, type MouseEvent } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/**
 * URL aplikasi native untuk scheme yang stabil.
 * - Instagram: instagram://user?username=... (terbuka langsung di aplikasi)
 * - WhatsApp / TikTok / GitHub: pakai universal link https + navigasi same-tab,
 *   OS otomatis menawarkan "Buka di aplikasi". Custom scheme TikTok tidak
 *   stabil jadi sengaja tidak dipakai.
 */
export function appUrlFor(webUrl: string): string | undefined {
  try {
    const u = new URL(webUrl);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("instagram.com")) {
      const username = u.pathname.split("/").filter(Boolean)[0];
      if (username) return `instagram://user?username=${username}`;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Buka link sosial dengan cara tercepat ke aplikasi:
 * - Desktop: tab baru seperti biasa.
 * - Mobile: navigasi same-tab (window.location.href) agar OS langsung
 *   menawarkan/membuka aplikasi, tanpa nyangkut tab browser perantara.
 *   Kalau ada custom scheme (IG), dicoba dulu lalu fallback ke https.
 */
export function openSmartLink(webUrl: string, appUrl?: string) {
  const app = appUrl ?? appUrlFor(webUrl);
  if (!isMobileDevice()) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }
  if (app) {
    let cancelled = false;
    const onHide = () => {
      cancelled = true;
    };
    document.addEventListener("visibilitychange", onHide, { once: true });
    window.location.href = app;
    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      if (!cancelled && !document.hidden) window.location.href = webUrl;
    }, 900);
  } else {
    window.location.href = webUrl;
  }
}

/** Dipakai di onClick <a>: desktop dibiarkan default, mobile di-intercept. */
export function handleSmartClick(e: MouseEvent, webUrl: string, appUrl?: string) {
  if (!isMobileDevice()) return;
  e.preventDefault();
  openSmartLink(webUrl, appUrl);
}

type SmartSocialLinkProps = {
  href: string;
  appHref?: string;
  label: string;
  className?: string;
  children: ReactNode;
  /** Urutan untuk entrance memantul beruntun (0 = paling kiri). */
  index?: number;
  /** Matikan entrance (mis. menu mobile yang dibuka-tutup — biar langsung muncul). */
  entrance?: boolean;
  /** Dipanggil saat tombol di-tap (mis. tutup menu mobile). */
  onNavigate?: () => void;
};

/**
 * Tombol ikon sosial dengan 3 perilaku:
 * 1. Smart open — di HP langsung lompat ke aplikasi (lihat openSmartLink).
 * 2. Entrance halus — fade + naik berurutan pakai pegas lembut.
 * 3. Jelly — tap/hover bikin ikon bergoyang squash-and-stretch
 *    (scaleX/scaleY berlawanan fase) via controls + ripple tipis.
 *    Tombol luar hanya main scale/y (satu tween) supaya tidak berebut
 *    transform dan animasi tidak patah.
 */
export function SmartSocialLink({
  href,
  appHref,
  label,
  className,
  children,
  index = 0,
  entrance = true,
  onNavigate,
}: SmartSocialLinkProps) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const [ripples, setRipples] = useState<number[]>([]);

  const spawnRipple = () => {
    const id = Date.now() + Math.random();
    setRipples((r) => [...r.slice(-2), id]);
    window.setTimeout(() => setRipples((r) => r.filter((x) => x !== id)), 500);
  };

  // Goyangan kenyal pada ikon — dijalankan manual via controls supaya tidak
  // berebut properti transform dengan entrance/hover/tap di tombol luar.
  const jelly = () => {
    if (reduce) return;
    controls.start({
      scaleX: [1, 1.28, 0.86, 1.1, 1],
      scaleY: [1, 0.78, 1.16, 0.94, 1],
      rotate: [0, -12, 8, -4, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={(e) => handleSmartClick(e, href, appHref)}
      onTap={() => {
        spawnRipple();
        jelly();
        onNavigate?.();
      }}
      onHoverStart={jelly}
      // Entrance: fade + naik lembut berurutan (tidak memantul/berputar
      // supaya tidak pecah di tengah jalan)
      // (entrance=false atau reduced-motion → langsung tampil, tanpa bug delay/opacity)
      initial={reduce || !entrance ? false : { scale: 0.6, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={
        reduce || !entrance
          ? undefined
          : { type: "spring", stiffness: 260, damping: 24, mass: 0.8, delay: 0.2 + index * 0.07 }
      }
      // Hover: tombol membesar dikit + terangkat — tanpa keyframes
      // (keyframe + entrance pegas itu yang bikin animasi patah/rusak)
      whileHover={
        reduce
          ? undefined
          : { scale: 1.1, y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }
      }
      // Tap: tombol menyusut halus, ikon yang memantul kenyal via jelly()
      whileTap={
        reduce
          ? undefined
          : { scale: 0.88, y: 0, transition: { type: "spring", stiffness: 500, damping: 20 } }
      }
      className={cn("relative overflow-hidden", className)}
    >
      {/* Ikon digoyang manual via controls (jelly) — bukan whileHover di sini
          supaya hanya satu animasi yang pegang transform dalam satu waktu */}
      <motion.span animate={controls} className="grid place-items-center">
        {children}
      </motion.span>

      {/* Ripple tipis tiap klik */}
      {ripples.map((id) => (
        <motion.span
          key={id}
          aria-hidden
          initial={{ scale: 0.5, opacity: 0.3 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-current"
        />
      ))}
    </motion.a>
  );
}
