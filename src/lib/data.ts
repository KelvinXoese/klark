import type { Product, Review, CategoryMeta } from "./types";

export const SITE = {
  name: "Klark",
  slogan: "Essentials Done Right.",
  promise: "Premium quality. Perfect fit. Delivered with care.",
  description:
    "Premium men's essentials — Henleys, Ringer Tees, and Polos. Timeless, well-fitted clothing for the modern man.",
  url: "https://klark.com",
  currency: "GHS",
  deliveryFee: 25,
};

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "henleys",
    name: "Henleys",
    tagline: "The foundation of every wardrobe",
    description: "Premium cotton henleys with a modern, tailored fit.",
    imagePlaceholder:
      "REPLACE: Editorial hero image — male model wearing a Klark henley, neutral studio or lifestyle setting, chest-up or full body, muted tones",
    priority: 1,
  },
  {
    slug: "ringer-tees",
    name: "Ringer Tees",
    tagline: "Classic detail, refined execution",
    description: "Contrast-trim tees elevated with premium fabric and fit.",
    imagePlaceholder:
      "REPLACE: Editorial image — Klark ringer tee on model, clean background, focus on contrast collar/sleeve detail",
    priority: 2,
  },
  {
    slug: "polos",
    name: "Polos",
    tagline: "Quiet confidence",
    description: "Minimal polos designed for everyday polish.",
    imagePlaceholder:
      "REPLACE: Editorial image — Klark polo on model, smart-casual setting, understated and premium",
    priority: 3,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "henley-001",
    slug: "essential-cotton-henley-black",
    name: "Essential Cotton Henley",
    category: "henleys",
    price: 280,
    currency: "GHS",
    description:
      "A refined everyday henley cut from premium combed cotton. Three-button placket, ribbed collar, and a fit that sits close without restriction.",
    fabric:
      "100% premium combed cotton, 220gsm. Soft hand-feel with structured drape.",
    fit: "Modern slim fit. True to size — order your usual size for a tailored look. Size up for a relaxed fit.",
    care: "Machine wash cold. Hang dry. Do not bleach.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "White", hex: "#FAFAF8" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    imagePlaceholder:
      "REPLACE: Product shot — Essential Cotton Henley in Black, front view, editorial lighting, neutral background",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Essential Cotton Henley in Black, back or side view showing fit and placket detail",
    galleryPlaceholders: [
      "REPLACE: Product detail — henley placket and button close-up",
      "REPLACE: Lifestyle shot — model wearing black henley, casual setting",
      "REPLACE: Fabric texture close-up — cotton weave detail",
    ],
    featured: true,
    inStock: true,
  },
  {
    id: "henley-002",
    slug: "long-sleeve-henley-oat",
    name: "Long Sleeve Henley",
    category: "henleys",
    price: 320,
    currency: "GHS",
    description:
      "Extended coverage with the same premium construction. Ideal for layering or wearing solo.",
    fabric: "100% premium combed cotton, 240gsm. Heavier weight for cooler days.",
    fit: "Modern slim fit. Slightly longer body. True to size.",
    care: "Machine wash cold. Tumble dry low.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oat", hex: "#E8E0D4" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    imagePlaceholder:
      "REPLACE: Product shot — Long Sleeve Henley in Oat, front view, editorial style",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Long Sleeve Henley, model wearing layered look",
    galleryPlaceholders: [
      "REPLACE: Product detail — sleeve and cuff close-up",
      "REPLACE: Lifestyle shot — long sleeve henley styled with jacket",
    ],
    featured: true,
    inStock: true,
  },
  {
    id: "henley-003",
    slug: "merino-blend-henley-navy",
    name: "Merino Blend Henley",
    category: "henleys",
    price: 380,
    currency: "GHS",
    description:
      "Our most refined henley. Cotton-merino blend for temperature regulation and an elevated hand-feel.",
    fabric: "70% cotton, 30% merino wool. Lightweight, breathable, naturally odor-resistant.",
    fit: "Tailored fit. Runs slightly slim — size up if between sizes.",
    care: "Hand wash cold or delicate cycle. Lay flat to dry.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Navy", hex: "#1B2838" }],
    imagePlaceholder:
      "REPLACE: Product shot — Merino Blend Henley in Navy, premium editorial presentation",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Merino Henley, detail of fabric drape on model",
    galleryPlaceholders: [
      "REPLACE: Fabric close-up — merino blend texture",
      "REPLACE: Lifestyle — navy henley in elevated casual setting",
    ],
    featured: true,
    inStock: true,
  },
  {
    id: "ringer-001",
    slug: "classic-ringer-tee-white",
    name: "Classic Ringer Tee",
    category: "ringer-tees",
    price: 220,
    currency: "GHS",
    description:
      "A timeless ringer tee with contrast trim. Premium jersey cotton with a clean, modern silhouette.",
    fabric: "100% premium jersey cotton, 200gsm.",
    fit: "Regular fit with slightly dropped shoulder. True to size.",
    care: "Machine wash cold. Do not tumble dry.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White/Black", hex: "#FAFAF8" },
      { name: "Black/White", hex: "#0A0A0A" },
    ],
    imagePlaceholder:
      "REPLACE: Product shot — Classic Ringer Tee White/Black, front view, focus on contrast trim",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Ringer Tee on model, side angle showing trim detail",
    galleryPlaceholders: [
      "REPLACE: Detail shot — contrast collar and sleeve band",
      "REPLACE: Lifestyle — ringer tee styled casually",
    ],
    featured: true,
    inStock: true,
  },
  {
    id: "ringer-002",
    slug: "oversized-ringer-tee-stone",
    name: "Relaxed Ringer Tee",
    category: "ringer-tees",
    price: 240,
    currency: "GHS",
    description:
      "A relaxed take on the classic ringer. Generous cut with the same premium trim details.",
    fabric: "100% premium jersey cotton, 210gsm.",
    fit: "Relaxed oversized fit. Size down for a regular fit.",
    care: "Machine wash cold. Hang dry.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Stone", hex: "#B8B0A4" }],
    imagePlaceholder:
      "REPLACE: Product shot — Relaxed Ringer Tee in Stone, front view",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Relaxed Ringer Tee, model in relaxed pose",
    galleryPlaceholders: [
      "REPLACE: Detail — oversized fit drape on model",
    ],
    featured: false,
    inStock: true,
  },
  {
    id: "polo-001",
    slug: "minimal-polo-black",
    name: "Minimal Polo",
    category: "polos",
    price: 300,
    currency: "GHS",
    description:
      "A stripped-back polo with no logo clutter. Clean lines, premium pique cotton, and a refined collar.",
    fabric: "100% pique cotton, 220gsm. Structured yet breathable.",
    fit: "Modern tailored fit. True to size for a sharp look.",
    care: "Machine wash cold. Iron on low if needed.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "White", hex: "#FAFAF8" },
    ],
    imagePlaceholder:
      "REPLACE: Product shot — Minimal Polo in Black, front view, clean editorial style",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Minimal Polo, model in smart-casual setting",
    galleryPlaceholders: [
      "REPLACE: Detail — polo collar and placket close-up",
    ],
    featured: false,
    inStock: true,
  },
  {
    id: "polo-002",
    slug: "soft-knit-polo-charcoal",
    name: "Soft Knit Polo",
    category: "polos",
    price: 340,
    currency: "GHS",
    description:
      "A softer, more relaxed polo in a fine knit. Perfect for elevated casual wear.",
    fabric: "Cotton-modal blend knit. Lightweight with natural stretch.",
    fit: "Regular fit with ease through the body. True to size.",
    care: "Machine wash cold on delicate. Lay flat to dry.",
    delivery: "Delivered within 2–4 business days across Ghana.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#3D3D3D" }],
    imagePlaceholder:
      "REPLACE: Product shot — Soft Knit Polo in Charcoal, front view",
    hoverImagePlaceholder:
      "REPLACE: Product shot — Soft Knit Polo, texture detail on model",
    galleryPlaceholders: [
      "REPLACE: Fabric close-up — knit texture",
    ],
    featured: false,
    inStock: true,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    name: "Kwame A.",
    location: "Accra",
    rating: 5,
    text: "The henley fit is perfect. Premium feel without the premium price tag. Already ordered two more.",
    product: "Essential Cotton Henley",
  },
  {
    id: "review-2",
    name: "Daniel O.",
    location: "Kumasi",
    rating: 5,
    text: "Finally, essentials that actually fit well. The fabric quality is noticeable from the first wear.",
    product: "Classic Ringer Tee",
  },
  {
    id: "review-3",
    name: "Emmanuel K.",
    location: "Tema",
    rating: 5,
    text: "Clean packaging, fast delivery, and the clothes speak for themselves. Klark gets it right.",
    product: "Long Sleeve Henley",
  },
  {
    id: "review-4",
    name: "Kofi M.",
    location: "Accra",
    rating: 5,
    text: "Minimal design, maximum quality. This is what men's essentials should be.",
    product: "Minimal Polo",
  },
];

export const WHY_KLARK = [
  {
    title: "Premium Fabric Selection",
    description:
      "Every piece starts with carefully sourced materials — soft, durable, and built to last.",
  },
  {
    title: "Perfect Modern Fit",
    description:
      "Tailored silhouettes designed for real bodies. No boxy cuts, no compromises.",
  },
  {
    title: "Designed for Confidence",
    description:
      "Minimal details that let quality speak. Wear them anywhere, anytime.",
  },
  {
    title: "Delivered with Care",
    description:
      "Fast, reliable delivery across Ghana. Your order handled with the same attention as our garments.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const henleys = PRODUCTS.filter(
    (p) => p.category === "henleys" && p.id !== product.id
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const combined = [...henleys, ...sameCategory, ...others];
  const seen = new Set<string>();
  return combined.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  }).slice(0, limit);
}

export function formatPrice(amount: number, currency = SITE.currency): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
