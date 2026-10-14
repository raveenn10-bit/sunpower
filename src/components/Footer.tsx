"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp, InstagramLogo, FacebookLogo, WhatsappLogo, Phone, MapPin } from "@phosphor-icons/react";
import { CONTACT_PHONE_PRIMARY, CONTACT_PHONE_SECONDARY, WHATSAPP_INTL_NUMBER, STORES } from "@/data/products";

const FOOTER_GALLERY = [
  {
    image: "/assets/produce.jpg",
    alt: "Fresh organic vegetables and produce at Sunpower Farmers Market",
    tag: "FRESH PICKS",
  },
  {
    image: "/assets/breakfast.jpg",
    alt: "Miss NuTri granola and Nourish yogurt bowls",
    tag: "COASTAL BREAKFAST",
  },
  {
    image: "/assets/market.jpg",
    alt: "Artisan pantry goods and heirloom Sri Lankan grains",
    tag: "SOUTHERN PANTRY",
  },
  {
    image: "/assets/good-food-stamp.svg",
    alt: "Good Food Good Mood Sunpower emblem",
    tag: "GOOD FOOD ✳ GOOD MOOD",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-forest-dark text-cream border-t border-forest-muted">
      {/* ─── VISUAL PHOTO MOSAIC STRIP (DESKTOP & MOBILE) ─── */}
      <div className="border-b border-cream/15 bg-forest-deep">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sun-orange text-lg">✳</span>
              <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cream/90">
                LIFE AT SUNPOWER FARMERS MARKET
              </span>
            </div>
            <a
              href="https://www.instagram.com/sunpowerfarmersmarket/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sun-gold hover:text-cream transition-colors"
            >
              <InstagramLogo size={15} />
              <span>@sunpowerfarmersmarket on Instagram</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {FOOTER_GALLERY.map((item, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/sunpowerfarmersmarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-40 sm:h-48 rounded-xl overflow-hidden bg-forest border border-cream/10 shadow-sm block"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-forest-deep/85 backdrop-blur-sm text-cream text-[8.5px] uppercase tracking-wider font-semibold border border-cream/15">
                  {item.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-cream/15">
          {/* Column 1: Brand & Official Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 focus:outline-none group">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/assets/sunpower-logo-new.png"
                  alt="Sunpower Farmers Market official logo"
                  fill
                  sizes="64px"
                  className="object-contain group-hover:scale-105 transition-transform brightness-0 invert"
                />
              </div>
            </Link>

            <p className="text-xs text-cream/75 leading-relaxed font-light max-w-sm">
              Founded by Mr. Nadeesha Gayan to bring pure, chemical-free food from passionate
              local growers directly to Sri Lanka’s southern coast community.
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs text-cream/80">
              <a
                href="https://www.facebook.com/sunpowerfarmersmarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-sun-orange hover:text-forest-dark transition-colors"
                aria-label="Follow Sunpower on Facebook"
              >
                <FacebookLogo size={16} weight="fill" />
              </a>
              <a
                href="https://www.instagram.com/sunpowerfarmersmarket/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-sun-orange hover:text-forest-dark transition-colors"
                aria-label="Follow Sunpower on Instagram"
              >
                <InstagramLogo size={16} weight="fill" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-sun-orange hover:text-forest-dark transition-colors"
                aria-label="WhatsApp Sunpower"
              >
                <WhatsappLogo size={16} weight="fill" />
              </a>
            </div>
          </div>

          {/* Column 2: Coastal Branches (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-sun-gold">
              Our Coastal Outlets
            </p>
            <div className="space-y-4 text-xs text-cream/80 font-light">
              {STORES.map((s) => (
                <div key={s.id} className="border-l-2 border-cream/20 pl-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="font-serif text-sm text-cream font-medium">
                      {s.name}
                    </strong>
                    <span className="text-[9px] uppercase tracking-wider text-cream/50">
                      {s.tag.split("/")[1] || s.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-cream/65 leading-snug">
                    {s.address.join(" ")}
                  </p>
                  {s.telephone && (
                    <a
                      href={`tel:+94${s.telephone.replace(/\s+/g, "").slice(1)}`}
                      className="inline-block font-mono text-[11px] text-sun-gold hover:text-cream transition-colors"
                    >
                      {s.telephone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Navigation & WhatsApp Action (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-sun-gold">
              Quick Inquiries & Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-cream/80 font-light">
              <li>
                <Link href="/" className="hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-cream transition-colors">
                  The Market
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-cream transition-colors">
                  Our Stores
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cream transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cream transition-colors">
                  Privacy & Terms
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=Hello%20Sunpower!%20I%20would%20like%20to%20inquire%20about%20store%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-5 py-3 rounded bg-sun-orange text-forest-dark text-xs font-semibold tracking-wide hover:bg-sun-amber transition-all shadow-md group"
              >
                <span>WhatsApp Customer Care</span>
                <ArrowUpRight
                  size={15}
                  weight="bold"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <span className="text-[10px] text-cream/50 block mt-1.5 text-center">
                Main Line: {CONTACT_PHONE_PRIMARY} · Mon–Sun
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wider text-cream/60 uppercase">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-cream underline transition-colors">
              Privacy & Website Terms
            </Link>
            <span>·</span>
            <span>© {currentYear} Sunpower Farmers Market</span>
            <span>·</span>
            <span>Southern Sri Lanka</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-cream/80 hover:text-cream transition-colors"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
