"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, ArrowUpRight } from "@phosphor-icons/react";
import { STORES } from "@/data/products";

const STORE_MAPS = [
  {
    id: "dewata",
    name: "Dewata",
    label: "01 / GALLE",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0!2d80.2!3d6.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSunpower+Farmers+Market+470B+Matara+Road+Galle!5e0!3m2!1sen!2slk!4v1",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunpower+Farmers+Market+470B+Matara+Road+Galle",
    address: "470/B, Matara Road, Dewata, Galle",
    phone: "076 879 3627",
    color: "bg-sun-orange",
  },
  {
    id: "gallefort",
    name: "Galle Fort",
    label: "02 / INSIDE THE FORT",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0!2d80.2167!3d6.0295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSunpower+Farmers+Market+10+Leyn+Baan+Street+Galle+Fort!5e0!3m2!1sen!2slk!4v1",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunpower+Farmers+Market+10+Leyn+Baan+Street+Galle+Fort",
    address: "10, Leyn Baan Street, Galle Fort",
    phone: null,
    color: "bg-forest",
  },
  {
    id: "ahangama",
    name: "Ahangama",
    label: "03 / DOWN THE COAST",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0!2d80.3667!3d5.975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSunpower+Super+91+Matara+Road+Ahangama!5e0!3m2!1sen!2slk!4v1",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunpower+Super+91+Matara+Road+Ahangama",
    address: "91, Matara Road, Ahangama",
    phone: "076 828 0128",
    color: "bg-sun-amber",
  },
];

export function StoreMapEmbed() {
  const [activeStore, setActiveStore] = useState(0);
  const store = STORE_MAPS[activeStore];

  return (
    <section className="py-20 sm:py-28 bg-cream-dark border-t border-cream-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block mb-3">
              FIND YOUR SUNPOWER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest leading-tight">
              Three stores.
              <br />
              <em className="italic font-light">One southern coast.</em>
            </h2>
          </div>
          <p className="text-xs text-forest/65 max-w-xs leading-relaxed">
            Drop in, explore and take something good home. Contact the team to
            check opening hours before visiting.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 sm:gap-3 mb-8 flex-wrap">
          {STORE_MAPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStore(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange ${
                activeStore === idx
                  ? "bg-forest text-cream shadow-md"
                  : "bg-cream border border-cream-border text-forest/70 hover:border-forest/40 hover:text-forest"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Map + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-cream-border shadow-lg">
          {/* Map embed */}
          <AnimatePresence mode="wait">
            <motion.div
              key={store.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 relative h-72 sm:h-96 lg:h-[420px] bg-cream-warm"
            >
              <iframe
                title={`Map showing ${store.name} Sunpower store location`}
                src={store.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Store info panel */}
          <div className="bg-cream p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-cream-border">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-forest/50 font-semibold block mb-2">
                  {store.label}
                </span>
                <h3 className="font-serif text-3xl text-forest font-medium">
                  {store.name}
                </h3>
              </div>

              <div className="flex items-start gap-3 text-sm text-forest/75">
                <MapPin size={16} className="text-sun-orange mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed text-xs">{store.address}</p>
              </div>

              {store.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-sun-orange flex-shrink-0" />
                  <a
                    href={`tel:+94${store.phone.replace(/\s+/g, "").slice(1)}`}
                    className="font-mono text-sm font-semibold text-forest hover:text-sun-terracotta transition-colors"
                  >
                    {store.phone}
                  </a>
                </div>
              )}

              <p className="text-[11px] text-forest/50 italic leading-relaxed">
                Contact team to confirm opening hours before visiting.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-cream-border mt-6">
              <a
                href={store.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-5 py-3 rounded bg-forest text-cream text-xs font-semibold tracking-wide hover:bg-forest-light transition-all group"
              >
                <span>Get directions</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={`https://wa.me/94776775956?text=Hi%20Sunpower!%20I%20have%20a%20question%20about%20the%20${encodeURIComponent(store.name)}%20store.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between px-5 py-3 rounded border border-forest/30 text-forest text-xs font-semibold tracking-wide hover:border-forest hover:bg-cream-warm transition-all"
              >
                <span>Message branch</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
