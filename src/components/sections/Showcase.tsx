"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CertificateGallery, certificates as certData } from "@/components/ui/CertificateGallery";
import { cn, springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";
import type { Project } from "@/lib/types";

// —— Tech Stack — logo resmi tiap brand via Devicon CDN (HTML/CSS/JS/Next.js/Tailwind/React/Figma/Git) ——
function BrandImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={26}
      height={26}
      loading="lazy"
      draggable={false}
      className="w-[26px] h-[26px] object-contain"
    />
  );
}
function HTMLLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />;
}
function CSSLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />;
}
function JSLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />;
}
function NextLogo() {
  return (
    <span className="w-[26px] h-[26px] rounded-md bg-white grid place-items-center shrink-0">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
        alt="Next.js"
        width={20}
        height={20}
        loading="lazy"
        draggable={false}
        className="w-5 h-5 object-contain"
      />
    </span>
  );
}
function TailwindLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" />;
}
function ReactLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />;
}
function FigmaLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />;
}
function GitLogo() {
  return <BrandImg src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />;
}
const TECH_LOGOS = [<HTMLLogo key="html" />, <CSSLogo key="css" />, <JSLogo key="js" />, <NextLogo key="next" />, <TailwindLogo key="tw" />, <ReactLogo key="react" />, <FigmaLogo key="figma" />, <GitLogo key="git" />];

type TabId = "proyek" | "keahlian" | "sertifikat";

