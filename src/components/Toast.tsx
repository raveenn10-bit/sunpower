"use client";

import { useBasket } from "@/context/BasketContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";

export function Toast() {
  const { toastMessage } = useBasket();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 15, x: "-50%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          className="fixed bottom-7 left-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-forest text-cream text-xs font-medium tracking-wide shadow-2xl border border-cream/20 backdrop-blur-md"
        >
          <CheckCircle size={16} weight="fill" className="text-sun-orange flex-shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
