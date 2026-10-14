"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Quotes, Sparkle } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

export function FounderFeature() {
  return (
    <section className="bg-forest-dark text-cream py-12 sm:py-16 lg:py-24 relative overflow-hidden border-y border-forest-muted">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sun-amber/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Visual & Heritage Seal */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[340px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-cream/15 group">
                <Image
                  src="/assets/nadeesha-gayan.jpg"
                  alt="Mr. Nadeesha Gayan, CEO & Founder of Sunpower Farmers Market & Sunpower Supermarket"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent" />

                {/* Floating Heritage Badge */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-cream/95 text-forest backdrop-blur-md shadow-lg flex items-center gap-1.5 sm:gap-2 z-10">
                  <Sparkle size={13} weight="fill" className="text-sun-terracotta" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
                    FOUNDED IN SOUTHERN SRI LANKA
                  </span>
                </div>

                {/* Authentic Floating Good Food Stamp */}
                <div className="absolute right-3 top-3 sm:right-4 sm:top-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-2xl animate-stamp select-none pointer-events-none border-2 border-cream/40 z-10">
                  <Image
                    src="/assets/good-food-stamp.svg"
                    alt="Good Food Good Mood official stamp"
                    fill
                    sizes="(max-width: 640px) 64px, 112px"
                    className="object-contain"
                  />
                </div>

                {/* Founder Identity Plaque with Official Logo */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-5 rounded-xl bg-forest/90 border border-cream/20 backdrop-blur-md z-10">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-mono text-sun-gold block mb-1 sm:mb-2">
                    CEO & FOUNDER
                  </span>
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white flex-shrink-0 border-2 border-sun-orange shadow">
                      <Image
                        src="/assets/sunpower-icon.png"
                        alt="Sunpower official emblem"
                        fill
                        sizes="48px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-cream font-medium leading-tight">
                        Mr. Nadeesha Gayan
                      </h3>
                      <p className="text-[10px] sm:text-xs text-cream/70 font-light mt-0.5 line-clamp-1 sm:line-clamp-none">
                        CEO & Founder, Sunpower Farmers Market & Supermarket
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-cream/15 text-[9px] sm:text-[10px] text-cream/60">
                    <span>Dewata</span>
                    <span>·</span>
                    <span>Galle Fort</span>
                    <span>·</span>
                    <span>Ahangama</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Vision & Message */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-7">
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-sun-gold uppercase block">
                  LEADERSHIP & PURPOSE
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-cream leading-[1.15] sm:leading-[1.12]">
                  Pure food for everyone.
                  <br />
                  <em className="italic text-cream-dark font-light">Rooted in our southern soil.</em>
                </h2>
              </div>

              {/* Founder's Key Statement in Sinhala & English */}
              <div className="bg-forest/60 border-l-2 border-sun-orange p-4 sm:p-6 rounded-r-xl space-y-2.5 sm:space-y-3">
                <Quotes size={22} weight="fill" className="text-sun-orange/80 sm:w-7 sm:h-7" />
                <p className="font-serif text-xs sm:text-base lg:text-lg text-cream/95 italic leading-relaxed">
                  &ldquo;බොහෝ දෙනෙක් සිතන්නේ කාබනික හෝ ගුණාත්මක ආහාර විදේශිකයන්ට පමණක් කියායි.
                  නමුත් අපේ දැක්ම වුණේ සාමාන්‍ය පවුල්වලට, දේශීය සැමට සහ සංචාරකයන්ට එකසේ පිරිසිදු,
                  විෂවලින් තොර සැබෑ ගුණාත්මක ආහාර පහසුවෙන් ලබාදීමයි.&rdquo;
                </p>
                <p className="text-[11px] sm:text-xs text-cream/70 leading-relaxed font-light">
                  &ldquo;While many assumed healthy wholefoods were exclusively for tourists, our mission
                  from day one was to make clean, chemical-free nutrition welcoming, accessible, and
                  affordable for every local neighborhood family, expat, and traveler across the southern coast.&rdquo;
                </p>
                <span className="block text-[10px] sm:text-[11px] font-semibold tracking-wider text-sun-gold pt-1">
                  — NADEESHA GAYAN, FOUNDER
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
                <p>
                  Beyond leading Sunpower&apos;s growth across Galle, Dewata, and Ahangama, Nadeesha
                  actively supports regional entrepreneurship through initiatives like the Southern
                  Innovation Hub—connecting local southern farmers, small-batch food creators, and
                  tech innovators to global standards.
                </p>
                <p>
                  Under his direction, Sunpower partners directly with smallholder growers verified
                  through Participatory Guarantee Systems (PGS) and hydroponic cultivation, ensuring
                  fair farm-gate prices and uncompromising freshness on the shelves every morning.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hello%20Sunpower%20team!%20I%20would%20like%20to%20learn%20more%20about%20your%20local%20farm%20partnerships.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded bg-sun-orange text-forest-dark text-xs font-semibold tracking-wider hover:bg-sun-amber transition-all shadow-lg group"
                >
                  <span>Connect with Sunpower</span>
                  <ArrowUpRight
                    size={15}
                    weight="bold"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>

                <a
                  href="https://www.facebook.com/nimesh.gayan.3/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-cream/75 hover:text-cream border-b border-cream/30 pb-0.5 transition-colors"
                >
                  <span>View Founder Profile</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
