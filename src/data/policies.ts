export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface PolicyDocument {
  slug: "terms" | "delivery" | "refunds" | "privacy" | "allergens";
  title: string;
  subtitle: string;
  lastUpdated: string;
  reviewNote: string;
  sections: PolicySection[];
}

export const policies: Record<PolicyDocument["slug"], PolicyDocument> = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    subtitle: "Ordering, pricing, and use of the CRUNCHÉ website.",
    lastUpdated: "Draft — pending launch confirmation",
    reviewNote: "TODO(client): legal review required before launch.",
    sections: [
      {
        id: "overview",
        heading: "1. Overview",
        paragraphs: [
          "This website is operated by CRUNCHÉ. By browsing our catalogue or initiating an order via WhatsApp or email, you agree to these draft Terms & Conditions.",
        ],
      },
      {
        id: "orders-pricing",
        heading: "2. Orders & Pricing",
        paragraphs: [
          "All prices are displayed in Nigerian Naira (₦). Orders are confirmed directly with our team via WhatsApp or email once product availability, delivery location, and payment are agreed.",
          "Quotes for bulk, event, and corporate orders are valid for the period stated on your pro-forma quote. (TODO(client): legal review)",
        ],
      },
      {
        id: "intellectual-property",
        heading: "3. Brand & Content",
        paragraphs: [
          "All CRUNCHÉ trademarks, photography, and copy on this site belong to CRUNCHÉ and may not be reproduced without permission.",
        ],
      },
    ],
  },
  delivery: {
    slug: "delivery",
    title: "Delivery Policy",
    subtitle: "Dispatch timelines, coverage across Nigeria, and handling.",
    lastUpdated: "Draft — pending launch confirmation",
    reviewNote: "TODO(client): legal review & SLA confirmation required.",
    sections: [
      {
        id: "coverage",
        heading: "1. Delivery Coverage",
        paragraphs: [
          "We deliver within Lagos and via trusted courier partners to Abuja, Port Harcourt, Ibadan, and other states across Nigeria.",
        ],
      },
      {
        id: "timelines",
        heading: "2. Dispatch & Transit Timelines",
        paragraphs: [
          "Standard retail orders within Lagos are typically dispatched within 24–48 hours of payment confirmation. Interstate orders take 2–4 business days depending on destination. (TODO(client): confirm exact timelines)",
        ],
      },
      {
        id: "inspection",
        heading: "3. Receiving Your Order",
        paragraphs: [
          "Please inspect your parcel upon delivery and contact us promptly on WhatsApp with photos if any outer seal or pack is damaged in transit.",
        ],
      },
    ],
  },
  refunds: {
    slug: "refunds",
    title: "Refund & Cancellation Policy",
    subtitle: "How cancellations, replacements, and refunds are handled.",
    lastUpdated: "Draft — pending launch confirmation",
    reviewNote: "TODO(client): legal review required before launch.",
    sections: [
      {
        id: "perishable-goods",
        heading: "1. Fresh Food Products",
        paragraphs: [
          "Because chin chin is a freshly prepared food item, opened packs cannot be returned unless the product arrived damaged, defective, or incorrect.",
        ],
      },
      {
        id: "cancellations",
        heading: "2. Order Cancellations",
        paragraphs: [
          "Retail orders may be cancelled before dispatch by messaging us on WhatsApp. Custom or branded bulk/corporate orders cannot be cancelled once production or custom packaging has begun. (TODO(client): legal review)",
        ],
      },
      {
        id: "replacements",
        heading: "3. Damaged or Incorrect Items",
        paragraphs: [
          "If your order arrives damaged or incorrect, notify us within 24 hours of delivery with your order details and clear photos so we can arrange a replacement or refund.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Notice",
    subtitle: "NDPA-aligned notice on how we handle your personal information.",
    lastUpdated: "Draft — pending launch confirmation",
    reviewNote: "TODO(client): legal review under Nigeria Data Protection Act (NDPA).",
    sections: [
      {
        id: "data-collected",
        heading: "1. What Information We Collect",
        paragraphs: [
          "This website does not store customer accounts or payment card data. When you use our quote form or contact us via WhatsApp or email, you provide details such as your name, phone number, email address, event date, and delivery state.",
          "If you consent via our cookie banner, we remember your theme preference and consent choice in your browser's localStorage. No non-essential cookies are set before you give consent.",
        ],
      },
      {
        id: "purpose",
        heading: "2. Why We Use Your Information",
        paragraphs: [
          "We use your contact and order details solely to prepare quotes, confirm orders, coordinate delivery, and respond to customer enquiries.",
        ],
      },
      {
        id: "retention",
        heading: "3. Retention & Security",
        paragraphs: [
          "We retain order and enquiry records only for as long as needed to fulfil your order, resolve disputes, or meet Nigerian tax and accounting obligations. (TODO(client): legal review)",
        ],
      },
      {
        id: "rights",
        heading: "4. Your Rights Under the NDPA",
        paragraphs: [
          "Under the Nigeria Data Protection Act (NDPA), you have the right to request access to, correction of, or deletion of your personal data, and to withdraw consent at any time.",
          "To exercise any of these rights, please contact us using the email or phone number listed on our Contact page. (TODO(client): insert dedicated data-request email)",
        ],
      },
    ],
  },
  allergens: {
    slug: "allergens",
    title: "Allergen Information",
    subtitle: "Ingredients, cross-contact notice, and pack label guidance.",
    lastUpdated: "Draft — pending launch confirmation",
    reviewNote: "TODO(client): legal & kitchen review required.",
    sections: [
      {
        id: "major-allergens",
        heading: "1. Major Allergens Present",
        paragraphs: [
          "All CRUNCHÉ chin chin flavours contain wheat (gluten), milk, and eggs.",
          "Our Peanut chin chin also contains peanuts (groundnuts).",
        ],
      },
      {
        id: "cross-contact",
        heading: "2. Kitchen Cross-Contact Notice",
        paragraphs: [
          "Made in a kitchen that handles nuts, milk, eggs, and wheat. While we clean equipment between batches, trace cross-contact cannot be completely ruled out.",
        ],
      },
      {
        id: "pack-label",
        heading: "3. Always Check the Pack Label",
        paragraphs: [
          "Check the pack label for the full ingredient list before consuming, especially if ordering for guests, children, or events.",
        ],
      },
    ],
  },
};
