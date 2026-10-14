"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Galle Fort",
    stars: 5,
    text: "Sunpower has completely changed how I shop. The granola selection is incredible, and the team always knows exactly what's in stock. Love that I can just WhatsApp them before visiting!",
    tag: "Regular Customer",
  },
  {
    name: "Tom & Klara",
    location: "Ahangama (Villa Stay)",
    stars: 5,
    text: "We had Sunpower stock our villa for a two-week stay — fresh produce, Nourish yogurt, Ceylon Coconut Company oils. Everything was exactly right. Outstanding personal service.",
    tag: "Villa Guest",
  },
  {
    name: "Raveendra",
    location: "Dewata, Galle",
    stars: 5,
    text: "හොඳම market එක Galle district එකේ. Products ටික fresh, team ටික helpful. WhatsApp message කරාම ගොඩක් ඉක්මනට reply කරනවා.",
    tag: "Local Customer",
  },
  {
    name: "Priya D.",
    location: "Unawatuna",
    stars: 5,
    text: "Discovered Momiji Natural products here that I couldn't find anywhere else in the south. The store feels curated and thoughtful — every visit I find something new.",
    tag: "Wellness Enthusiast",
  },
  {
    name: "James R.",
    location: "Surf Stay, Ahangama",
    stars: 5,
    text: "Perfect for surf recovery! Picked up fresh coconut water, protein granola, and local produce after morning sessions. Friendly team, great range for health-conscious travellers.",
    tag: "Surf Traveller",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < count ? "fill" : "regular"}
          className={i < count ? "text-sun-orange" : "text-forest/20"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="bg-forest text-cream py-20 sm:py-28 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-cream/50 uppercase block mb-3">
                WHAT PEOPLE SAY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-cream leading-tight">
                Loved by our
                <br />
                <em className="italic font-light text-cream-dark">community.</em>
              </h2>
            </div>
            <p className="text-xs text-cream/60 max-w-xs leading-relaxed">
              From local families to visiting surfers — Sunpower is a part of southern Sri Lanka's daily good life.
            </p>
          </div>
        </SectionReveal>

        {/* Main Testimonial Card */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="bg-cream/8 backdrop-blur-sm border border-cream/15 rounded-2xl p-8 sm:p-12 md:p-14"
            >
              <Quotes size={36} weight="fill" className="text-sun-orange/50 mb-6" />

              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-cream leading-relaxed font-light mb-8 max-w-3xl">
                &ldquo;{active.text}&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-cream/15">
                <div className="flex items-center gap-4">
                  {/* Avatar initials circle */}
                  <div className="w-11 h-11 rounded-full bg-sun-orange/20 border border-sun-orange/40 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-sm font-bold text-sun-orange">
                      {active.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-cream">{active.name}</p>
                    <p className="text-xs text-cream/55">{active.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StarRating count={active.stars} />
                  <span className="text-[10px] uppercase tracking-wider text-cream/50 font-semibold border border-cream/20 px-2 py-0.5 rounded-full">
                    {active.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-6 h-2 bg-sun-orange"
                      : "w-2 h-2 bg-cream/25 hover:bg-cream/50"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { prev(); setIsAutoPlaying(false); }}
                className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center text-cream/70 hover:bg-cream/10 hover:text-cream hover:border-cream/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => { next(); setIsAutoPlaying(false); }}
                className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center text-cream/70 hover:bg-cream/10 hover:text-cream hover:border-cream/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <SectionReveal>
          <div className="mt-14 text-center">
            <p className="text-xs text-cream/50 mb-4">
              Share your Sunpower experience
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower!%20I%20wanted%20to%20share%20some%20feedback%20about%20my%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sun-orange hover:text-cream border-b border-sun-orange/50 hover:border-cream pb-0.5 transition-all"
            >
              Message us on WhatsApp ↗
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