export function Showcase() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // tab state + sync hash biar #proyek / #keahlian / #sertifikat tetap bisa
  const [tab, setTab] = useState<TabId>("proyek");
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "") as TabId;
      if (h === "proyek" || h === "keahlian" || h === "sertifikat") setTab(h);
      else if (h === "karya") setTab("proyek");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const switchTab = (id: TabId) => {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
    document.getElementById("karya")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ——— Proyek data + filter ———
  const allLabel = t.projects.allLabel;
  const categories = t.projects.categories;
  const projects_i18n: Project[] = t.projectItems.map((p, i) => ({
    ...p,
    id: String(i + 1),
    demoUrl: "#",
    githubUrl: "#",
    image: (p as { image?: string }).image ?? "/project-placeholder.svg",
    category: p.category as Project["category"],
  }));
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);
  // nyambung ID↔EN: Semua↔All difallback ke allLabel baru, kategori lain (Web App/Mobile/UI/UX) dipertahankan
  useEffect(() => {
    setActiveCategory((prev) => (prev === "Semua" || prev === "All" ? allLabel : prev));
  }, [allLabel]);
  const effectiveCategory = activeCategory === "Semua" || activeCategory === "All" ? allLabel : activeCategory;
  const filtered = effectiveCategory === allLabel ? projects_i18n : projects_i18n.filter((p) => p.category === effectiveCategory);

  const tabs: { id: TabId; label: string; sub: string; count: number }[] = [
    { id: "proyek", label: t.projects.sectionLabel, sub: `${filtered.length} item`, count: filtered.length },
    { id: "keahlian", label: t.skills.sectionLabel, sub: `${t.skills.techItems.length} stack`, count: t.skills.techItems.length },
    { id: "sertifikat", label: t.certificates.sectionLabel, sub: `${certData.length} cert`, count: certData.length },
  ];

  return (
    <section id="karya" className={cn("py-10 sm:py-16 scroll-mt-[80px]", isDark ? "bg-[#09090b] sm:bg-transparent" : "bg-[#fafafa] sm:bg-transparent")}>
      {/* anchor compat */}
      <span id="proyek" className="block h-0 scroll-mt-[80px]" aria-hidden />
      <span id="sertifikat" className="block h-0 scroll-mt-[80px]" aria-hidden />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — minimal */}
        <div className="flex items-center gap-3 mb-6">
          <span className={cn("h-px w-8", isDark ? "bg-white/15" : "bg-black/10")} />
          <span className={cn("text-[11px] font-bold tracking-[0.18em]", isDark ? "text-white/35" : "text-black/35")}>
            {t.showcase.sectionNumber}
          </span>
        </div>

        {/* Tab bar — pil + sliding indicator */}
        <div className={cn("flex items-center gap-1.5 p-1.5 rounded-2xl border w-fit max-w-full overflow-x-auto scrollbar-none", isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-zinc-200 shadow-sm")}>
          {tabs.map((tb) => {
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => switchTab(tb.id)}
                className={cn(
                  "relative px-4 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-[12px] font-black tracking-[0.14em] whitespace-nowrap transition-colors",
                  active ? (isDark ? "text-black" : "text-white") : isDark ? "text-white/60 hover:text-white" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="showcase-tab"
                    className={cn("absolute inset-0 rounded-xl shadow-sm", isDark ? "bg-white" : "bg-zinc-900")}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative">{tb.label}</span>
              </button>
            );
          })}
          <span className={cn("hidden sm:inline-flex items-center gap-1.5 ml-1 pl-3 border-l text-[10px] font-mono tracking-widest", isDark ? "border-white/10 text-white/30" : "border-zinc-200 text-zinc-400")}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t.showcase.oneSection}
          </span>
        </div>

        {/* Content — AnimatePresence */}
        <div className="mt-8 min-h-[320px]">
          <AnimatePresence mode="wait">
            {tab === "proyek" && (
              <motion.div
                key="proyek"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className={cn("text-[13px] mb-4", isDark ? "text-white/55" : "text-neutral-600")}>{t.projects.intro}</p>
                {projects_i18n.length > 1 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((c) => {
                      const active = effectiveCategory === c;
                      return (
                        <motion.button
                          key={c}
                          onClick={() => setActiveCategory(c)}
                          whileTap={{ scale: 0.96 }}
                          className={cn(
                            "px-4 py-2 text-[12px] font-black tracking-widest skew-x-[-8deg] border transition-colors",
                            active ? "bg-neutral-300 text-neutral-800 border-neutral-400 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" : isDark ? "bg-white/5 text-white/70 border-white/10 hover:bg-white hover:text-black" : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                          )}
                        >
                          <span className="skew-x-[8deg] inline-block">{c}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((p) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={springConfig}>
                        <ProjectCard project={p as Project} isDark={isDark} liveLabel={t.projects.live} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
                {filtered.length === 0 && <p className={cn("text-center py-10 text-sm", isDark ? "text-white/40" : "text-zinc-400")}>{t.showcase.emptyFilter}</p>}
              </motion.div>
            )}

            {tab === "keahlian" && (
              <motion.div
                key="keahlian"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* anchor compat */}
                <span id="keahlian" className="block h-0" aria-hidden />
                <p className={cn("text-[13px] mb-6", isDark ? "text-white/55" : "text-zinc-600")}>{t.skills.intro} — {t.skills.introTechHint}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-[860px] auto-rows-fr">
                  {t.skills.techItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...springConfig, delay: i * 0.03 }}
                      className={cn(
                        "group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border overflow-hidden transition-all duration-300 h-full min-h-[88px] sm:min-h-[92px]",
                        isDark ? "bg-[#18181b] border-white/[0.06] hover:border-white/[0.10] hover:bg-[#1e1e21] hover:shadow-[0_0_24px_rgba(255,255,255,0.05),0_10px_28px_rgba(0,0,0,0.45)] hover:-translate-y-[2px]" : "bg-white border-zinc-200/80 hover:border-zinc-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-[2px]"
                      )}
                    >
                      {/* top hairline — always subtle, stronger on hover */}
                      <span className={cn("pointer-events-none absolute inset-x-0 top-0 h-px", isDark ? "bg-gradient-to-r from-transparent via-white/[0.07] to-transparent group-hover:via-white/[0.12]" : "bg-gradient-to-r from-transparent via-black/[0.06] to-transparent group-hover:via-black/[0.09]")} />
                      {/* hover glow */}
                      <span className={cn("pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[320px] h-[140px] opacity-0 group-hover:opacity-100 transition-opacity duration-300", isDark ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04),transparent_70%)]")} />
                      <div className={cn("w-11 h-11 rounded-xl grid place-items-center shrink-0", isDark ? "bg-white/[0.06] border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" : "bg-zinc-50 border border-zinc-200 shadow-sm")}>
                        {TECH_LOGOS[i]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={cn("font-bold text-[14.5px] leading-none tracking-tight", isDark ? "text-white" : "text-zinc-900")}>{item.name}</h3>
                        <p className={cn("mt-1 text-[12.5px] leading-[1.45] line-clamp-1", isDark ? "text-[#a1a1aa]" : "text-zinc-500")}>{item.desc}</p>
                      </div>
                      <span className={cn("hidden sm:grid w-7 h-7 rounded-full place-items-center shrink-0 text-[12px] border transition-colors", isDark ? "border-white/10 text-white/25 group-hover:text-white/60 group-hover:border-white/15 bg-white/[0.02]" : "border-zinc-200 text-zinc-300 group-hover:text-zinc-600 group-hover:border-zinc-300 bg-zinc-50")}>↗</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === "sertifikat" && (
              <motion.div
                key="sertifikat"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6">
                  <h3 className={cn("text-xl sm:text-2xl font-black tracking-tight", isDark ? "text-white" : "text-zinc-800")}>{t.certificates.heading}</h3>
                  <p className={cn("mt-1.5 text-[14px] max-w-2xl", isDark ? "text-white/60" : "text-zinc-600")}>{t.certificates.intro}</p>
                </div>
                <GlassCard className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={cn("w-10 h-10 rounded-xl grid place-items-center border", isDark ? "bg-white/10 border-white/10" : "bg-zinc-100 border-zinc-200")}>
                      <Award className={cn("w-5 h-5", isDark ? "text-zinc-200" : "text-zinc-700")} />
                    </span>
                    <h4 className={cn("text-[16px] font-black", isDark ? "text-white" : "text-zinc-800")}>{t.certificates.galleryTitle}</h4>
                  </div>
                  <CertificateGallery />
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isDark, liveLabel }: { project: Project; isDark: boolean; liveLabel: string }) {
  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col group h-full">
      {/* cover image — kalau ada */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
      </div>
      <div className={cn("relative p-6", isDark ? "bg-white/[0.02]" : "bg-zinc-50/60")}>
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `radial-gradient(circle, ${isDark ? "white" : "rgba(0,0,0,0.12)"} 1.1px, transparent 1.1px)`, backgroundSize: "16px 16px" }} />
        <div className="relative">
          <h3 className={cn("font-black tracking-tighter leading-none text-[18px]", isDark ? "text-white" : "text-zinc-800")}>{project.title.toUpperCase()}</h3>
          <p className={cn("mt-2 text-[13px] leading-6 line-clamp-3", isDark ? "text-white/60" : "text-zinc-600")}>{project.description}</p>
        </div>
      </div>
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <span key={t} className={cn("px-2.5 py-1 rounded-full text-[11px] font-bold border", isDark ? "bg-white text-black border-black/5" : "bg-white text-zinc-700 border-zinc-200")}>
            {t}
          </span>
        ))}
      </div>
      <div className={cn("mt-auto px-6 py-4 flex items-center gap-2 border-t", isDark ? "border-white/10 bg-white/[0.02]" : "border-zinc-200 bg-zinc-50/40")}>
        {project.demoUrl && (
          <a href={project.demoUrl} className={cn("inline-flex items-center gap-1.5 skew-x-[-8deg] px-3 py-2 text-[12px] font-black tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.2)]", isDark ? "bg-neutral-300 text-neutral-800" : "bg-zinc-900 text-white")}>
            <span className="skew-x-[8deg] inline-flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> {liveLabel}
            </span>
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className={cn("inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold", isDark ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-900")}>
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        )}
      </div>
    </GlassCard>
  );
}
