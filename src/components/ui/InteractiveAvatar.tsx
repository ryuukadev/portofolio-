"use client";

import { motion } from "framer-motion";

export function InteractiveAvatar() {
  return (
    <div className="relative mx-auto w-fit">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="relative"
      >
        <div className="absolute inset-0 blur-3xl opacity-20 scale-110 rounded-full -z-10 bg-white" />
        <div className="rounded-full p-[4px] bg-white" style={{ boxShadow: "6px 6px 0px rgba(0,0,0,0.12)" }}>
          <div className="w-[214px] h-[214px] sm:w-[240px] sm:h-[240px] rounded-full overflow-hidden bg-neutral-900 relative">
            <img
              src="/wahyu.png"
              alt="I Kadek Wahyu Arta Pratama"
              className="w-full h-full object-cover"
              style={{ objectPosition: "72% 38%" }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
