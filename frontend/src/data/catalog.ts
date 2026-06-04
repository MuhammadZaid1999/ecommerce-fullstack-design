import type { Product } from "../types/types";

export const products: Product[] = [
  {
    id: "woven-weekender-tote",
    name: "Woven Weekender Tote",
    parentCategory: "Fashion",
    category: "Womens",
    price: 68,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    description:
      "A structured everyday tote with a soft woven finish, roomy interior, and secure zip pocket.",
    details: [
      "Cotton canvas lining",
      "Interior zip pocket",
      "Fits a 15 inch laptop",
    ],
    featured: true,
  },
  {
    id: "linen-ease-shirt",
    name: "Linen Ease Shirt",
    parentCategory: "Fashion",
    category: "Mens",
    price: 54,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
    description:
      "A breathable button-up cut for relaxed layering from workdays to weekends.",
    details: ["Relaxed fit", "Pre-washed linen blend", "Machine washable"],
    newest: true,
  },
  {
    id: "ceramic-pour-over-set",
    name: "Ceramic Pour Over Set",
    parentCategory: "Home & Living",
    category: "Kitchen",
    price: 82,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
    description:
      "A hand-glazed brewer and carafe set for slow mornings and precise coffee rituals.",
    details: [
      "Dishwasher safe",
      "Includes brewer and carafe",
      "Holds 24 ounces",
    ],
    featured: true,
  },
  {
    id: "desk-charge-dock",
    name: "Desk Charge Dock",
    parentCategory: "Electronics",
    category: "Mobile Phones",
    price: 96,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80",
    description:
      "A compact charging stand that keeps phone, watch, and earbuds tidy on any desk.",
    details: [
      "Fast wireless charging",
      "Matte aluminum body",
      "Cable included",
    ],
    featured: true,
    newest: true,
  },
  {
    id: "calm-clay-diffuser",
    name: "Calm Clay Diffuser",
    parentCategory: "Wellness",
    category: "Aromatherapy",
    price: 44,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    description:
      "A quiet ceramic diffuser with soft mist modes for focused rooms and evening resets.",
    details: [
      "Two mist settings",
      "Auto shutoff",
      "Includes lavender oil sample",
    ],
    newest: true,
  },
  {
    id: "ribbed-knit-sweater",
    name: "Ribbed Knit Sweater",
    parentCategory: "Fashion",
    category: "Womens",
    price: 74,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    description:
      "A midweight knit with a clean silhouette, warm texture, and easy seasonal color.",
    details: ["Organic cotton blend", "Ribbed cuffs", "True to size"],
    featured: true,
  },
  {
    id: "modular-desk-lamp",
    name: "Modular Desk Lamp",
    parentCategory: "Home & Living",
    category: "Lighting",
    price: 118,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description:
      "A dimmable task lamp with a compact footprint and warm-to-cool light control.",
    details: ["Three brightness levels", "Adjustable arm", "LED bulb included"],
  },
  {
    id: "travel-tech-organizer",
    name: "Travel Tech Organizer",
    parentCategory: "Electronics",
    category: "Laptops",
    price: 38,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1586553633973-9e96ebcc0ec4?auto=format&fit=crop&w=900&q=80",
    description:
      "A slim organizer for chargers, cables, cards, and the small essentials of modern travel.",
    details: [
      "Water-resistant shell",
      "Elastic cable loops",
      "RFID card sleeve",
    ],
  },
  {
    id: "daily-hydration-bottle",
    name: "Daily Hydration Bottle",
    parentCategory: "Wellness",
    category: "Hydration",
    price: 32,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    description:
      "A double-wall bottle that keeps drinks cold through errands, workouts, and commutes.",
    details: ["24 ounce capacity", "Leakproof cap", "BPA-free stainless steel"],
    newest: true,
  },
  {
    id: "canvas-crossbody-pack",
    name: "Canvas Crossbody Pack",
    parentCategory: "Fashion",
    category: "Mens",
    price: 46,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description:
      "A hands-free pack with just enough structure for phone, wallet, keys, and sunglasses.",
    details: ["Adjustable strap", "Two exterior pockets", "Recycled canvas"],
  },
];

export const categoryGroups = [
  { name: "Electronics", children: ["Mobile Phones", "Laptops"] },
  { name: "Fashion", children: ["Mens", "Womens"] },
  { name: "Home & Living", children: ["Kitchen", "Lighting"] },
  { name: "Wellness", children: ["Aromatherapy", "Hydration"] },
];

export const parentCategories = categoryGroups.map((group) => group.name);

export const priceRanges = [
  { label: "All prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: Infinity },
];
