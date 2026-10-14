"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  InstagramLogo,
  MapPin,
  MagnifyingGlassPlus,
  Sparkle,
} from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";

export type GalleryCategory =
  | "All Photos"
  | "Dewata Market"
  | "Ahangama Supermarket"
  | "Galle Fort"
  | "Artisan & Living";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
  branch: "Dewata Market" | "Ahangama Supermarket" | "Galle Fort";
  branchDetail: string;
  categories: ("Dewata Market" | "Ahangama Supermarket" | "Galle Fort" | "Artisan & Living")[];
  aspectRatio: string;
  priority?: boolean;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  // ─── DEWATA AUTHENTIC GOOGLE MAPS PHOTOS ───
  {
    id: "dewata-1",
    src: "/assets/gallery/dewata-1.jpg",
    alt: "Sunpower Farmers Market Dewata roadside entrance and fresh open-air market",
    title: "Dewata Open-Air Market Front",
    caption:
      "The welcoming roadside market frontage on Galle-Matara Main Road in Dewata, lined daily with fresh coconuts, highland vegetables, and fresh tropical harvests.",
    tag: "MARKET VERANDA",
    branch: "Dewata Market",
    branchDetail: "Galle-Matara Road, Dewata",
    categories: ["Dewata Market"],
    aspectRatio: "aspect-[4/3]",
    priority: true,
  },
  {
    id: "dewata-2",
    src: "/assets/gallery/dewata-2.jpg",
    alt: "Vibrant organic tropical fruits and farm-fresh produce at Sunpower Dewata",
    title: "Sun-Ripened Tropical Harvests",
    caption:
      "Sweet organic papayas, golden pineapples, passion fruits, and crisp greens delivered daily at dawn directly from dedicated southern family farms.",
    tag: "ORGANIC HARVEST",
    branch: "Dewata Market",
    branchDetail: "Dewata Fresh Produce Hall",
    categories: ["Dewata Market", "Artisan & Living"],
    aspectRatio: "aspect-[16/9]",
  },
  {
    id: "dewata-3",
    src: "/assets/gallery/dewata-3.jpg",
    alt: "Handcrafted rustic timber shelves with organic grains, dry goods, and heritage spices",
    title: "Artisan Timber Shelving & Staples",
    caption:
      "Custom solid-wood shelving holding organic heirloom red rice, whole spices, cold-pressed virgin oils, pulses, and wholesome island staples.",
    tag: "HEIRLOOM PANTRY",
    branch: "Dewata Market",
    branchDetail: "Dewata Pantry & Grains",
    categories: ["Dewata Market", "Artisan & Living"],
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "dewata-4",
    src: "/assets/gallery/dewata-4.jpg",
    alt: "Sunpower Dewata market counter, fresh juices, and daily provisions",
    title: "Farm Counter & Daily Provisions",
    caption:
      "Friendly checkout counter offering king coconut hydration, house-blended jams, pure honey, and genuine neighbourhood hospitality.",
    tag: "MARKET COUNTER",
    branch: "Dewata Market",
    branchDetail: "Dewata Checkout & Deli",
    categories: ["Dewata Market"],
    aspectRatio: "aspect-[3/4]",
  },

  // ─── AHANGAMA AUTHENTIC GOOGLE MAPS PHOTOS ───
  {
    id: "ahangama-1",
    src: "/assets/gallery/ahangama-1.jpg",
    alt: "Sunpower Super Ahangama main branch exterior and entrance along Matara Road",
    title: "Sunpower Super Ahangama Storefront",
    caption:
      "Our full-service coastal supermarket located directly on Matara Road in Ahangama, welcoming surfers, villas, residents, and travellers with complete daily groceries.",
    tag: "COASTAL SUPERMARKET",
    branch: "Ahangama Supermarket",
    branchDetail: "Matara Road, Ahangama",
    categories: ["Ahangama Supermarket"],
    aspectRatio: "aspect-[3/4]",
    priority: true,
  },
  {
    id: "ahangama-2",
    src: "/assets/gallery/ahangama-2.jpg",
    alt: "Modern grocery aisles and organized produce at Sunpower Super Ahangama",
    title: "Clean Grocery Aisles & Fresh Greens",
    caption:
      "Bright, spacious, and air-conditioned aisles stocked with fresh milk, crisp produce, pantry staples, and international favourite groceries.",
    tag: "SUPERMARKET AISLES",
    branch: "Ahangama Supermarket",
    branchDetail: "Ahangama Main Grocery Floor",
    categories: ["Ahangama Supermarket"],
    aspectRatio: "aspect-[9/16]",
  },
  {
    id: "ahangama-3",
    src: "/assets/gallery/ahangama-3.jpg",
    alt: "Health food, plant-based products and gourmet selections in Ahangama",
    title: "Gourmet Health Food & Plant Milks",
    caption:
      "Extensive specialty collection of barista oat milks, imported gluten-free items, artisan nut butters, kombucha, and wellness snacks.",
    tag: "HEALTH & GOURMET",
    branch: "Ahangama Supermarket",
    branchDetail: "Ahangama Wellness Section",
    categories: ["Ahangama Supermarket", "Artisan & Living"],
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "ahangama-4",
    src: "/assets/gallery/ahangama-4.jpg",
    alt: "Wide supermarket interior and checkout service at Sunpower Super Ahangama",
    title: "Air-Conditioned Coastal Shopping",
    caption:
      "Generous aisle widths, curated chilled beverages, eco-friendly goods, and swift, attentive checkout counters for relaxed coastal provisioning.",
    tag: "COASTAL CONVENIENCE",
    branch: "Ahangama Supermarket",
    branchDetail: "Ahangama Checkout & Drinks",
    categories: ["Ahangama Supermarket"],
    aspectRatio: "aspect-[16/9]",
  },

  // ─── GALLE FORT AUTHENTIC GOOGLE MAPS PHOTOS ───
  {
    id: "fort-1",
    src: "/assets/gallery/fort-1.jpg",
    alt: "Sunpower Galle Fort boutique exterior in UNESCO historic colonial quarter",
    title: "Sunpower Galle Fort Boutique",
    caption:
      "Historic Dutch colonial streetfront inside the UNESCO World Heritage Galle Fort, featuring authentic Ceylon spices, artisan crafts, and healthy living essentials.",
    tag: "UNESCO QUARTER",
    branch: "Galle Fort",
    branchDetail: "Pedlar Street Quarter, Galle Fort",
    categories: ["Galle Fort"],
    aspectRatio: "aspect-[3/4]",
    priority: true,
  },
  {
    id: "fort-2",
    src: "/assets/gallery/fort-2.jpg",
    alt: "Ceylon cinnamon quills, single-estate teas, and premium island spices",
    title: "Pure Ceylon Cinnamon & Rare Teas",
    caption:
      "Finest graded Ceylon Alba and C5 cinnamon, black peppercorns, fragrant cardamom, cloves, and premium single-estate loose-leaf teas.",
    tag: "CEYLON SPICES & TEAS",
    branch: "Galle Fort",
    branchDetail: "Galle Fort Spice Collection",
    categories: ["Galle Fort", "Artisan & Living"],
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "fort-3",
    src: "/assets/gallery/fort-3.jpg",
    alt: "Handcrafted natural herbal soaps, essential oils, and botanical balms",
    title: "Ayurveda Wellness & Botanical Care",
    caption:
      "Chemical-free botanical body care, cold-pressed virgin coconut oil, handmade herbal soaps, citronella balms, and natural essential oils.",
    tag: "HERBAL WELLNESS",
    branch: "Galle Fort",
    branchDetail: "Galle Fort Apothecary",
    categories: ["Galle Fort", "Artisan & Living"],
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "fort-4",
    src: "/assets/gallery/fort-4.jpg",
    alt: "Curated island gifts, preserves and boutique ambiance in Galle Fort",
    title: "Boutique Pantry & Gourmet Gifts",
    caption:
      "Handcrafted wooden shelving showcasing raw forest honey, authentic kithul treacle, tropical fruit chutneys, and bespoke Sri Lankan gift boxes.",
    tag: "HERITAGE PANTRY",
    branch: "Galle Fort",
    branchDetail: "Galle Fort Gift Curation",
    categories: ["Galle Fort"],
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "fort-5",
    src: "/assets/gallery/fort-5.jpg",
    alt: "Artisanal clay pottery and handcrafted island treasures at Sunpower Galle Fort",
    title: "Traditional Clay Cookware & Crafts",
    caption:
      "Sustainable earthenware clay pots, hand-carved coconut shell spoons, woven palmyra baskets, and zero-waste kitchenware made by rural Sri Lankan artisans.",
    tag: "ISLAND ARTISANS",
    branch: "Galle Fort",
    branchDetail: "Galle Fort Artisan Goods",
    categories: ["Galle Fort", "Artisan & Living"],
    aspectRatio: "aspect-[3/4]",
  },

  // ─── EXISTING HIGH-RES STORE & FOUNDER PHOTOS ───
  {
    id: "store-dewata-1",
    src: "/assets/store-dewata-1.jpg",
    alt: "Sunpower Farmers Market Dewata store and fresh market entrance",
    title: "Dewata Flagship Entrance",
    caption:
      "The flagship open-air farmers market destination in Dewata, where southern farmers and conscious eaters connect every day.",
    tag: "DEWATA FLAGSHIP",
    branch: "Dewata Market",
    branchDetail: "Matara Road, Dewata",
    categories: ["Dewata Market"],
    aspectRatio: "aspect-square",
  },
  {
    id: "store-dewata-2",
    src: "/assets/store-dewata-2.jpg",
    alt: "Fresh organic vegetables and seasonal produce selection",
    title: "Farm-Fresh Daily Greens",
    caption:
      "Freshly picked gotukola, organic tomatoes, snake gourd, and traditional southern vegetables harvested without harsh synthetic chemicals.",
    tag: "FARM PICKS",
    branch: "Dewata Market",
    branchDetail: "Dewata Green Produce",
    categories: ["Dewata Market"],
    aspectRatio: "aspect-[9/16]",
  },
  {
    id: "store-dewata-3",
    src: "/assets/store-dewata-3.jpg",
    alt: "Natural body care, essential oils and artisan goods shelves",
    title: "Natural Living & Body Care",
    caption:
      "Mindfully curated natural body care, cold-pressed virgin oils, herbal balms, and eco-friendly home care products.",
    tag: "WELLNESS & LIVING",
    branch: "Dewata Market",
    branchDetail: "Dewata Wellness Corner",
    categories: ["Dewata Market", "Artisan & Living"],
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "store-ahangama-1",
    src: "/assets/store-ahangama-1.jpg",
    alt: "Sunpower Super Ahangama main branch along Matara Road",
    title: "Sunpower Super Ahangama",
    caption:
      "Spacious supermarket with dedicated customer parking, located at the core of Ahangama's vibrant coastal town.",
    tag: "AHANGAMA STORE",
    branch: "Ahangama Supermarket",
    branchDetail: "Matara Road, Ahangama",
    categories: ["Ahangama Supermarket"],
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "store-ahangama-2",
    src: "/assets/store-ahangama-2.jpg",
    alt: "Clean grocery aisles and wholesome packaged foods at Ahangama",
    title: "Wholesome Grocery Rows",
    caption:
      "Organized grocery aisles offering a harmonious mix of wholesome organic foods, pantry essentials, and everyday groceries.",
    tag: "GROCERY AISLES",
    branch: "Ahangama Supermarket",
    branchDetail: "Ahangama Grocery Department",
    categories: ["Ahangama Supermarket"],
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "nadeesha-gayan",
    src: "/assets/nadeesha-gayan.jpg",
    alt: "Mr. Nadeesha Gayan, CEO & Founder of Sunpower Farmers Market & Supermarket",
    title: "Mr. Nadeesha Gayan · CEO & Founder",
    caption:
      "Mr. Nadeesha Gayan, CEO & Founder of Sunpower Farmers Market & Sunpower Supermarket, spearheading organic agriculture, local farmer empowerments, and conscious coastal living across Southern Sri Lanka.",
    tag: "FOUNDER & CEO",
    branch: "Dewata Market",
    branchDetail: "Founder & Leadership",
    categories: ["Dewata Market", "Artisan & Living"],
    aspectRatio: "aspect-square",
  },
];

