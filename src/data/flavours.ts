export type PackSize = "100g" | "250g" | "500g" | "1kg";

export type ImageCategory =
  | "Close-up"
  | "Texture"
  | "Pack"
  | "Serving"
  | "Gifting";

export interface FlavourSize {
  size: PackSize;
  priceNgn: number; // TODO(client): confirm final retail prices
}

export interface ProductImage {
  category: ImageCategory;
  src: string;
  alt: string;
}

export interface Flavour {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tasteNotes: string[];
  ingredients: string[];
  allergens: string[];
  shelfLife: string; // TODO(client): confirm shelf life
  storage: string; // TODO(client): confirm storage instructions
  badge?: string;
  popularity: number;
  sizes: FlavourSize[];
  images: ProductImage[];
}

function buildFlavourImages(folder: string, name: string): ProductImage[] {
  return [
    {
      category: "Close-up",
      src: `/images/flavours/${folder}/closeup-1.webp`,
      alt: `${name} chin chin cubes — close-up golden crust`,
    },
    {
      category: "Close-up",
      src: `/images/flavours/${folder}/closeup-2.webp`,
      alt: `${name} chin chin — crisp macro detail`,
    },
    {
      category: "Texture",
      src: `/images/flavours/${folder}/texture-1.webp`,
      alt: `${name} chin chin — broken cube showing airy interior crumb`,
    },
    {
      category: "Texture",
      src: `/images/flavours/${folder}/texture-2.webp`,
      alt: `${name} chin chin — toasted surface texture`,
    },
    {
      category: "Pack",
      src: `/images/flavours/${folder}/pack-1.webp`,
      alt: `${name} chin chin — sealed CRUNCHÉ stand-up pouch`,
    },
    {
      category: "Pack",
      src: `/images/flavours/${folder}/pack-2.webp`,
      alt: `${name} chin chin — family pack sizes`,
    },
    {
      category: "Serving",
      src: `/images/flavours/${folder}/serving-1.webp`,
      alt: `${name} chin chin — served in a ceramic bowl`,
    },
    {
      category: "Serving",
      src: `/images/flavours/${folder}/serving-2.webp`,
      alt: `${name} chin chin — sharing platter with chilled drink`,
    },
    {
      category: "Gifting",
      src: `/images/flavours/${folder}/gifting-1.webp`,
      alt: `${name} chin chin — packed inside a CRUNCHÉ gift box`,
    },
    {
      category: "Gifting",
      src: `/images/flavours/${folder}/gifting-2.webp`,
      alt: `${name} chin chin — ribboned party favour presentation`,
    },
  ];
}

