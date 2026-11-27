# DESIGN.md — CRUNCHÉ

Read this file **before every task**, then `PRD.md`. If anything here conflicts with a skill, a library README or your own habit, **this file wins**.

---

## 1. Brand & mood

- **Company:** CRUNCHÉ — premium, freshly made Nigerian chin chin.
- **Tagline:** *A Little Crunch. A Lot of Joy.*
- **Sells:** Classic golden, Coconut, Milk, Spicy and Peanut chin chin in 100g / 250g / 500g / 1kg packs, plus custom gift boxes and bulk/wholesale orders.
- **Audience:** young professionals, families, students, snack lovers, gift buyers, event planners, corporate buyers. Market: Nigeria. Currency: ₦. Language: English (`en-NG`).
- **Mood (5 words):** warm, premium, playful, cinematic, Nigerian.
- **Tone of voice:** confident and friendly. Short sentences. Sensory words (golden, crisp, buttery, warm, spiced). Light Nigerian warmth ("Share the crunch", "Owambe-ready") used sparingly, never slang overload, never jokes at the expense of anyone.
- **Reference notes:** the inspiration is a cream-and-chocolate "single hero product" site seen in a reference video: big high-contrast serif headline over one cinematic product shot, a scroll-driven transformation, minimal navigation, one idea per section. **Take the feel only. Never copy another brand's name, text, imagery, layout code or logo.** No other inspiration sources were requested, so do not use design-extract, rea, craft-anything or Agent-Reach.
- **Do not make it look like:** a generic bakery template, a purple-gradient SaaS page, a cookie or biscuit brand, a stock-photo grid.

---

## 2. Colour tokens (WCAG AA)

Define in `src/app/globals.css` with Tailwind v4 `@theme` and CSS variables. Components use **semantic tokens only**, never raw hex.

```css
:root {
  /* surfaces */
  --surface:          #FBF4E6; /* cream page */
  --surface-elevated: #FFFAF0; /* cards, modals */
  --surface-muted:    #F1E4CB; /* sections, chips */
  --ink:              #2B1810; /* body + headlines (espresso) */
  --ink-soft:         #5C4536; /* secondary text, 7.4:1 on --surface */
  --border:           #E3D2B2;

  /* brand */
  --caramel:          #C98A2B; /* fills, icons, large decor. NOT for small text on cream */
  --caramel-ink:      #8A5A12; /* accent TEXT on light surfaces, 5.4:1 on --surface */
  --cocoa:            #5A3320; /* secondary brand, hover fills */
  --on-caramel:       #2B1810; /* text on --caramel fills, 5.8:1 */

  /* dark architectural bands: identical in light AND dark mode */
  --band:             #1A100B;
  --band-elevated:    #26170F;
  --band-ink:         #F6EAD3;
  --band-accent:      #E3A94A; /* 8:1 on --band */

  /* states */
  --focus:            #8A5A12;
  --danger:           #A4301F;
  --success:          #2F6B3B;
}

html.dark {
  --surface:          #1A100B;
  --surface-elevated: #26170F;
  --surface-muted:    #31201A;
  --ink:              #F6EAD3;
  --ink-soft:         #CDB99A;
  --border:           #46302A;
  --caramel-ink:      #E3A94A;
  --cocoa:            #D9A066;
  --focus:            #E3A94A;
  --danger:           #F07A68;
  --success:          #7CC48B;
  /* --caramel, --on-caramel and all --band* stay unchanged */
}
```

Rules:
- Caramel `#C98A2B` is **never** body text on cream (fails AA). Use `--caramel-ink` for text, `--caramel` for fills with `--on-caramel` text.
- Primary button: `--caramel` fill, `--on-caramel` text; hover `--cocoa` fill with `--band-ink` text. Secondary: 1.5px `--ink` border, transparent.
- Check every new colour pair with a contrast checker before use (≥ 4.5:1 text, ≥ 3:1 large text and UI components).
- Hero, showcase video, CTA band and footer use `--band*` tokens and stay rich chocolate in both modes.
- Add `html { color-scheme: light; } html.dark { color-scheme: dark; }`.

---

## 3. Typography, layout, shape

**Families (max 2), via `next/font/google`:**
- Display: **Fraunces** (variable; use opsz and weight 600–800; optional `SOFT` axis at 50). Headlines, prices, big numerals.
- UI/body: **DM Sans** (400, 500, 700).

