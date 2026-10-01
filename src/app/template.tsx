"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener("welcome:done", onDone as EventListener);
    // fallback — kalau event terlewat (hot reload / navigasi internal), tetap reveal
    const t = setTimeout(() => setReady(true), 7000);
    return () => {
      window.removeEventListener("welcome:done", onDone as EventListener);
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 56, filter: "blur(10px)" }}
      animate={
        ready
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 56, filter: "blur(10px)" }
      }
      transition={
        ready
          ? {
              type: "spring",
              stiffness: 220,
              damping: 26,
              mass: 0.9,
              opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
            }
          : { duration: 0 }
      }
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}
