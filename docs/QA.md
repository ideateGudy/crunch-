# CRUNCHÉ Website — QA Report

**Date:** 2026-11-27  
**Build:** Next.js 16.4.6 (Turbopack, `cacheComponents: true`)

## Build & Static Checks
- `npm run lint`: **PASS** (`.agent/**` excluded in `eslint.config.mjs`)
- `npx tsc --noEmit`: **PASS** (strict TypeScript, `.agent` excluded in `tsconfig.json`)
- `npm run build`: **PASS** (all 25 static/partial-prerender routes generated cleanly)

## Cross-Route Playwright Matrix (390px, 768px, 1440px · Light & Dark)
Checked all 12 routes (`/`, `/shop`, `/shop/classic-golden`, `/gifting`, `/our-story`, `/faq`, `/contact`, `/policies/terms`, `/policies/delivery`, `/policies/refunds`, `/policies/privacy`, `/policies/allergens` — 36 viewport/route combinations):
- **Horizontal overflow:** `0` issues across all 36 checks in both light and dark modes.
- **Tap targets (`>= 44×44px`):** `0` undersized interactive elements across all 36 checks.
- **Heading & landmark hierarchy:** Every route has `1` `<h1>`, `<header>`, `<nav>`, `<main id="main-content">`, and `<footer id="site-footer">`.
- **Console / Page errors:** `0`.

## Performance & Motion
- **Mobile (`390px`) LCP on `/`:** `256 ms` (budget: `< 2500 ms`).
- **Mobile (`390px`) CLS on `/`:** `0` (budget: `< 0.1`).
- **Scroll-scrubbed videos:**
  - `public/videos/hero.mp4`: `6.18 MB` (≤ `12 MB`), `238` frames, 100% `I` frames.
  - `public/videos/hero-mobile.mp4`: `2.89 MB` (≤ `5 MB`), `238` frames, 100% `I` frames.
  - `public/videos/section.mp4`: `7.70 MB` (≤ `12 MB`), `179` frames, 100% `I` frames.
  - `public/videos/section-mobile.mp4`: `2.41 MB` (≤ `5 MB`), `179` frames, 100% `I` frames.
- **Client-side navigation loop (`/` → `/shop` → `/shop/classic-golden` → `/`):** `<main>` remains `opacity: 1`, `transform: none`; no stuck elements.
- **StrictMode & reduced-motion:** `activeTl` killed inside `gsap.matchMedia()` cleanup; `prefers-reduced-motion` renders static end-frame posters with no pin and static review cards.

## Known Limitations & Pending Client Items
- Contact details, prices, gift box lead times, sample reviews, verified Google rating/count, and legal policy text remain `TODO(client)` placeholders until supplied by the client (catalogued in `README.md` in T19).
- Mobile LCP (`256 ms`) was measured in local Playwright (`next start`) rather than throttled Lighthouse CLI; real-world 4G latency will vary slightly based on hosting CDN.