const CATEGORIES: GalleryCategory[] = [
  "All Photos",
  "Dewata Market",
  "Ahangama Supermarket",
  "Galle Fort",
  "Artisan & Living",
];

export function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All Photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered photos based on active category tab
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All Photos") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.categories.includes(activeCategory));
  }, [activeCategory]);

  // Counts per category for badge indicators
  const categoryCounts = useMemo(() => {
    const counts: Record<GalleryCategory, number> = {
      "All Photos": GALLERY_PHOTOS.length,
      "Dewata Market": GALLERY_PHOTOS.filter((p) => p.categories.includes("Dewata Market")).length,
      "Ahangama Supermarket": GALLERY_PHOTOS.filter((p) =>
        p.categories.includes("Ahangama Supermarket")
      ).length,
      "Galle Fort": GALLERY_PHOTOS.filter((p) => p.categories.includes("Galle Fort")).length,
      "Artisan & Living": GALLERY_PHOTOS.filter((p) => p.categories.includes("Artisan & Living"))
        .length,
    };
    return counts;
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const next = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  const prev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation for lightbox (Esc, Left, Right)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, next, prev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section
      id="photo-gallery"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream border-t border-cream-border/70 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* ─── SECTION HEADER ─── */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-forest/75 uppercase mb-3.5">
                <Sparkle size={13} className="text-sun-orange" weight="fill" />
                <span>AUTHENTIC STORE & MARKET GLIMPSES</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-forest leading-tight tracking-tight">
                A little taste
                <br />
                <em className="italic font-light text-forest/90">of our coastal life.</em>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-forest/70 max-w-xl font-light leading-relaxed">
                Authentic photographs from our three southern locations: Dewata Farmers Market,
                Galle Fort Boutique, and Sunpower Super Ahangama. Captured by visitors, regulars,
                and our dedicated team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-start md:self-end">
              <a
                href="https://www.instagram.com/sunpowerfarmersmarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-forest text-cream hover:bg-forest-light text-xs font-semibold tracking-wide transition-all shadow-sm group"
              >
                <InstagramLogo size={16} className="text-pink-300 group-hover:scale-110 transition-transform" />
                <span>@sunpowerfarmersmarket</span>
                <span className="text-cream/60 group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* ─── CATEGORY FILTER TABS ─── */}
        <SectionReveal>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat];
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange ${
                    isActive
                      ? "text-cream shadow-sm"
                      : "bg-cream-warm text-forest/75 hover:bg-cream-sage/60 hover:text-forest border border-cream-border"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="gallery-masonry"
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-active-pill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-cream/20 text-cream"
                        : "bg-forest/10 text-forest/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* ─── RESPONSIVE MASONRY GRID ─── */}
        <div
          id="gallery-masonry"
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]"
        >
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.3) }}
              className="break-inside-avoid mb-4 inline-block w-full"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                className="group relative w-full rounded-2xl overflow-hidden bg-forest-dark border border-cream-border/70 shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange block text-left"
                aria-label={`View full photo: ${photo.title} (${photo.branch})`}
              >
                {/* Photo container with natural aspect ratio */}
                <div className={`relative w-full ${photo.aspectRatio} overflow-hidden bg-forest/20`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
                    priority={photo.priority}
                    loading={photo.priority ? "eager" : "lazy"}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top badges: Store branch & expand icon */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream/90 backdrop-blur-md text-forest text-[9px] font-semibold tracking-wider uppercase shadow-xs">
                      <MapPin size={10} weight="fill" className="text-sun-orange" />
                      <span>{photo.branch.replace(" Supermarket", "").replace(" Market", "")}</span>
                    </span>

                    <span className="w-8 h-8 rounded-full bg-cream/90 backdrop-blur-md flex items-center justify-center text-forest text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm transform group-hover:rotate-12">
                      <MagnifyingGlassPlus size={15} weight="bold" />
                    </span>
                  </div>

                  {/* Bottom caption block */}
                  <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-1">
                      <span className="inline-block text-[9px] uppercase tracking-widest text-sun-gold font-mono font-semibold">
                        {photo.tag}
                      </span>
                      <h3 className="font-serif text-sm text-cream font-medium leading-snug line-clamp-1 group-hover:text-white transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-cream/70 line-clamp-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── BOTTOM TRUST FOOTNOTE ─── */}
        <SectionReveal>
          <div className="mt-12 pt-8 border-t border-cream-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs text-forest/70 font-light">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Verified Authentic Photography · Sourced directly from Sunpower Farmers Market &
                Supermarket Google Maps captures and store archives.
              </span>
            </div>
            <div className="text-[11px] text-forest/50 font-mono">
              Showing {filteredPhotos.length} of {GALLERY_PHOTOS.length} photographs
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* ─── LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-forest-deep/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${currentPhoto.title}`}
          >
            {/* Top Toolbar: Counter & Close Button */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-cream/15 backdrop-blur-md border border-cream/20 text-cream text-[11px] font-mono tracking-wider">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/10 backdrop-blur-md border border-cream/15 text-cream/80 text-[11px]">
                  <MapPin size={12} weight="fill" className="text-sun-orange" />
                  <span>{currentPhoto.branchDetail}</span>
                </div>
              </div>

              <button
                onClick={closeLightbox}
                className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream/15 border border-cream/25 flex items-center justify-center text-cream hover:bg-cream/30 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange shadow-lg"
                aria-label="Close photo viewer (Esc)"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Lightbox Content Container */}
            <div
              className="relative w-full max-w-5xl flex flex-col items-center justify-center z-10 py-12"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative w-full flex flex-col rounded-2xl overflow-hidden bg-forest-dark border border-cream/20 shadow-2xl"
                >
                  {/* Photo Display */}
                  <div className="relative w-full h-[52vh] sm:h-[62vh] md:h-[68vh] bg-forest-deep flex items-center justify-center overflow-hidden">
                    <Image
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      fill
                      sizes="(max-width: 1280px) 95vw, 1200px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Caption & Branch Info Footer */}
                  <div className="bg-forest-deep/95 backdrop-blur-md p-5 sm:p-6 border-t border-cream/15">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-sun-orange/20 border border-sun-orange/40 text-sun-orange text-[9.5px] uppercase tracking-wider font-semibold font-mono">
                            {currentPhoto.tag}
                          </span>
                          <span className="text-[11px] text-cream/60 flex items-center gap-1">
                            <MapPin size={11} className="text-cream/50" />
                            {currentPhoto.branch}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-2xl text-cream font-medium">
                          {currentPhoto.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-cream/80 font-light leading-relaxed">
                          {currentPhoto.caption}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0 self-end sm:self-center shrink-0">
                        <span className="text-[10px] text-cream/40 hidden md:inline-block font-mono">
                          Navigate: ← → / Esc
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Previous Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-cream/15 border border-cream/25 flex items-center justify-center text-cream hover:bg-cream/30 hover:scale-110 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange z-20 shadow-xl"
              aria-label="Previous photo (Left arrow)"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>

            {/* Next Photo Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-cream/15 border border-cream/25 flex items-center justify-center text-cream hover:bg-cream/30 hover:scale-110 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange z-20 shadow-xl"
              aria-label="Next photo (Right arrow)"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
