# PRD.md — CRUNCHÉ website build plan

**Read `DESIGN.md` first, then this file.** DESIGN.md wins on any conflict.

## How to work

1. Do **one task at a time**, in order: T0, T1, T2 … T19. T20 is optional and runs only on explicit approval.
2. At the start of each task write **"Loading: X, Y"** (max 3 skills, picked from the task, per DESIGN.md §5). Install a skill only when its task needs it: clone to a temp folder, copy only the skill folder to `.agent/skills/<name>/`, delete nested `.git`, read `SKILL.md` first. If it cannot be found, use the fallback and continue.
3. Use the **latest stable version of everything**; verify with `npm view <pkg> version` and `npm ls --depth=0`.
4. Business data lives only in `src/config/site.ts` and `src/data/*.ts`. Mark invented values `TODO(client)`.
5. Before ticking a task: `npm run lint`, `npx tsc --noEmit`, `npm run build`, and Playwright at 390 / 768 / 1440 px (screenshots, console errors, horizontal overflow, tap targets, light and dark).
6. After ticking the box, **stop and wait for the user to say "next"**.

Brand reminders: CRUNCHÉ — *A Little Crunch. A Lot of Joy.* Five flavours (Classic golden, Coconut, Milk, Spicy, Peanut), sizes 100g / 250g / 500g / 1kg, gift boxes (Classic, Celebration, Corporate), ₦, English (`en-NG`), order via WhatsApp.

---

## T0 — Setup and guardrails
**Goal:** an empty folder becomes a clean, lint-safe Next.js 16 project with tokens and fonts in place.
**Loading:** ui-ux-pro-max-skill, andrej-karpathy-skills
**Requirements**
- Create the app in the **current folder**: `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`. Keep `DESIGN.md`, `PRD.md` and `reference/` intact.
- Install `gsap @gsap/react lucide-react` at `@latest`. Nothing else animation-related.
- Exclude `.agent/**` in `eslint.config.mjs` and `tsconfig.json`.
- Enable `cacheComponents: true` in `next.config.ts` and read the Next.js upgrade guide for the installed major.
- Delete template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Ensure only the root `.git` exists.
- `globals.css`: all tokens from DESIGN.md §2 with `html.dark` overrides, fluid type scale, 5px caramel scrollbar (Firefox scoped in `@supports (-moz-appearance: none)`), `scroll-behavior: smooth` with `data-scroll-behavior="smooth"` on `<html>`, reduced-motion rules.
- `next/font`: Fraunces (display) and DM Sans (body) wired as CSS variables.
- Pre-paint theme `<script>` in `<head>` (localStorage with try/catch, fallback `prefers-color-scheme`).
- `src/lib/gsap.ts` registering ScrollTrigger once; `src/lib/reveal.ts` with the shared self-healing `revealOnScroll()` (onEnter, onEnterBack, onRefresh viewport check).
- Folders: `src/components`, `src/data`, `src/config`, `src/lib`, `docs`, `scripts`, `public/images`, `public/videos`.
- Temporary home page that shows the token swatches in light and dark.
**Done when**
- [x] App runs; `npm ls --depth=0` shows latest stable packages; lint, typecheck and build pass with `.agent` present.
- [x] Theme has no flash on reload in both modes; AA contrast confirmed for token pairs.

## T1 — Config, types and data layer
**Goal:** every piece of editable content exists as typed data.
**Loading:** andrej-karpathy-skills, ponytail
**Requirements**
- `src/config/site.ts`: name, tagline, description, locale `en-NG`, currency NGN, nav links, WhatsApp number, phone, email, address, Instagram, TikTok, Google review link, rating, review count, WhatsApp default message, delivery areas. All contact values are the placeholders from DESIGN.md §6, marked `TODO(client)`.
- `src/lib/format.ts`: `formatNaira()`, `formatPhone()`; `src/lib/whatsapp.ts`: `buildWhatsAppLink({ flavour, size, qty })` and a generic builder.
- Types and data in `src/data/`: `flavours.ts` (5 flavours × 4 sizes, ingredients, allergens, taste notes, shelf life, storage, images by category Close-up / Texture / Pack / Serving / Gifting), `gift-boxes.ts` (Classic, Celebration, Corporate), `reviews.ts` (at least 10, labelled "Sample review — replace before launch"), `faqs.ts` (at least 10), `process.ts` (4 steps for "How it's made"), `policies.ts` (draft Terms, Delivery, Refund & Cancellation, Privacy/NDPA, Allergen text with `TODO(client): legal review`).
- Prices are plausible ₦ placeholders marked `TODO(client)`. Image paths follow `public/images/<collection>/<slug>/<category>-<n>.webp` and point to temporary neutral placeholders **until T15**.
**Done when**
- [x] All data typed, no `any`; helpers unit-checked with a quick script or test.
- [x] No business value appears outside `site.ts` or `src/data`.

