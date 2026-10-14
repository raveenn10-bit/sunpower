"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { MobileAutoScroll } from "@/components/MobileAutoScroll";

const GALLERY_PHOTOS = [
  {
    image: "/assets/store-dewata-1.jpg",
    title: "Sunpower Dewata Market",
    caption: "Daily fresh organic produce & farm harvests along Matara Road, Dewata.",
  },
  {
    image: "/assets/store-ahangama-1.jpg",
    title: "Sunpower Super Ahangama",
    caption: "Full coastal supermarket stocked for everyday essentials, travellers and surfers.",
  },
  {
    image: "/assets/store-dewata-3.jpg",
    title: "Natural Living & Wellness",
    caption: "Chemical-free body care, handmade soaps, essential oils and local pantry goods.",
  },
];

export function CommunityGallery() {
  return (
    <section className="bg-cream-dark/50 py-20 sm:py-28 border-b border-cream-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
                COMMUNITY MOMENTS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
                Living closer to nature.
                <br />
                <em className="italic font-normal">Every single day.</em>
              </h2>
            </div>

            <a
              href="https://www.instagram.com/sunpowerfarmersmarket/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-sun-terracotta hover:text-forest border-b border-sun-terracotta pb-0.5 transition-colors self-start md:self-auto"
            >
              <InstagramLogo size={16} />
              <span>Follow @sunpowerfarmersmarket</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </SectionReveal>

        <MobileAutoScroll desktopGridClassName="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="group bg-cream rounded-xl overflow-hidden border border-cream-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 overflow-hidden bg-forest">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-serif text-cream font-medium">
                  {photo.title}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-forest/75 leading-relaxed font-light">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </MobileAutoScroll>
      </div>
    </section>
  );
}
