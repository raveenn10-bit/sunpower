"use client";

import React, { useState } from "react";
import { STORES } from "@/data/products";
import { ArrowUpRight, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/SectionReveal";

export function CoastalRouteExplorer() {
  const [activeStoreId, setActiveStoreId] = useState(STORES[0].id);
  const currentStore = STORES.find((s) => s.id === activeStoreId) || STORES[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 lg:py-28 border-b border-cream-border">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-2 sm:space-y-3">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
              COASTAL JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-forest leading-tight">
              Along the southern route.
              <br />
              <em className="italic font-normal">Three stops to discover.</em>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forest/75 max-w-sm leading-relaxed">
            From the bustling harbour curve of Dewata and the historic cobblestones of Galle Fort,
            down to the coastal surf line of Ahangama.
          </p>
        </div>
      </SectionReveal>

      {/* Visual Road / Corridor Ribbon */}
      <SectionReveal delay={0.1}>
        {/* Mobile Segmented Stop Selector (Replaces vertical tower on mobile) */}
        <div className="md:hidden mb-5">
          <div className="flex bg-cream-card/90 p-1.5 rounded-xl border border-cream-border gap-1.5 shadow-xs">
            {STORES.map((store, idx) => {
              const isActive = store.id === activeStoreId;
              const shortName = idx === 0 ? "Dewata" : idx === 1 ? "Galle Fort" : "Ahangama";
              return (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => setActiveStoreId(store.id)}
                  className={`flex-1 py-2 px-1 rounded-lg text-center transition-all duration-200 relative ${
                    isActive
                      ? "text-cream font-medium"
                      : "text-forest/75 hover:text-forest hover:bg-white/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-route-indicator"
                      className="absolute inset-0 bg-forest rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="block text-[9px] uppercase tracking-wider font-mono opacity-80 relative z-10">
                    Stop 0{idx + 1}
                  </span>
                  <span className="block text-xs font-serif font-medium truncate mt-0.5 relative z-10">
                    {shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop 3-Card Grid (Hidden on mobile to eliminate huge stacked tower) */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-8">
          {STORES.map((store, idx) => {
            const isActive = store.id === activeStoreId;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveStoreId(store.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "bg-forest text-cream border-forest shadow-lg"
                    : "bg-cream-card/60 text-forest border-cream-border hover:bg-cream-card"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[9px] uppercase tracking-widest font-mono ${
                      isActive ? "text-cream/70" : "text-forest/50"
                    }`}
                  >
                    Stop {idx + 1}
                  </span>
                  <MapPin
                    size={18}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-sun-orange" : "text-forest/40"}
                  />
                </div>

                <h3
                  className={`font-serif text-2xl font-medium mb-1 ${
                    isActive ? "text-cream" : "text-forest"
                  }`}
                >
                  {store.name}
                </h3>
                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    isActive ? "text-cream/80" : "text-forest/70"
                  }`}
                >
                  {store.notes}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="active-indicator-border"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-sun-orange"
                  />
                )}
              </button>
            );
          })}
        </div>
      </SectionReveal>

      {/* Active Branch Interactive Details Sheet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStore.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="bg-cream rounded-2xl border border-cream-border p-4 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cream-sage text-forest text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase">
              <span>{currentStore.tag}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest font-medium mb-1.5 sm:mb-2">
                {currentStore.label}
              </h3>
              <p className="text-xs sm:text-sm text-forest/75 leading-relaxed">
                {currentStore.vibe}
              </p>
            </div>

            <div className="text-xs text-forest/80 space-y-1 pt-2 border-t border-cream-border/60">
              <span className="font-semibold text-forest uppercase text-[9px] sm:text-[10px] tracking-wider block mb-1">
                Address
              </span>
              {currentStore.address.map((line, i) => (
                <span key={i} className="block text-xs">
                  {line}
                </span>
              ))}
            </div>

            <p className="text-[10px] sm:text-[11px] text-forest/60 italic">
              {currentStore.timingNote}
            </p>
          </div>

          <div className="lg:col-span-5 bg-cream-card/70 rounded-xl p-4 sm:p-6 border border-cream-border space-y-3 sm:space-y-4">
            <h4 className="font-serif text-base sm:text-lg text-forest font-medium">Quick Branch Actions</h4>

            <div className="space-y-2 sm:space-y-2.5">
              <a
                href={currentStore.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-cream-border text-xs font-semibold text-forest hover:border-forest transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <MapPin size={16} className="text-sun-terracotta" />
                  <span>Open in Google Maps</span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              {currentStore.telephone && (
                <a
                  href={`tel:+94${currentStore.telephone.replace(/\s+/g, "").slice(1)}`}
                  className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-cream-border text-xs font-semibold text-forest hover:border-forest transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Phone size={16} className="text-forest" />
                    <span>Call {currentStore.telephone}</span>
                  </div>
                  <ArrowUpRight size={14} />
                </a>
              )}

              <a
                href={`https://wa.me/${currentStore.whatsappNumber}?text=Hi%20Sunpower%2C%20I%20have%20an%20inquiry%20for%20your%20${encodeURIComponent(
                  currentStore.name
                )}%20store.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-forest text-cream text-xs font-semibold hover:bg-forest-light transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <WhatsappLogo size={16} weight="fill" className="text-sun-orange" />
                  <span>Direct WhatsApp to Store</span>
                </div>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
