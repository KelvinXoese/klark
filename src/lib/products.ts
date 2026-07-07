import { prisma } from "@/lib/prisma";
import type { Product, ProductCategory, ProductColor, ProductSize } from "@/lib/types";
import type { Product as PrismaProduct } from "@prisma/client";

function toProduct(p: PrismaProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as ProductCategory,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice !== null ? Number(p.compareAtPrice) : null,
    promoTag: p.promoTag,
    currency: p.currency,
    description: p.description,
    fabric: p.fabric,
    fit: p.fit,
    care: p.care,
    delivery: p.delivery,
    sizes: p.sizes as ProductSize[],
    colors: p.colors as unknown as ProductColor[],
    imagePlaceholder: p.imagePlaceholder,
    hoverImagePlaceholder: p.hoverImagePlaceholder,
    galleryPlaceholders: p.galleryPlaceholders,
    featured: p.featured,
    inStock: p.inStock,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toProduct(product) : null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProduct);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      slug: { not: product.slug },
    },
    orderBy: { createdAt: "asc" },
  });

  const sameCategory = products.filter((p) => p.category === product.category);
  const others = products.filter((p) => p.category !== product.category);

  return [...sameCategory, ...others].slice(0, limit).map(toProduct);
}

// ---- Admin-only mutations ----

export type ProductInput = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number | null;
  promoTag?: string | null;
  currency?: string;
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
  featured?: boolean;
  inStock?: boolean;
};

export async function createProduct(input: ProductInput): Promise<Product> {
  const product = await prisma.product.create({
    data: {
      slug: input.slug,
      name: input.name,
      category: input.category,
      price: input.price,
      compareAtPrice: input.compareAtPrice ?? null,
      promoTag: input.promoTag ?? null,
      currency: input.currency ?? "GHS",
      description: input.description,
      fabric: input.fabric,
      fit: input.fit,
      care: input.care,
      delivery: input.delivery,
      sizes: input.sizes,
      colors: input.colors,
      imagePlaceholder: input.imagePlaceholder,
      hoverImagePlaceholder: input.hoverImagePlaceholder,
      galleryPlaceholders: input.galleryPlaceholders,
      featured: input.featured ?? false,
      inStock: input.inStock ?? true,
    },
  });
  return toProduct(product);
}

export async function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...input,
      colors: input.colors ? (input.colors as unknown as object) : undefined,
    },
  });
  return toProduct(product);
}

export async function deleteProduct(id: string): Promise<void> {
  await prisma.product.delete({ where: { id } });
}
