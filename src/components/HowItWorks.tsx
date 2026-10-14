"use client";

import React from "react";
import { MARKET_STEPS } from "@/data/products";
import { MagnifyingGlass, Storefront, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { MobileAutoScroll } from "@/components/MobileAutoScroll";

const STEP_ICONS = [
  <MagnifyingGlass key="search" size={24} weight="regular" />,
  <Storefront key="store" size={24} weight="regular" />,
  <WhatsappLogo key="wa" size={24} weight="regular" />,
];

export function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 border-b border-cream-border">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
              THE INQUIRY RITUAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
              A thoughtful way
              <br />
              to <em className="italic font-normal">shop the south.</em>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-forest/75 max-w-sm leading-relaxed">
            We believe in fresh, confirmed quality. Here is how our shopping inquiry process connects
            you directly with the store team before you buy.
          </p>
        </div>
      </SectionReveal>

      <MobileAutoScroll desktopGridClassName="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MARKET_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className="group relative bg-cream-card/60 p-7 sm:p-8 rounded-xl border border-cream-border h-full flex flex-col justify-between hover:bg-cream-card hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-sun-terracotta">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-forest group-hover:scale-110 group-hover:bg-forest group-hover:text-cream transition-all shadow-sm">
                  {STEP_ICONS[idx]}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-forest font-medium group-hover:text-sun-terracotta transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-forest/85 leading-relaxed">
                  {step.summary}
                </p>
                <p className="text-xs text-forest/65 leading-relaxed pt-1">
                  {step.detail}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-cream-border/60 flex items-center text-[10px] uppercase tracking-wider font-semibold text-forest/60 group-hover:text-forest">
              <span>Step {step.step} of 03</span>
            </div>
          </div>
        ))}
      </MobileAutoScroll>

      <SectionReveal delay={0.3}>
        <div className="mt-12 p-6 rounded-lg bg-cream-sage/60 border border-cream-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sun-terracotta text-xl">✳</span>
            <p className="text-xs text-forest/80">
              Ready to start your list? Browse our selections and send your inquiries anytime.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:text-sun-terracotta transition-colors border-b border-forest/40 pb-0.5 self-start sm:self-auto"
          >
            <span>Open catalogue</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}
