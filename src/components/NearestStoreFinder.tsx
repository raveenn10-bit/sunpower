"use client";

import React, { useState } from "react";
import { STORES, WHATSAPP_INTL_NUMBER } from "@/data/products";
import { MapPin, Phone, ArrowUpRight, NavigationArrow, Clock } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/SectionReveal";

const USER_AREAS = [
  {
    label: "Galle Fort & Old Town",
    towns: "Leyn Baan St, Lighthouse, Ramparts, Dutch Hospital",
    recommendedStoreId: "galle-fort",
    distNote: "Walking distance inside the historic fort",
  },
  {
    label: "Dewata, Unawatuna & Galle Beach",
    towns: "Matara Road, Closenberg, Surf Point, Galle Harbour",
    recommendedStoreId: "dewata",
    distNote: "Directly on Matara Road, easy roadside parking",
  },
  {
    label: "Ahangama, Kabalana & Weligama",
    towns: "The Rock, Midigama, Kathaluwa, Gurubebila",
    recommendedStoreId: "ahangama",
    distNote: "Central coastal supermarket next to main surf hubs",
  },
];

export function NearestStoreFinder() {
  const [selectedAreaIndex, setSelectedAreaIndex] = useState(0);
  const currentArea = USER_AREAS[selectedAreaIndex];
  const recommendedStore =
    STORES.find((s) => s.id === currentArea.recommendedStoreId) || STORES[0];

  return (
    <section className="bg-cream py-12 sm:py-20 lg:py-28 border-b border-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="space-y-2 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
                FIND YOUR LOCAL HUB
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-forest leading-tight">
                Where are you staying?
                <br />
                <em className="italic font-normal">Find your nearest Sunpower.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-forest/75 max-w-sm leading-relaxed">
              Select your location along the southern coast to find the closest store, directions, and
              direct team contact.
            </p>
          </div>
        </SectionReveal>

        {/* Location selector pills */}
        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            {USER_AREAS.map((area, idx) => {
              const isSelected = selectedAreaIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedAreaIndex(idx)}
                  className={`p-3.5 sm:p-5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-forest text-cream border-forest shadow-md"
                      : "bg-cream-card/60 text-forest border-cream-border hover:bg-cream-card"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <NavigationArrow
                      size={15}
                      weight={isSelected ? "fill" : "regular"}
                      className={isSelected ? "text-sun-orange" : "text-forest/40"}
                    />
                    <h3 className="font-serif text-base sm:text-lg font-medium">{area.label}</h3>
                  </div>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed ${
                      isSelected ? "text-cream/75" : "text-forest/60"
                    }`}
                  >
                    {area.towns}
                  </p>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Recommendation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={recommendedStore.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-8 lg:p-10 rounded-2xl bg-cream-sage/70 border border-cream-border shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-sun-terracotta">
                <MapPin size={15} weight="fill" />
                <span>RECOMMENDED OUTLET: {recommendedStore.name}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest font-medium">
                {recommendedStore.label}
              </h3>

              <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
                {currentArea.distNote}. {recommendedStore.vibe}
              </p>

              <div className="space-y-1 text-xs text-forest/80 pt-2 border-t border-cream-border/60">
                <span className="font-semibold block text-[9px] sm:text-[10px] uppercase tracking-wider text-forest/60">
                  Address
                </span>
                {recommendedStore.address.map((line, i) => (
                  <span key={i} className="block text-xs">
                    {line}
                  </span>
                ))}
              </div>

              {recommendedStore.id === "ahangama" && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cream text-forest text-xs font-medium">
                  <Clock size={13} className="text-sun-terracotta" />
                  <span>Open Daily: 9:00 AM – 8:30 PM</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-cream p-4 sm:p-6 rounded-xl border border-cream-border space-y-2.5 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-forest/60 block">
                Quick Actions
              </span>

              <a
                href={recommendedStore.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-cream-border text-xs font-semibold text-forest hover:border-forest transition-colors shadow-sm"
              >
                <span>Get Google Maps Route</span>
                <ArrowUpRight size={14} />
              </a>

              {recommendedStore.telephone && (
                <a
                  href={`tel:+94${recommendedStore.telephone.replace(/\s+/g, "").slice(1)}`}
                  className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-white border border-cream-border text-xs font-semibold text-forest hover:border-forest transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>Call {recommendedStore.telephone}</span>
                  </div>
                  <ArrowUpRight size={14} />
                </a>
              )}

              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower%2C%20I%20am%20near%20${encodeURIComponent(
                  currentArea.label
                )}%20and%20would%20like%20to%20visit%20${encodeURIComponent(
                  recommendedStore.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded bg-forest text-cream text-xs font-semibold hover:bg-forest-light transition-colors shadow-sm"
              >
                <span>Direct WhatsApp Inquiry</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
