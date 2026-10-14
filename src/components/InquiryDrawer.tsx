"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBasket } from "@/context/BasketContext";
import { PRODUCTS, STORES } from "@/data/products";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash, ArrowUpRight, ShoppingBagOpen } from "@phosphor-icons/react";

export function InquiryDrawer() {
  const {
    basket,
    totalCount,
    removeItem,
    updateQuantity,
    clearBasket,
    selectedStore,
    setSelectedStore,
    isDrawerOpen,
    setIsDrawerOpen,
    generateWhatsAppUrl,
  } = useBasket();

  // Close drawer on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const activeProducts = PRODUCTS.filter((p) => (basket[p.id] || 0) > 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-forest-dark/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer content panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Your inquiry list"
              className="w-screen max-w-md bg-cream shadow-2xl flex flex-col border-l border-cream-border"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-cream-border flex items-center justify-between bg-cream-warm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center font-serif text-sm">
                    {totalCount}
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-forest font-normal">Your Inquiry List</h2>
                    <p className="text-[11px] text-forest/70 uppercase tracking-widest">
                      Sunpower Farmers Market
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-forest/70 hover:text-forest hover:bg-forest/5 transition-colors"
                  aria-label="Close drawer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeProducts.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-forest/5 text-forest/60 mx-auto flex items-center justify-center">
                      <ShoppingBagOpen size={30} weight="light" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif text-lg text-forest">Your list is currently empty</p>
                      <p className="text-xs text-forest/70 max-w-xs mx-auto leading-relaxed">
                        Explore our market selections and add items you would like to inquire about.
                      </p>
                    </div>
                    <Link
                      href="/catalogue"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-sun-terracotta border-b border-sun-terracotta pb-0.5 hover:text-forest transition-colors"
                    >
                      Browse the catalogue ↗
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeProducts.map((product) => {
                      const qty = basket[product.id] || 0;
                      return (
                        <div
                          key={product.id}
                          className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white/70 border border-cream-border/70 shadow-sm"
                        >
                          <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-cream-card">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] uppercase tracking-wider text-forest/60 truncate">
                              {product.brand}
                            </p>
                            <h3 className="font-serif text-base text-forest truncate font-medium">
                              {product.name}
                            </h3>
                            <span className="text-[10px] text-forest/50">Price upon inquiry</span>
                          </div>

                          {/* Stepper controls */}
                          <div className="flex items-center gap-1.5 bg-cream/90 rounded border border-cream-border p-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, -1)}
                              aria-label={`Reduce quantity of ${product.name}`}
                              className="w-6 h-6 rounded flex items-center justify-center text-forest/80 hover:bg-forest/10 hover:text-forest transition-colors"
                            >
                              <Minus size={12} weight="bold" />
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
                              className="w-6 h-6 rounded flex items-center justify-center text-forest/80 hover:bg-forest/10 hover:text-forest transition-colors"
                            >
                              <Plus size={12} weight="bold" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              aria-label={`Remove ${product.name}`}
                              className="w-6 h-6 ml-1 rounded flex items-center justify-center text-red-500/70 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                              <Trash size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {activeProducts.length > 0 && (
                <div className="p-6 border-t border-cream-border bg-cream-warm space-y-4">
                  <div>
                    <label
                      htmlFor="drawer-store-select"
                      className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider mb-1.5"
                    >
                      Preferred store for this inquiry
                    </label>
                    <select
                      id="drawer-store-select"
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
                    >
                      {STORES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded bg-forest text-cream text-xs font-semibold tracking-wide hover:bg-forest-light transition-all shadow-md group"
                  >
                    <span>Continue on WhatsApp</span>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <button
                      type="button"
                      onClick={clearBasket}
                      className="text-forest/60 hover:text-forest underline transition-colors"
                    >
                      Clear list
                    </button>
                    <span className="text-[10px] text-forest/50">
                      You review & send in WhatsApp
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
