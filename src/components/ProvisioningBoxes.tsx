"use client";

import React from "react";
import { ArrowUpRight, Sparkle, Check } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";
import { MobileAutoScroll } from "@/components/MobileAutoScroll";

const PROVISIONING_BUNDLES = [
  {
    id: "surfer-morning",
    name: "The Surfer & Nomad Morning Crate",
    tag: "MOST POPULAR IN AHANGAMA",
    subtitle: "Fuel for dawn patrol surf sessions & breezy mornings.",
    items: [
      "Artisan Sourdough Loaf (Daily Baked)",
      "Miss NuTri Granola (Peanut Butter or Toasted Cacao)",
      "Nourish Probiotic Yogurt Jar",
      "Fresh Tropical Fruit Basket (Papaya, Passionfruit, Bananas)",
      "100% Pure King Coconut Water",
    ],
    idealFor: "Surf houses, digital nomads & beachside apartments.",
    inquiryText:
      "Hello Sunpower! I would like to inquire about ordering 'The Surfer & Nomad Morning Crate'. Please confirm current availability and pricing.",
  },
  {
    id: "garden-fresh",
    name: "The Farm-Fresh Garden Crate",
    tag: "CLEAN GREEN & CHEMICAL-FREE",
    subtitle: "Crisp microgreens, greenhouse greens & organic farm eggs.",
    items: [
      "Hydroponic Salad Greens & Wild Rocket",
      "Fresh Nutrient-dense Microgreens (Radish / Pea Shoots)",
      "Aromatic Fresh Herbs (Sweet Basil, Mint, Coriander)",
      "Vine-ripened Local Tomatoes & Cucumbers",
      "Free-range Country Eggs (Gam Kukul Biththara)",
    ],
    idealFor: "Villas with private chefs, families & conscious cooks.",
    inquiryText:
      "Hello Sunpower! I would like to inquire about 'The Farm-Fresh Garden Crate'. Please let me know what greens and herbs you have in stock today.",
  },
  {
    id: "ceylon-heritage",
    name: "The Ceylon Heritage Pantry Set",
    tag: "SOUTHERN ISLAND TREASURES",
    subtitle: "Ancient heirloom rice, cold-pressed oils & natural sweetness.",
    items: [
      "Ceylon Coconut Company Cold-pressed Virgin Coconut Oil",
      "Ancient Heirloom Rice (Suwandel / Kalu Heenati)",
      "Natural Coconut Cider Vinegar",
      "Pure Unrefined Kitul Treacle (Low GI)",
      "Raw Dry-zone Wild Bee Honey",
    ],
    idealFor: "Long-stay guests, mindful gifts & gourmet island dining.",
    inquiryText:
      "Hello Sunpower! I would like to inquire about 'The Ceylon Heritage Pantry Set'. Could you please share details and prices?",
  },
];

export function ProvisioningBoxes() {
  return (
    <section className="bg-cream-sage/70 py-12 sm:py-20 lg:py-28 border-b border-cream-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-forest/70 uppercase">
                <Sparkle size={13} weight="fill" className="text-sun-terracotta" />
                <span>VILLA & COMMUNITY PROVISIONING</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-forest leading-tight">
                Curated boxes.
                <br />
                <em className="italic font-normal">Ready for your stay.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-forest/80 max-w-sm leading-relaxed">
              Staying at a villa in Galle Fort, a beach house in Dewata, or a surf retreat in
              Ahangama? Let our store team prepare a fresh arrival box for you.
            </p>
          </div>
        </SectionReveal>

        <MobileAutoScroll desktopGridClassName="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROVISIONING_BUNDLES.map((bundle, idx) => (
            <div
              key={bundle.id}
              className="bg-cream p-5 sm:p-8 rounded-2xl border border-cream-border shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-shadow group"
            >
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-cream-sage text-forest font-semibold text-[8.5px] sm:text-[9px] uppercase tracking-wider mb-2 sm:mb-2.5">
                    {bundle.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-forest font-medium leading-snug">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-forest/70 mt-1 font-light">
                    {bundle.subtitle}
                  </p>
                </div>

                {/* Included Items */}
                <div className="space-y-2 pt-3 border-t border-cream-border/60">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-forest/60 block">
                    Box Contents:
                  </span>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs text-forest/80">
                    {bundle.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} weight="bold" className="text-forest mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[10px] sm:text-[11px] text-forest/60 italic pt-1">
                  Ideal for: {bundle.idealFor}
                </p>
              </div>

              <div className="pt-4 mt-4 sm:pt-6 sm:mt-6 border-t border-cream-border space-y-2.5 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] text-forest/50 block">
                  Availability & pricing confirmed via WhatsApp
                </span>

                <a
                  href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                    bundle.inquiryText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-all shadow-sm group"
                >
                  <span>Inquire About Box</span>
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </MobileAutoScroll>
      </div>
    </section>
  );
}
