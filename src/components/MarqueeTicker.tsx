"use client";

import React from "react";

const TICKER_ITEMS = [
  "Fresh Farm Picks",
  "Miss NuTri Granola",
  "Nourish Yogurt",
  "Ceylon Coconut Company",
  "Momiji Natural",
  "Dewata Market",
  "Galle Fort Boutique",
  "Sunpower Super Ahangama",
  "Natural Living",
  "Southern Coast Produce",
];

export function MarqueeTicker() {
  return (
    <div className="bg-cream-dark py-4 border-y border-cream-border/70 overflow-hidden select-none group">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* First track */}
        <div className="flex items-center gap-8 px-4 text-[11px] uppercase tracking-[0.22em] font-medium text-forest/90 whitespace-nowrap">
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              <span className="text-sun-terracotta text-sm">✳</span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div
          className="flex items-center gap-8 px-4 text-[11px] uppercase tracking-[0.22em] font-medium text-forest/90 whitespace-nowrap"
          aria-hidden="true"
        >
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span>{item}</span>
              <span className="text-sun-terracotta text-sm">✳</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