## T2 — Logo
**Goal:** hand-built inline SVG brand mark.
**Loading:** taste-skill, impeccable
**Requirements**
- `Logo` component with props `tone: "auto" | "light" | "dark"` and `variant: "wordmark" | "mark"`.
- Wordmark: bold serif "CRUNCHÉ" with a golden crunch-burst accent on the É. Mark: small round chin chin cube for favicon and compact use.
- `tone="auto"` follows the theme via tokens; on dark bands it uses `--band-ink` and `--band-accent`.
- Generate `src/app/icon.svg` and an apple-touch icon from the mark. Add accessible name (`role="img"`, `<title>`).
**Done when**
- [x] Crisp at 24px and 240px, readable in light, dark and on band backgrounds.
- [x] Favicon shows in the browser tab.

## T3 — Layout shell
**Goal:** navigation, theme toggle, footer, floating WhatsApp button, cookie banner, route-transition helper.
**Loading:** ui-ux-pro-max-skill, transitions.dev, taste-skill
**Requirements**
- Sticky navbar: logo, links from `site.ts`, `ThemeToggle` (button, `aria-pressed`, 44px), "Order on WhatsApp" button. Mobile: accessible full-screen menu (focus trap, Esc, scroll lock, `aria-expanded`).
- Footer (dark band in both modes): logo, nav, policies links, contact placeholders, social links, allergen note, dynamic year via an async Server Component with `"use cache"` (no `new Date()` in a normal Server Component), NDPA note.
- Floating WhatsApp button (44px+, hidden near the footer, `aria-label`).
- Cookie consent banner (accept / decline / learn more, remembered in localStorage with try/catch, no non-essential cookies before consent).
- `RouteTransition`: on `pathname` change **only** scrolls to top and calls `ScrollTrigger.refresh()`. It must never apply `transform` or `opacity` to the page wrapper.
- Skip link, landmarks, visible focus.
**Done when**
- [x] Shell works at 390 / 768 / 1440 in both themes; keyboard-only navigation works.
- [x] No horizontal overflow; client-side navigation never leaves a blank `<main>`.

## T4 — Hero video: encode and wiring
**Goal:** `reference/hero-raw.mp4` becomes the optimised scroll-scrubbed hero asset set.
**Loading:** gsap-skills, playwright-cli
**Requirements**
- Create `docs/VIDEO.md` and `scripts/encode-hero.sh` (takes the raw file path; runs the desktop and mobile encodes and the zero-P/B-frame verification from DESIGN.md §7.4; prints file sizes and fails if over 12 MB desktop / 5 MB mobile).
- Source must be 1080p (1920×1080). If the raw file is not, stop and tell the user to regenerate it.
- Outputs: `public/videos/hero.mp4`, `hero-mobile.mp4`; posters `public/images/hero-poster.jpg` (first frame) and `hero-poster-end.jpg` (last frame) extracted with ffmpeg.
- Add the poster `<link rel="preload" ... fetchPriority="high" />` in the document head.
- Build a reusable `ScrollVideo` client hook/component implementing every rule in DESIGN.md §7.4 and §7.3 (matchMedia source switch, `activeTl` killed in `mm.add()` cleanup, `loadedmetadata`, clamp, rAF throttle ≥ 1/30 s, `100svh`, reduced-motion/error fallback to end poster, hero scroll-to-top and `refreshPriority: 1` plus `ScrollTrigger.refresh()` after pin).
- If `reference/hero-raw.mp4` is missing, build everything against a clearly marked temporary clip and note it in `docs/VIDEO.md`.
**Done when**
- [x] ffprobe shows only `I` frames for both files; sizes within budget.
- [x] Scrubbing is smooth forward and backward at 390 and 1440; no console errors; StrictMode does not leak triggers.

