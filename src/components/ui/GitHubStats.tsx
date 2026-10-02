"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Flame,
  Trophy,
  CalendarDays,
  Sparkles,
  Loader2,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn, springConfig } from "@/lib/utils";
import { githubUsername } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/context";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ContribRaw = {
  date?: unknown;
  count?: unknown;
  contributionCount?: unknown;
  level?: unknown;
  intensity?: unknown;
};

type Status = "loading" | "live" | "preview";

const CACHE_KEY = `gh-contrib-${githubUsername}`;
const CACHE_TTL = 6 * 3600 * 1000; // 6 jam — kunjungan ulang langsung instan
const FETCH_TIMEOUT = 4000;

function levelFromCount(count: number, max: number): Day["level"] {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const r = count / max;
  if (r <= 0.15) return 1;
  if (r <= 0.4) return 2;
  if (r <= 0.7) return 3;
  return 4;
}

// Fallback deterministik — langsung tampil di paint pertama,
// lalu diganti data asli saat fetch selesai (tanpa kedip kasar)
function seededFallback(): Day[] {
  const days: Day[] = [];
  const today = new Date();
  let seed = githubUsername.split("").reduce((a, c) => a + c.charCodeAt(0), 7);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const r = rand();
    const count =
      r > 0.72 ? Math.floor(r * 12) : weekend && r > 0.5 ? Math.floor(r * 4) : 0;
    days.push({ date: d.toISOString().slice(0, 10), count, level: 0 });
  }
  const max = Math.max(...days.map((x) => x.count), 1);
  return days.map((x) => ({ ...x, level: levelFromCount(x.count, max) }));
}

function cellClass(isDark: boolean, level: Day["level"]) {
  if (isDark) {
    switch (level) {
      case 0:
        return "bg-white/[0.07] hover:bg-white/20";
      case 1:
        return "bg-white/20 hover:bg-white/30";
      case 2:
        return "bg-white/45 hover:bg-white/60";
      case 3:
        return "bg-white/75 hover:bg-white/90";
      case 4:
        return "bg-white shadow-[0_0_10px_rgba(255,255,255,0.55)] hover:shadow-[0_0_14px_rgba(255,255,255,0.8)]";
      default:
        return "bg-white/[0.07] hover:bg-white/20";
    }
  }
  switch (level) {
    case 0:
      return "bg-neutral-200/80 hover:bg-neutral-300";
    case 1:
      return "bg-neutral-300 hover:bg-neutral-400";
    case 2:
      return "bg-neutral-500 hover:bg-neutral-600";
    case 3:
      return "bg-neutral-800 hover:bg-neutral-900";
    case 4:
      return "bg-black shadow-[0_0_10px_rgba(0,0,0,0.35)]";
    default:
      return "bg-neutral-200/80 hover:bg-neutral-300";
  }
}

/** Sel heatmap tunggal — dimemo supaya update data cuma re-render sel yang
    warnanya berubah, bukan 371 sel sekaligus (itu yang bikin jank/stuck). */
const HeatCell = memo(function HeatCell({
  day,
  isDark,
  labelOnDate,
  fmtDate,
  playWave,
  revealed,
  animDelay,
  onHover,
}: {
  day: Day;
  isDark: boolean;
  labelOnDate: string;
  fmtDate: (iso: string) => string;
  playWave: boolean;
  revealed: boolean;
  animDelay?: string;
  onHover: (d: Day | null) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(day)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(day)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="img"
      aria-label={`${day.count} ${labelOnDate} ${fmtDate(day.date)}`}
      title={`${day.count} · ${fmtDate(day.date)}`}
      style={playWave ? { animationDelay: animDelay } : undefined}
      className={cn(
        playWave ? "gh-cell" : revealed ? "" : "opacity-0",
        "h-[11px] w-[11px] sm:h-[12px] sm:w-[12px] rounded-[3.5px] cursor-pointer outline-none transition-[transform,background-color,box-shadow] duration-200 ease-out hover:scale-[1.45] hover:z-10 hover:ring-1 focus-visible:scale-[1.45] focus-visible:ring-1",
        cellClass(isDark, day.level),
        isDark ? "hover:ring-white focus-visible:ring-white" : "hover:ring-black focus-visible:ring-black"
      )}
    />
  );
});
function useCountUp(target: number, start: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  const valRef = useRef(0);
  const lastPaintRef = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      fromRef.current = target;
      valRef.current = target;
      setVal(target);
      return;
    }
    const from = fromRef.current;
    if (from === target) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const v = Math.round(from + (target - from) * e);
      // Throttle setState ke ~30fps — 6 counter × 60fps itu yang bikin jank
      if (v !== valRef.current && (p === 1 || now - lastPaintRef.current > 32)) {
        lastPaintRef.current = now;
        valRef.current = v;
        setVal(v);
      } else {
        valRef.current = v;
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = valRef.current;
    };
  }, [target, start, duration, reduce]);
  return val;
}

