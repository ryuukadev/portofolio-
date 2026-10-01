"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, Volume2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { springConfig } from "@/lib/utils";

const ambientTracks = [
  {
    id: "lofi",
    name: "Lo-Fi Chill",
    url: "https://www.soundhe.com/ambient-chill/relaxing-lofi-chill.mp3",
  },
  {
    id: "rain",
    name: "Rainy Window",
    url: "https://www.soundhe.com/ambient-chill/rain-on-window.mp3",
  },
  {
    id: "piano",
    name: "Late Night Piano",
    url: "https://www.soundhe.com/ambient-chill/late-night-piano.mp3",
  },
];

export function AmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [showPanel, setShowPanel] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    // Re-create audio element only when track changes or component mounts
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(ambientTracks[currentTrack].url);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const togglePlay = () => setPlaying(!playing);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Panel musik */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ ...springConfig }}
            className={cn(
              "absolute bottom-full mb-4 left-0 w-64 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border",
              isDark
                ? "bg-neutral-900/95 border-white/10"
                : "bg-white border-neutral-300"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-xl grid place-items-center", isDark ? "bg-white/10" : "bg-neutral-100")}>
                <Music className={cn("w-5 h-5", isDark ? "text-neutral-300" : "text-neutral-700")} />
              </div>
              <div>
                <h4 className={cn("text-[13px] font-black", isDark ? "text-white" : "text-neutral-800")}>
                  Ambient Playlist
                </h4>
                <p className={cn("text-[11px]", isDark ? "text-white/50" : "text-neutral-500")}>
                  {ambientTracks[currentTrack].name}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Play/pause */}
              <motion.button
                onClick={togglePlay}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-black transition-all",
                  playing
                    ? isDark
                      ? "bg-white/10 hover:bg-white/15 text-neutral-300"
                      : "bg-neutral-200 hover:bg-neutral-300 text-neutral-800"
                    : "bg-neutral-300 hover:bg-neutral-400 text-neutral-800 shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
                )}
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {playing ? "Pause" : "Play"}
              </motion.button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Volume2 className={cn("w-4 h-4", isDark ? "text-neutral-400" : "text-neutral-600")} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={cn(
          "w-12 h-12 grid place-items-center rounded-xl border shadow-[4px_4px_0px_rgba(0,0,0,0.15)] transition-all",
          isDark
            ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
            : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-200",
          playing && isDark && "bg-neutral-300 text-neutral-800"
        )}
        aria-label={playing ? "Pause musik" : "Putar musik"}
      >
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: "linear" }}
        >
          <Music className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
}
