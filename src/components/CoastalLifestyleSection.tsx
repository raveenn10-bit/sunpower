"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkle, Waves, BowlFood, Coffee, Plant } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";
import { motion, AnimatePresence } from "motion/react";

const LIFESTYLE_PILLARS = [
  {
    id: "surf-recovery",
    icon: <Waves size={20} weight="bold" />,
    title: "Post-Surf Recovery",
    tag: "AHANGAMA & DEWATA BREAKS",
    description:
      "Crafted for wave riders and beach runners. European-style sourdough breads, stone-ground peanut butter, raw kombucha, chia seeds, and protein bowls to refuel after dawn patrol at Kabalana or Closenberg.",
    image: "/assets/breakfast.jpg",
    highlights: ["European Artisan Sourdough", "Stone-ground Nut Butters", "Raw Live Kombucha & Kefir"],
    inquiry: "Hi Sunpower, what fresh sourdough, kombucha and post-surf snacks are in stock today?",
  },
  {
    id: "heirloom-grains",
    icon: <BowlFood size={20} weight="bold" />,
    title: "Ancient Heirloom Rice",
    tag: "DESHIYA WEE HERITAGE",
    description:
      "Honouring centuries of Sri Lankan agricultural wisdom. Nutrient-rich heritage rice varieties including Suwandel (aromatic & radiant), Kalu Heenati (iron-dense), and Pachchaperumal (antioxidant powerhouse).",
    image: "/assets/market.jpg",
    highlights: ["Fragrant Suwandel Rice", "Iron-rich Kalu Heenati", "Antioxidant Pachchaperumal"],
    inquiry: "Hi Sunpower, do you have traditional Sri Lankan heirloom rice (Suwandel, Kalu Heenati) available?",
  },
  {
    id: "coastal-dairy",
    icon: <Coffee size={20} weight="bold" />,
    title: "Dairy & Barista Pantry",
    tag: "PROBIOTICS & PLANT MILKS",
    description:
      "From creamy Nourish probiotic pot-set yogurt to barista-grade oat, almond, and fresh farm milk. Perfect for morning smoothie bowls, golden flat whites, and restorative coastal breakfasts.",
    image: "/assets/breakfast.jpg",
    highlights: ["Nourish Probiotic Yogurt", "Barista Oat & Almond Milks", "Pure Ceylon Coconut Creams"],
    inquiry: "Hi Sunpower, please share your current yogurt and plant milk selections.",
  },
  {
    id: "zero-waste",
    icon: <Plant size={20} weight="bold" />,
    title: "Natural Wellness & Living",
    tag: "ECO-FRIENDLY & PURE",
    description:
      "Gentle everyday goods that respect the island. Zero-waste lifestyle essentials by Momiji Natural, pure low-GI Kitul treacle, raw dry-zone forest honey, and non-toxic personal care.",
    image: "/assets/produce.jpg",
    highlights: ["Momiji Natural Reusable Care", "Pure Forest Bee Honey", "Unrefined Kitul Treacle"],
    inquiry: "Hi Sunpower, what natural wellness and honey products are currently in store?",
  },
];

export function CoastalLifestyleSection() {
  const [activePillarId, setActivePillarId] = useState(LIFESTYLE_PILLARS[0].id);
  const activePillar = LIFESTYLE_PILLARS.find((p) => p.id === activePillarId) || LIFESTYLE_PILLARS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 lg:py-28 border-b border-cream-border">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase">
              <Sparkle size={13} weight="fill" className="text-sun-terracotta" />
              <span>SOUTHERN COASTAL LIVING</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-forest leading-tight">
              From soil to surf.
              <br />
              <em className="italic font-normal">A pantry for coastal days.</em>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forest/75 max-w-sm leading-relaxed">
            Sunpower connects the morning surf breaks of Ahangama and Dewata with the heritage
            bounty of local Sri Lankan farmers.
          </p>
        </div>
      </SectionReveal>

      {/* Interactive Tabs */}
      <SectionReveal delay={0.1}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {LIFESTYLE_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-3.5 sm:p-5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-forest text-cream border-forest shadow-md"
                    : "bg-cream-card/60 text-forest border-cream-border hover:bg-cream-card"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2.5 sm:mb-3 ${
                    isActive ? "bg-cream text-forest" : "bg-white text-forest/80 shadow-sm"
                  }`}
                >
                  {pillar.icon}
                </div>
                <div>
                  <span
                    className={`text-[8px] sm:text-[8.5px] uppercase tracking-wider block font-semibold mb-1 ${
                      isActive ? "text-sun-gold" : "text-forest/50"
                    }`}
                  >
                    {pillar.tag}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg lg:text-xl font-medium leading-snug">
                    {pillar.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </SectionReveal>

      {/* Active Tab Spotlight with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-cream rounded-2xl border border-cream-border p-4 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          <div className="lg:col-span-6 relative h-[220px] sm:h-[320px] lg:h-[400px] rounded-xl overflow-hidden shadow-inner bg-cream-border/20">
            <Image
              src={activePillar.image}
              alt={activePillar.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-cream">
              <span className="text-[9px] uppercase tracking-widest text-sun-gold font-mono block">
                {activePillar.tag}
              </span>
              <h4 className="font-serif text-2xl text-cream font-medium">
                {activePillar.title}
              </h4>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-sun-terracotta block">
                CURATED SELECTION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
                {activePillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
                {activePillar.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-cream-border/60">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-forest/60 block">
                Key Market Selections
              </span>
              <div className="flex flex-wrap gap-2">
                {activePillar.highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-cream-sage text-forest text-xs font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                  activePillar.inquiry
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-all shadow-sm group"
              >
                <span>Ask about {activePillar.title}</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
