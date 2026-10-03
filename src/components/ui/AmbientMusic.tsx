"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls, useReducedMotion } from "framer-motion";
import { Music, Pause, Play, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const tracks = [
  {
    id: "into-you",
    name: "Into You — Ariana Grande",
    url: "/Ariana%20Grande-Into%20You.mp3",
  },
  {
    id: "bye",
    name: "Bye — Ariana Grande",
    url: "/bye%20-%20Ariana%20Grande.mp3",
  },
];

export function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showPanel, setShowPanel] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantPlayRef = useRef(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const reduce = useReducedMotion();
  const playControls = useAnimationControls();

  // Tutup panel otomatis saat user scroll jauh supaya tidak menutupi
  // konten / form kontak di mobile.
  useEffect(() => {
    if (!showPanel) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) setShowPanel(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showPanel]);

  // Rasa clingy/kenyal di tombol play: ikon memantul squash-and-stretch.
  // Dijalankan manual via controls (bukan keyframe di whileTap) supaya tidak
  // berebut transform dengan animasi scale tombolnya.
  const clingy = () => {
    if (reduce) return;
    playControls.start({
      scaleX: [1, 1.35, 0.85, 1.12, 1],
      scaleY: [1, 0.72, 1.2, 0.93, 1],
      rotate: [0, -10, 7, -3, 0],
      transition: { duration: 0.45, ease: "easeOut" },
    });
  };

  // Terapkan volume setiap berubah
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Ganti lagu: kalau niatnya bunyi, muat + putar src baru
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !wantPlayRef.current) return;
    wantPlayRef.current = false;
    el.load();
    el.volume = volume;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const startPlay = () => {
    const el = audioRef.current;
    if (!el) return;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    clingy();
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      startPlay();
    }
  };

  const selectTrack = (i: number) => {
    clingy();
    if (i === currentTrack) {
      const el = audioRef.current;
      if (el) {
        el.currentTime = 0;
        startPlay();
      }
      return;
    }
    wantPlayRef.current = true;
    setPlaying(true);
    setCurrentTrack(i);
  };

  const nextTrack = () => selectTrack((currentTrack + 1) % tracks.length);
  const prevTrack = () =>
    selectTrack((currentTrack - 1 + tracks.length) % tracks.length);

  const handleEnded = () => {
    wantPlayRef.current = true;
    setPlaying(true);
    setCurrentTrack((i) => (i + 1) % tracks.length);
  };

  const handleClose = () => {
    wantPlayRef.current = false;
    audioRef.current?.pause();
    setPlaying(false);
    setShowPanel(false);
  };

  return (
    <div className="fixed z-40 bottom-20 left-4 sm:bottom-6 sm:left-6 sm:z-50">
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        preload="auto"
        onEnded={handleEnded}
        className="hidden"
      />

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
            className={cn(
              "absolute bottom-full mb-3 left-0 w-[min(16rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-2xl p-4 border shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
              isDark ? "bg-neutral-900 border-white/10" : "bg-white border-neutral-300"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={cn(
                  "text-[10px] font-bold tracking-[0.2em] uppercase",
                  isDark ? "text-white/50" : "text-neutral-500"
                )}
              >
                Playlist
              </span>
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  "w-7 h-7 grid place-items-center rounded-full",
                  isDark
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                )}
                aria-label="Berhenti dan tutup musik"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={cn("truncate text-[13px] font-bold mb-3", isDark ? "text-white" : "text-neutral-800")}>
              {tracks[currentTrack].name}
            </p>

            <div className="flex items-center justify-center gap-2 mb-3">
              <motion.button
                type="button"
                onClick={prevTrack}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className={cn(
                  "w-10 h-10 grid place-items-center rounded-full",
                  isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                )}
                aria-label="Lagu sebelumnya"
              >
                <SkipBack className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={togglePlay}
                whileTap={reduce ? undefined : { scale: 0.85 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className={cn(
                  "w-12 h-12 grid place-items-center rounded-full",
                  isDark ? "bg-white text-black" : "bg-neutral-900 text-white"
                )}
                aria-label={playing ? "Pause" : "Putar"}
              >
                <motion.span animate={playControls} className="grid place-items-center">
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-[1px]" />}
                </motion.span>
              </motion.button>
              <motion.button
                type="button"
                onClick={nextTrack}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className={cn(
                  "w-10 h-10 grid place-items-center rounded-full",
                  isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                )}
                aria-label="Lagu berikutnya"
              >
                <SkipForward className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-1 mb-3">
              {tracks.map((track, i) => (
                <button
                  type="button"
                  key={track.id}
                  onClick={() => selectTrack(i)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[12px] font-bold",
                    i === currentTrack
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-neutral-800 text-white"
                      : isDark
                        ? "text-white/50 hover:text-white hover:bg-white/5"
                        : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
                  )}
                >
                  {i === currentTrack && playing ? (
                    <Pause className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Play className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span className="truncate">{track.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className={cn("w-4 h-4 shrink-0", isDark ? "text-neutral-400" : "text-neutral-600")} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1.5 cursor-pointer min-w-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setShowPanel((v) => !v)}
        whileTap={{ scale: 0.82 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 500, damping: 17 }}
        className={cn(
          "w-12 h-12 grid place-items-center rounded-xl border shadow-lg",
          isDark
            ? "bg-neutral-900 border-white/10 text-neutral-300 hover:bg-neutral-800"
            : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        )}
        aria-label={showPanel ? "Tutup panel musik" : "Buka panel musik"}
      >
        <Music className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
