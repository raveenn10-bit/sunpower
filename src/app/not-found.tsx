import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Page Not Found",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <div className="space-y-0">
      <section className="bg-cream-dark py-20 sm:py-28 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
            404 / A SMALL DETOUR
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-forest tracking-tight leading-[1.05]">
            Let’s find
            <br />
            <em className="italic font-light">your way back.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-md leading-relaxed">
            The page you’re looking for isn’t here. Explore the market selections or return to the
            home page.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-colors shadow"
          >
            <span>Back to home</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-cream-card text-forest text-xs font-semibold tracking-wider border border-cream-border hover:bg-white transition-colors"
          >
            <span>Browse the market</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/stores"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-cream-card text-forest text-xs font-semibold tracking-wider border border-cream-border hover:bg-white transition-colors"
          >
            <span>Our stores</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
