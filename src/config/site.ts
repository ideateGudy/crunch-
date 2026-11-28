export interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "CRUNCHÉ",
  tagline: "A Little Crunch. A Lot of Joy.",
  description:
    "Premium, freshly made Nigerian chin chin in Classic golden, Coconut, Milk, Spicy and Peanut flavours.",
  locale: "en-NG",
  currency: "NGN",
  url: "https://crunche.ng", // TODO(client): confirm production domain

  navLinks: [
    { label: "Shop", href: "/shop" },
    { label: "Gifting", href: "/gifting" },
    { label: "Our Story", href: "/our-story" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  policyLinks: [
    { label: "Terms & Conditions", href: "/policies/terms" },
    { label: "Delivery Policy", href: "/policies/delivery" },
    { label: "Refund & Cancellation", href: "/policies/refunds" },
    { label: "Privacy Notice", href: "/policies/privacy" },
    { label: "Allergen Information", href: "/policies/allergens" },
  ] satisfies NavLink[],

  contact: {
    whatsapp: "+2349033069636",
    phone: "+2349033069636",
    email: "[Business email]", // TODO(client)
    address: "[Business address]", // TODO(client)
    hours: "[Business hours]", // TODO(client): e.g. Mon–Sat, 9:00 AM – 6:00 PM WAT
    instagram: "[Instagram handle]", // TODO(client)
    tiktok: "[TikTok handle]", // TODO(client)
    googleReviewUrl: "[Google review link]", // TODO(client)
  },

  reviews: {
    rating: null as number | null, // TODO(client): [Verified rating]
    reviewCount: null as number | null, // TODO(client): [Verified count]
    ratingPlaceholder: "[Verified rating]", // TODO(client)
    countPlaceholder: "[Verified count]", // TODO(client)
  },

  whatsappDefaultMessage:
    "Hello CRUNCHÉ! I'd like to place an order.",

  deliveryAreas: [
    "Lagos",
    "Abuja (FCT)",
    "Port Harcourt",
    "Ibadan",
    "Nationwide (Nigeria)",
  ], // TODO(client): confirm delivery states & dispatch schedule

  trustChips: [
    "Freshly made", // TODO(client): confirm operational claims
    "Gift-ready", // TODO(client)
    "Delivered nationwide", // TODO(client)
  ],

  allergenSummary:
    "Contains wheat (gluten), milk and eggs. Peanut chin chin contains peanuts. Made in a kitchen that handles nuts, milk, eggs and wheat. Check the pack label for the full ingredient list.",

  nafdacNumber: null as string | null, // TODO(client): NAFDAC number — supply only if available
} as const;