## T5 — Hero section
**Goal:** the cinematic first screen.
**Loading:** gsap-skills, taste-skill, impeccable
**Requirements**
- Dark band hero with the scrubbed video, big Fraunces headline (draft: "A Little Crunch. A Lot of Joy."), one supporting line, primary CTA "Order on WhatsApp", secondary "Shop flavours".
- Copy and overlay animate with the scroll (subtle, ≤ 24px, transform/opacity only); text always passes AA over the video using a token-based scrim.
- Accessible **Scroll** `<button>` (`min-h-[44px]`, focus ring) smooth-scrolling to `[data-hero-next]`.
- Trust chips under the CTA from data (e.g. "Freshly made", "Gift-ready", "Delivered nationwide") marked `TODO(client)` where unverified.
**Done when**
- [x] LCP < 2.5 s on mobile emulation; CLS < 0.1; reduced-motion shows the end poster with no pin.
- [x] Headline and CTAs legible at all three breakpoints.

## T6 — Home: flavours and benefits
**Goal:** introduce the range right after the hero.
**Loading:** impeccable, taste-skill, gsap-skills
**Requirements**
- "Five flavours, one crunch" section: five flavour tiles (name, tagline, from-price in ₦, "Order" and "View" actions), horizontally scrollable on mobile, grid on desktop.
- Benefits strip (freshly made, premium ingredients, gift-ready packaging, nationwide delivery) with lucide icons.
- Entry animations only via `revealOnScroll()`.
- Temporary imagery is allowed until T15 but must be neutral, token-coloured and clearly temporary.
**Done when**
- [x] Data-driven from `flavours.ts`; keyboard operable; nothing stuck at `opacity: 0` after navigating away and back.
- [x] Temporary imagery is neutral, token-coloured and clearly temporary.

## T7 — Home: How it's made and Our Story
**Goal:** craft and heritage content.
**Loading:** impeccable, taste-skill, reverse-engineer-marketing (copy only)
**Requirements**
- "How it's made" 4-step section from `process.ts` (mix, roll and cut, fry golden, pack fresh) with a subtle scroll progress line.
- Home story teaser and a full `/our-story` page: brand story, values, kitchen standards, allergen and hygiene commitments. Copy is original, warm, Nigerian in spirit, and invented claims are marked `TODO(client)`.
**Done when**
- [x] `/our-story` renders in both themes with no horizontal overflow; copy reviewed for invented facts.

## T8 — Showcase scroll-video section
**Goal:** second scrubbed video moment mid-page.
**Loading:** gsap-skills, taste-skill, playwright-cli
**Requirements**
- Create `scripts/encode-section.sh` mirroring T4 for `reference/section-raw.mp4`; outputs `public/videos/section.mp4`, `section-mobile.mp4`, posters `section-poster.jpg` and `section-poster-end.jpg`.
- `ScrollVideoSection` reusing the T4 `ScrollVideo` logic (pin, matchMedia, cleanup, reduced-motion fallback). Dark band in both modes.
- Overlay copy "Five flavours. One bowl each." with five small labels that highlight in sequence as the scrub progresses, linking to the Shop filtered by flavour.
- Run `ScrollTrigger.refresh()` after the pin so later sections position correctly.
**Done when**
- [x] Both videos verified all-intra and within budget; two pinned sections do not conflict; scrolling up reverses cleanly.

## T9 — Gifting and Corporate
**Goal:** page and home teaser for gift boxes and bulk/wholesale.
**Loading:** impeccable, taste-skill, ui-ux-pro-max-skill
**Requirements**
- `/gifting`: the 3 gift boxes from data (contents, price, minimum order), occasion ideas (weddings, owambe, corporate gifts, festive season), bulk and wholesale tiers, lead times (`TODO(client)`), CTA band (dark) linking to the quote form (built in T12).
- Home section teaser linking to `/gifting`.
**Done when**
- [x] All three boxes render from data with WhatsApp actions; layout verified at all breakpoints.

