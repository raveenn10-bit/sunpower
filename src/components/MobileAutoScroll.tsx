"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface MobileAutoScrollProps {
  children: React.ReactNode[];
  desktopGridClassName?: string;
  autoScrollIntervalMs?: number;
}

export function MobileAutoScroll({
  children,
  desktopGridClassName = "grid grid-cols-1 md:grid-cols-3 gap-8",
  autoScrollIntervalMs = 3800,
}: MobileAutoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalItems = React.Children.count(children);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const childWidth = el.scrollWidth / totalItems;
    el.scrollTo({
      left: childWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, [totalItems]);

  // Track active slide on manual swipe
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = el.offsetWidth * 0.85;
    const current = Math.round(el.scrollLeft / itemWidth);
    setActiveIndex(Math.min(totalItems - 1, Math.max(0, current)));
  }, [totalItems]);

  // Mobile auto-scroll timer that pauses when touched or hovered
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      // Only auto-scroll on mobile screens (< 768px)
      if (typeof window !== "undefined" && window.innerWidth >= 768) return;

      const next = (activeIndex + 1) % totalItems;
      scrollToIndex(next);
    }, autoScrollIntervalMs);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, totalItems, autoScrollIntervalMs, scrollToIndex]);

  return (
    <div>
      {/* Desktop View: Grid layout */}
      <div className={`hidden md:${desktopGridClassName.replace(/^grid /, "")} md:grid`}>
        {children}
      </div>

      {/* Mobile View: Horizontal Auto-scrolling carousel with snap */}
      <div
        className="md:hidden relative"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 4000);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 scroll-smooth no-scrollbar"
        >
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[86vw] sm:w-[75vw] snap-center"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Mobile slide indicator dots */}
        <div className="flex items-center justify-center gap-1.5 pt-3">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-sun-orange"
                  : "w-1.5 bg-forest/20 hover:bg-forest/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
