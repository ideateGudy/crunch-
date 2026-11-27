export type FaqGroup =
  | "ordering"
  | "delivery"
  | "allergens"
  | "storage"
  | "gifting";

export interface FaqItem {
  id: string;
  group: FaqGroup;
  question: string;
  answer: string;
}

export const faqGroupLabels: Record<FaqGroup, string> = {
  ordering: "Ordering",
  delivery: "Delivery",
  allergens: "Allergens & Ingredients",
  storage: "Storage & Freshness",
  gifting: "Gifting & Bulk",
};

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    group: "ordering",
    question: "How do I place an order?",
    answer:
      "Choose your preferred flavour and pack size, then tap 'Order on WhatsApp'. Your message opens pre-filled so our team can confirm availability, delivery fee, and payment details.",
  },
  {
    id: "faq-2",
    group: "ordering",
    question: "What pack sizes are available?",
    answer:
      "Every flavour is available in 100g, 250g, 500g, and 1kg resealable packs, alongside our Classic, Celebration, and Corporate gift boxes.",
  },
  {
    id: "faq-3",
    group: "delivery",
    question: "Where do you deliver?",
    answer:
      "We dispatch across Lagos, Abuja, Port Harcourt, Ibadan, and nationwide across Nigeria. Delivery timelines and fees depend on your state and order volume. (TODO(client): confirm dispatch schedule)",
  },
  {
    id: "faq-4",
    group: "delivery",
    question: "How long does delivery take?",
    answer:
      "Same-day or next-day dispatch within Lagos, and 2–4 business days for interstate deliveries depending on your location. (TODO(client): confirm exact SLAs)",
  },
  {
    id: "faq-5",
    group: "allergens",
    question: "What allergens are in CRUNCHÉ chin chin?",
    answer:
      "All flavours contain wheat (gluten), milk, and eggs. Our Peanut flavour also contains peanuts (groundnuts). All products are made in a kitchen that handles nuts, milk, eggs, and wheat. Check the pack label for the full ingredient list.",
  },
  {
    id: "faq-6",
    group: "allergens",
    question: "Do you offer nut-free or gluten-free options?",
    answer:
      "Because all flavours are prepared in the same kitchen that handles wheat, milk, eggs, and peanuts, we cannot guarantee a nut-free or gluten-free environment.",
  },
  {
    id: "faq-7",
    group: "storage",
    question: "How should I store my chin chin and how long does it stay crisp?",
    answer:
      "Keep packs in a cool, dry place away from direct sunlight and reseal tightly after each serving. Best enjoyed within 6 weeks of production. (TODO(client): confirm shelf life)",
  },
  {
    id: "faq-8",
    group: "storage",
    question: "Do you fry to order or keep stock?",
    answer:
      "We prepare small batches regularly so every pack leaves our kitchen fresh, crisp, and lightly dry to the touch. (TODO(client): confirm batch cadence)",
  },
  {
    id: "faq-9",
    group: "gifting",
    question: "Can I order custom party packs or corporate gift boxes?",
    answer:
      "Yes. We supply 100g owambe party packs, Celebration boxes, and custom-branded Corporate hampers. Use our Quote form on the Contact page or message us on WhatsApp with your event date and quantity.",
  },
  {
    id: "faq-10",
    group: "gifting",
    question: "How far in advance should I book bulk or wedding orders?",
    answer:
      "For standard gift boxes, 2–3 business days is ideal; for branded corporate runs or large owambe orders, please reach out 5–7 business days ahead. (TODO(client): confirm lead times)",
  },
];
