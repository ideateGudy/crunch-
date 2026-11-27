# CRUNCHÉ — Website Handover & Client Guide

**CRUNCHÉ** (*A Little Crunch. A Lot of Joy.*) is a marketing and WhatsApp-ordering website for freshly made Nigerian chin chin, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and GSAP ScrollTrigger.

---

## 1. Setup & Run Commands

Requires **Node.js 20.9+** and **npm**.

```bash
# Install dependencies
npm install

# Run local development server (http://localhost:3000)
npm run dev

# Run ESLint
npm run lint

# Run TypeScript typecheck
npx tsc --noEmit

# Build for production & start production server
npm run build
npm run start
```

---

## 2. Project Structure

```text
├── public/
│   ├── images/
│   │   ├── flavours/<slug>/       # 10 .webp photos per flavour
│   │   ├── gift-boxes/<slug>/     # 4 .webp photos per gift box
│   │   ├── site/                  # Story, process & gifting photos
│   │   ├── hero-poster.jpg        # Hero first-frame poster
│   │   ├── hero-poster-end.jpg    # Hero reduced-motion / end-frame poster
│   │   ├── section-poster.jpg     # Showcase first-frame poster
│   │   ├── section-poster-end.jpg # Showcase reduced-motion / end-frame poster
│   │   └── og.jpg                 # Open Graph social share image (1200×630)
│   └── videos/
│       ├── hero.mp4               # Desktop hero scroll video (1600px, all-intra)
│       ├── hero-mobile.mp4        # Mobile hero scroll video (1080px, all-intra)
│       ├── section.mp4            # Desktop showcase video (1600px, all-intra)
│       └── section-mobile.mp4     # Mobile showcase video (1080px, all-intra)
├── reference/
│   ├── hero-raw.mp4               # Original 1920×1080 hero video
│   └── section-raw.mp4            # Original 1920×1080 showcase video
├── scripts/
│   ├── encode-hero.sh             # Encodes hero.mp4, hero-mobile.mp4 & posters
│   └── encode-section.sh          # Encodes section.mp4, section-mobile.mp4 & posters
├── docs/
│   ├── VIDEO.md                   # Video encoding & all-intra verification guide
│   └── QA.md                      # Cross-route QA & Web Vitals report
└── src/
    ├── config/site.ts             # Brand name, contact details, links, ratings, domain
    ├── data/
    │   ├── flavours.ts            # 5 flavours × 4 sizes, prices, ingredients, images
    │   ├── gift-boxes.ts          # Classic, Celebration & Corporate boxes + bulk tiers
    │   ├── reviews.ts             # Customer reviews (currently sample placeholders)
    │   ├── faqs.ts                # Grouped FAQ items
    │   ├── process.ts             # 4-step "How it's made" content
    │   └── policies.ts            # Terms, Delivery, Refunds, Privacy (NDPA), Allergens
    └── ...
```

---

## 3. How to Edit Content (No Developer Needed)

All business data lives in `src/config/site.ts` and `src/data/*.ts`. You never need to edit React components to update prices, phone numbers, reviews, or flavours.

### Update WhatsApp Number, Contact Details & Domain
Edit [src/config/site.ts](src/config/site.ts):

```ts
contact: {
  whatsapp: "+2348012345678", // Replace "[WhatsApp number]"
  phone: "+2348012345678",    // Replace "[Phone number]"
  email: "orders@crunche.ng", // Replace "[Business email]"
  address: "Lekki Phase 1, Lagos",
  hours: "Mon–Sat, 9:00 AM – 6:00 PM WAT",
  instagram: "@crunche.ng",
  tiktok: "@crunche.ng",
  googleReviewUrl: "https://g.page/r/...",
},
```

Once you have verified Google reviews, update `reviews` in `src/config/site.ts`:
```ts
reviews: {
  rating: 4.9,
  reviewCount: 48,
  ...
}
```
(This automatically enables numeric rating display and `aggregateRating` in Product JSON-LD.)

### Change a Price
Edit [src/data/flavours.ts](src/data/flavours.ts) (for pack sizes) or [src/data/gift-boxes.ts](src/data/gift-boxes.ts) (for gift boxes). Prices are plain Naira numbers:

```ts
sizes: [
  { size: "100g", priceNgn: 1800 }, // Updated from 1500
  { size: "250g", priceNgn: 3500 },
  ...
]
```

### Add a Flavour
In [src/data/flavours.ts](src/data/flavours.ts):
1. Add its 10 `.webp` photos in `public/images/flavours/<new-slug>/` (`closeup-1.webp`, `closeup-2.webp`, `texture-1.webp`, `texture-2.webp`, `pack-1.webp`, `pack-2.webp`, `serving-1.webp`, `serving-2.webp`, `gifting-1.webp`, `gifting-2.webp`).
2. Copy an existing object in the `flavours` array, give it a unique `slug` (e.g. `"ginger"`), update `name`, `tagline`, `description`, `ingredients`, `allergens`, `sizes`, and call `buildFlavourImages("ginger", "Ginger")`.

### Replace Sample Reviews
Edit [src/data/reviews.ts](src/data/reviews.ts) and replace each entry in `reviews` with real customer quotes, names, locations, and flavours.

