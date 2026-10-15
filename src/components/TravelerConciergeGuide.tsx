"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CreditCard,
  MapPin,
  Plant,
  Sun,
  WhatsappLogo,
  ShieldCheck,
  Bicycle,
  ArrowUpRight,
  Sparkle,
} from "@phosphor-icons/react";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";
import { SectionReveal } from "@/components/SectionReveal";

const TRAVELER_FEATURES = [
  {
    icon: CreditCard,
    title: "International Cards & Contactless",
    badge: "Seamless Checkout",
    description:
      "Full support for international Visa, Mastercard, and NFC contactless payments at all three branches. No need to carry large amounts of cash for your holiday groceries.",
    highlight: "Visa · Mastercard · Apple Pay · Tap to Pay",
  },
  {
    icon: Bicycle,
    title: "Villa Provisioning & Delivery",
    badge: "Same-Day Service",
    description:
      "Staying in a private villa, boutique hotel, or surf camp? Send your shopping list via WhatsApp by 2:00 PM for prompt doorstep delivery anywhere from Galle Fort to Weligama.",
    highlight: "Galle Fort · Unawatuna · Thalpe · Ahangama · Weligama",
  },
  {
    icon: Plant,
    title: "Vegan, Gluten-Free & Clean Diet",
    badge: "Mindful Living",
    description:
      "Carefully sourced oat milk, almond milk, chia seeds, cold-pressed virgin coconut oil, gluten-free grains, organic nut butters, and fermented kombucha brewed on the south coast.",
    highlight: "Plant Milks · Vegan Cheese · Kombucha · Organic Superfoods",
  },
  {
    icon: Sun,
    title: "Reef-Safe Sun & Eco Care",
    badge: "Surf & Beach Ready",
    description:
      "Mineral biodegradable reef-safe sunscreens, natural citronella mosquito repellents, aloe after-sun care, and handmade Ayurvedic herbal soaps for ocean lovers.",
    highlight: "Reef-Safe Sunblock · Natural Citronella · Eco Toiletries",
  },
  {
    icon: Sparkle,
    title: "Artisanal Sourdough & Fresh Bakes",
    badge: "Baked Daily",
    description:
      "Naturally leavened crusty sourdough loaves, multigrain boules, and fresh breakfast bakes delivered daily from southern Sri Lanka's finest artisan bakers.",
    highlight: "Country Sourdough · Seeded Loaves · Baguettes",
  },
  {
    icon: MapPin,
    title: "Right Along the Coast Road",
    badge: "3 Prime Locations",
    description:
      "Centrally positioned along the main Matara Road: opposite Dewata surfing bay, inside historic Galle Fort, and at the heart of the Ahangama surf strip.",
    highlight: "Dewata Beach · Galle Fort Heritage · Ahangama Strip",
  },
];

export function TravelerConciergeGuide() {
  return (
    <section className="bg-cream-dark py-16 sm:py-24 border-y border-cream-border/70 relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sun-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionReveal>
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/15 text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-forest uppercase">
              <ShieldCheck size={14} weight="fill" className="text-forest" />
              <span>TRAVELER & EXPAT ESSENTIALS · SOUTH COAST SRI LANKA</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest tracking-tight leading-[1.05]">
              Visiting Sri Lanka?
              <br />
              <em className="italic font-light text-forest/80">Your coastal grocery concierge.</em>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-forest/75 leading-relaxed font-light">
              We designed Sunpower Farmers Market to make grocery shopping effortless for foreign
              travelers, expats, surfers, and villa guests. From clean organic produce and artisan sourdough
              to international card payments and same-day villa provisioning, we have you covered across
              Galle Fort, Dewata, Unawatuna, and Ahangama.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TRAVELER_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.article
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-cream/80 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-cream-border/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                        <Icon size={22} weight="duotone" />
                      </div>
                      <span className="text-[9.5px] font-mono uppercase tracking-widest text-forest/60 bg-cream-card px-2.5 py-1 rounded-full border border-cream-border">
                        {feat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-forest font-medium mb-2 group-hover:text-forest-dark transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-forest/75 leading-relaxed font-light">
                        {feat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-cream-border/60">
                    <span className="block text-[10px] font-mono tracking-wider uppercase text-forest/60">
                      {feat.highlight}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Quick Concierge CTA Banner */}
          <div className="mt-12 sm:mt-16 bg-forest text-cream rounded-2xl p-6 sm:p-10 shadow-xl border border-forest-light/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sun-amber">
                <WhatsappLogo size={16} weight="fill" />
                <span>DIRECT VILLA PROVISIONING CONCIERGE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-cream font-normal">
                Need groceries delivered to your villa or Airbnb?
              </h3>
              <p className="text-xs sm:text-sm text-cream/80 font-light leading-relaxed">
                Send your list on WhatsApp with your location pin (Galle, Unawatuna, Thalpe, Ahangama, or Weligama).
                We hand-pack fresh tropical fruits, organic vegetables, sourdough, chilled dairy, and pantry goods.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower!%20I%20am%20traveling%20in%20Sri%20Lanka%20and%20staying%20at%20a%20villa.%20I%27d%20like%20to%20order%20groceries%20for%20delivery.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-sun-orange text-forest-dark text-xs sm:text-sm font-semibold tracking-wider hover:bg-sun-amber transition-all shadow-md group"
              >
                <WhatsappLogo size={18} weight="fill" />
                <span>WhatsApp Concierge</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              <Link
                href="/stores"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-cream/90 font-medium hover:text-white transition-colors border-b border-cream/40 pb-1"
              >
                <span>View Store Hours & Maps</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
