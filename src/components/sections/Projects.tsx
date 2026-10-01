"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Project } from "@/lib/types";
import { cn, springConfig } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLanguage } from "@/lib/i18n/context";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springConfig },
};

export function Projects() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const categories = t.projects.categories;
  const allLabel = t.projects.allLabel;
  const projects_i18n: Project[] = t.projectItems.map((p, i) => ({
    ...p,
    id: String(i + 1),
    demoUrl: "#",
    githubUrl: "#",
    image: (p as { image?: string }).image ?? "/project-placeholder.svg",
    category: p.category as Project["category"],
  }));
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  useEffect(() => {
    setActiveCategory(allLabel);
  }, [allLabel]);

  const filtered =
    activeCategory === allLabel
      ? projects_i18n
      : projects_i18n.filter((p) => p.category === activeCategory);

  return (
    <section id="proyek" className="py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex items-end gap-4">
            <div className={cn("skew-x-[-8deg] px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]", isDark ? "bg-white" : "bg-neutral-900")}>
              <span className={cn("skew-x-[8deg] inline-block text-[12px] font-black tracking-[0.18em]", isDark ? "text-black" : "text-white")}>
                {t.projects.sectionLabel}
              </span>
            </div>
            <span className={cn("hidden sm:inline text-[11px] font-bold tracking-[0.18em] translate-y-[-6px]", isDark ? "text-white/40" : "text-neutral-400")}>
              {t.projects.sectionNumber}
            </span>
          </div>
          <p className={cn("text-[13px] max-w-[420px]", isDark ? "text-white/55" : "text-neutral-600")}>
            {t.projects.intro}
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => {
            const active = activeCategory === c;
            return (
              <motion.button
                key={c}
                onClick={() => setActiveCategory(c)}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={cn(
                  "px-4 py-2 text-[12px] font-black tracking-widest skew-x-[-8deg] border",
                  active
                    ? "bg-neutral-300 text-neutral-800 border-neutral-400 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                    : isDark
                      ? "bg-white/5 text-white/70 border-white/10 hover:bg-white hover:text-black"
                      : "bg-neutral-200/50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
                )}
              >
                <span className="skew-x-[8deg] inline-block">{c}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                variants={cardItem}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={springConfig}
              >
                <ProjectCard project={p} isDark={isDark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  return (
    <GlassCard className="p-0 overflow-hidden flex flex-col group">
      {/* Top color bar */}
      <div className="h-[5px] bg-neutral-300" />

      {/* Header block */}
      <div className={cn(`relative p-6`, isDark ? "bg-white/[0.02]" : "bg-neutral-100/30")}>
        {/* halftone */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? "white" : "rgba(0,0,0,0.1)"} 1.1px, transparent 1.1px)`,
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="skew-x-[-8deg] bg-neutral-300 px-2.5 py-1 text-[10px] font-black tracking-widest text-neutral-800">
              <span className="skew-x-[8deg] inline-block">
                {project.category.toUpperCase()}
              </span>
            </span>
            <span className={cn("text-[11px] font-bold tracking-widest", isDark ? "text-white/30" : "text-neutral-400")}>
              #{project.id.padStart(2, "0")}
            </span>
          </div>

          <h3 className={cn("mt-4 font-black tracking-tighter leading-none text-[18px]", isDark ? "text-white" : "text-neutral-800")}>
            {project.title.toUpperCase()}
          </h3>
          <p className={cn("mt-2 text-[13px] leading-6 line-clamp-3", isDark ? "text-white/60" : "text-neutral-600")}>
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {project.techStack.map((t) => (
          <span
            key={t}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border",
              isDark
                ? "bg-white text-black border-neutral-300/10"
                : "bg-neutral-100 text-neutral-800 border-neutral-300"
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={cn("mt-auto px-6 py-4 flex items-center gap-2 border-t", isDark ? "border-white/10 bg-white/[0.02]" : "border-neutral-300/30 bg-neutral-100/20")}>
        {project.demoUrl && (
          <motion.a
            href={project.demoUrl}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={cn("inline-flex items-center gap-1.5 skew-x-[-8deg] px-3 py-2 text-[12px] font-black tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,0.2)]", isDark ? "bg-neutral-300 text-neutral-800" : "bg-neutral-800 text-neutral-200")}
          >
            <span className="skew-x-[8deg] inline-flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" /> LIVE
            </span>
          </motion.a>
        )}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={cn("inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold tracking-widest", isDark ? "text-neutral-300 hover:text-neutral-200" : "text-neutral-600 hover:text-neutral-800")}
          >
            <Github className="w-3.5 h-3.5" /> GitHub
          </motion.a>
        )}
      </div>
    </GlassCard>
  );
}
