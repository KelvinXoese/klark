"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { ProductCategory, ProductSize } from "@/lib/types";
import { CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["Black", "White", "Charcoal", "Navy", "Oat", "Stone"];

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!category}
            onClick={() => updateFilter("category", "")}
          />
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.slug}
              label={cat.name}
              active={category === cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!size}
            onClick={() => updateFilter("size", "")}
          />
          {SIZES.map((s) => (
            <FilterChip
              key={s}
              label={s}
              active={size === s}
              onClick={() => updateFilter("size", s)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
          Color
        </h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!color}
            onClick={() => updateFilter("color", "")}
          />
          {COLORS.map((c) => (
            <FilterChip
              key={c}
              label={c}
              active={color === c}
              onClick={() => updateFilter("color", c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 font-sans text-xs tracking-wide border transition-all duration-300",
        active
          ? "bg-klark-black text-klark-white border-klark-black"
          : "bg-transparent text-klark-black border-klark-grey-light hover:border-klark-black"
      )}
    >
      {label}
    </button>
  );
}

export function filterProducts(
  products: import("@/lib/types").Product[],
  category: string,
  size: string,
  color: string
) {
  return products.filter((product) => {
    if (category && product.category !== (category as ProductCategory))
      return false;
    if (size && !product.sizes.includes(size as ProductSize)) return false;
    if (
      color &&
      !product.colors.some(
        (c) => c.name.toLowerCase().includes(color.toLowerCase())
      )
    )
      return false;
    return true;
  });
}
