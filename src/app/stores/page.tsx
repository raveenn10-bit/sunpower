import React from "react";
import Image from "next/image";
import Link from "next/link";
import { STORES } from "@/data/products";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { StoreMapEmbed } from "@/components/StoreMapEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

export const metadata = {
  title: "Our Stores in Galle Fort, Dewata & Ahangama | Southern Sri Lanka",
  description:
    "Find Sunpower Farmers Market locations in Dewata (Galle), historic Galle Fort, and Ahangama on Sri Lanka’s South Coast. Store opening hours, Google Maps directions, international card payment info, and direct villa delivery.",
  alternates: {
    canonical: "https://sunpowerfarmersmarket.lk/stores",
  },
  openGraph: {
    title: "Our Stores in Galle Fort, Dewata & Ahangama | Sunpower Farmers Market",
    description:
      "Find Sunpower Farmers Market locations across Sri Lanka’s southern coast. 3 prime branches: Galle Fort, Dewata Beach, and Ahangama Surf Hub. Open daily.",
    url: "https://sunpowerfarmersmarket.lk/stores",
  },
};

const storeBreadcrumbs = {
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
      name: "Our Stores",
      item: "https://sunpowerfarmersmarket.lk/stores",
    },
  ],
};

export default function StoresPage() {
  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeBreadcrumbs) }}
      />
      {/* ─── PAGE HERO ─── */}
      <section className="bg-cream-dark py-16 sm:py-24 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
            04 / YOUR LOCAL SUNPOWER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.05]">
            Along the coast.
            <br />
            <em className="italic font-light">Close to you.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-xl leading-relaxed">
            Find us in Dewata, Galle Fort, and Ahangama.
            <br />
            Contact your store to confirm current hours and availability before visiting.
          </p>
        </div>
      </section>

      {/* ─── STORES GRID ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {STORES.map((store) => (
            <article
              key={store.id}
              className="bg-cream-card/60 p-8 rounded-xl border border-cream-border flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-forest/70 font-mono">
                  <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white border border-sun-orange/50 flex-shrink-0 shadow-xs">
                      <Image
                        src="/assets/sunpower-icon.png"
                        alt="Sunpower emblem"
                        fill
                        sizes="20px"
                        className="object-cover object-center"
                      />
                    </div>
                    <span>{store.tag}</span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-forest/40 group-hover:text-forest transition-colors"
                  />
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-forest font-medium mb-3">
                    {store.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
                    {store.address.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                <p className="text-xs text-forest/60 italic pt-1 border-t border-cream-border/50">
                  {store.notes}
                </p>

                <div className="pt-2">
                  <span className="block text-[10px] uppercase tracking-wider text-forest/50 font-semibold mb-1">
                    Direct Contact
                  </span>
                  {store.telephone ? (
                    <a
                      href={`tel:+94${store.telephone.replace(/\s+/g, "").slice(1)}`}
                      className="font-mono text-sm font-semibold text-forest hover:text-sun-terracotta transition-colors"
                    >
                      {store.telephone}
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/${store.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-forest hover:text-sun-terracotta transition-colors"
                    >
                      Contact our team on WhatsApp ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-cream-border flex items-center justify-between">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-forest group-hover:text-sun-terracotta transition-colors"
                >
                  <span>Get directions</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`https://wa.me/${store.whatsappNumber}?text=Hi%20Sunpower%2C%20I%20have%20a%20question%20about%20your%20${encodeURIComponent(
                    store.name
                  )}%20store.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-forest/70 hover:text-forest underline transition-colors"
                >
                  Message branch
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE MAP LOCATOR ─── */}
      <StoreMapEmbed />

      {/* ─── AUTHENTIC STORE PHOTO GALLERY ─── */}
      <PhotoGallery />

      {/* ─── VISIT NOTE BANNER ─── */}
      <section className="bg-forest text-cream py-20 px-6 sm:px-8 border-t border-forest-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-cream/60 uppercase block">
              PLAN A LITTLE DISCOVERY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream leading-tight">
              Make your next stop
              <br />
              <em className="italic text-cream-dark font-light">a good one.</em>
            </h2>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed font-light">
              Our range can differ between stores. Send us a message if you’re looking for something
              specific, and our team will gladly guide you before your visit.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-3 px-7 py-4 rounded bg-cream-sage text-forest text-xs font-semibold tracking-wider hover:bg-cream transition-colors shadow-lg self-start md:self-auto"
          >
            <span>Explore the market</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