export const flavours: Flavour[] = [
  {
    slug: "classic-golden",
    name: "Classic Golden",
    tagline: "Warm nutmeg, rich butter, and an unmistakable golden snap.",
    description:
      "Our signature Nigerian chin chin cut into neat bite-sized cubes and fried to a crisp, golden-brown finish. Lightly sweet with warm nutmeg notes and a clean, buttery crunch.",
    tasteNotes: ["Warm nutmeg", "Cultured butter", "Crisp golden snap"],
    ingredients: [
      "Wheat flour",
      "Sugar",
      "Butter",
      "Whole milk",
      "Eggs",
      "Nutmeg",
      "Vegetable oil",
      "Salt",
    ], // TODO(client): confirm exact ingredient list
    allergens: [
      "Contains wheat (gluten), milk and eggs.",
      "Made in a kitchen that handles nuts, milk, eggs and wheat.",
      "Check the pack label for the full ingredient list.",
    ],
    shelfLife: "Best enjoyed within 6 weeks of production (TODO(client))",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal tightly after opening. (TODO(client))",
    badge: "Best Seller",
    popularity: 100,
    sizes: [
      { size: "100g", priceNgn: 1500 }, // TODO(client)
      { size: "250g", priceNgn: 3200 }, // TODO(client)
      { size: "500g", priceNgn: 5800 }, // TODO(client)
      { size: "1kg", priceNgn: 10500 }, // TODO(client)
    ],
    images: buildFlavourImages("classic", "Classic Golden"),
  },
  {
    slug: "coconut",
    name: "Coconut",
    tagline: "Toasted coconut flakes folded into a crisp, sunlit crunch.",
    description:
      "Infused with rich coconut cream and finely toasted coconut for a naturally fragrant sweetness that lingers after every bite.",
    tasteNotes: ["Toasted coconut", "Caramelised edge", "Light tropical finish"],
    ingredients: [
      "Wheat flour",
      "Sugar",
      "Coconut milk",
      "Desiccated coconut",
      "Butter",
      "Eggs",
      "Vegetable oil",
      "Salt",
    ], // TODO(client): confirm exact ingredient list
    allergens: [
      "Contains wheat (gluten), milk and eggs.",
      "Made in a kitchen that handles nuts, milk, eggs and wheat.",
      "Check the pack label for the full ingredient list.",
    ],
    shelfLife: "Best enjoyed within 6 weeks of production (TODO(client))",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal tightly after opening. (TODO(client))",
    badge: "Fan Favourite",
    popularity: 92,
    sizes: [
      { size: "100g", priceNgn: 1700 }, // TODO(client)
      { size: "250g", priceNgn: 3600 }, // TODO(client)
      { size: "500g", priceNgn: 6500 }, // TODO(client)
      { size: "1kg", priceNgn: 11800 }, // TODO(client)
    ],
    images: buildFlavourImages("coconut", "Coconut"),
  },
  {
    slug: "milk",
    name: "Milk",
    tagline: "Extra creamy, melt-in-the-mouth richness with a gentle crunch.",
    description:
      "Slow-mixed with generous whole milk for a softer, velvety crumb beneath a crisp golden shell. Comforting, nostalgic, and made for sharing.",
    tasteNotes: ["Creamy whole milk", "Vanilla warmth", "Velvety crunch"],
    ingredients: [
      "Wheat flour",
      "Full-cream milk powder",
      "Sugar",
      "Butter",
      "Eggs",
      "Nutmeg",
      "Vegetable oil",
      "Salt",
    ], // TODO(client): confirm exact ingredient list
    allergens: [
      "Contains wheat (gluten), milk and eggs.",
      "Made in a kitchen that handles nuts, milk, eggs and wheat.",
      "Check the pack label for the full ingredient list.",
    ],
    shelfLife: "Best enjoyed within 6 weeks of production (TODO(client))",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal tightly after opening. (TODO(client))",
    popularity: 88,
    sizes: [
      { size: "100g", priceNgn: 1650 }, // TODO(client)
      { size: "250g", priceNgn: 3500 }, // TODO(client)
      { size: "500g", priceNgn: 6300 }, // TODO(client)
      { size: "1kg", priceNgn: 11400 }, // TODO(client)
    ],
    images: buildFlavourImages("milk", "Milk"),
  },
  {
    slug: "spicy",
    name: "Spicy",
    tagline: "Bold Nigerian pepper warmth balanced with a crisp, savoury bite.",
    description:
      "A lively blend of dried chilli, ginger and aromatic spice folded into golden chin chin dough. Crisp, warming, and impossible to stop at one handful.",
    tasteNotes: ["Warm Nigerian pepper", "Ginger & garlic", "Savoury crunch"],
    ingredients: [
      "Wheat flour",
      "Chilli pepper",
      "Ginger",
      "Butter",
      "Whole milk",
      "Eggs",
      "Sugar",
      "Vegetable oil",
      "Salt",
    ], // TODO(client): confirm exact ingredient list
    allergens: [
      "Contains wheat (gluten), milk and eggs.",
      "Made in a kitchen that handles nuts, milk, eggs and wheat.",
      "Check the pack label for the full ingredient list.",
    ],
    shelfLife: "Best enjoyed within 6 weeks of production (TODO(client))",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal tightly after opening. (TODO(client))",
    badge: "Bold Heat",
    popularity: 85,
    sizes: [
      { size: "100g", priceNgn: 1700 }, // TODO(client)
      { size: "250g", priceNgn: 3600 }, // TODO(client)
      { size: "500g", priceNgn: 6500 }, // TODO(client)
      { size: "1kg", priceNgn: 11800 }, // TODO(client)
    ],
    images: buildFlavourImages("spicy", "Spicy"),
  },
  {
    slug: "peanut",
    name: "Peanut",
    tagline: "Roasted groundnut depth baked into every golden cube.",
    description:
      "Crafted with freshly roasted Nigerian groundnuts for a nutty, savoury-sweet crunch that pairs effortlessly with chilled drinks or afternoon tea.",
    tasteNotes: ["Roasted groundnut", "Toasted sesame note", "Deep crunch"],
    ingredients: [
      "Wheat flour",
      "Roasted peanuts (groundnuts)",
      "Sugar",
      "Butter",
      "Whole milk",
      "Eggs",
      "Vegetable oil",
      "Salt",
    ], // TODO(client): confirm exact ingredient list
    allergens: [
      "Contains peanuts, wheat (gluten), milk and eggs.",
      "Made in a kitchen that handles nuts, milk, eggs and wheat.",
      "Check the pack label for the full ingredient list.",
    ],
    shelfLife: "Best enjoyed within 6 weeks of production (TODO(client))",
    storage:
      "Store in a cool, dry place away from direct sunlight. Reseal tightly after opening. (TODO(client))",
    popularity: 82,
    sizes: [
      { size: "100g", priceNgn: 1800 }, // TODO(client)
      { size: "250g", priceNgn: 3800 }, // TODO(client)
      { size: "500g", priceNgn: 6900 }, // TODO(client)
      { size: "1kg", priceNgn: 12500 }, // TODO(client)
    ],
    images: buildFlavourImages("peanut", "Peanut"),
  },
];

export function getFlavourBySlug(slug: string): Flavour | undefined {
  return flavours.find((f) => f.slug === slug);
}

export function getMinPrice(flavour: Flavour): number {
  return Math.min(...flavour.sizes.map((s) => s.priceNgn));
}
