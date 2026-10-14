"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  CONTACT_PHONE_PRIMARY,
  CONTACT_PHONE_SECONDARY,
  WHATSAPP_INTL_NUMBER,
  STORES,
} from "@/data/products";
import { useBasket } from "@/context/BasketContext";

export default function ContactPage() {
  const { showToast } = useBasket();
  const [name, setName] = useState("");
  const [store, setStore] = useState("Dewata");
  const [topic, setTopic] = useState("Product availability");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      showToast("Please enter your name and a message.");
      return;
    }

    if (!consent) {
      showToast("Please check the consent box to continue.");
      return;
    }

    const text = `Hello Sunpower!\nName: ${trimmedName}\nPreferred store: ${store}\nTopic: ${topic}\n\n${trimmedMessage}`;
    const url = `https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp message preview…");
  }

  return (
    <div className="space-y-0">
      {/* ─── PAGE HERO ─── */}
      <section className="bg-cream-dark py-16 sm:py-24 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
            05 / LET’S TALK
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.05]">
            Good conversations.
            <br />
            <em className="italic font-light">Fresh possibilities.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-xl leading-relaxed">
            Looking for a product, planning a visit, or enquiring about supplying your brand?
            <br />
            Start here with our team.
          </p>
        </div>
      </section>

      {/* ─── CONTACT LAYOUT ─── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block mb-3">
                CONTACT THE TEAM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest leading-tight">
                A little help,
                <br />
                <em className="italic font-normal">one message away.</em>
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-forest/50 font-semibold block">
                Primary WhatsApp / Phone
              </span>
              <a
                href={`tel:+94${CONTACT_PHONE_PRIMARY.replace(/\s+/g, "").slice(1)}`}
                className="font-serif text-3xl sm:text-4xl text-forest hover:text-sun-terracotta transition-colors block"
              >
                {CONTACT_PHONE_PRIMARY}
              </a>
              <a
                href={`tel:+94${CONTACT_PHONE_SECONDARY.replace(/\s+/g, "").slice(1)}`}
                className="font-serif text-2xl sm:text-3xl text-forest/80 hover:text-sun-terracotta transition-colors block"
              >
                {CONTACT_PHONE_SECONDARY}
              </a>
            </div>

            <div className="pt-4 border-t border-cream-border space-y-4">
              <p className="text-xs text-forest/75 leading-relaxed">
                For store-specific telephone numbers and direct map directions,{" "}
                <Link
                  href="/stores"
                  className="font-semibold text-sun-terracotta underline hover:text-forest transition-colors"
                >
                  visit our stores page ↗
                </Link>
              </p>

              <div className="flex items-center gap-6 text-xs font-semibold text-forest">
                <a
                  href="https://www.facebook.com/sunpowerfarmersmarket/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-sun-terracotta transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://www.instagram.com/sunpowerfarmersmarket/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-sun-terracotta transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-cream-card/70 p-8 sm:p-10 rounded-xl border border-cream-border shadow-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-serif text-2xl sm:text-3xl text-forest font-medium pb-2">
                Start an inquiry
              </h3>

              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider"
                >
                  Your Name <span className="text-sun-terracotta">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full text-xs py-3 px-3.5 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
                />
              </div>

              {/* Store */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-store"
                  className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider"
                >
                  Preferred Store
                </label>
                <select
                  id="contact-store"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  className="w-full text-xs py-3 px-3.5 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
                >
                  {STORES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-topic"
                  className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider"
                >
                  I’d like to ask about
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-xs py-3 px-3.5 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange"
                >
                  <option value="Product availability">Product availability</option>
                  <option value="Opening hours & visiting">Opening hours & visiting</option>
                  <option value="Collection / delivery inquiry">Collection / delivery inquiry</option>
                  <option value="Supplier / brand inquiry">Supplier / brand inquiry</option>
                  <option value="Other question">Other question</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-semibold text-forest/80 uppercase tracking-wider"
                >
                  Your Message <span className="text-sun-terracotta">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  maxLength={1500}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for…"
                  className="w-full text-xs py-3 px-3.5 bg-white border border-cream-border rounded text-forest focus:outline-none focus:ring-2 focus:ring-sun-orange resize-y"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-forest/80 leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-cream-border text-forest focus:ring-sun-orange"
                  />
                  <span>
                    I understand these details will be included in a WhatsApp message that I
                    choose to review and send.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-between px-6 py-4 rounded bg-forest text-cream text-xs font-semibold tracking-wider hover:bg-forest-light transition-all shadow-md group"
                >
                  <span>Continue on WhatsApp</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>

              <p className="text-[10px] text-forest/50 text-center pt-2">
                No form submission is stored on a server.{" "}
                <Link href="/privacy" className="underline hover:text-forest">
                  Privacy details
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
