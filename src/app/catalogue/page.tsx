"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, Category, STORES } from "@/data/products";
import { useBasket } from "@/context/BasketContext";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass, Plus, Minus, Trash, ArrowUpRight, Check } from "@phosphor-icons/react";

export default function CataloguePage() {
  const {
    basket,
    addItem,
    removeItem,
    updateQuantity,
    clearBasket,
    selectedStore,
    setSelectedStore,
    generateWhatsAppUrl,
  } = useBasket();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.searchKeywords.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const activeInquiryItems = PRODUCTS.filter((p) => (basket[p.id] || 0) > 0);
  const totalBasketCount = Object.values(basket).reduce((acc, count) => acc + count, 0);

  const handleAddClick = (id: string) => {
    addItem(id);
    setJustAddedId(id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === id ? null : curr));
    }, 1200);
  };

  return (
    <div className="space-y-0">
      {/* ─── PAGE HERO ─── */}
      <section className="bg-cream-dark py-16 sm:py-24 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] text-forest/70 uppercase">
            <div className="relative w-4 h-4 rounded-full overflow-hidden bg-cream flex-shrink-0 border border-sun-orange/40">
              <Image src="/assets/sunpower-logo-new.png" alt="Sunpower emblem" fill sizes="16px" className="object-contain p-0.5" />
            </div>
            <span>02 / THE SUNPOWER MARKET</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.05]">
            Discover your
            <br />
            <em className="italic font-light">everyday favourites.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-xl leading-relaxed">
            Browse our artisanal and local market selections. Build an inquiry list.
            <br />
            Let our team confirm flavours, sizes, and pricing directly with you.
          </p>
        </div>
      </section>

      {/* ─── CATALOGUE MAIN AREA ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Toolbar: Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-cream-border">
          {/* Search Input */}
          <div className="w-full md:w-80 space-y-2">
            <label
              htmlFor="catalogue-search"
              className="text-[10px] uppercase tracking-wider font-semibold text-forest/70 block"
            >
              Search the market
            </label>
            <div className="relative">
              <input
                id="catalogue-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try granola, pantry, natural…"
                className="w-full text-xs py-2.5 pl-9 pr-3 bg-white/70 border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
              />
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-forest/40"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-forest/70 block">
              Categories
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter selections by category"
            >
              {CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isSelected}
                    className={`px-3.5 py-1.5 rounded text-xs transition-colors duration-200 border ${
                      isSelected
                        ? "bg-forest text-cream border-forest font-semibold"
                        : "bg-white/60 text-forest/80 border-cream-border hover:bg-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-5 flex items-center justify-between text-xs text-forest/60">
          <p aria-live="polite">
            {filteredProducts.length} selection
            {filteredProducts.length === 1 ? "" : "s"} found
          </p>
          <span className="text-[11px] text-forest/50 hidden sm:inline">
            Selection guide • Not live stock • Confirm in store
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-cream-card/40 rounded-lg border border-cream-border">
            <p className="font-serif text-2xl text-forest">No selections found</p>
            <p className="text-xs text-forest/70">
              Try adjusting your search query or choosing another category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-2 text-xs font-semibold text-sun-terracotta underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentQty = basket[product.id] || 0;
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="bg-cream-card/50 rounded-lg overflow-hidden border border-cream-border flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-64 overflow-hidden bg-cream-border/30">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-cream/95 text-forest text-[9px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                        {product.tag}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 space-y-2">
                      <small className="text-[9px] uppercase tracking-widest text-forest/60 font-semibold block">
                        {product.brand}
                      </small>
                      <h3 className="font-serif text-2xl text-forest font-medium">
                        {product.name}
                      </h3>
                      <p className="text-xs text-forest/75 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom / Action */}
                  <div className="p-6 pt-4 border-t border-cream-border/60 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-forest/60 leading-tight">
                      Price & stock
                      <br />
                      on inquiry
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddClick(product.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all shadow-sm ${
                        isAdded
                          ? "bg-forest-light text-cream"
                          : "bg-forest text-cream hover:bg-forest-light"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} weight="bold" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <span>Add to list</span>
                          <span className="text-sun-orange font-bold">+</span>
                          {currentQty > 0 && (
                            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-cream text-forest text-[10px]">
                              {currentQty}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-12 text-center text-[11px] text-forest/50">
          Illustrative photography • Selection guide, not live stock • Prices confirmed by the store
        </p>
      </section>

      {/* ─── INLINE SHOPPING INQUIRY PANEL ─── */}
      <section
        id="inquiry"
        className="bg-cream-sage py-20 px-6 sm:px-8 border-t border-cream-border/70"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/70 uppercase block">
              YOUR SHOPPING INQUIRY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-forest leading-tight">
              A list of
              <br />
              <em className="italic font-normal">good things.</em>
            </h2>
            <p className="text-xs sm:text-sm text-forest/80 leading-relaxed max-w-sm">
              Choose your preferred store and send your list to our team for branch availability,
              current sizes, and prices.
              <br />
              <br />
              This is an inquiry message; no payment or checkout is made on this website.
            </p>
          </div>

          <div className="lg:col-span-7 bg-cream rounded-xl p-6 sm:p-8 border border-cream-border shadow-lg space-y-6">
            <h3 className="font-serif text-xl text-forest font-normal pb-3 border-b border-cream-border flex items-center justify-between">
              <span>Selected items for inquiry</span>
              <span className="text-xs font-sans text-forest/60">
                {totalBasketCount} item{totalBasketCount === 1 ? "" : "s"}
              </span>
            </h3>

            {/* Inquiry items table */}
            <div className="space-y-3 min-h-[100px]">
              {activeInquiryItems.length === 0 ? (
                <p className="text-xs text-forest/60 py-6 text-center italic">
                  Your list is empty. Add a selection from the market above.
                </p>
              ) : (
                activeInquiryItems.map((product) => {
                  const qty = basket[product.id] || 0;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-4 py-2 border-b border-cream-border/50"
                    >
                      <div>
                        <h4 className="font-serif text-base text-forest">{product.name}</h4>
                        <span className="text-[10px] text-forest/50">{product.brand}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label={`Reduce quantity of ${product.name}`}
                          className="w-7 h-7 rounded border border-cream-border bg-white text-forest flex items-center justify-center hover:bg-forest/5"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="w-6 text-center text-xs font-semibold text-forest"
                          aria-label={`Quantity ${qty}`}
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="w-7 h-7 rounded border border-cream-border bg-white text-forest flex items-center justify-center hover:bg-forest/5"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="ml-2 text-forest/40 hover:text-red-600 transition-colors"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Preferred Branch Selector */}
            <div className="space-y-2 pt-2">
              <label
                htmlFor="inquiry-branch"
                className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider"
              >
                Preferred Store
              </label>
              <select
                id="inquiry-branch"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full text-xs py-3 px-3.5 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
              >
                {STORES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Send Action */}
            <div className="space-y-3 pt-2">
              <a
                href={totalBasketCount > 0 ? generateWhatsAppUrl() : "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (totalBasketCount === 0) {
                    e.preventDefault();
                  }
                }}
                className={`w-full flex items-center justify-between px-6 py-4 rounded text-xs font-semibold tracking-wider transition-all shadow-md group ${
                  totalBasketCount > 0
                    ? "bg-forest text-cream hover:bg-forest-light cursor-pointer"
                    : "bg-forest/40 text-cream/70 cursor-not-allowed"
                }`}
                aria-disabled={totalBasketCount === 0}
              >
                <span>Continue on WhatsApp</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  disabled={totalBasketCount === 0}
                  onClick={clearBasket}
                  className="text-forest/60 hover:text-forest underline transition-colors disabled:opacity-40 disabled:no-underline"
                >
                  Clear list
                </button>
                <span className="text-[10px] text-forest/50">
                  You review and send the message in WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