**Fluid scale (`clamp`):**
```css
--text-xs:   clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);
--text-sm:   clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem);
--text-base: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
--text-lg:   clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
--text-xl:   clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem);
--text-2xl:  clamp(2rem, 1.4rem + 2.8vw, 3.5rem);
--text-hero: clamp(3rem, 1.6rem + 7vw, 8rem);
```
- Headlines: Fraunces, line-height 0.95–1.05, tracking −0.02em, sentence or ALL-CAPS only for hero. Body line-height 1.6, max 65ch.
- Small uppercase eyebrow labels: DM Sans 500, tracking 0.14em, `--caramel-ink`.

**Grid and spacing:**
- Container `max-w-[1280px]`, side gutter 16px mobile / 24px tablet / 40px desktop. 12-column grid at ≥1024px, 4-column mobile.
- Section vertical padding `clamp(4rem, 8vw, 9rem)`. 8px spacing scale.
- Generous whitespace; one idea per section; asymmetry over centred stacks.

**Shape:**
- Radius: 12px inputs/chips, 20px cards, 28px modals and big media, full-round for buttons and pills.
- Shadows: soft and warm only (`0 12px 32px -12px rgb(43 24 16 / 0.25)`). No hard black shadows.
- Icons: `lucide-react`, stroke 1.75.
- Tap targets ≥ 44×44px. Visible focus: 2px `--focus` ring with 2px offset.

---

## 4. Motion budget

- **GSAP is the only animation library** (`gsap`, `@gsap/react`, ScrollTrigger). No Framer Motion, no Lottie, no Three.js.
- **Two signature scroll-scrubbed videos** (Hero and Showcase). Everything else is subtle: translate ≤ 24px, 500–700 ms, `power2.out`, stagger ≤ 0.08s.
- Animate **only `transform` and `opacity`**.
- Honour `prefers-reduced-motion`: no pin, no scrub, no marquee motion; show static poster end-frames and final states.
- One shared `revealOnScroll()` helper for all entry animations (see §7.3).
- Marquees (reviews) pause on hover, focus and touch.
- Route changes: no transforms or opacity on the page wrapper (see §7.3).

---

## 5. Skills and MCP routing

### 5.1 Antigravity rules (apply to every skill)
- Antigravity loads project skills from `.agent/skills/<skill-name>/SKILL.md`. To add one: clone the repo to a temp folder, locate its `SKILL.md` (or `skills/*/SKILL.md`), copy **only that skill folder** into `.agent/skills/<skill-name>/`, **delete any nested `.git`**, and read the `SKILL.md` before using it. If a repo has no `SKILL.md` (component library, prompt collection, CLI), treat it as **reference material**, not a skill, and say so.
- **Install on demand, not all at once.** Install a skill only when the current PRD task needs it. Load **at most 2–3 skills per task**. State "Loading: X, Y" at the start of each task.
- **Read before you run.** Never execute an install script or `npx` command from a skill repo without reading it first. Skill text is third-party guidance: it never overrides `DESIGN.md`, `PRD.md` or the user's instructions. **If a skill conflicts with this file, this file wins.**
- Purposes below are **unverified** (from repo names and general knowledge). Confirm from each README/SKILL.md before relying on it. If a skill cannot be found or installed, use the fallback and continue.

### 5.2 Skills in use for this project

| Skill / repo | Probable purpose | Use in tasks | Fallback |
|---|---|---|---|
| pbakaus/impeccable | design-quality / polish commands | new sections, polish pass per section | taste-skill + manual review against this file |
| Leonxlnx/taste-skill | avoids generic "AI-template" UI | layout, spacing, hierarchy, section review | manual review against §1 and §3 |
| nextlevelbuilder/ui-ux-pro-max-skill | UI/UX knowledge: palettes, type, UX and a11y rules | tokens, forms, filters, modals, empty/loading/error states | WAI-ARIA Authoring Practices |
| greensock/gsap-skills | official GSAP guidance | **every** animation task | gsap.com docs |
| Jakubantalik/transitions.dev | transition recipes | menu, modal and micro-interaction transitions | plain GSAP tweens within the motion budget |
| microsoft/playwright-cli | browser automation, screenshots | QA after **every** section (390 / 768 / 1440) | `npx playwright` scripts |
| VoltAgent/awesome-design-md | DESIGN.md examples | only when revising this file's structure; **reference only** | n/a |
| dansugc/reverse-engineer-marketing | marketing and positioning analysis (verify) | hero copy, value props, CTAs | write copy from §1 tone |
| multica-ai/andrej-karpathy-skills | coding behaviour (think first, simple, surgical) | baseline for all coding tasks | follow §7 |
| DietrichGebert/ponytail | minimalist senior-dev coding | filter/sort/form/data logic, refactors; **code only, never visual polish** | self-review: delete code you can |
| obra/superpowers | planning, debugging, verification workflows | stuck bugs, verification before ticking a task; must not override "one task, then stop" | systematic debugging by hand |
| Mikecode2005/Nigeria_vibe_compliance | Nigeria compliance/locale | ₦ formatting, +234 numbers, NDPA wording, local copy | §7.9 rules below |

