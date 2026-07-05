"use client";

import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters, filterProducts } from "@/components/shop/ShopFilters";

export function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const size = searchParams.get("size") || "";
  const color = searchParams.get("color") || "";

  const filtered = filterProducts(PRODUCTS, category, size, color);

  const sorted = [...filtered].sort((a, b) => {
    const categoryOrder = { henleys: 0, "ringer-tees": 1, polos: 2 };
    return categoryOrder[a.category] - categoryOrder[b.category];
  });

  return (
    <div className="section-padding py-12 lg:py-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          <aside className="lg:col-span-1">
            <ShopFilters />
          </aside>

          <div className="lg:col-span-3">
            <p className="font-sans text-xs text-klark-grey mb-8 tracking-wide">
              {sorted.length} {sorted.length === 1 ? "product" : "products"}
            </p>

            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-xl text-klark-grey mb-2">
                  No products found
                </p>
                <p className="font-sans text-sm text-klark-grey">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
