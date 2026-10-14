# Sunpower — Antigravity development package

## Sinhala quick start

1. ZIP file එක extract කරන්න.
2. Antigravity තුළ `Sunpower-Antigravity` folder එක Open Folder කරන්න.
3. `ANTIGRAVITY-MASTER-PROMPT.md` එකේ text එක AI chat එකට copy/paste කරන්න.
4. Website files `website/` folder එක තුළ තියෙනවා. `website/index.html` open කිරීමෙන් basic preview එක බලන්න පුළුවන්; full testing සඳහා local HTTP server භාවිතා කරන්න.
5. වෙනස්කම් ඉවර වුණාම desktop/mobile browser tests කරන්න. Client launch කිරීමට business details සහ images approve කරගන්න.

## Package contents

- `website/`: Complete six-page website, plus 404, CSS, JS, local images, SEO metadata, sitemap and robots file.
- `ANTIGRAVITY-MASTER-PROMPT.md`: Development instructions with five phases.
- `BUSINESS-DETAILS.md`: Business content and verification limitations.
- `verify.mjs`: Source/link/metadata checks (expects a folder named dist).
- `test-interactions.mjs`: Simulated catalogue and WhatsApp-flow tests (expects dist).

To run provided checks, copy `website` to `dist` within this extracted folder, then run `node verify.mjs` and `node test-interactions.mjs`. These are source/simulation tests, not real browser tests.

## Important

## Included motion system

`website/motion.css` and `website/motion.js` add scroll progress, desktop hero parallax, entrance reveals, staggered cards, hover image zoom, button sheen, subtle rotating accents and floating stamps. Animation is lightweight and does not hijack scrolling. Mobile parallax is disabled, and reduced-motion preferences disable nonessential movement. Real browser visual QA is still required.

No server, Firebase, admin panel, live stock, confirmed order processing or online payments is included. The inquiry basket is stored in the visitor's browser. WhatsApp messages are only prepared; the visitor sends them.

The original hosted site's credentials, Git metadata and hosting identity are deliberately not included. Deploy this copy independently. Replace the original `chatgpt.site` canonical/OG URLs and sitemap origin with your own final domain before launch.

Stock photos are illustrative, not actual Sunpower premises or exact product photographs. Replace with owner-approved licensed photographs before launch. The logo was supplied by the user. Font files load from Google Fonts and require an internet connection; serif/sans-serif fallbacks exist.

Browser visual QA and real-device WhatsApp testing were unavailable during the original build. Do not describe this package as fully production-verified until those checks and owner approval are completed.