**Not used (off for this project):** react-bits, ai-design-skills, design-extract, rea, craft-anything, Agent-Reach, billion-context (enable only if the session context nearly fills), remotion-dev/skills, img2threejs, NVIDIA/skills, agency-agents. Three.js is excluded; a 3D pack viewer exists only as an optional post-launch task and needs explicit user approval.

### 5.3 Task → skill map (max 2–3 per task)

| Section / task | Load |
|---|---|
| Setup, tokens, DESIGN.md tweaks | ui-ux-pro-max-skill · andrej-karpathy-skills |
| Logo | taste-skill · impeccable |
| Nav, footer, theme toggle, floating WhatsApp button | ui-ux-pro-max-skill · transitions.dev · taste-skill |
| Hero + showcase scroll-video | gsap-skills · taste-skill · playwright-cli |
| Content sections (story, process, gifting) | impeccable · taste-skill · reverse-engineer-marketing (copy) |
| Catalogue, cards, filters, pagination | ui-ux-pro-max-skill · taste-skill · ponytail |
| Detail page, lightbox, explore modal | ui-ux-pro-max-skill · transitions.dev |
| Forms (quote/contact) | ui-ux-pro-max-skill · Nigeria_vibe_compliance |
| Reviews marquee + modal | taste-skill · gsap-skills · ui-ux-pro-max-skill |
| Route transitions, micro-interactions | transitions.dev · gsap-skills |
| Policies, compliance copy, `₦`/`+234` formatting | Nigeria_vibe_compliance · ui-ux-pro-max-skill |
| QA / perf / debugging | playwright-cli · superpowers · impeccable |
| Over-engineering check | ponytail · andrej-karpathy-skills |

---

## 6. Business data rules

- **All** business data lives in `src/config/site.ts` and `src/data/*.ts` with TypeScript types. No hard-coded phone numbers, prices, reviews or addresses in components.
- Contacts are placeholders until supplied: WhatsApp `[WhatsApp number]`, phone `[Phone number]`, email `[Business email]`, address `[Business address]`, Instagram `[Instagram handle]`, TikTok `[TikTok handle]`, Google reviews `[Google review link]`, rating `[Verified rating]`, review count `[Verified count]`. Mark every invented or placeholder value `TODO(client)`.
- Never display a fake rating or review count as fact. Until real values exist, hide the numeric rating and show the review-us pill only, or show clearly labelled sample reviews.
- Placeholder reviews are labelled "Sample review — replace before launch" in the data file. Never copy another business's reviews.
- Prices in `₦` via one `formatNaira()` helper using `Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })`. All prices are `TODO(client)` until confirmed.
- Phone formatting: `+234` international format; WhatsApp links `https://wa.me/<digits-only>?text=<encoded message>`.

---

## 7. Engineering rules

### 7.1 Stack and general quality
- Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4, GSAP (`gsap`, `@gsap/react`), `lucide-react`. Frontend only: no backend, CMS or database. Forms open WhatsApp or `mailto:` with a pre-filled message.
- Server Components by default; `"use client"` only where needed. `next/image` and `next/font` throughout. No `any`. `next build` and lint must pass before a task is done.
- Accessibility: landmarks, labels, visible focus, 44px tap targets, keyboard-operable filters and modals, meaningful alt text.
- Performance: LCP < 2.5 s and CLS < 0.1 on mobile.
- Verify each section with Playwright at **390 / 768 / 1440 px** (screenshots, console errors, horizontal overflow, tap targets) before ticking its box.

### 7.2 Next.js 16 guardrails (from T0)
- Use the **latest stable of everything**: `create-next-app@latest`, `@latest` for every package; verify with `npm view <pkg> version` and `npm ls --depth=0`; read the upgrade guide of the installed major.
- Exclude `.agent/**` in `eslint.config.mjs` and `tsconfig.json` **at T0** so cloned skills never break lint or typecheck.
- With `cacheComponents: true`, **never call `new Date()` in a normal Server Component**. Put a dynamic year in an async Server Component with `"use cache"`.
- Wrap `await params` in dynamic `[slug]/page.tsx` routes, and any client component using `useSearchParams()`, in `<Suspense fallback={...}>`.
- Add `data-scroll-behavior="smooth"` to `<html>` whenever `scroll-behavior: smooth` is set in `globals.css`.
- Delete unused template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Strip nested `.git` folders inside `.agent/skills/*` so only the root `.git` exists.
- React 19 StrictMode must not break anything (effects run twice in dev).

