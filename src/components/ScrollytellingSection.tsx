"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import {
  ArrowUpRight,
  Sparkle,
  MapPin,
  Clock,
  Quotes,
  CaretRight,
  CaretLeft,
  CheckCircle,
  Plant,
  Compass,
} from "@phosphor-icons/react";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

export interface ScrollytellingChapter {
  id: string;
  number: string;
  stepNumber: number;
  shortLabel: string;
  title: string;
  subtitle: string;
  time: string;
  location: string;
  coordinates: string;
  tag: string;
  badge: string;
  narrative: string;
  quote: string;
  quoteAuthor: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  inquiryText: string;
}

const CHAPTERS: ScrollytellingChapter[] = [
  {
    id: "chapter-01",
    number: "01",
    stepNumber: 1,
    shortLabel: "Dawn Farms",
    title: "Dawn at Southern Family Farms",
    subtitle: "Organic smallholder harvest in morning dew",
    time: "05:30 AM",
    location: "Talgampola & Southern Hinterlands",
    coordinates: "6.0535° N, 80.2210° E",
    tag: "01 / SOIL & HARVEST",
    badge: "SOUTHERN HERITAGE SOIL",
    narrative:
      "Before the first rays of tropical sun break across Galle's verdant hinterland hills, our partner smallholder families begin harvesting dew-kissed heirloom papayas, vibrant gotukola, organic snake gourds, and native wild herbs. Tended with zero chemical sprays, zero synthetic fertilizers, and profound respect for living soil, each morning's harvest preserves the pure life-force of Sri Lankan earth.",
    quote:
      "Wholesome food starts in living soil, nurtured by families who have cared for this southern land for generations.",
    quoteAuthor: "Mr. Nadeesha Gayan, Founder",
    highlights: [
      "100% Zero Synthetic Pesticides & Sprays",
      "Heirloom Papayas & Wild Indigenous Greens",
      "Direct Fair-Price Smallholder Partnerships",
    ],
    image: "/assets/produce.jpg",
    imageAlt: "Dew-kissed organic harvest and heirloom vegetables from Southern Sri Lankan family farms",
    inquiryText: "Hi Sunpower, I'd like to ask about your organic farm produce and morning harvest availability.",
  },
  {
    id: "chapter-02",
    number: "02",
    stepNumber: 2,
    shortLabel: "Dewata Market",
    title: "The Roadside Market at Dewata",
    subtitle: "Dawn crates arriving on Matara Road",
    time: "07:00 AM",
    location: "Matara Road, Dewata, Galle",
    coordinates: "6.0298° N, 80.2443° E",
    tag: "02 / ROADSIDE MARKET",
    badge: "ORIGINAL COASTAL FLAGSHIP",
    narrative:
      "As morning mist lifts along the ocean edge of Matara Road, fresh delivery crates arrive directly from the farm gates. Rustic timber shelves fill with warm wood-fired sourdough, raw virgin cold-pressed coconut oil, and sun-ripened tropical fruit. It is the lively, unpretentious meeting ground where dawn surfers, coastal villagers, and passing travelers cross paths every day.",
    quote:
      "A roadside landmark where genuine Southern hospitality meets the freshest dawn harvest of the day.",
    quoteAuthor: "Dewata Store Team",
    highlights: [
      "Daily Morning Farm Crates from Local Growers",
      "Freshly Baked Sourdough & Ancient Grains",
      "Pure Cold-Pressed Coconut Oils on Timber Shelves",
    ],
    image: "/assets/gallery/dewata-1.jpg",
    imageAlt: "Sunpower flagship roadside market entrance and fresh produce shelves at Dewata",
    inquiryText: "Hi Sunpower, what fresh sourdough and farm crates arrived at Dewata today?",
  },
  {
    id: "chapter-03",
    number: "03",
    stepNumber: 3,
    shortLabel: "Galle Fort",
    title: "Heritage & Apothecary at Galle Fort",
    subtitle: "UNESCO ramparts & single-estate Ceylon teas",
    time: "11:30 AM",
    location: "Leyn Baan Street, Galle Fort",
    coordinates: "6.0270° N, 80.2180° E",
    tag: "03 / HERITAGE APOTHECARY",
    badge: "UNESCO 17TH CENTURY FORT",
    narrative:
      "Tucked within the 17th-century coral and granite ramparts of Galle Fort, our Leyn Baan Street boutique celebrates ancient botanical wellness and artisan craft. Walk historical cobblestones into a tranquil sanctuary of single-estate Ceylon teas, hand-thrown southern terracotta pottery, unpasteurised wild forest honey, and restorative Ayurvedic personal care.",
    quote:
      "Inside historic 17th-century UNESCO ramparts, discovering island botanical cures and rare single-estate teas.",
    quoteAuthor: "Galle Fort Curator",
    highlights: [
      "Single-Estate Ceylon Teas (High & Low Grown)",
      "Traditional Ayurvedic Wellness & Botanicals",
      "Hand-Thrown Pottery & Raw Dry-Zone Forest Honey",
    ],
    image: "/assets/gallery/fort-1.jpg",
    imageAlt: "Sunpower apothecary boutique inside historical Galle Fort ramparts",
    inquiryText: "Hi Sunpower, please share your single-estate Ceylon tea and apothecary collection at Galle Fort.",
  },
  {
    id: "chapter-04",
    number: "04",
    stepNumber: 4,
    shortLabel: "Ahangama Sunset",
    title: "Sunset Living & Supermarket at Ahangama",
    subtitle: "Coastal community, organic pantry & post-surf recovery",
    time: "05:45 PM",
    location: "Ahangama Coastal Strip",
    coordinates: "5.9723° N, 80.3654° E",
    tag: "04 / COASTAL SUPERMARKET",
    badge: "MODERN SURF LIVING",
    narrative:
      "As dusk bathes Kabalana's surf breaks in amber light, our modern coastal supermarket welcomes wave riders, villa chefs, and travelers. Browse refrigerated cases of Nourish probiotic yogurts, cold-pressed botanical elixirs, imported European pantry delicacies, and bespoke villa provisioning crates for effortless seaside living.",
    quote:
      "Where ocean surf culture meets wholesome modern nourishment for sunset dinners along the coast.",
    quoteAuthor: "Ahangama Store Team",
    highlights: [
      "Full-Scale Modern Organic Supermarket",
      "Custom Private Villa & Retreat Provisioning",
      "Post-Surf Recovery Smoothies & Barista Essentials",
    ],
    image: "/assets/gallery/ahangama-1.jpg",
    imageAlt: "Sunpower modern supermarket and coastal living at Ahangama",
    inquiryText: "Hi Sunpower, I would like to inquire about organic pantry items and villa provisioning at Ahangama.",
  },
];

