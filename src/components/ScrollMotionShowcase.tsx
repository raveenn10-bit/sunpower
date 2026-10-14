"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollMotionShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Track 1 moves left on scroll down, right on scroll up
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  // Track 2 moves right on scroll down, left on scroll up
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <div
      ref={containerRef}
      className="py-8 sm:py-16 lg:py-20 bg-forest text-cream overflow-hidden select-none border-y border-forest-muted relative"
    >
      {/* Top Kinetic Row: Leftwards Drift */}
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-5 sm:gap-8 mb-2.5 sm:mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-5 sm:gap-8 font-serif text-2xl sm:text-4xl lg:text-6xl text-cream/90 tracking-tight"
          >
            <span>FARM FRESH</span>
            <span className="text-sun-orange text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span className="italic text-cream-dark">DEWATA</span>
            <span className="text-sun-orange text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span>GALLE FORT</span>
            <span className="text-sun-orange text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span className="italic text-cream-dark">AHANGAMA</span>
            <span className="text-sun-orange text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span>HONEST NOURISHMENT</span>
            <span className="text-sun-orange text-lg sm:text-2xl sm:text-3xl">✳</span>
          </div>
        ))}
      </motion.div>

      {/* Bottom Kinetic Row: Rightwards Drift */}
      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-5 sm:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-5 sm:gap-8 font-serif text-2xl sm:text-4xl lg:text-6xl text-cream/70 tracking-tight"
          >
            <span className="italic text-sun-gold">PURE LIVING</span>
            <span className="text-sun-terracotta text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span>SOURDOUGH & GRANOLA</span>
            <span className="text-sun-terracotta text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span className="italic text-sun-gold">HEIRLOOM RICE</span>
            <span className="text-sun-terracotta text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span>NOURISH YOGURT</span>
            <span className="text-sun-terracotta text-lg sm:text-2xl sm:text-3xl">✳</span>
            <span className="italic text-sun-gold">SOUTHERN SOIL</span>
            <span className="text-sun-terracotta text-lg sm:text-2xl sm:text-3xl">✳</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