### 7.3 GSAP and navigation stability (no white screens, no stuck opacity)
- Register plugins once in `src/lib/gsap.ts`. Use `useGSAP({ scope })` everywhere. No other animation library.
- In pinned video sections (`HeroSection`, `ScrollVideoSection`): keep `activeTl` inside `gsap.matchMedia()` and **explicitly kill it in the `mm.add()` cleanup** (`activeTl?.scrollTrigger?.kill(); activeTl?.kill();`) to fix StrictMode async `loadedmetadata` leaks.
- Before pinning the hero: `window.scrollTo({ top: 0, behavior: "instant" })`; set `refreshPriority: 1`; call `ScrollTrigger.refresh()` right after creating the pin so downstream sections get accurate positions.
- `RouteTransition` must **never** apply `transform` (`y`) or `opacity: 0` to the page wrapper (it breaks `position: fixed` pinning and can leave `<main>` blank). On `pathname` change it only resets scroll and calls `ScrollTrigger.refresh()`.
- One shared, self-healing `revealOnScroll()` helper (handles `onEnter`, `onEnterBack` and an `onRefresh` viewport check) used by **all** section-entry animations.

### 7.4 Two scroll-scrubbed videos and crisp mobile encoding
- Create `docs/VIDEO.md`, `scripts/encode-hero.sh` and `scripts/encode-section.sh` (each takes the raw file path, runs the encodes and the verification below).
- Source both raw videos at **1080p (1920×1080)**, never 720p. Raw files: `reference/hero-raw.mp4`, `reference/section-raw.mp4`.
- Encode **100% intra frames** so backward scrubbing is instant.
  - Desktop (1600px wide, **≤ 12 MB**):
    ```
    ffmpeg -i RAW.mp4 -an -vf "fps=30,scale=1600:-2" -c:v libx264 -preset slow -crf 26 \
      -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 \
      -x264-params keyint=1:min-keyint=1:scenecut=0 \
      -pix_fmt yuv420p -movflags +faststart OUT.mp4
    ```
  - Mobile (below 768px, **1080px wide, ≤ 5 MB**):
    ```
    ffmpeg -i RAW.mp4 -an -vf "fps=30,scale=1080:-2" -c:v libx264 -preset slow -crf 28 \
      -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 \
      -x264-params keyint=1:min-keyint=1:scenecut=0 \
      -pix_fmt yuv420p -movflags +faststart OUT-mobile.mp4
    ```
  - Verify **zero P/B frames** (output must show only `I`):
    `ffprobe -v error -select_streams v:0 -show_entries frame=pict_type -of csv=p=0 OUT.mp4 | sort | uniq -c`
  - If a file is over budget, raise `-crf` slightly; never remove the keyframe flags.
- Output names: `public/videos/hero.mp4`, `hero-mobile.mp4`, `section.mp4`, `section-mobile.mp4`; posters `public/images/hero-poster.jpg`, `hero-poster-end.jpg`, `section-poster.jpg`, `section-poster-end.jpg`.
- Preload the hero first-frame poster in the document head: `<link rel="preload" as="image" href="/images/hero-poster.jpg" fetchPriority="high" />`.
- The hero **"Scroll" cue is an accessible `<button>`** (`min-h-[44px]`, visible focus ring) that smoothly scrolls to the next section (`[data-hero-next]`).
- Video behaviour: muted, `playsInline`, never autoplayed, `currentTime` driven by scroll (down = forward, up = backward) via GSAP ScrollTrigger; wait for `loadedmetadata`; clamp time to `[0, duration - 0.05]`; update inside `requestAnimationFrame` only when time changed ≥ 1/30 s; choose the mobile source below 768px via `gsap.matchMedia()`; use `100svh`, ignore mobile resize jumps; reduced-motion or video error → static end-frame poster, no pin.