export function ScrollytellingSection() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const desktopContainerRef = useRef<HTMLDivElement>(null);

  // Desktop Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress bar calculation for Desktop
  const smoothProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track active chapter for Desktop based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalChapters = CHAPTERS.length;
    // Segment [0, 1] into totalChapters equal intervals
    const index = Math.min(
      Math.floor(latest * totalChapters),
      totalChapters - 1
    );
    if (index !== activeChapterIndex && index >= 0) {
      setActiveChapterIndex(index);
    }
  });

  // Smooth jump to chapter on Desktop
  const scrollToChapter = (index: number) => {
    if (!desktopContainerRef.current) return;
    const container = desktopContainerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = container.offsetHeight - window.innerHeight;
    const targetScroll = scrollTop + (index / (CHAPTERS.length - 1)) * scrollHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const currentDesktopChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];
  const currentMobileChapter = CHAPTERS[mobileActiveIndex] || CHAPTERS[0];

  return (
    <section className="relative bg-[#0a1f18] text-[#fcfbf7] selection:bg-[#e37a3f] selection:text-[#0a1f18]">
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP VIEW: STICKY SPLIT-SCREEN SCROLLYTELLING
          (Active on lg screens and wider: lg:block)
         ───────────────────────────────────────────────────────────── */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:block relative h-[400vh]"
      >
        {/* Sticky Fullscreen Canvas */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#163e30]/50 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#e37a3f]/10 blur-3xl" />
          </div>

          {/* ── TOP NAV BAR ── */}
          <header className="relative z-30 px-8 xl:px-12 pt-6 pb-4 border-b border-[#27614b]/30 bg-[#0a1f18]/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163e30] border border-[#dfcf98]/30 text-[10px] uppercase tracking-[0.25em] text-[#dfcf98] font-semibold">
                <Sparkle size={13} weight="fill" className="text-[#e37a3f]" />
                <span>THE SUNPOWER JOURNEY</span>
              </div>
              <h2 className="font-serif text-lg xl:text-xl text-[#fcfbf7]/90 font-medium tracking-wide">
                From Southern Soil to Coastal Living
              </h2>
            </div>

            {/* Chapter Step Tabs */}
            <div className="flex items-center gap-2">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToChapter(idx)}
                    className={`group relative px-3 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-[#163e30] text-[#dfcf98] border border-[#dfcf98]/50 shadow-sm"
                        : "text-[#fcfbf7]/60 hover:text-[#fcfbf7] border border-transparent hover:border-[#27614b]/40"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-semibold ${
                        isActive ? "text-[#e37a3f]" : "text-[#fcfbf7]/40"
                      }`}
                    >
                      {ch.number}
                    </span>
                    <span className="font-medium tracking-tight text-[11px] xl:text-xs">
                      {ch.shortLabel}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e37a3f] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chapter Step Counter */}
            <div className="flex items-center gap-3 font-mono">
              <span className="text-2xl font-light text-[#dfcf98]">
                {currentDesktopChapter.number}
              </span>
              <span className="text-xs text-[#fcfbf7]/40">/</span>
              <span className="text-xs text-[#fcfbf7]/50">04</span>
            </div>
          </header>

          {/* ── MAIN SPLIT-SCREEN STAGE ── */}
          <div className="relative z-20 flex-1 grid grid-cols-12 gap-8 px-8 xl:px-12 py-6 overflow-hidden items-center">
            {/* LEFT COLUMN: Narrative Canvas (Col 1-5) */}
            <div className="col-span-5 h-full flex flex-col justify-center pr-4 xl:pr-8 relative">
              {/* Vertical Scroll Glow Line */}
              <div className="absolute -left-4 top-4 bottom-4 w-[2px] bg-[#163e30] rounded-full overflow-hidden">
                <motion.div
                  style={{ height: smoothProgress }}
                  className="w-full bg-gradient-to-b from-[#e37a3f] to-[#dfcf98] shadow-[0_0_12px_#dfcf98]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDesktopChapter.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Location & Time Stamp */}
                  <div className="flex items-center gap-3 text-xs tracking-wider text-[#dfcf98]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#163e30]/80 border border-[#dfcf98]/20 text-[10px] font-mono uppercase tracking-widest text-[#dfcf98]">
                      <Clock size={12} weight="bold" className="text-[#e37a3f]" />
                      <span>{currentDesktopChapter.time}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#fcfbf7]/70 font-sans">
                      <MapPin size={13} weight="fill" className="text-[#e37a3f]" />
                      <span>{currentDesktopChapter.location}</span>
                    </span>
                  </div>

                  {/* Headline & Subtitle */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e37a3f] block font-semibold">
                      {currentDesktopChapter.tag}
                    </span>
                    <h3 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl text-[#fcfbf7] font-normal leading-[1.08] tracking-tight">
                      {currentDesktopChapter.title}
                    </h3>
                    <p className="font-serif italic text-sm xl:text-base text-[#dfcf98]/90 font-light">
                      “{currentDesktopChapter.subtitle}”
                    </p>
                  </div>

                  {/* Storytelling Narrative Paragraph */}
                  <p className="text-xs xl:text-sm text-[#fcfbf7]/80 leading-relaxed font-light">
                    {currentDesktopChapter.narrative}
                  </p>

                  {/* Key Story Highlights */}
                  <div className="space-y-2 pt-1 border-t border-[#27614b]/30">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#fcfbf7]/50 block">
                      Chapter Highlights & Quality Standards
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {currentDesktopChapter.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-[#fcfbf7]/90 font-light"
                        >
                          <CheckCircle
                            size={14}
                            weight="fill"
                            className="text-[#dfcf98] flex-shrink-0"
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curated Quote */}
                  <div className="bg-[#163e30]/40 rounded-xl p-3.5 border-l-2 border-[#dfcf98] text-xs text-[#fcfbf7]/85 italic space-y-1">
                    <p className="font-serif leading-snug">
                      {currentDesktopChapter.quote}
                    </p>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dfcf98] not-italic font-mono">
                      — {currentDesktopChapter.quoteAuthor}
                    </span>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 flex items-center gap-4">
                    <a
                      href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                        currentDesktopChapter.inquiryText
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded bg-[#e37a3f] text-[#0a1f18] text-xs font-semibold tracking-wider hover:bg-[#dfcf98] transition-all transform hover:-translate-y-0.5 shadow-md group"
                    >
                      <span>Inquire About This Location</span>
                      <ArrowUpRight
                        size={15}
                        weight="bold"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>

                    <div className="text-[10px] font-mono text-[#fcfbf7]/40 tracking-wider">
                      {currentDesktopChapter.coordinates}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Visual Canvas (Col 6-12) */}
            <div className="col-span-7 h-[calc(100vh-160px)] relative rounded-2xl overflow-hidden shadow-2xl border border-[#27614b]/40 bg-[#0e2920]">
              {/* Crossfading Synchronized High-Res Imagery */}
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <motion.div
                    key={ch.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.08,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 z-10 pointer-events-none"
                  >
                    <Image
                      src={ch.image}
                      alt={ch.imageAlt}
                      fill
                      priority={idx === 0 || idx === 1}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                );
              })}

              {/* Cinematic Vignettes & Gradients */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a1f18]/90 via-[#0a1f18]/20 to-[#0a1f18]/40 pointer-events-none" />
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0a1f18]/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Chapter Badge on Top Left */}
              <div className="absolute top-5 left-5 z-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDesktopChapter.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35 }}
                    className="px-3.5 py-1.5 rounded-full bg-[#0a1f18]/85 backdrop-blur-md border border-[#dfcf98]/40 text-[#dfcf98] text-[10px] font-mono uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#e37a3f]" />
                    <span>{currentDesktopChapter.badge}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Stamp / Emblem Top Right */}
              <div className="absolute top-5 right-5 z-30 select-none pointer-events-none">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#dfcf98]/40 shadow-xl bg-[#0a1f18]/70 backdrop-blur-sm p-1">
                  <Image
                    src="/assets/good-food-stamp.svg"
                    alt="Sunpower Official Good Food Seal"
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
              </div>

              {/* Floating Bottom Card: Location Narrative Caption */}
              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDesktopChapter.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="p-4 rounded-xl bg-[#0a1f18]/80 backdrop-blur-md border border-[#27614b]/50 text-cream max-w-md shadow-xl"
                  >
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#dfcf98] font-mono mb-1">
                      <Plant size={13} weight="fill" className="text-[#e37a3f]" />
                      <span>{currentDesktopChapter.location}</span>
                    </div>
                    <h4 className="font-serif text-lg text-[#fcfbf7] font-medium leading-snug">
                      {currentDesktopChapter.title}
                    </h4>
                    <p className="text-[11px] text-[#fcfbf7]/75 mt-0.5 line-clamp-1">
                      {currentDesktopChapter.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Chapter Fast Navigation Buttons */}
                <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0a1f18]/85 backdrop-blur-md border border-[#27614b]/60 shadow-lg">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToChapter(
                        activeChapterIndex === 0
                          ? CHAPTERS.length - 1
                          : activeChapterIndex - 1
                      )
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#fcfbf7]/80 hover:text-[#dfcf98] hover:bg-[#163e30] transition-colors"
                    aria-label="Previous Chapter"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>
                  <span className="text-[10px] font-mono text-[#dfcf98] px-1 font-semibold">
                    0{activeChapterIndex + 1} / 0{CHAPTERS.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToChapter(
                        activeChapterIndex === CHAPTERS.length - 1
                          ? 0
                          : activeChapterIndex + 1
                      )
                    }
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#fcfbf7]/80 hover:text-[#dfcf98] hover:bg-[#163e30] transition-colors"
                    aria-label="Next Chapter"
                  >
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM STATUS BAR ── */}
          <footer className="relative z-30 px-8 xl:px-12 py-3 border-t border-[#27614b]/30 bg-[#0a1f18]/90 backdrop-blur-md flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#fcfbf7]/60">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#dfcf98]">
                <Compass size={13} weight="fill" className="text-[#e37a3f]" />
                <span>SCROLL TIMELINE ACTIVATED</span>
              </span>
              <span className="text-[#fcfbf7]/30">|</span>
              <span>GALLE · DEWATA · GALLE FORT · AHANGAMA</span>
            </div>

            {/* Glowing Journey Progress Line */}
            <div className="flex items-center gap-3 w-64">
              <span className="text-[9px] font-mono text-[#dfcf98]">JOURNEY</span>
              <div className="flex-1 h-1.5 bg-[#163e30] rounded-full overflow-hidden border border-[#27614b]/40">
                <motion.div
                  style={{ width: smoothProgress }}
                  className="h-full bg-gradient-to-r from-[#e37a3f] to-[#dfcf98] rounded-full shadow-[0_0_8px_#dfcf98]"
                />
              </div>
              <span className="text-[9px] font-mono text-[#dfcf98]">
                {Math.round(((activeChapterIndex + 1) / CHAPTERS.length) * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#fcfbf7]/60">
              <span>Scroll down to advance narrative</span>
              <span className="animate-bounce">↓</span>
            </div>
          </footer>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE VIEW: TOUCH-FRIENDLY COMPACT SCROLLYTELLING
          (Active on screens smaller than lg: lg:hidden)
          Zero scroll-jacking, touch-friendly tabbed story navigation!
         ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden px-4 sm:px-6 py-10 sm:py-14 relative overflow-hidden border-y border-[#27614b]/40">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#163e30]/30 blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163e30] border border-[#dfcf98]/30 text-[9px] uppercase tracking-[0.22em] text-[#dfcf98] font-semibold">
              <Sparkle size={12} weight="fill" className="text-[#e37a3f]" />
              <span>THE SUNPOWER JOURNEY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#fcfbf7] leading-tight">
              From Southern Soil to Coastal Living
            </h2>
            <p className="text-xs text-[#fcfbf7]/75 font-light leading-relaxed">
              Experience the 4-part journey of Sunpower: from dawn organic harvests to the vibrant coastal supermarket life at Ahangama.
            </p>
          </div>

          {/* Touch-Friendly Horizontal Step Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {CHAPTERS.map((ch, idx) => {
              const isActive = mobileActiveIndex === idx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setMobileActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ${
                    isActive
                      ? "bg-[#e37a3f] text-[#0a1f18] font-semibold shadow-sm"
                      : "bg-[#163e30]/80 text-[#fcfbf7]/75 border border-[#27614b]/40"
                  }`}
                >
                  <span className="font-mono text-[10px]">{ch.number}</span>
                  <span className="text-[11px]">{ch.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Canvas Card */}
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl border border-[#27614b]/50 bg-[#0e2920]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMobileChapter.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentMobileChapter.image}
                  alt={currentMobileChapter.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f18]/90 via-transparent to-[#0a1f18]/30 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#0a1f18]/85 backdrop-blur-sm border border-[#dfcf98]/40 text-[#dfcf98] text-[9px] font-mono uppercase tracking-wider">
                {currentMobileChapter.badge}
              </span>
            </div>

            {/* Bottom Info & Touch Arrows */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#dfcf98] font-mono block">
                  {currentMobileChapter.time} · {currentMobileChapter.location}
                </span>
                <h3 className="font-serif text-lg text-[#fcfbf7] font-medium leading-tight">
                  {currentMobileChapter.title}
                </h3>
              </div>

              {/* Quick prev / next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveIndex(
                      mobileActiveIndex === 0
                        ? CHAPTERS.length - 1
                        : mobileActiveIndex - 1
                    )
                  }
                  className="w-7 h-7 rounded-full bg-[#0a1f18]/85 border border-[#27614b]/60 flex items-center justify-center text-[#fcfbf7]"
                  aria-label="Previous Chapter"
                >
                  <CaretLeft size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveIndex(
                      mobileActiveIndex === CHAPTERS.length - 1
                        ? 0
                        : mobileActiveIndex + 1
                    )
                  }
                  className="w-7 h-7 rounded-full bg-[#0a1f18]/85 border border-[#27614b]/60 flex items-center justify-center text-[#fcfbf7]"
                  aria-label="Next Chapter"
                >
                  <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </div>

          {/* Narrative Content Card */}
          <div className="bg-[#13362a] rounded-2xl p-5 sm:p-6 border border-[#27614b]/40 shadow-md space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMobileChapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#e37a3f] block font-semibold mb-1">
                    {currentMobileChapter.tag}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#fcfbf7] font-medium leading-snug">
                    {currentMobileChapter.title}
                  </h4>
                  <p className="font-serif italic text-xs text-[#dfcf98]/90 font-light mt-0.5">
                    “{currentMobileChapter.subtitle}”
                  </p>
                </div>

                <p className="text-xs text-[#fcfbf7]/80 leading-relaxed font-light">
                  {currentMobileChapter.narrative}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-[#27614b]/40">
                  {currentMobileChapter.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-[#fcfbf7]/90 font-light"
                    >
                      <CheckCircle
                        size={13}
                        weight="fill"
                        className="text-[#dfcf98] flex-shrink-0"
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="bg-[#0a1f18]/60 rounded-lg p-3 border-l-2 border-[#dfcf98] text-[11px] text-[#fcfbf7]/85 italic space-y-1">
                  <p className="font-serif leading-snug">
                    {currentMobileChapter.quote}
                  </p>
                  <span className="block text-[8.5px] uppercase tracking-widest text-[#dfcf98] not-italic font-mono">
                    — {currentMobileChapter.quoteAuthor}
                  </span>
                </div>

                {/* Action CTA */}
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                      currentMobileChapter.inquiryText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#e37a3f] text-[#0a1f18] text-xs font-semibold tracking-wider hover:bg-[#dfcf98] transition-colors shadow-sm"
                  >
                    <span>Inquire on WhatsApp</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stepper Dots */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#27614b]/30">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setMobileActiveIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    mobileActiveIndex === idx
                      ? "w-6 h-1.5 bg-[#dfcf98]"
                      : "w-1.5 h-1.5 bg-[#fcfbf7]/30 hover:bg-[#fcfbf7]/60"
                  }`}
                  aria-label={`Jump to ${ch.shortLabel}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
