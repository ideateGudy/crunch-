export interface Review {
  id: string;
  author: string;
  location: string;
  flavour: string;
  quote: string;
  isSample: true;
  note: "Sample review — replace before launch";
}

// TODO(client): Replace all sample reviews with verified customer reviews before launch.
export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "Adaeze O.",
    location: "Lekki, Lagos",
    flavour: "Classic Golden",
    quote:
      "Crisp without being rock-hard, and the nutmeg aroma hits the moment you open the pouch.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-2",
    author: "Tunde A.",
    location: "Wuse II, Abuja",
    flavour: "Spicy",
    quote:
      "The Spicy pack has proper warmth without overpowering the buttery crunch. Finished 500g in two days.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-3",
    author: "Chidinma N.",
    location: "Victoria Island, Lagos",
    flavour: "Celebration Box",
    quote:
      "Ordered ten Celebration boxes for our team retreat and every single pack arrived fresh and intact.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-4",
    author: "Ibrahim M.",
    location: "GRA, Port Harcourt",
    flavour: "Peanut",
    quote:
      "You can actually taste the roasted groundnuts. Great balance of savoury and sweet.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-5",
    author: "Funke B.",
    location: "Bodija, Ibadan",
    flavour: "Coconut",
    quote:
      "Toasted coconut flavour tastes natural, not artificial. My mum asked for the WhatsApp number immediately.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-6",
    author: "Kelechi E.",
    location: "Ikeja, Lagos",
    flavour: "Milk",
    quote:
      "Creamy, light, and zero oily aftertaste. Easily our new household staple for weekend guests.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-7",
    author: "Zainab S.",
    location: "Maitama, Abuja",
    flavour: "Classic Golden",
    quote:
      "Resealable pouch actually keeps the crunch locked in all week. Neat presentation too.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-8",
    author: "Damilola K.",
    location: "Surulere, Lagos",
    flavour: "Corporate Box",
    quote:
      "Sent the Corporate boxes to key clients at year-end. Everyone messaged back asking where we got them.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-9",
    author: "Ngozi I.",
    location: "Enugu",
    flavour: "Coconut",
    quote:
      "Delivered neatly packed with zero crushed crumbs at the bottom of the bag.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
  {
    id: "rev-10",
    author: "Seyi O.",
    location: "Yaba, Lagos",
    flavour: "Spicy",
    quote:
      "Perfect movie-night snack. Ordering on WhatsApp was quick and dispatch was right on time.",
    isSample: true,
    note: "Sample review — replace before launch",
  },
];
