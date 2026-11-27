import type { ProductImage } from "@/data/flavours";

export interface GiftBox {
  slug: string;
  name: "Classic" | "Celebration" | "Corporate";
  tagline: string;
  contents: string[];
  priceNgn: number; // TODO(client): confirm gift box pricing
  minOrder?: string; // TODO(client): confirm minimum order quantities
  leadTime: string; // TODO(client): confirm dispatch lead time
  images: ProductImage[];
}

function buildGiftBoxImages(folder: string, name: string): ProductImage[] {
  return [
    {
      category: "Gifting",
      src: `/images/gift-boxes/${folder}/hero-1.webp`,
      alt: `CRUNCHÉ ${name} Gift Box — ribboned presentation`,
    },
    {
      category: "Pack",
      src: `/images/gift-boxes/${folder}/open-1.webp`,
      alt: `CRUNCHÉ ${name} Gift Box — open box showing packed pouches`,
    },
    {
      category: "Close-up",
      src: `/images/gift-boxes/${folder}/detail-1.webp`,
      alt: `CRUNCHÉ ${name} Gift Box — foil and ribbon detail`,
    },
    {
      category: "Serving",
      src: `/images/gift-boxes/${folder}/styled-1.webp`,
      alt: `CRUNCHÉ ${name} Gift Box — styled gifting spread`,
    },
  ];
}

export const giftBoxes: GiftBox[] = [
  {
    slug: "classic-gift-box",
    name: "Classic",
    tagline: "A thoughtful trio for birthdays, thank-yous, and weekend visits.",
    contents: [
      "3 × 250g packs (Classic Golden, Coconut, Milk)",
      "Signature keepsake ribbon box",
      "Personalised gift note card",
    ],
    priceNgn: 12500, // TODO(client)
    leadTime: "24–48 hours dispatch (TODO(client))",
    images: buildGiftBoxImages("classic", "Classic"),
  },
  {
    slug: "celebration-gift-box",
    name: "Celebration",
    tagline: "Owambe-ready abundance featuring all five signature flavours.",
    contents: [
      "5 × 250g packs (all 5 flavours)",
      "Deluxe gold-foiled presentation box",
      "Custom occasion sleeve or ribbon",
    ],
    priceNgn: 21500, // TODO(client)
    minOrder: "1 box (bulk discounts from 10+ boxes) (TODO(client))",
    leadTime: "2–3 business days (TODO(client))",
    images: buildGiftBoxImages("celebration", "Celebration"),
  },
  {
    slug: "corporate-gift-box",
    name: "Corporate",
    tagline: "Bespoke branded hampers for teams, client appreciation, and conferences.",
    contents: [
      "Choice of 4 × 250g or 2 × 500g packs per hamper",
      "Custom branded belly band or card insert",
      "Dedicated nationwide logistics coordination",
    ],
    priceNgn: 18500, // TODO(client)
    minOrder: "Minimum 15 boxes (TODO(client))",
    leadTime: "5–7 business days for branded runs (TODO(client))",
    images: buildGiftBoxImages("corporate", "Corporate"),
  },
];

export const bulkTiers = [
  {
    tier: "Party Packs (100g)",
    minimum: "30 packs", // TODO(client)
    idealFor: "Weddings, owambe favours, birthdays & kids' parties",
  },
  {
    tier: "Event & Hospitality (500g / 1kg)",
    minimum: "10 kg total", // TODO(client)
    idealFor: "Catering tables, lounges, offices & family gatherings",
  },
  {
    tier: "Retail & Wholesale",
    minimum: "50 packs assorted", // TODO(client)
    idealFor: "Supermarkets, cafés, gift shops & regional stockists",
  },
] as const;
