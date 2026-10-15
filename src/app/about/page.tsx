import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Our Story & Sustainable Food Philosophy | Southern Sri Lanka",
  description:
    "Learn about Sunpower Farmers Market on Sri Lanka’s southern coast. Founded by Nadeesha Gayan to connect local organic farmers, artisan sourdough bakers, and conscious travelers across Galle Fort, Dewata, and Ahangama.",
  alternates: {
    canonical: "https://sunpowerfarmersmarket.lk/about",
  },
  openGraph: {
    title: "Our Story & Philosophy | Sunpower Farmers Market — Sri Lanka",
    description:
      "Rooted in wholesome food, local makers, artisan sourdough, and mindful living along Sri Lanka’s southern coast.",
    url: "https://sunpowerfarmersmarket.lk/about",
  },
};

const aboutBreadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://sunpowerfarmersmarket.lk",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Our Story",
      item: "https://sunpowerfarmersmarket.lk/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbs) }}
      />
      {/* ─── PAGE HERO ─── */}
      <section className="bg-cream-dark py-16 sm:py-24 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
            03 / OUR STORY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.05]">
            From the south.
            <br />
            <em className="italic font-light">For your everyday.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-xl leading-relaxed">
            A thoughtful food discovery, right in your neighbourhood.
          </p>
        </div>
      </section>

      {/* ─── EDITORIAL STORY ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="relative h-[480px] sm:h-[580px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/assets/market.jpg"
              alt="Sunpower Farmers Market produce shelves"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Floating Official Good Food Stamp */}
            <div className="absolute top-6 right-6 w-24 h-24 rounded-full overflow-hidden shadow-xl animate-stamp select-none pointer-events-none border-2 border-cream/50 z-10">
              <Image
                src="/assets/good-food-stamp.svg"
                alt="Good Food Good Mood official badge"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
              A FRESH PERSPECTIVE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
              Small discoveries.
              <br />
              <em className="italic font-normal">Good everyday habits.</em>
            </h2>

            <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
              Sunpower Farmers Market brings wholesome food and natural product selections
              together on Sri Lanka’s southern coast, with locations in Dewata, Galle Fort, and
              Ahangama.
            </p>

            <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
              From Miss NuTri granola and Nourish yogurt to selections from Momiji Natural and
              Ceylon Coconut Company, our market is a welcoming place to discover something special
              for your daily routine.
            </p>

            <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
              Visit a store to see the latest arrivals, or send a shopping inquiry to our team.
            </p>

            {/* Founder Card with Official Portrait & Title */}
            <div className="pt-6 flex items-center gap-4 border-t border-cream-border">
              <div className="relative w-16 h-16 rounded-full border-2 border-sun-orange overflow-hidden bg-white flex-shrink-0 shadow-md">
                <Image
                  src="/assets/nadeesha-gayan.jpg"
                  alt="Mr. Nadeesha Gayan, CEO & Founder of Sunpower Farmers Market & Sunpower Supermarket"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <strong className="block text-base font-serif font-semibold text-forest">
                  Mr. Nadeesha Gayan
                </strong>
                <small className="block text-xs text-forest/70 font-medium">
                  CEO & Founder, Sunpower Farmers Market & Sunpower Supermarket
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 CORE VALUES ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="border-t border-forest pt-6 space-y-3">
            <span className="font-mono text-xs text-forest/50">01</span>
            <h3 className="font-serif text-2xl text-forest font-medium">Explore thoughtfully</h3>
            <p className="text-xs text-forest/75 leading-relaxed">
              Take a closer look at the selections, ingredients, and brands that fit your everyday
              routine.
            </p>
          </div>

          <div className="border-t border-forest pt-6 space-y-3">
            <span className="font-mono text-xs text-forest/50">02</span>
            <h3 className="font-serif text-2xl text-forest font-medium">Meet local favourites</h3>
            <p className="text-xs text-forest/75 leading-relaxed">
              Discover Sri Lankan brands alongside carefully selected imported food products.
            </p>
          </div>

          <div className="border-t border-forest pt-6 space-y-3">
            <span className="font-mono text-xs text-forest/50">03</span>
            <h3 className="font-serif text-2xl text-forest font-medium">Talk to a real team</h3>
            <p className="text-xs text-forest/75 leading-relaxed">
              Ask our stores for current availability, product details, and prices before you buy.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-cream-sage py-16 px-6 sm:px-8 border-t border-cream-border/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-forest">
            Something on your mind?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded bg-sun-orange text-forest-dark text-xs font-semibold tracking-wider hover:bg-sun-amber transition-all shadow group self-start sm:self-auto"
          >
            <span>Talk to Sunpower</span>
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </div>
  );
}
