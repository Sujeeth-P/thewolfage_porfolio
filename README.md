# The Wolf Age

Portfolio site for The Wolf Age. React 19 + Vite + GSAP (ScrollTrigger) + Framer Motion + Lenis + Tailwind.

## Run it

```bash
npm install
cp .env.example .env     # then fill in the values
npm run dev
npm run build && npm run preview
```

| Variable | Purpose |
| --- | --- |
| `VITE_APP_SCRIPT` | Google Apps Script URL that receives the enquiry form. Without it the form shows an "email us" message instead of failing silently. |
| `VITE_WHATSAPP_NUMBER` | Country code + number, digits only. Leave empty to hide the WhatsApp button. |

## Where to edit things

| What | File |
| --- | --- |
| Hero headline / pitch / button labels | `src/data/constants.js` → `HERO_COPY` |
| Email, WhatsApp text, social links | `src/data/constants.js` (links with an empty `href` are hidden) |
| Services | `src/data/services.js` (the enquiry form's service chips follow this list) |
| Projects | `src/data/projects.js` (add `url` to make a row a link) |
| Tech stack chips | `src/data/constants.js` → `TECH_STACK` |
| SEO title, description, social image, structured data | `index.html` |

## How the page is built (mobile first)

- **Hero is visible immediately.** Headline, one-line pitch and both CTAs render on first paint (CSS-only intro, about 1 second). A crawlable copy of the same content sits in `index.html`.
- **Below the fold is lazy.** Everything after the hero and the "manifesto" reveal is one separate JS chunk, mounted when the browser is idle or the visitor first interacts.
- **Phones get lighter versions** of the heavy sections: Services, Process and Tech Stack are plain vertical layouts instead of long pinned/scrubbed scroll sections; the crowd canvas uses 10 figures instead of 30; no film-grain layer, no backdrop blur, native touch scrolling (Lenis is desktop only and loaded on demand).
- **Reduced motion is respected**: CSS animations stop, Lenis and pinned sections are skipped, Framer Motion honours the OS setting, and the crowd shows a single still frame.
- **Fonts are self-hosted** (`src/assets/fonts`, latin subset) and the hero's fonts are preloaded in `index.html`, so there are no Google Fonts requests and no text shift when fonts arrive.
- **Images**: logos and the crowd are WebP (crowd ≈ 0.6 MB, was 4.5 MB of PNG) and the crowd only loads when it is about to scroll into view.

## Before launch checklist

- [ ] Replace placeholder projects/statistics with real ones (screenshots + links build the most trust).
- [ ] Fill the real social URLs in `src/data/constants.js`.
- [ ] Set `VITE_APP_SCRIPT` and `VITE_WHATSAPP_NUMBER` in your host's environment settings.
- [ ] Serve with long-lived caching for `/assets/*` (hashed filenames) and gzip/brotli.
- [ ] Submit `https://www.thewolfage.live/sitemap.xml` in Google Search Console; claim a Google Business Profile.
- [ ] Run Lighthouse / PageSpeed Insights (mobile) and check LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
