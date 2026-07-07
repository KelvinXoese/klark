"use client";

import { useState } from "react";
import type { Product, ProductSize } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

type ProductDetailsProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const inWishlist = hasItem(product.id);

  const allImages = [product.imagePlaceholder, ...product.galleryPlaceholders];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      imagePlaceholder: product.imagePlaceholder,
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <ImagePlaceholder
            label={allImages[activeImage]}
            aspectRatio="portrait"
            size="lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "transition-opacity duration-300",
                  activeImage === i ? "opacity-100 ring-1 ring-klark-black" : "opacity-60 hover:opacity-100"
                )}
              >
                <ImagePlaceholder label={img} aspectRatio="square" size="sm" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:py-8">
          <p className="font-sans text-xs tracking-widest uppercase text-klark-grey mb-3">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-8">
            <p className="font-sans text-xl">
              {formatPrice(product.price, product.currency)}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="font-sans text-base text-klark-grey line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </p>
            )}
            {product.promoTag && (
              <span className="bg-klark-black text-klark-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                {product.promoTag}
              </span>
            )}
          </div>
          <p className="body-large mb-10">{product.description}</p>

          <div className="space-y-8 mb-10">
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
                Color — {selectedColor}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all duration-300",
                      selectedColor === color.name
                        ? "border-klark-black scale-110"
                        : "border-transparent hover:border-klark-grey-light"
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setError("");
                    }}
                    className={cn(
                      "w-12 h-12 font-sans text-sm border transition-all duration-300",
                      selectedSize === size
                        ? "bg-klark-black text-klark-white border-klark-black"
                        : "border-klark-grey-light hover:border-klark-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && (
                <p className="font-sans text-xs text-red-600 mt-2">{error}</p>
              )}
            </div>

            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-klark-grey-light flex items-center justify-center hover:border-klark-black transition-colors"
                >
                  −
                </button>
                <span className="font-sans text-sm w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-klark-grey-light flex items-center justify-center hover:border-klark-black transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button fullWidth onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => toggleItem(product.id)}
            >
              {inWishlist ? "Saved" : "Save"}
            </Button>
          </div>

          <div className="space-y-6 border-t border-klark-grey-light pt-8">
            <DetailBlock title="Fabric" content={product.fabric} />
            <DetailBlock title="Fit" content={product.fit} highlight />
            <DetailBlock title="Care" content={product.care} />
            <DetailBlock title="Delivery" content={product.delivery} />
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20 lg:mt-32 pt-16 border-t border-klark-grey-light">
          <h2 className="heading-section mb-10">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DetailBlock({
  title,
  content,
  highlight,
}: {
  title: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <h3 className="font-sans text-xs tracking-widest uppercase mb-2">
        {title}
      </h3>
      <p
        className={cn(
          "font-sans text-sm leading-relaxed",
          highlight ? "text-klark-black" : "text-klark-grey"
        )}
      >
        {content}
      </p>
    </div>
  );
}
