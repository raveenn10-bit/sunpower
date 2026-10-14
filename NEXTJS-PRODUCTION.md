# Sunpower Farmers Market — Next.js Production Build

This website has been rebuilt using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion** (`motion/react`).

## Key Enhancements & Features

1. **Framework & Architecture**:
   - Modern Next.js App Router with Server Components (RSC) and Client interactive leaves.
   - Built with Next.js production optimization (`next build` generates 100% pre-rendered static routes).
   - Fast font loading with `next/font/google` using **Playfair Display** (editorial serif) and **DM Sans** (body).

2. **Animations, Motions & Scroll Effects**:
   - **Scroll Progress Indicator**: Top spring-physics progress bar powered by `motion/react` (`useScroll`, `useSpring`).
   - **Hero Drift & Parallax**: Subtle organic drift animation on background food photography with dual gradient shading.
   - **Continuous Infinite Marquee**: High-performance continuous looping ticker with pause-on-hover (`MarqueeTicker`).
   - **Scroll-Triggered Section Reveals**: Smooth viewport-triggered staggered scroll entrances (`SectionReveal`) across all major sections.
   - **Floating Basket Launcher**: Sleek sticky capsule pill that smoothly appears on scroll (`FloatingBasketPill`) with animated badge and one-click drawer open.
   - **Artisanal Rotating Stamp**: Smooth rotating circular badge ("GOOD FOOD ✳ GOOD MOOD") on the heritage section.
   - **Interactive Inquiry Drawer**: Slide-over drawer with spring physics, body scroll locking, and keyboard escape handling.
   - **Smooth Accordion FAQ**: Fluid height animations with rotating carets.
   - **Toast Notifications**: Animated toast message triggers upon adding/clearing items from the list.
   - **Motion Reduced Accessibility**: Fully respects `prefers-reduced-motion` to disable non-essential animations.

3. **New Interactive Sections Added**:
   - **The Inquiry Ritual (`HowItWorks`)**: 3-step illustrated workflow explaining how browsing, choosing a coastal branch, and human WhatsApp verification work together seamlessly.
   - **Meet Our Makers (`MakersShowcase`)**: Interactive brand spotlight showcasing confirmed partner brands (*Miss NuTri*, *Nourish*, *Ceylon Coconut Company*, and *Momiji Natural*) with tab switching and direct brand inquiry action.
   - **Along the Southern Route (`CoastalRouteExplorer`)**: Interactive coastal journey along the A2 corridor highlighting *Dewata*, *Galle Fort*, and *Ahangama* with vibe details, direct Google Maps directions, and direct phone/WhatsApp actions.

3. **Complete Page Suite**:
   - `/`: Home page with cinematic hero, marquee ticker, The Sunpower Way, featured collections, story, store cards, and FAQ.
   - `/catalogue`: Real-time instant search, category filtering (All, Fresh, Breakfast, Dairy, Pantry, Natural), product cards with quantity badges, and interactive inline inquiry panel.
   - `/about`: Our story, philosophy, founder profile (`Nadeesha Gayan — Co-Founder`), and 3 core values.
   - `/stores`: Detailed branch cards for **Dewata**, **Galle Fort**, and **Ahangama** with verified phone numbers, direct map directions, and WhatsApp links.
   - `/contact`: Direct phone links, validated inquiry form with consent confirmation and WhatsApp message preparation.
   - `/privacy`: Transparent terms and disclosures regarding local browser storage, WhatsApp inquiries, and external services.
   - `404`: Custom branded detour page with quick return navigation.
   - `/sitemap.xml` & `/robots.txt`: Automated Next.js SEO routes.

4. **Inquiry Basket & WhatsApp Integration**:
   - Saved locally via `localStorage['sunpower-inquiry-v1']`.
   - Sanitized against corrupt data, respects 1–99 quantity limits.
   - Generates structured, URL-encoded WhatsApp messages specifying preferred branch and requested items.
   - Explicitly clarifies that all inquiries require branch confirmation and no online checkout or backend payments are processed.

## Development & Production Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start -p 3008

# Run automated Next.js test suite
node test-nextjs.mjs
```