## T10 — Shop page (catalogue)
**Goal:** searchable, filterable, paginated catalogue.
**Loading:** ui-ux-pro-max-skill, taste-skill, ponytail
**Requirements**
- `/shop` lists flavour cards and gift boxes. Controls: search, filter by flavour and size, sort (popular, price low→high, high→low), **8 per page** with accessible pagination; state kept in URL search params; any client component using `useSearchParams()` wrapped in `<Suspense>`.
- Card: **multiple real images per item** (placeholders until T15) with left/right arrows, dot indicators, touch swipe, and **click-to-open lightbox** (separate from the title link to the detail page). Size selector updates the price; "Order on WhatsApp" pre-fills flavour and size.
- Empty, loading and no-results states. Keep filter logic minimal (ponytail).
**Done when**
- [x] Filters, sort, search and pagination work together and via direct URLs; lightbox is a focus-trapped, Esc-closable dialog; keyboard operable at all breakpoints.

## T11 — Product detail page and Explore modal
**Goal:** `/shop/[slug]` with gallery and categorized photo tour.
**Loading:** ui-ux-pro-max-skill, transitions.dev
**Requirements**
- `await params` inside `<Suspense fallback={...}>`; `generateStaticParams` from data; 404 for unknown slugs.
- Gallery with thumbnails and lightbox; size selector, price, quantity, WhatsApp order button, sticky mobile order bar.
- Clean checklist blocks: taste notes, ingredients, **allergens**, shelf life, storage.
- **"Explore [flavour]"** button opens a categorized photo-tour modal with categories Close-up, Texture, Pack, Serving, Gifting. Header and pills use `shrink-0`; body uses `min-h-0 flex-1 overflow-y-auto`. Focus trap, Esc, labelled.
- Related flavours row.
**Done when**
- [x] Pills never clip at 390px; modal fully keyboard operable; invalid slug shows the not-found page.

## T12 — Forms: quote and contact
**Goal:** gift/bulk quote form and contact page.
**Loading:** ui-ux-pro-max-skill, Nigeria_vibe_compliance
**Requirements**
- `/contact`: contact placeholders, WhatsApp, click-to-call, hours (`TODO(client)`), embedded-free map placeholder card (no third-party iframe).
- Quote form (name, phone `+234` validation, email, occasion, flavours, pack sizes, quantity, event date, delivery state, notes, consent checkbox linking the Privacy Notice). Client-side validation, labelled inputs, inline errors, `aria-live` status.
- Submit builds a WhatsApp message (or `mailto:` fallback). No backend; never claim the order was "submitted", say "Opening WhatsApp".
**Done when**
- [x] Validation, error and success states work by keyboard and screen-reader labels; NDPA consent required.

## T13 — Reviews section
**Goal:** social proof marquee and modal.
**Loading:** taste-skill, gsap-skills, ui-ux-pro-max-skill
**Requirements**
- Pausable **two-row infinite GSAP marquee on both mobile and desktop**, pausing on hover, focus and touch; reduced-motion shows a static scrollable list.
- "Read more" and "Read all reviews" open an accessible **All Reviews modal** (focus trap, Esc, labelled).
- Rating and count from `site.ts`; if still placeholders, do not render numeric claims. "Review us on Google" pill linking to the placeholder review URL.
- Data labelled as sample reviews until real ones exist.
**Done when**
- [x] Marquee loops seamlessly, pauses correctly, no layout shift; modal accessible.

## T14 — FAQ and policy pages
**Goal:** trust and compliance content.
**Loading:** Nigeria_vibe_compliance, ui-ux-pro-max-skill
**Requirements**
- `/faq` with accessible accordion (grouped: ordering, delivery, allergens, storage, gifting and bulk), plus `FAQPage` JSON-LD in T17.
- `/policies/terms`, `/policies/delivery`, `/policies/refunds`, `/policies/privacy` (NDPA-aligned), `/policies/allergens`, rendered from `policies.ts` with a shared layout and in-page contents list. Marked `TODO(client): legal review`.
- Footer links to all of them.
**Done when**
- [x] Every policy route loads; allergen statement matches DESIGN.md §7.9; headings are in logical order.

## T15 — Real photography swap-in
**Goal:** remove every placeholder; wire the generated images.
**Loading:** ui-ux-pro-max-skill, ponytail
**Requirements**
- The user places generated images under `public/images/<collection>/<slug>/<category>-<n>.webp` per the image manifest (Deliverable E). Verify every path referenced in `flavours.ts` and `gift-boxes.ts` exists; list any missing files for the user.
- Update data files with real `src` and descriptive `alt`. Use `next/image` with correct `sizes`, blur placeholders where useful, priority only for above-the-fold images.
- Delete all placeholder SVGs and temporary art. Confirm no placeholder remains with a repo search.
**Done when**
- [x] Zero placeholder images in production; Lighthouse image audits pass; cards, lightbox, gallery and Explore modal show the real photos.

