"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Product, ProductCategory, ProductSize } from "@/lib/types";

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "henleys", label: "Henleys" },
  { value: "ringer-tees", label: "Ringer Tees" },
  { value: "polos", label: "Polos" },
];

const SIZE_OPTIONS: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function colorsToText(colors: Product["colors"]) {
  return colors.map((c) => `${c.name}, ${c.hex}`).join("\n");
}

function textToColors(text: string): Product["colors"] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, hex] = line.split(",").map((s) => s.trim());
      return { name: name || "Color", hex: hex || "#000000" };
    });
}

export type ProductFormValues = {
  name: string;
  slug: string;
  category: ProductCategory;
  price: string;
  compareAtPrice: string;
  promoTag: string;
  description: string;
  fabric: string;
  fit: string;
  care: string;
  delivery: string;
  sizes: ProductSize[];
  colorsText: string;
  imagePlaceholder: string;
  hoverImagePlaceholder: string;
  galleryText: string;
  featured: boolean;
  inStock: boolean;
};

function productToFormValues(product?: Product): ProductFormValues {
  if (!product) {
    return {
      name: "",
      slug: "",
      category: "henleys",
      price: "",
      compareAtPrice: "",
      promoTag: "",
      description: "",
      fabric: "",
      fit: "",
      care: "",
      delivery: "",
      sizes: [],
      colorsText: "",
      imagePlaceholder: "",
      hoverImagePlaceholder: "",
      galleryText: "",
      featured: false,
      inStock: true,
    };
  }
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice != null ? String(product.compareAtPrice) : "",
    promoTag: product.promoTag ?? "",
    description: product.description,
    fabric: product.fabric,
    fit: product.fit,
    care: product.care,
    delivery: product.delivery,
    sizes: product.sizes,
    colorsText: colorsToText(product.colors),
    imagePlaceholder: product.imagePlaceholder,
    hoverImagePlaceholder: product.hoverImagePlaceholder,
    galleryText: product.galleryPlaceholders.join("\n"),
    featured: product.featured,
    inStock: product.inStock,
  };
}

export function ProductForm({
  product,
  onCancel,
  onSubmit,
  submitting,
}: {
  product?: Product;
  onCancel: () => void;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  submitting: boolean;
}) {
  const [values, setValues] = useState<ProductFormValues>(
    productToFormValues(product)
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(product));

  const update = <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const toggleSize = (size: ProductSize) => {
    update(
      "sizes",
      values.sizes.includes(size)
        ? values.sizes.filter((s) => s !== size)
        : [...values.sizes, size]
    );
  };

  const handleNameChange = (name: string) => {
    update("name", name);
    if (!slugTouched) {
      update("slug", slugify(name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: values.name,
      slug: values.slug || slugify(values.name),
      category: values.category,
      price: parseFloat(values.price) || 0,
      compareAtPrice: values.compareAtPrice
        ? parseFloat(values.compareAtPrice)
        : null,
      promoTag: values.promoTag || null,
      description: values.description,
      fabric: values.fabric,
      fit: values.fit,
      care: values.care,
      delivery: values.delivery,
      sizes: values.sizes,
      colors: textToColors(values.colorsText),
      imagePlaceholder: values.imagePlaceholder,
      hoverImagePlaceholder: values.hoverImagePlaceholder,
      galleryPlaceholders: values.galleryText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      featured: values.featured,
      inStock: values.inStock,
    };

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-klark-white w-full max-w-2xl my-8 p-6 sm:p-8">
        <h2 className="font-serif text-2xl mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 font-sans text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                required
                value={values.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Slug">
              <input
                required
                value={values.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value));
                }}
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Category">
              <select
                value={values.category}
                onChange={(e) =>
                  update("category", e.target.value as ProductCategory)
                }
                className="input"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Price (GHS)">
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={values.price}
                onChange={(e) => update("price", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Compare-at price (optional)">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Original price if on sale"
                value={values.compareAtPrice}
                onChange={(e) => update("compareAtPrice", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Promo tag (optional, e.g. 'Limited Time', 'New')">
            <input
              value={values.promoTag}
              onChange={(e) => update("promoTag", e.target.value)}
              className="input"
              placeholder="Leave blank for no badge"
            />
          </Field>

          <Field label="Description">
            <textarea
              required
              rows={3}
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              className="input"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Fabric">
              <input
                required
                value={values.fabric}
                onChange={(e) => update("fabric", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Fit">
              <input
                required
                value={values.fit}
                onChange={(e) => update("fit", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Care">
              <input
                required
                value={values.care}
                onChange={(e) => update("care", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Delivery note">
              <input
                required
                value={values.delivery}
                onChange={(e) => update("delivery", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Sizes">
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 border text-xs ${
                    values.sizes.includes(size)
                      ? "bg-klark-black text-klark-white border-klark-black"
                      : "border-klark-grey-light"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Colors (one per line: Name, #hex)">
            <textarea
              rows={3}
              value={values.colorsText}
              onChange={(e) => update("colorsText", e.target.value)}
              className="input font-mono text-xs"
              placeholder={"Black, #000000\nCharcoal, #333333"}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Main image placeholder / URL">
              <input
                required
                value={values.imagePlaceholder}
                onChange={(e) => update("imagePlaceholder", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Hover image placeholder / URL">
              <input
                required
                value={values.hoverImagePlaceholder}
                onChange={(e) =>
                  update("hoverImagePlaceholder", e.target.value)
                }
                className="input"
              />
            </Field>
          </div>

          <Field label="Gallery images (one per line)">
            <textarea
              rows={3}
              value={values.galleryText}
              onChange={(e) => update("galleryText", e.target.value)}
              className="input text-xs"
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) => update("featured", e.target.checked)}
              />
              Featured on homepage
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={values.inStock}
                onChange={(e) => update("inStock", e.target.checked)}
              />
              In stock
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-klark-grey-light">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : product ? "Save Changes" : "Add Product"}
            </Button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 font-sans text-xs tracking-widest uppercase border border-klark-grey-light hover:border-klark-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--klark-grey-light, #d4d4d4);
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: black;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs tracking-wide uppercase text-klark-grey mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
