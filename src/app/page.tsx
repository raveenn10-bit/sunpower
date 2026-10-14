"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { STORES, WHATSAPP_INTL_NUMBER } from "@/data/products";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { SectionReveal } from "@/components/SectionReveal";
import { HowItWorks } from "@/components/HowItWorks";
import { MakersShowcase } from "@/components/MakersShowcase";
import { CoastalRouteExplorer } from "@/components/CoastalRouteExplorer";
import { FounderFeature } from "@/components/FounderFeature";
import { CoastalLifestyleSection } from "@/components/CoastalLifestyleSection";
import { ProvisioningBoxes } from "@/components/ProvisioningBoxes";
import { NearestStoreFinder } from "@/components/NearestStoreFinder";
import { CommunityGallery } from "@/components/CommunityGallery";
import { ScrollMotionShowcase } from "@/components/ScrollMotionShowcase";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const FAQ_ITEMS = [
  {
    q: "How can I check product availability?",
    a: "Message us on WhatsApp with the product name and your preferred store. Our team can confirm current availability, weights, and daily delivery prices.",
  },
  {
    q: "Can I place an order online?",
    a: "This website is a guide to our market. Send your shopping inquiry on WhatsApp; the team will confirm availability, prices, and any collection or delivery arrangements. No payment is taken here.",
  },
  {
    q: "Do you supply villas and retreats on the south coast?",
    a: "Yes! We regularly prepare fresh arrival crates, heirloom pantry supplies, and organic greens for private villas and boutique hotels from Galle Fort to Midigama and Weligama.",
  },
  {
    q: "Where can I see the latest arrivals?",
    a: "Follow Sunpower on Facebook or Instagram (@sunpowerfarmersmarket) for daily updates, or contact a branch directly.",
  },
];

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[86vh] max-h-[940px] h-[86vh] text-cream overflow-hidden flex flex-col justify-between">
        {/* Background Image with Parallax Drift Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/market.jpg"
            alt="Fresh produce and artisanal goods at Sunpower Farmers Market"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-drift-slow"
          />
          {/* Dual Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-dark/70 to-forest-dark/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-forest-dark/45" />
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="max-w-3xl space-y-5"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cream/15 backdrop-blur-md border border-cream/25 text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-cream uppercase shadow-sm">
              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex-shrink-0 border border-sun-orange/60">
                <Image
                  src="/assets/sunpower-icon.png"
                  alt="Sunpower Farmers Market official emblem"
                  fill
                  sizes="20px"
                  className="object-cover object-center"
                />
              </div>
              <span>GOOD FOOD · ROOTED IN OUR SOUTHERN SOIL</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-cream leading-[0.98] tracking-tight">
              A little closer
              <br />
              to <em className="italic font-light text-cream-dark">nature.</em>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-cream/85 max-w-xl font-light leading-relaxed">
              Everyday essentials. Sourdough & ancient grains.
              <br className="hidden sm:inline" />A fresh perspective on your coastal shop in Dewata,
              Galle Fort & Ahangama.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-4 px-6 sm:px-7 py-3.5 sm:py-4 rounded bg-sun-orange text-forest-dark text-xs sm:text-sm font-semibold tracking-wider hover:bg-sun-amber transition-all transform hover:-translate-y-0.5 shadow-lg group"
              >
                <span>Explore our selections</span>
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>

              <Link
                href="/stores"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-cream/90 font-medium border-b border-cream/50 pb-1 hover:text-cream hover:border-cream transition-all group"
              >
                <span>Find your Sunpower</span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Official Good Food Stamp (Hero Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:flex absolute right-8 lg:right-12 top-24 lg:top-28 z-20 flex-col items-center select-none pointer-events-none"
        >
          <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-2xl animate-stamp border-2 border-cream/30 bg-cream/20 backdrop-blur-sm">
            <Image
              src="/assets/good-food-stamp.svg"
              alt="Good Food Good Mood official badge"
              fill
              sizes="128px"
              className="object-contain p-1"
            />
          </div>
          <span className="mt-2 text-[9px] uppercase tracking-[0.25em] font-mono text-cream/80 bg-forest-deep/70 px-3 py-0.5 rounded-full backdrop-blur-sm border border-cream/10">
            SOUTHERN SRI LANKA
          </span>
        </motion.div>

        {/* Floating Coastal Note (Desktop) */}
        <div className="hidden lg:block absolute right-8 bottom-28 z-10 border-l border-cream/40 pl-5 text-right font-serif text-base text-cream/90 leading-snug">
          A taste of the good life.
          <span className="block font-sans text-[10px] text-cream/60 tracking-wider uppercase mt-1">
            Sri Lanka’s southern coast
          </span>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 pb-7 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-cream/70 border-t border-cream/15 pt-5">
          <span>GALLE · GALLE FORT · AHANGAMA</span>
          <a
            href="#intro"
            className="hover:text-cream transition-colors flex items-center gap-1.5"
          >
            <span>Scroll to discover</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* ─── CONTINUOUS INFINITE TICKER ─── */}
      <MarqueeTicker />

      {/* ─── 01 / THE SUNPOWER WAY ─── */}
      <section id="intro" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-cream-border pb-20">
            <div className="lg:col-span-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
                01 / THE SUNPOWER WAY
              </span>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
                Good food.
                <br />
                <em className="italic text-forest/80 font-normal">Better everyday moments.</em>
              </h2>
              <p className="text-sm sm:text-base text-forest/75 leading-relaxed max-w-xl">
                From a nourishing breakfast to something new for the pantry, there’s joy in
                choosing well. Founded by Mr. Nadeesha Gayan, Sunpower bridges authentic grassroots
                organic agriculture with conscious coastal lifestyle living across Galle and
                Ahangama.
              </p>
            </div>

            <div className="hidden lg:flex lg:col-span-2 justify-end">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border border-cream-border/60 shadow-sm bg-cream-warm p-2 opacity-85 hover:opacity-100 transition-all hover:scale-105">
                <Image
                  src="/assets/good-food-stamp.svg"
                  alt="Good Food Good Mood official seal"
                  fill
                  sizes="112px"
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── 02 / EXPLORE THE MARKET ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-24 sm:pb-32">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block mb-3">
                02 / EXPLORE THE MARKET
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest">
                Find your kind
                <br />
                of <em className="italic font-normal">goodness.</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-forest/70 max-w-xs leading-relaxed">
              A few favourites to start with.
              <br />
              Ask our team about today’s fresh availability.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Produce Feature Card */}
          <SectionReveal delay={0.1}>
            <Link
              href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower%2C%20what%20fresh%20produce%20is%20available%20today%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-[460px] sm:min-h-[520px] rounded-lg overflow-hidden bg-forest text-cream flex flex-col justify-between p-8 shadow-md"
            >
              <Image
                src="/assets/produce.jpg"
                alt="Fresh vegetables and produce at Sunpower"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />

              {/* Tag */}
              <div className="relative z-10 self-start">
                <span className="px-3.5 py-1.5 rounded-full bg-cream text-forest font-semibold text-[9px] uppercase tracking-wider">
                  FRESH PICKS
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <small className="text-[9px] uppercase tracking-widest text-cream/80 block mb-1">
                    COLOURFUL. SIMPLE. FULL OF POSSIBILITY.
                  </small>
                  <h3 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
                    Fresh produce
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-cream/50 flex items-center justify-center group-hover:bg-cream group-hover:text-forest transition-colors flex-shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          </SectionReveal>

          {/* Quick Inquiries List */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-col justify-between divide-y divide-cream-border">
              {/* Breakfast & Granola */}
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower%2C%20please%20share%20your%20granola%20selection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 sm:py-8 flex items-center gap-6 hover:translate-x-1 transition-transform"
              >
                <span className="font-mono text-xs text-forest/40 self-start pt-1">01</span>
                <div className="flex-1">
                  <small className="text-[9px] uppercase tracking-widest text-forest/50 block">
                    START SOMETHING GOOD
                  </small>
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest group-hover:text-sun-terracotta transition-colors my-1">
                    Breakfast & granola
                  </h3>
                  <p className="text-xs text-forest/70">Explore Miss NuTri selections.</p>
                </div>
                <ArrowUpRight size={20} className="text-forest/60 group-hover:text-forest flex-shrink-0" />
              </a>

              {/* Yogurt & Dairy */}
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower%2C%20is%20Nourish%20yogurt%20available%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 sm:py-8 flex items-center gap-6 hover:translate-x-1 transition-transform"
              >
                <span className="font-mono text-xs text-forest/40 self-start pt-1">02</span>
                <div className="flex-1">
                  <small className="text-[9px] uppercase tracking-widest text-forest/50 block">
                    A LITTLE EVERYDAY COMFORT
                  </small>
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest group-hover:text-sun-terracotta transition-colors my-1">
                    Yogurt & dairy
                  </h3>
                  <p className="text-xs text-forest/70">Discover Nourish yogurt and coastal dairy.</p>
                </div>
                <ArrowUpRight size={20} className="text-forest/60 group-hover:text-forest flex-shrink-0" />
              </a>

              {/* Pantry & Natural Finds */}
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower%2C%20what%20pantry%20products%20are%20available%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-6 sm:py-8 flex items-center gap-6 hover:translate-x-1 transition-transform"
              >
                <span className="font-mono text-xs text-forest/40 self-start pt-1">03</span>
                <div className="flex-1">
                  <small className="text-[9px] uppercase tracking-widest text-forest/50 block">
                    MAKE ROOM FOR DISCOVERY
                  </small>
                  <h3 className="font-serif text-2xl sm:text-3xl text-forest group-hover:text-sun-terracotta transition-colors my-1">
                    Pantry & natural finds
                  </h3>
                  <p className="text-xs text-forest/70">
                    Local favourites, Ceylon Coconut Company, and imported foods.
                  </p>
                </div>
                <ArrowUpRight size={20} className="text-forest/60 group-hover:text-forest flex-shrink-0" />
              </a>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.25}>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-colors self-start"
            >
              <span>Explore the full market</span>
              <ArrowUpRight size={16} />
            </Link>

            <p className="text-[11px] text-forest/50">
              Food photography is illustrative. Product range and availability vary by store.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* ─── COASTAL PANTRY & SURF RECOVERY SECTION ─── */}
      <CoastalLifestyleSection />

      {/* ─── VILLA & SURFER PROVISIONING CRATES ─── */}
      <ProvisioningBoxes />

      {/* ─── PROMINENT FOUNDER FEATURE: MR. NADEESHA GAYAN ─── */}
      <FounderFeature />

      {/* ─── BIDIRECTIONAL KINETIC SCROLL ANIMATION ─── */}
      <ScrollMotionShowcase />

      {/* ─── HOW INQUIRIES WORK (3-STEP RITUAL) ─── */}
      <HowItWorks />

      {/* ─── CURATED MAKERS SPOTLIGHT ─── */}
      <MakersShowcase />

      {/* ─── NEAREST STORE FINDER ─── */}
      <NearestStoreFinder />

      {/* ─── COASTAL ROUTE EXPLORER ─── */}
      <CoastalRouteExplorer />

      {/* ─── COMMUNITY PHOTO GALLERY ─── */}
      <CommunityGallery />

      {/* ─── CUSTOMER REVIEWS & TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── 05 / LET'S TALK GOOD FOOD (CALLOUT) ─── */}
      <section className="bg-cream-sage py-20 px-6 sm:px-8 border-y border-cream-border/70">
        <SectionReveal>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/70 uppercase block">
                A QUESTION? A SHOPPING LIST?
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-forest leading-[0.95] tracking-tight">
                Let’s talk
                <br />
                <em className="italic font-normal">good food.</em>
                <span className="text-sun-terracotta ml-3 text-4xl sm:text-6xl align-middle">✳</span>
              </h2>
            </div>

            <div className="space-y-5 max-w-sm">
              <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
                Check a product. Discover what’s new.
                <br />
                Our next conversation starts here on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hello%20Sunpower!%20I%27d%20like%20to%20ask%20about%20your%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-all shadow-md group"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── 06 / A FEW USEFUL THINGS (FAQ) ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block mb-2">
                A FEW USEFUL THINGS
              </span>
              <h3 className="font-serif text-3xl text-forest">Frequently Asked Questions</h3>
            </div>

            <div className="lg:col-span-8 divide-y divide-cream-border">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-forest focus:outline-none group"
                      aria-expanded={isOpen}
                    >
                      <span className="group-hover:text-sun-terracotta transition-colors">
                        {item.q}
                      </span>
                      <CaretDown
                        size={18}
                        className={`text-forest/60 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-sun-terracotta" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pt-3 text-xs sm:text-sm text-forest/75 leading-relaxed overflow-hidden"
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