export function GitHubStats() {
  const { resolvedTheme } = useTheme();
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  // Paint pertama: baca cache SYNC saat render (bukan di effect) supaya tidak
  // ada frame "fallback → data asli" yang bikin heatmap kelihatan berubah kasar
  const [days, setDays] = useState<Day[]>(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { days?: Day[]; ts?: number };
        if (
          Array.isArray(parsed.days) &&
          parsed.days.length > 0 &&
          Date.now() - (parsed.ts ?? 0) < CACHE_TTL
        ) {
          return parsed.days;
        }
      }
    } catch {
      /* abaikan */
    }
    return seededFallback();
  });
  // Kalau paint pertama sudah dari cache → langsung "live", tidak lewat "loading"
  const [status, setStatus] = useState<Status>(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { ts?: number; days?: Day[] };
        if (Array.isArray(parsed.days) && Date.now() - (parsed.ts ?? 0) < CACHE_TTL) {
          return "live";
        }
      }
    } catch {
      /* abaikan */
    }
    return "loading";
  });
  const [hover, setHover] = useState<Day | null>(null);
  // Profil GitHub (avatar, nama, followers) — diambil sekali, gagal pun tidak error
  const [profile, setProfile] = useState<{
    avatar: string;
    name: string;
    followers: number;
    repos: number;
  } | null>(null);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Wave animasi hanya dimainkan sekali, saat grid masuk viewport.
  // Sengaja TIDAK tergantung status fetch: kalau data live tiba di tengah
  // wave, sel cuma morph warna via transition-colors (halus) dan wave lanjut
  // sampai selesai — memutus class gh-cell di tengah jalan justru bikin kedip.
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (!inView || reduceMotion || played) return;
    const timer = setTimeout(() => setPlayed(true), 1200);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, played]);
  const playWave = inView && !reduceMotion && !played;
  const revealed = inView || !!reduceMotion;

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
    const hasReal = { current: false };

    // 1. Cache sudah dibaca SYNC di lazy useState di atas — paint pertama
    //    langsung data asli. Di sini cukup tandai hasReal untuk fallback status
    //    (tanpa setState ulang supaya tidak re-render ganda).
    try {
      const rawCache = localStorage.getItem(CACHE_KEY);
      if (rawCache) {
        const parsed = JSON.parse(rawCache) as { days?: Day[]; ts?: number };
        if (
          Array.isArray(parsed.days) &&
          parsed.days.length > 0 &&
          Date.now() - (parsed.ts ?? 0) < CACHE_TTL
        ) {
          hasReal.current = true;
        }
      }
    } catch {
      /* abaikan cache rusak */
    }

    // 2. Revalidasi di background — jadwalkan setelah browser idle supaya tidak
    //    berebut thread dengan paint awal (ini yang bikin "stuck" pas masuk).
    //    Hasilnya di-diff: hanya setState kalau data benar-benar beda, jadi
    //    heatmap tidak "berubah kasar" kalau datanya sama.
    const runFetch = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error("bad status");
        const json: unknown = await res.json();
        const raw: ContribRaw[] = Array.isArray(
          (json as { contributions?: unknown })?.contributions
        )
          ? (json as { contributions: ContribRaw[] }).contributions
          : Array.isArray(json)
            ? (json as ContribRaw[])
            : [];
        if (!raw.length) throw new Error("empty");
        const max = Math.max(
          ...raw.map((d) => Number(d.count ?? d.contributionCount ?? 0)),
          1
        );
        const parsed: Day[] = raw.slice(-371).map((d) => {
          const count = Number(d.count ?? d.contributionCount ?? 0);
          const lvl = Number(d.level ?? d.intensity ?? -1);
          return {
            date: String(d.date).slice(0, 10),
            count,
            level: (lvl >= 0 && lvl <= 4 ? lvl : levelFromCount(count, max)) as Day["level"],
          };
        });
        if (!cancelled) {
          // Diff ringan: kalau identik dengan yang tampil, jangan setState
          // (menghindari 371 re-render + angka count-up ngulang dari 0)
          setDays((prev) => {
            if (
              prev.length === parsed.length &&
              prev.every((d, i) => d.count === parsed[i].count && d.date === parsed[i].date)
            ) {
              hasReal.current = true;
              return prev;
            }
            return parsed;
          });
          hasReal.current = true;
          setStatus("live");
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ days: parsed, ts: Date.now() }));
          } catch {
            /* storage penuh — abaikan */
          }
        }
      } catch {
        if (!cancelled) setStatus(hasReal.current ? "live" : "preview");
      } finally {
        clearTimeout(timer);
      }
    };
    // requestIdleCallback kalau ada (idle browser), fallback timeout 600ms
    let idleId: number | undefined;
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => runFetch(), { timeout: 1500 });
    } else {
      idleId = window.setTimeout(() => runFetch(), 600) as unknown as number;
    }
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (typeof w.cancelIdleCallback === "function" && typeof idleId === "number") {
        try {
          w.cancelIdleCallback(idleId);
        } catch {
          /* abaikan */
        }
      } else {
        clearTimeout(idleId);
      }
      ctrl.abort();
    };
  }, []);

  // Profil publik GitHub (avatar + nama + followers) — tanpa token, gagal = sembunyi
  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT);
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) return;
        const json = (await res.json()) as {
          avatar_url?: string;
          name?: string;
          login?: string;
          followers?: number;
          public_repos?: number;
        };
        if (!cancelled && json.avatar_url) {
          setProfile({
            avatar: json.avatar_url,
            name: String(json.name ?? json.login ?? githubUsername),
            followers: Number(json.followers ?? 0),
            repos: Number(json.public_repos ?? 0),
          });
        }
      } catch {
        /* offline / rate-limit — kartu profil disembunyikan, bukan error */
      } finally {
        clearTimeout(timer);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const stats = useMemo(() => {
    if (!days.length) return { total: 0, streak: 0, best: null as Day | null, active: 0 };
    const total = days.reduce((a, d) => a + d.count, 0);
    const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);
    const active = days.filter((d) => d.count > 0).length;
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) streak++;
      else if (i !== days.length - 1) break;
    }
    return { total, streak, best, active };
  }, [days]);

  // Angka tween — mulai saat kartu terlihat, morph halus saat data live tiba
  const totalAnim = useCountUp(stats.total, inView);
  const streakAnim = useCountUp(stats.streak, inView);
  const bestAnim = useCountUp(stats.best?.count ?? 0, inView);
  const activeAnim = useCountUp(stats.active, inView);
  const followersAnim = useCountUp(profile?.followers ?? 0, inView);
  const reposAnim = useCountUp(profile?.repos ?? 0, inView);

  const weeks = useMemo(() => {
    const out: Day[][] = [];
    for (let i = 0; i < days.length; i += 7) out.push(days.slice(i, i + 7));
    return out;
  }, [days]);

  const monthLabels = useMemo(() => {
    // label bulan muncul di minggu pertama tiap bulan
    const labels: { weekIdx: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((w, wi) => {
      const first = w[0];
      if (!first) return;
      const m = new Date(first.date + "T00:00:00").getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        labels.push({
          weekIdx: wi,
          label: new Date(first.date + "T00:00:00").toLocaleString(
            lang === "id" ? "id-ID" : "en-US",
            { month: "short" }
          ),
        });
      }
    });
    return labels;
  }, [weeks, lang]);

  const fmtDate = useCallback(
    (iso: string) =>
      new Date(iso + "T00:00:00").toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [lang]
  );

  const locale = lang === "id" ? "id-ID" : "en-US";
  // Stabil untuk HeatCell yang dimemo — tanpa ini tiap hover bikin 371 sel re-render
  const handleCellHover = useCallback((d: Day | null) => setHover(d), []);
  const statCards: { icon: ReactNode; value: string; label: string; hot?: boolean }[] = [
    {
      icon: <Sparkles className="w-3.5 h-3.5" />,
      value: totalAnim.toLocaleString(locale),
      label: t.github.total,
    },
    {
      icon: <Flame className="w-3.5 h-3.5" />,
      value: String(streakAnim),
      label: t.github.streak,
      hot: stats.streak > 0,
    },
    {
      icon: <Trophy className="w-3.5 h-3.5" />,
      value: String(bestAnim),
      label: t.github.bestDay,
    },
    {
      icon: <CalendarDays className="w-3.5 h-3.5" />,
      value: String(activeAnim),
      label: t.github.activeDays,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springConfig, delay: 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        isDark
          ? "border-white/10 bg-neutral-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
      )}
    >
      {/* glow + grid dekorasi */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(600px_200px_at_20%_0%,rgba(255,255,255,0.08),transparent),radial-gradient(500px_200px_at_90%_100%,rgba(255,255,255,0.05),transparent)]"
            : "bg-[radial-gradient(600px_200px_at_20%_0%,rgba(0,0,0,0.06),transparent),radial-gradient(500px_200px_at_90%_100%,rgba(0,0,0,0.04),transparent)]"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[3px]",
          isDark
            ? "bg-gradient-to-r from-transparent via-white/70 to-transparent"
            : "bg-gradient-to-r from-transparent via-black/70 to-transparent"
        )}
      />

      {/* Kartu profil GitHub — avatar + nama + followers + repo, klik → profil */}
      {profile ? (
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex items-center gap-3 border-b px-5 sm:px-6 py-4 transition-colors",
            isDark
              ? "border-white/10 hover:bg-white/[0.04]"
              : "border-neutral-200 hover:bg-neutral-50"
          )}
          aria-label={`${t.github.viewProfile} @${githubUsername}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={`@${githubUsername}`}
            width={44}
            height={44}
            loading="lazy"
            draggable={false}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20"
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "truncate font-black text-[14px] tracking-tight leading-none",
                isDark ? "text-white" : "text-neutral-900"
              )}
            >
              {profile.name}
            </p>
            <p className={cn("mt-1 text-[11px] font-semibold", isDark ? "text-white/50" : "text-neutral-500")}>
              @{githubUsername}
            </p>
            <div
              className={cn(
                "mt-1.5 flex items-center gap-3 text-[11px] font-bold tabular-nums",
                isDark ? "text-white/60" : "text-neutral-500"
              )}
            >
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" />
                {followersAnim.toLocaleString(locale)} {t.github.followers}
              </span>
              <span>
                {reposAnim.toLocaleString(locale)} {t.github.repositories}
              </span>
            </div>
          </div>
          <ArrowUpRight
            className={cn("w-4 h-4 shrink-0", isDark ? "text-white/40" : "text-neutral-400")}
          />
        </a>
      ) : null}

      <div className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={cn(
                  "p-2.5 rounded-xl border",
                  isDark ? "bg-white text-black border-white" : "bg-black text-white border-black"
                )}
              >
                <Github className="w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                {status === "loading" ? (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                ) : null}
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-3 w-3 border-2 border-white dark:border-neutral-900",
                    status === "preview" ? "bg-amber-400" : "bg-emerald-500"
                  )}
                />
              </span>
            </div>
            <div>
              <h3
                className={cn(
                  "font-black text-[15px] tracking-tight leading-none",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                @{githubUsername}
              </h3>
              {status === "loading" ? (
                <p
                  className={cn(
                    "mt-1 flex items-center gap-1 text-[11px] font-medium",
                    isDark ? "text-white/50" : "text-neutral-500"
                  )}
                >
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t.github.syncing}
                </p>
              ) : (
                <p className={cn("mt-1 text-[11px] font-medium", isDark ? "text-white/50" : "text-neutral-500")}>
                  {t.github.contributions} · {t.github.lastYear}
                </p>
              )}
              {status === "preview" ? (
                <p
                  className={cn(
                    "mt-1 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-black tracking-[0.12em] uppercase",
                    isDark ? "bg-amber-400/15 text-amber-300" : "bg-amber-100 text-amber-700"
                  )}
                >
                  {t.github.preview}
                </p>
              ) : null}
            </div>
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.github.viewProfile} @${githubUsername}`}
            className={cn(
              "group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-black tracking-wider transition-all duration-200 ease-out hover:-translate-y-0.5",
              isDark
                ? "bg-white text-black hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)]"
                : "bg-black text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            )}
          >
            {t.github.profile}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Stat cards */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: 0.15 + i * 0.06 }}
              className={cn(
                "rounded-xl border px-3 py-2.5 transition-all duration-200 ease-out hover:-translate-y-0.5",
                isDark
                  ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                  : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-black tracking-[0.14em] uppercase",
                  isDark ? "text-white/45" : "text-neutral-500"
                )}
              >
                {s.icon}
                {s.label}
              </div>
              <div
                className={cn(
                  "mt-0.5 font-black text-[20px] leading-none tracking-tight tabular-nums",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                {s.value}
                {s.hot ? <span className="ml-1 text-[14px]">🔥</span> : null}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heatmap — selalu ada isi sejak paint pertama */}
        <div
          className={cn(
            "relative mt-4 rounded-xl border p-3 sm:p-4",
            isDark ? "border-white/10 bg-black/40" : "border-neutral-200 bg-neutral-50/80"
          )}
        >
          {status === "loading" ? (
            <div
              aria-hidden
              className={cn(
                "absolute inset-x-4 top-0 h-[2px] overflow-hidden rounded-full",
                isDark ? "bg-white/10" : "bg-neutral-200"
              )}
            >
              <div className={cn("gh-shimmer h-full w-1/3 rounded-full", isDark ? "bg-white/70" : "bg-neutral-700")} />
            </div>
          ) : null}

          {/* label bulan */}
          <div className="overflow-x-auto pb-1">
            <div className="min-w-[760px] relative ml-[26px]">
              {monthLabels.map((m) => (
                <span
                  key={`${m.weekIdx}-${m.label}`}
                  style={{ left: m.weekIdx * 15 }}
                  className={cn(
                    "absolute top-0 text-[10px] font-bold capitalize",
                    isDark ? "text-white/40" : "text-neutral-400"
                  )}
                >
                  {m.label}
                </span>
              ))}
              <div className="h-4" />
            </div>
          </div>

          <div ref={gridRef} className="flex gap-1 overflow-x-auto pb-1">
            {/* label hari */}
            <div className="flex flex-col gap-[3px] mr-1 shrink-0 pt-0">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-[11px] sm:h-[12px] text-[9px] font-bold leading-[11px] w-[22px]",
                    isDark ? "text-white/30" : "text-neutral-400"
                  )}
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="flex gap-[3px] min-w-[720px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <HeatCell
                      key={`${day.date}-${di}`}
                      day={day}
                      isDark={isDark}
                      labelOnDate={t.github.onDate}
                      fmtDate={fmtDate}
                      playWave={playWave}
                      revealed={revealed}
                      animDelay={`${Math.min(wi * 14 + di * 6, 650)}ms`}
                      onHover={handleCellHover}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* footer: legend + hover info */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p
              className={cn(
                "text-[11px] font-semibold tabular-nums min-h-[18px]",
                isDark ? "text-white/60" : "text-neutral-500"
              )}
            >
              {(hover ?? stats.best)
                ? `${hover?.count ?? stats.best?.count ?? 0} ${t.github.onDate} ${fmtDate(
                    hover?.date ?? stats.best?.date ?? days[days.length - 1]?.date ?? ""
                  )}`
                : " "}
            </p>
            <div className="flex items-center gap-1.5">
              <span className={cn("text-[10px] font-bold", isDark ? "text-white/40" : "text-neutral-400")}>
                {t.github.less}
              </span>
              {([0, 1, 2, 3, 4] as Day["level"][]).map((l) => (
                <span
                  key={l}
                  className={cn("h-[10px] w-[10px] rounded-[3px]", cellClass(isDark, l))}
                />
              ))}
              <span className={cn("text-[10px] font-bold", isDark ? "text-white/40" : "text-neutral-400")}>
                {t.github.more}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
