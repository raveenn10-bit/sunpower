import React from "react";
import Link from "next/link";
import { CONTACT_PHONE_PRIMARY, WHATSAPP_INTL_NUMBER } from "@/data/products";

export const metadata = {
  title: "Privacy & Terms",
  description:
    "Privacy and terms of use for Sunpower Farmers Market website. Transparent information about browser storage, WhatsApp inquiries, and external services.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-0">
      {/* ─── PAGE HERO ─── */}
      <section className="bg-cream-dark py-16 sm:py-24 border-b border-cream-border/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-4">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-forest/60 uppercase block">
            06 / A LITTLE TRANSPARENCY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-forest tracking-tight leading-[1.05]">
            Privacy &<br />
            <em className="italic font-light">website terms.</em>
          </h1>
          <p className="text-xs sm:text-sm text-forest/75 max-w-xl leading-relaxed">
            What this website does—and what it doesn’t.
          </p>
        </div>
      </section>

      {/* ─── LEGAL CONTENT ─── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-24 space-y-12">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
            Your information
          </h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            This website does not create customer accounts, accept online payments, or store contact
            form records on a server database. Your inquiry list is saved in your browser using local
            storage so it can stay with you between visits on this device. You can clear it at any
            time using the “Clear list” button in the catalogue or inquiry drawer. If browser
            storage is unavailable, the list functions temporarily for your current session.
          </p>
        </div>

        <div className="space-y-4 border-t border-cream-border pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
            WhatsApp inquiries
          </h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            When you choose to continue on WhatsApp, your selected products and any contact form
            details are assembled into a pre-filled WhatsApp message draft. You review and send that
            message yourself through your own WhatsApp app or web client. Opening the message does
            not mean an order has been placed or paid for. WhatsApp and Meta handle communications
            under their respective privacy policies.
          </p>
        </div>

        <div className="space-y-4 border-t border-cream-border pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
            External services
          </h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            Map directions open Google Maps. Social links open Facebook or Instagram. Fonts are
            served efficiently and securely. This website has no added advertising trackers or
            third-party tracking cookies.
          </p>
        </div>

        <div className="space-y-4 border-t border-cream-border pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
            Catalogue and photography
          </h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            The catalogue is a selection guide and inquiry catalogue, not a live inventory feed. Food
            photography is illustrative and downloaded stock photography. Brands, stock, package
            sizes, prices, and branch availability should always be confirmed directly with the
            Sunpower team.
          </p>
        </div>

        <div className="space-y-4 border-t border-cream-border pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
            Orders, collection, and delivery
          </h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            All shopping inquiries require store confirmation. No delivery coverage, delivery fees,
            payment methods, or return policies are promised by this website. Please agree on all
            arrangements directly with the branch before placing an order or paying.
          </p>
        </div>

        <div className="space-y-4 border-t border-cream-border pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">Contact</h2>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-light">
            For website or privacy questions, contact Sunpower on{" "}
            <a
              href={`https://wa.me/${WHATSAPP_INTL_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sun-terracotta underline"
            >
              {CONTACT_PHONE_PRIMARY}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
