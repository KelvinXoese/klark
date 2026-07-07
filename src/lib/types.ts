export type ProductCategory = "henleys" | "ringer-tees" | "polos";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number | null;
  promoTag?: string | null;
  currency: string;
  description: string;
  fabric: string;
  fit: string;
  care: string;
  delivery: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  imagePlaceholder: string;
  hoverImagePlaceholder: string;
  galleryPlaceholders: string[];
  featured: boolean;
  inStock: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: ProductSize;
  color: string;
  quantity: number;
  imagePlaceholder: string;
};

export type PaymentMethod = "mobile-money" | "card";

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered";

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: CartItem[];
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
};

export type CategoryMeta = {
  slug: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  imagePlaceholder: string;
  priority: number;
};
