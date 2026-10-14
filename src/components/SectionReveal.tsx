"use client";

import React from "react";
import { motion } from "motion/react";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export function SectionReveal({
  children,
  delay = 0,
  className = "",
  id,
}: SectionRevealProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
