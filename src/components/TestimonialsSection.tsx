"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft, ArrowRight, Quotes, ArrowUpRight } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

const TESTIMONIALS = [
  {
    name: "Senali Mendis",
    location: "Dewata Branch",
    stars: 5,
    text: "Highly recommending their Activated Charcoal Face Soap, if you have sensitive skin. After trying many products for years, that irritated my skin, I'm relieved I found this. Restocked more cakes of soap for another 6 months after testing one 😉",
    tag: "Local Regular",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
  },
  {
    name: "Shar Dean",
    location: "Galle Coast",
    stars: 5,
    text: "What a great service! Lovely fresh fruit and veggies delivered to my door. We had a delicious herb omelette for dinner, the flavours were so good. I was delighted to find they had tamarillos - I haven’t had them since my childhood in NZ - they were every bit as good as I remembered. Will definitely be ordering again ☺️",
    tag: "Home Delivery",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
  },
  {
    name: "Lea M",
    location: "Dewata Branch",
    stars: 5,
    text: "I love the Organic Shop. Very good Shampoo und Body wash 😍 and the cashier is always calm nice and friendly.",
    tag: "Store Visitor",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
  },
  {
    name: "Baktybala Torgautova",
    location: "Sunpower Super, Ahangama",
    stars: 5,
    text: "Such a good shop with great varieties of products. Dairy, spices, fruits and vegetables, and beauty care. Staff is welcoming and friendly.",
    tag: "Ahangama Branch",
    mapsUrl: "https://maps.app.goo.gl/4qtkFeNdzpcV4wgYA",
  },
  {
    name: "Ravindu Gimhan",
    location: "Southern Province",
    stars: 5,
    text: "Great selection of organic products and fresh produce! Clean store, good prices, and lovely customer service. My go-to spot for natural and eco-friendly items in the south.",
    tag: "Verified Customer",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
  },
  {
    name: "Ewa Juz",
    location: "South Coast",
    stars: 5,
    text: "Amazing place! We loved the soap from our hotel so asked hosts for directions, great natural products for your body care, coffees & spices!",
    tag: "Tourist / Visitor",
    mapsUrl: "https://maps.app.goo.gl/D6W3dzBxecQL47tf7",
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
    <section className="bg-forest text-cream py-12 sm:py-20 lg:py-28 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-cream/50 uppercase">
                  WHAT PEOPLE SAY
                </span>
                <a
                  href="https://maps.app.goo.gl/D6W3dzBxecQL47tf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 hover:border-sun-orange/60 transition-all group backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span className="text-cream group-hover:text-sun-orange transition-colors">
                    Verified Google Reviews · 5.0 ★
                  </span>
                  <ArrowUpRight
                    size={12}
                    className="text-sun-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-cream leading-tight">
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
              className="bg-cream/8 backdrop-blur-sm border border-cream/15 rounded-2xl p-5 sm:p-10 md:p-14"
            >
              <Quotes size={26} weight="fill" className="text-sun-orange/50 mb-3.5 sm:mb-6 sm:w-9 sm:h-9" />

              <blockquote className="font-serif text-base sm:text-2xl md:text-3xl text-cream leading-relaxed font-light mb-5 sm:mb-8 max-w-3xl">
                &ldquo;{active.text}&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-cream/15">
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

                <div className="flex flex-wrap items-center gap-3">
                  <StarRating count={active.stars} />
                  <span className="text-[10px] uppercase tracking-wider text-cream/50 font-semibold border border-cream/20 px-2 py-0.5 rounded-full">
                    {active.tag}
                  </span>
                  <a
                    href={active.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-wider text-sun-orange hover:text-cream font-medium bg-cream/10 hover:bg-cream/20 border border-cream/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 transition-colors"
                    title="View branch on Google Maps"
                  >
                    <span>Google Review</span>
                    <ArrowUpRight size={11} />
                  </a>
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
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://maps.app.goo.gl/D6W3dzBxecQL47tf7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream hover:text-sun-orange transition-colors"
              >
                <span>Read reviews on Google Maps</span>
                <ArrowUpRight size={14} className="text-sun-orange" />
              </a>
              <span className="text-cream/25 text-xs hidden sm:inline">•</span>
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hi%20Sunpower!%20I%20wanted%20to%20share%20some%20feedback%20about%20my%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-sun-orange hover:text-cream border-b border-sun-orange/50 hover:border-cream pb-0.5 transition-all"
              >
                Message us on WhatsApp ↗
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
