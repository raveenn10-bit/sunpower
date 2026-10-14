"use client";

import React, { useState, useEffect } from "react";
import { useBasket } from "@/context/BasketContext";
import { ShoppingBag } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingBasketPill() {
  const { totalCount, setIsDrawerOpen } = useBasket();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-forest text-cream text-xs font-semibold tracking-wide shadow-2xl border border-cream/20 hover:bg-forest-light hover:scale-105 active:scale-95 transition-all group backdrop-blur-md"
            aria-label={`Open inquiry list (${totalCount} items)`}
          >
            <div className="relative">
              <ShoppingBag
                size={18}
                weight="fill"
                className="text-sun-orange group-hover:scale-110 transition-transform"
              />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-sun-orange text-forest-dark text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="font-serif text-sm font-normal">Your Inquiry List</span>
            <span className="px-2 py-0.5 rounded-full bg-cream/15 text-[11px] font-mono">
              {totalCount}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
