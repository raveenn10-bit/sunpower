"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Quotes, Sparkle } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

export function FounderFeature() {
  return (
    <section className="bg-forest-dark text-cream py-24 sm:py-32 relative overflow-hidden border-y border-forest-muted">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sun-amber/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Visual & Heritage Seal */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-cream/15 group">
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
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-cream/95 text-forest backdrop-blur-md shadow-lg flex items-center gap-2 z-10">
                  <Sparkle size={14} weight="fill" className="text-sun-terracotta" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    FOUNDED IN SOUTHERN SRI LANKA
                  </span>
                </div>

                {/* Authentic Floating Good Food Stamp */}
                <div className="absolute right-4 top-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-2xl animate-stamp select-none pointer-events-none border-2 border-cream/40 z-10">
                  <Image
                    src="/assets/good-food-stamp.svg"
                    alt="Good Food Good Mood official stamp"
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>

                {/* Founder Identity Plaque with Official Logo */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-forest/90 border border-cream/20 backdrop-blur-md z-10">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-sun-gold block mb-2">
                    CEO & FOUNDER
                  </span>
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white flex-shrink-0 border-2 border-sun-orange shadow">
                      <Image
                        src="/assets/sunpower-icon.png"
                        alt="Sunpower official emblem"
                        fill
                        sizes="48px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium">
                        Mr. Nadeesha Gayan
                      </h3>
                      <p className="text-xs text-cream/70 font-light mt-0.5">
                        CEO & Founder, Sunpower Farmers Market & Sunpower Supermarket
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-cream/15 text-[10px] text-cream/60">
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
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-3">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-sun-gold uppercase block">
                  LEADERSHIP & PURPOSE
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-cream leading-[1.12]">
                  Pure food for everyone.
                  <br />
                  <em className="italic text-cream-dark font-light">Rooted in our southern soil.</em>
                </h2>
              </div>

              {/* Founder's Key Statement in Sinhala & English */}
              <div className="bg-forest/60 border-l-2 border-sun-orange p-6 rounded-r-xl space-y-3">
                <Quotes size={28} weight="fill" className="text-sun-orange/80" />
                <p className="font-serif text-base sm:text-lg text-cream/95 italic leading-relaxed">
                  &ldquo;බොහෝ දෙනෙක් සිතන්නේ කාබනික හෝ ගුණාත්මක ආහාර විදේශිකයන්ට පමණක් කියායි.
                  නමුත් අපේ දැක්ම වුණේ සාමාන්‍ය පවුල්වලට, දේශීය සැමට සහ සංචාරකයන්ට එකසේ පිරිසිදු,
                  විෂවලින් තොර සැබෑ ගුණාත්මක ආහාර පහසුවෙන් ලබාදීමයි.&rdquo;
                </p>
                <p className="text-xs text-cream/70 leading-relaxed font-light">
                  &ldquo;While many assumed healthy wholefoods were exclusively for tourists, our mission
                  from day one was to make clean, chemical-free nutrition welcoming, accessible, and
                  affordable for every local neighborhood family, expat, and traveler across the southern coast.&rdquo;
                </p>
                <span className="block text-[11px] font-semibold tracking-wider text-sun-gold pt-1">
                  — NADEESHA GAYAN, FOUNDER
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-cream/80 leading-relaxed font-light">
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
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hello%20Sunpower%20team!%20I%20would%20like%20to%20learn%20more%20about%20your%20local%20farm%20partnerships.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-sun-orange text-forest-dark text-xs font-semibold tracking-wider hover:bg-sun-amber transition-all shadow-lg group"
                >
                  <span>Connect with Sunpower</span>
                  <ArrowUpRight
                    size={16}
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