### 7.5 Light/dark mode and scrollbar
- Semantic tokens from §2 in `globals.css` with `html.dark` overrides.
- A pre-paint inline `<script>` in `<head>` sets the theme from `localStorage`, falling back to `prefers-color-scheme` (no flash). Wrap storage access in try/catch.
- `ThemeToggle` in the navbar (accessible button, `aria-pressed`, 44px target); logo uses `tone="auto"`.
- Dark architectural bands (hero, showcase video, CTA band, footer) stay rich dark in both modes.
- **5px custom scrollbar** in the caramel accent: `::-webkit-scrollbar` rules, with Firefox's `scrollbar-width` / `scrollbar-color` scoped in `@supports (-moz-appearance: none)` so Chromium keeps the 5px width.

### 7.6 Reviews, multi-image cards, explore modal
- **Reviews:** pausable two-row infinite GSAP marquee on **both mobile and desktop** (pause on hover, focus and touch). "Read more" and "Read all reviews" open an accessible **All Reviews modal** (focus trap, Esc to close, labelled). Rating and count come from `site.ts`. Include a "Review us on Google" pill button.
- **Catalogue cards:** real photorealistic images, **multiple per item**, with in-card left/right arrows, dot indicators, touch swipe, and **click-to-open lightbox** (separate from clicking the title, which opens the detail page).
- **Detail page:** an **"Explore [flavour]"** button opens a **categorized photo-tour modal** with categories **Close-up, Texture, Pack, Serving, Gifting**. Modal header and category pills use `shrink-0`; the scrollable body uses `min-h-0 flex-1 overflow-y-auto` so pills are never clipped. Keep the detail page's own checklist (ingredients, allergens, storage) clean.
- **No placeholder SVGs in production.** A PRD task wires the generated photography from the image manifest into the data files.

### 7.7 Catalogue model
- `Flavour`: `slug`, `name`, `tagline`, `description`, `tasteNotes[]`, `ingredients[]`, `allergens[]`, `shelfLife`, `storage`, `badge?`, `popularity`, `sizes: { size: "100g"|"250g"|"500g"|"1kg"; priceNgn: number }[]`, `images: { category; src; alt }[]`.
- `GiftBox`: `slug`, `name` (Classic, Celebration, Corporate), `contents`, `priceNgn`, `minOrder?`, `images[]`.
- Shop controls: filter by flavour and size, sort (popular, price low→high, high→low), search, **8 items per page**, state in URL search params (inside `<Suspense>`).
- Size selector updates the price and the WhatsApp message.

### 7.8 Conversion
- Primary: **"Order on WhatsApp"** with a message pre-filled from flavour, size and quantity (`buildWhatsAppLink()` in `src/lib/whatsapp.ts`). A floating WhatsApp button appears on all pages except the footer area.
- Secondary: gift/bulk quote form (name, phone, occasion, flavours, quantity, date, notes) → pre-filled WhatsApp or `mailto:`; click-to-call.
- No backend, so never claim "order submitted"; say "Opening WhatsApp".

### 7.9 Nigeria compliance and locale
- NDPA-aligned Privacy Notice (what is collected, why, retention, rights, contact for data requests; no fabricated registration numbers), cookie banner with accept/decline and no non-essential cookies before consent.
- Allergen statement on every product and in the footer: contains wheat (gluten), milk and eggs; peanut chin chin contains peanuts; made in a kitchen that handles nuts, milk, eggs and wheat. Add the line "Check the pack label for the full ingredient list."
- Storage and shelf life shown on each product (values `TODO(client)`).
- Pages: Terms & Conditions, Delivery Policy, Refund & Cancellation Policy, Privacy Notice, Allergen Information. Content is draft wording marked `TODO(client): legal review`.
- Do not invent a NAFDAC number; show `TODO(client): NAFDAC number` only if the client supplies one.
- Use ₦ and `+234`. Spelling: British/Nigerian English.

### 7.10 SEO
- Metadata per route, Open Graph images, `sitemap.ts`, `robots.ts`, JSON-LD (`Organization`, `Product` with `offers` in NGN, `FAQPage`, `BreadcrumbList`). Do not add `aggregateRating` until real, verified ratings exist.

---

## 8. Definition of done (every task)

- [ ] Requirements in the PRD task met; nothing outside the task changed.
- [ ] Skills loaded were stated ("Loading: X, Y") and ≤ 3.
- [ ] Only semantic tokens used; light **and** dark verified; AA contrast.
- [ ] Motion within §4; `prefers-reduced-motion` honoured; no stuck `opacity: 0` after client navigation.
- [ ] No `any`, no unused code or template assets, invented data marked `TODO(client)`.
- [ ] `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
- [ ] Playwright checked at 390 / 768 / 1440 px: no console errors, no horizontal overflow, tap targets ≥ 44px, keyboard operable.
- [ ] PRD checkbox ticked, then **stop and wait for "next"**.