## T16 — Transitions and micro-interactions
**Goal:** polish within the motion budget.
**Loading:** transitions.dev, gsap-skills
**Requirements**
- Button, card and link hover/press states; modal and menu open/close; subtle image reveal; add-to-cart-style feedback on the order button ("Opening WhatsApp").
- All via GSAP or CSS using `transform`/`opacity` only; ≤ 24px, 500–700 ms, `power2.out`; reduced-motion honoured. Re-confirm `RouteTransition` still adds no transform/opacity to the page wrapper.
**Done when**
- [x] No jank in Performance trace; no stuck states after route changes; reduced-motion path verified.

## T17 — SEO, metadata, JSON-LD
**Goal:** discoverability.
**Loading:** ui-ux-pro-max-skill, andrej-karpathy-skills
**Requirements**
- `generateMetadata` per route, Open Graph and Twitter images, canonical URLs, `sitemap.ts`, `robots.ts`.
- JSON-LD: `Organization`, `Product` (with `offers` in NGN), `FAQPage`, `BreadcrumbList`. **No `aggregateRating` until real, verified ratings exist.**
- Descriptive alt text, one `<h1>` per page.
**Done when**
- [x] Rich-result validation passes for the JSON-LD; every route has unique title and description.

## T18 — QA, performance, accessibility
**Goal:** release-ready.
**Loading:** playwright-cli, superpowers, impeccable
**Requirements**
- Playwright run across every route at 390 / 768 / 1440 in light and dark: screenshots, console errors, horizontal overflow, 44px tap targets, keyboard-only walkthrough, client-side navigation loops (home → shop → detail → back) with no blank pages or stuck opacity.
- Lighthouse mobile: LCP < 2.5 s, CLS < 0.1; fix the top issues (video sizes, image sizes, font loading).
- Accessibility pass: landmarks, focus order, modals, forms, contrast.
- Confirm StrictMode causes no duplicate ScrollTriggers; confirm `.agent/**` stays excluded; `npm run build` clean.
- Fix defects found; use superpowers verification before ticking.
**Done when**
- [x] Written QA report in `docs/QA.md` with results and any known limitations; all blocking issues fixed.

## T19 — README and handover docs
**Goal:** the client can edit content without a developer.
**Loading:** andrej-karpathy-skills
**Requirements**
- `README.md`: setup and run commands, project structure, **how to edit** `site.ts` and each `src/data/*.ts` file (with examples: change a price, add a flavour, replace a review, update WhatsApp number), where images live and naming scheme, where the two videos go (`reference/*-raw.mp4` → run `scripts/encode-hero.sh` / `scripts/encode-section.sh` → `public/videos/`), how to re-encode and verify all-intra, how to toggle theme defaults, list of every `TODO(client)` (generate with a grep), deployment notes.
- `docs/VIDEO.md` finalised.
**Done when**
- [x] A non-developer can follow the README to change a price and swap a video; TODO(client) list is complete.

## T20 — OPTIONAL: 3D pack viewer (only if the user explicitly approves)
**Goal:** interactive 3D chin chin pack. **Skip by default.** Three.js is outside the GSAP-only budget; it requires explicit user approval, a bundle-size budget (lazy-loaded, below-the-fold, ≤ 150 KB gzipped extra) and a static-image fallback for reduced-motion and low-power devices. Do not start this task unless the user asks.
**Done when**
- [ ] User approved; lazy-loaded; fallback tested; Core Web Vitals unchanged.

---

## FINAL QA checklist (after T19)
- [x] All tasks ticked, no placeholder images or SVGs, no `lorem ipsum`.
- [x] Every `TODO(client)` is listed in the README for the owner.
- [x] Both videos play forward and backward at 390 and 1440; mobile sources load below 768px.
- [x] Light and dark verified on every page; dark bands stay dark in both.
- [x] WhatsApp links open with the correct pre-filled flavour, size and quantity.
- [x] Lint, typecheck and build pass; `npm ls --depth=0` shows latest stable versions.
