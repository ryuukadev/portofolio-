"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon, Award, ExternalLink, BadgeCheck, Sparkles, Eye } from "lucide-react";
import { springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string | null;
  credentialUrl?: string;
  featured?: boolean;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Immortals38 — High Rank Certificate",
    issuer: "Immortals38 — Standar Goldlane",
    date: "12 Januari 2026",
    image: "/IMORTALS38.jpg",
    credentialUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Sertifikat Kompetensi",
    issuer: "Sertifikat Kompetensi",
    date: "19 Agustus 2026",
    image: "/sertifikat.png",
    credentialUrl: "#",
    featured: true,
  },
];

export function CertificateGallery() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // lock body scroll when lightbox open
  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ ...springConfig, delay: i * 0.1 }}
            className="group relative cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            {/* featured glow */}
            <div className="absolute -inset-[1.5px] rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 opacity-70 group-hover:opacity-100 blur-[0.5px] transition-opacity -z-10" />

            <div
              className={cn(
                "relative rounded-2xl overflow-hidden border transition-all duration-300",
                "shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] group-hover:-translate-y-[2px]",
                "aspect-[4/3] sm:aspect-[16/10] border-amber-300/40"
              )}
            >
              <img
                src={cert.image as string}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              {/* top badges */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-neutral-900 text-[10px] font-black tracking-wide px-2.5 py-1 shadow-lg">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-neutral-900 text-[10px] font-black tracking-widest px-2.5 py-1 shadow-lg">
                  <Sparkles className="w-3 h-3" /> FEATURED
                </span>
              </div>
              {/* bottom info */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <h4 className="text-white text-[14px] sm:text-[15px] font-black leading-tight line-clamp-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                  {cert.title}
                </h4>
                <p className="text-white/85 text-[11px] mt-1.5 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  {cert.issuer} • {cert.date}
                </p>
              </div>
              {/* hover eye */}
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[1px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 text-[12px] font-bold px-4 py-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-4 h-4" /> Lihat Sertifikat
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
<motion.div
               className={cn(
                 "relative w-full max-w-3xl max-h-[92vh] rounded-[20px] overflow-hidden border shadow-[0_24px_80px_rgba(0,0,0,0.5)] flex flex-col",
                 isDark ? "bg-neutral-900 border-white/10" : "bg-white border-neutral-200"
               )}
               initial={{ scale: 0.92, y: 16, opacity: 0 }}
               animate={{ scale: 1, y: 0, opacity: 1 }}
               exit={{ scale: 0.96, y: 8, opacity: 0 }}
               transition={{ ...springConfig }}
               onClick={(e) => e.stopPropagation()}
             >
              {/* header */}
              <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b shrink-0"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                <div className={cn("w-10 h-10 rounded-xl grid place-items-center border shrink-0", isDark ? "bg-white/10 border-white/10" : "bg-neutral-100 border-neutral-200")}>
                  <Award className={cn("w-5 h-5", isDark ? "text-white" : "text-neutral-700")} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={cn("font-black text-[15px] sm:text-[17px] leading-tight truncate", isDark ? "text-white" : "text-neutral-900")}>{selected.title}</h3>
                  <p className={cn("text-[12px] flex items-center gap-1.5", isDark ? "text-white/60" : "text-neutral-600")}>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {selected.issuer} • {selected.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className={cn(
                    "w-9 h-9 grid place-items-center rounded-full border transition-all shrink-0 hover:rotate-90 duration-300",
                    isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200"
                  )}
                  aria-label="Tutup"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {/* image area */}
              <div className="flex-1 overflow-auto p-3 sm:p-5 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 grid place-items-center"
                style={{ background: isDark ? "radial-gradient(600px 400px at 50% 0%, rgba(255,255,255,0.06), transparent), linear-gradient(to bottom right, #27272a, #18181b)" : "radial-gradient(600px 400px at 50% 0%, rgba(0,0,0,0.04), transparent), linear-gradient(to bottom right, #f4f4f5, #e4e4e7)" }}>
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-auto max-h-[56vh] object-contain rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] bg-white"
                  />
                ) : (
                  <div className={cn("w-full aspect-video rounded-xl grid place-items-center border-2 border-dashed", isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-neutral-300")}>
                    <div className="text-center">
                      <Award className={cn("w-16 h-16 mx-auto mb-3", isDark ? "text-white/20" : "text-neutral-300")} />
                      <p className={cn("text-sm font-bold", isDark ? "text-white/60" : "text-neutral-500")}>Preview tidak tersedia</p>
                      <p className={cn("text-xs mt-1", isDark ? "text-white/40" : "text-neutral-400")}>Sertifikat ini belum memiliki foto</p>
                    </div>
                  </div>
                )}
              </div>

              {/* footer */}
              <div className="px-5 sm:px-6 py-4 flex items-center justify-between gap-3 border-t shrink-0" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                <p className={cn("text-[11px]", isDark ? "text-white/50" : "text-neutral-500")}>
                  Klik di luar untuk menutup • ESC
                </p>
                {selected.image && (
                  <a
                    href={selected.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[12px] font-bold px-4 py-2 hover:opacity-90 transition-opacity"
                  >
                    Buka ukuran penuh <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
