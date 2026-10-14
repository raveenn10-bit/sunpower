"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, ArrowRight, InstagramLogo } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";

const GALLERY_ITEMS = [
  {
    src: "/assets/market.jpg",
    alt: "Fresh produce display at Sunpower Farmers Market",
    tag: "THE MARKET",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/assets/produce.jpg",
    alt: "Seasonal vegetables and fresh picks at Sunpower",
    tag: "FRESH PICKS",
    span: "",
  },
  {
    src: "/assets/breakfast.jpg",
    alt: "Miss NuTri granola and breakfast selections",
    tag: "BREAKFAST",
    span: "",
  },
  {
    src: "/assets/produce.jpg",
    alt: "Colourful fresh produce selections",
    tag: "DAILY ARRIVALS",
    span: "",
  },
  {
    src: "/assets/breakfast.jpg",
    alt: "Natural food pantry selections at Sunpower",
    tag: "PANTRY",
    span: "",
  },
  {
    src: "/assets/market.jpg",
    alt: "Sunpower store ambiance and shelves",
    tag: "IN-STORE",
    span: "",
  },
];

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const next = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
    );
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        : null
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, next, prev]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 border-t border-cream-border/60">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block mb-3">
                LIFE AT SUNPOWER
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
                A little taste
                <br />
                <em className="italic font-light">of the good life.</em>
              </h2>
            </div>
            <a
              href="https://www.instagram.com/sunpowerfarmersmarket/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-forest/70 hover:text-forest transition-colors border-b border-forest/30 pb-0.5 self-start"
            >
              <InstagramLogo size={15} />
              <span>@sunpowerfarmersmarket</span>
              <span>↗</span>
            </a>
          </div>
        </SectionReveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[260px] gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.button
              key={idx}
              className={`relative rounded-xl overflow-hidden bg-cream-warm group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange ${item.span}`}
              onClick={() => openLightbox(idx)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              aria-label={`View photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                loading={idx === 0 ? "eager" : "lazy"}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Tag */}
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 rounded-full bg-cream text-forest text-[8.5px] uppercase tracking-wider font-semibold shadow-sm">
                  {item.tag}
                </span>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                <span className="text-forest text-xs font-bold">+</span>
              </div>
            </motion.button>
          ))}
        </div>

        <SectionReveal>
          <p className="text-[11px] text-forest/45 mt-6 text-center">
            Photos are illustrative. They do not represent actual Sunpower premises or verified product stock.
          </p>
        </SectionReveal>
      </div>

      {/* ─── LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-forest-deep/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange z-10"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightboxIndex].src}
                alt={GALLERY_ITEMS[lightboxIndex].alt}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-deep/80 to-transparent p-6">
                <span className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold">
                  {GALLERY_ITEMS[lightboxIndex].tag}
                </span>
                <p className="text-sm text-cream font-light mt-1">
                  {GALLERY_ITEMS[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
              aria-label="Previous photo"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
              aria-label="Next photo"
            >
              <ArrowRight size={18} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-cream/60 font-mono">
              {lightboxIndex + 1} / {GALLERY_ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
