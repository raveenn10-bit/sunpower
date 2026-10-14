"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useBasket } from "@/context/BasketContext";
import { List, X, ShoppingBag } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "The market" },
  { href: "/about", label: "Our story" },
  { href: "/stores", label: "Our stores" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { totalCount, setIsDrawerOpen } = useBasket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track window scroll to add subtle shadow/border to sticky header
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-border/60 py-3.5"
            : "bg-cream border-b border-cream-border/30 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange rounded"
            aria-label="Sunpower Farmers Market home"
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/assets/sunpower-logo-new.png"
                alt="Sunpower Farmers Market official logo"
                fill
                sizes="48px"
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            id="nav"
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-medium text-forest"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 transition-colors duration-200 hover:text-sun-terracotta ${
                    isActive ? "text-sun-terracotta font-semibold" : "text-forest/85"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-sun-terracotta"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Inquiry List CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-forest text-cream text-xs font-semibold tracking-wide hover:bg-forest-light transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange group"
              aria-label={`View inquiry list, ${totalCount} items`}
            >
              <ShoppingBag
                size={16}
                weight="fill"
                className="text-sun-orange group-hover:scale-110 transition-transform"
              />
              <span className="hidden sm:inline">Your list</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold rounded-full bg-cream text-forest">
                {totalCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="menu"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-forest hover:bg-forest/5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-orange"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-t border-cream-border/60 bg-cream-warm px-6 py-6 shadow-xl overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-base py-1 font-serif transition-colors ${
                        isActive ? "text-sun-terracotta font-semibold" : "text-forest"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 mt-6 border-t border-cream-border flex flex-col gap-2.5 text-xs text-forest/70">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-forest/50">
                  Southern Coast Branches
                </span>
                <span>Dewata: 076 879 3627</span>
                <span>Galle Fort: 10, Leyn Baan Street</span>
                <span>Ahangama: 076 828 0128</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
