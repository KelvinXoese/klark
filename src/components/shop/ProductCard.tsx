"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useWishlistStore } from "@/lib/store/wishlist";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleItem, hasItem } = useWishlistStore();
  const inWishlist = hasItem(product.id);

  return (
    <article
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden mb-4">
          <ImagePlaceholder
            label={
              isHovered
                ? product.hoverImagePlaceholder
                : product.imagePlaceholder
            }
            aspectRatio="portrait"
            className="transition-opacity duration-500"
          />
          {product.promoTag && (
            <span className="absolute top-3 left-3 bg-klark-black text-klark-white text-[10px] tracking-widest uppercase px-2.5 py-1">
              {product.promoTag}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-klark-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <span className="text-sm">{inWishlist ? "♥" : "♡"}</span>
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="font-sans text-sm tracking-wide">{product.name}</h3>
          <p className="font-sans text-sm text-klark-grey flex items-center gap-2">
            <span>{formatPrice(product.price, product.currency)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="line-through text-klark-grey/60 text-xs">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
