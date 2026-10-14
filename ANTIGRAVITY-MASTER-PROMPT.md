# Copy the instructions below into Antigravity

You are a senior frontend developer, UI designer and QA engineer. Continue developing the existing Sunpower Farmers Market website from the `website/` folder in this workspace. This is an existing working static website, not a blank project.

GOAL: Refine it into a cinematic, clean, premium, accessible, mobile-responsive business website, retaining the original green/cream/orange branding, supplied logo, editorial typography and warm market identity. Make improvements in the actual files and verify them. Do not just describe a plan. Do not claim tests passed without executing them.

SCOPE: Six pages: Home, Catalogue, About, Stores, Contact and Privacy; useful 404 page; product inquiry catalogue with search, category filters, quantity list and WhatsApp inquiry. No admin panel, Firebase, payment gateway, customer authentication, server-held customer records or live inventory unless explicitly requested later. Never invent prices, stock, opening hours, organic certifications, reviews, delivery guarantees or business achievements.

PHASE 1 — AUDIT AND PRESERVE
- Read all HTML/CSS/JS and BUSINESS-DETAILS.md before changes.
- Start a local HTTP preview. Inspect desktop and mobile screenshots and identify real layout issues.
- Preserve existing content and business contact links. Back up current files or create a Git commit before significant rewrites.
- Do not rerun an old generator or replace the existing website with a generic template. Edit the existing generated source.
- Keep buildless HTML/CSS/JS unless a framework migration has a clear advantage and is approved by the user.

PHASE 2 — PREMIUM UI AND PERFORMANCE
- Improve hierarchy, spacing, image composition and section transitions. Maintain a readable cinematic hero, tasteful editorial layout, varied section composition and polished navigation/footer.
- Add only lightweight purposeful motion: entrance reveals, image transitions and hover interactions. Respect prefers-reduced-motion and never hide content when JS fails.
- Correct logo sizing and prevent cropping of important brand elements. Use the original uploaded logo rather than inventing a new one.
- Verify viewport widths 360, 390, 768, 1024, 1440 and 1920px. No horizontal overflow, illegible text, overlapping controls or menus clipped by the viewport.
- Use optimized locally stored images, explicit image dimensions or aspect ratios, lazy loading below the fold and stable layout. Do not misrepresent stock images as actual store/product photos.
- Self-host fonts where licensing and assets permit, or retain accessible fallbacks. Avoid adding heavy dependencies.

PHASE 3 — FUNCTIONALITY AND ACCESSIBILITY
- Validate search/category filters, accurate results count and no-results state.
- Validate inquiry list add/remove/increase/decrease, quantity limits, storage failure fallback, corrupted local data handling and clear-list behavior.
- Maintain keyboard focus during basket updates; ensure buttons and inputs have accessible labels, good contrast and comfortable touch targets.
- On WhatsApp continue, include preferred store and item quantities. Explain that store confirmation of products/sizes/prices is required; this is not checkout or a confirmed order.
- Use URL encoding, safe DOM text rendering and no external secret tokens. Open external links with safe rel attributes.
- Contact form must validate name/message and consent. It prepares a message for the visitor to review and send; do not show a false sent/success notification.
- Mobile menu supports keyboard, Escape, active page states and correct aria-expanded behavior. Verify FAQ controls and links.
- Never automatically send WhatsApp messages or make real payments during QA.

PHASE 4 — SEO, BUSINESS ACCURACY AND PRIVACY
- Add appropriate titles/descriptions, canonical URLs, social cards and favicon on each page. Replace old hosted canonical URLs with the user's final domain only after it is supplied; otherwise mark this as a launch blocker.
- Add truthful LocalBusiness/GroceryStore structured data using confirmed details. Do not include ratings, openingHours, geo coordinates or certification claims without evidence.
- Update sitemap/robots and validate page discovery and 404 handling for the chosen hosting platform.
- Keep Privacy page accurate for all scripts/services actually used. Update disclosure if analytics, embeds, font services or data collection change.
- Use BUSINESS-DETAILS.md as the fact baseline. Obtain client confirmation for addresses, telephone routing, branch hours and product listings before public launch. Do not publish owner education or unrelated business roles based only on AI summaries.

PHASE 5 — TEST, FIX AND HANDOVER
- Run JS syntax and source/link/asset checks. Existing verify.mjs and test-interactions.mjs expect `dist/`; adapt the path to `website/` or copy website to dist for testing.
- Run real browser tests for navigation, filters, basket persistence, clearing, validation, mobile menu and all page layouts. Use non-mutating checks only; do not send messages.
- Check keyboard navigation, reduced motion, images, console errors and broken links.
- Record each executed test, outcome and any unverified item. Fix actual failures and retest.
- Provide deployable static files, hosting instructions, final domain/SEO configuration notes and a concise owner launch checklist.
- Do not call it production-ready while visual QA, client verification or actual hosting configuration is still outstanding.

Proceed through these phases now. Ask only when a missing decision changes business scope or requires authorization; otherwise work autonomously within this website scope.
