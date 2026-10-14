"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FEATURED_MAKERS, WHATSAPP_INTL_NUMBER } from "@/data/products";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/SectionReveal";

export function MakersShowcase() {
  const [selectedMakerIndex, setSelectedMakerIndex] = useState(0);
  const activeMaker = FEATURED_MAKERS[selectedMakerIndex];

  return (
    <section className="bg-cream-dark/60 py-20 sm:py-28 border-b border-cream-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
                MEET OUR MAKERS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
                Curated brands.
                <br />
                <em className="italic font-normal">Thoughtful craftsmanship.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-forest/75 max-w-sm leading-relaxed">
              We partner with dedicated Sri Lankan producers and wholesome brands whose standards
              match our commitment to natural, quality living.
            </p>
          </div>
        </SectionReveal>

        {/* Maker Navigation Tabs */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap gap-2.5 pb-8 border-b border-cream-border" role="tablist">
            {FEATURED_MAKERS.map((maker, idx) => {
              const isSelected = selectedMakerIndex === idx;
              return (
                <button
                  key={maker.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedMakerIndex(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-forest text-cream shadow-md font-semibold"
                      : "bg-white/80 text-forest/75 hover:bg-white hover:text-forest border border-cream-border"
                  }`}
                >
                  <span>{maker.name}</span>
                  <span className="ml-2 text-[10px] opacity-60">({maker.origin})</span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Active Maker Spotlight Card with Animation */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMaker.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-cream rounded-2xl border border-cream-border shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Maker Visual */}
              <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] bg-forest">
                <Image
                  src={activeMaker.image}
                  alt={activeMaker.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-cream text-forest text-[10px] font-semibold tracking-wider uppercase shadow-sm">
                  {activeMaker.badge}
                </span>
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <span className="text-[10px] uppercase tracking-widest text-cream/70 font-mono">
                    {activeMaker.origin}
                  </span>
                  <h4 className="font-serif text-2xl text-cream font-medium">
                    {activeMaker.name}
                  </h4>
                </div>
              </div>

              {/* Maker Details */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sun-terracotta font-semibold block mb-2">
                    {activeMaker.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest leading-snug">
                    {activeMaker.headline}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-forest/75 leading-relaxed">
                  {activeMaker.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                      activeMaker.inquiryQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 px-6 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-all shadow-sm group"
                  >
                    <span>Inquire about {activeMaker.name}</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>

                  <span className="text-[11px] text-forest/50 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-forest/60" />
                    Available at selected branches
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
