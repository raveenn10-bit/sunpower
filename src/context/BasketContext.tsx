"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { PRODUCTS, WHATSAPP_INTL_NUMBER } from "@/data/products";

const STORAGE_KEY = "sunpower-inquiry-v1";

interface BasketContextType {
  basket: Record<string, number>;
  totalCount: number;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setExactQuantity: (id: string, qty: number) => void;
  clearBasket: () => void;
  selectedStore: string;
  setSelectedStore: (store: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  generateWhatsAppUrl: (store?: string) => string;
}

const BasketContext = createContext<BasketContextType | null>(null);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [selectedStore, setSelectedStore] = useState<string>("Dewata");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // Load and sanitize initial basket from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const raw = JSON.parse(stored);
        if (raw && typeof raw === "object" && !Array.isArray(raw)) {
          const sanitized: Record<string, number> = {};
          for (const product of PRODUCTS) {
            const qty = raw[product.id];
            if (Number.isInteger(qty) && qty > 0 && qty <= 99) {
              sanitized[product.id] = qty;
            }
          }
          setBasket(sanitized);
        }
      }
    } catch {
      // Storage unavailable or corrupted; start empty
    }
    setHasLoaded(true);
  }, []);

  // Save changes to localStorage whenever basket state updates
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
    } catch {
      // Ignore private browsing or quota errors
    }
  }, [basket, hasLoaded]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const addItem = useCallback(
    (id: string) => {
      if (!PRODUCTS.some((p) => p.id === id)) return;
      setBasket((prev) => {
        const current = prev[id] || 0;
        return { ...prev, [id]: Math.min(99, current + 1) };
      });
      showToast("Added to your inquiry list");
    },
    [showToast]
  );

  const updateQuantity = useCallback((id: string, delta: number) => {
    setBasket((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: Math.min(99, next) };
    });
  }, []);

  const setExactQuantity = useCallback((id: string, qty: number) => {
    setBasket((prev) => {
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: Math.min(99, qty) };
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setBasket((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  const clearBasket = useCallback(() => {
    setBasket({});
    showToast("Inquiry list cleared");
  }, [showToast]);

  const totalCount = useMemo(() => {
    return Object.values(basket).reduce((acc, q) => acc + q, 0);
  }, [basket]);

  const generateWhatsAppUrl = useCallback(
    (storeOverride?: string) => {
      const store = storeOverride || selectedStore || "Dewata";
      const itemsList = PRODUCTS.filter((p) => basket[p.id])
        .map((p) => `• ${p.name} — quantity requested: ${basket[p.id]}`)
        .join("\n");

      const message = `Hello Sunpower!\nPreferred store: ${store}\n\nPlease confirm the availability, sizes and prices of:\n${itemsList}\n\nThis is a shopping inquiry. Please confirm details before an order is placed.`;

      return `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(message)}`;
    },
    [basket, selectedStore]
  );

  return (
    <BasketContext.Provider
      value={{
        basket,
        totalCount,
        addItem,
        removeItem,
        updateQuantity,
        setExactQuantity,
        clearBasket,
        selectedStore,
        setSelectedStore,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        showToast,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}