---

## 4. Images & Naming Scheme

- **Flavour photos:** `public/images/flavours/<folder>/<category>-<1|2>.webp` (`classic`, `coconut`, `milk`, `spicy`, `peanut`)
- **Gift box photos:** `public/images/gift-boxes/<slug>/<hero-1|open-1|detail-1|styled-1>.webp`
- **Site photos:** `public/images/site/story/*`, `public/images/site/process/*`, `public/images/site/gifting/*`
- **Social share card:** `public/images/og.jpg` (`1200×630`)

---

## 5. Swapping & Re-Encoding the Two Scroll Videos

Both scroll-scrubbed videos require **1920×1080 (1080p)** raw MP4 inputs and **100% intra-frame (`I` frame)** encoding so backward scrolling is instant. Requires `ffmpeg` and `ffprobe`.

1. Replace `reference/hero-raw.mp4` and/or `reference/section-raw.mp4` with your new 1080p raw clips.
2. Run the encoder scripts (they encode desktop `1600px <= 12 MB`, mobile `1080px <= 5 MB`, extract start/end posters, and verify zero `P`/`B` frames):
   ```bash
   bash scripts/encode-hero.sh reference/hero-raw.mp4
   bash scripts/encode-section.sh reference/section-raw.mp4
   ```
3. To manually verify all-intra frames on any output file:
   ```bash
   ffprobe -v error -select_streams v:0 -show_entries frame=pict_type -of csv=p=0 public/videos/hero.mp4 | sort | uniq -c
   ```
   The output must show **only `I`** frames. See [docs/VIDEO.md](docs/VIDEO.md) for full details.

---

## 6. Theme Defaults (Light / Dark Mode)

- Users can toggle themes via the sun/moon button in the navbar (saved in `localStorage` under `"crunche-theme"`).
- If no preference is saved, the pre-paint `<script>` in [src/app/layout.tsx](src/app/layout.tsx) follows the visitor's OS `prefers-color-scheme`.
- To force light or dark as the default for first-time visitors, edit `themeInitScript` in `src/app/layout.tsx`.

---

## 7. Complete `TODO(client)` Checklist (Before Launch)

Generated from `src/`:

### `src/config/site.ts`
- `url`: Confirm production domain (`https://crunche.ng`).
- `contact.whatsapp`: Replace `[WhatsApp number]` with `+234XXXXXXXXXX`.
- `contact.phone`: Replace `[Phone number]` with `+234XXXXXXXXXX`.
- `contact.email`: Replace `[Business email]`.
- `contact.address`: Replace `[Business address]`.
- `contact.hours`: Replace `[Business hours]`.
- `contact.instagram` & `contact.tiktok`: Replace `[Instagram handle]` and `[TikTok handle]`.
- `contact.googleReviewUrl`: Replace `[Google review link]`.
- `reviews.rating` & `reviews.reviewCount`: Set verified numbers once available (leave `null` until then).
- `deliveryAreas`: Confirm delivery states & dispatch schedule.
- `trustChips`: Confirm operational claims (`"Freshly made"`, `"Gift-ready"`, `"Delivered nationwide"`).
- `nafdacNumber`: Supply NAFDAC registration number only if available (otherwise leave `null`).

### `src/data/flavours.ts`
- Confirm final retail `priceNgn` for all 5 flavours × 4 sizes (`100g`, `250g`, `500g`, `1kg`).
- Confirm exact `ingredients` list per flavour.
- Confirm `shelfLife` (currently draft 6 weeks) and `storage` wording.

### `src/data/gift-boxes.ts`
- Confirm `priceNgn`, `minOrder`, and `leadTime` for Classic, Celebration, and Corporate boxes.
- Confirm `minimum` quantities for `bulkTiers`.

### `src/data/reviews.ts`
- Replace all 10 sample reviews (`Sample review — replace before launch`) with verified customer reviews.

### `src/data/faqs.ts`, `src/data/process.ts`, `src/app/our-story/page.tsx`, `src/components/BenefitsStrip.tsx`
- Confirm dispatch schedule, delivery SLAs, shelf life, batch cadence, and gift lead times in `faqs.ts`.
- Confirm kitchen oil-rotation / frying process details in `process.ts` and `our-story/page.tsx`.
- Confirm brand founding details & kitchen location in `our-story/page.tsx` and operational claims in `BenefitsStrip.tsx`.

### `src/data/policies.ts`
- Legal review required for all 5 policies: Terms & Conditions, Delivery Policy (confirm exact timelines), Refund & Cancellation Policy, Privacy Notice (NDPA retention period + dedicated data-request email), and Allergen Information (kitchen review).

---

## 8. Deployment Notes

- **Recommended host:** Vercel (zero-config support for Next.js 16 App Router, `cacheComponents: true`, and `next/image` optimisation) or any Node.js 20.9+ host running `npm run build && npm run start`.
- Ensure `public/videos/*.mp4` are served with HTTP `Accept-Ranges: bytes` support (standard on Vercel/Cloudflare/Nginx) so scroll-scrubbing works smoothly.
