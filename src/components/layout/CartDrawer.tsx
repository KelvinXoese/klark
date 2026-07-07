"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice, SITE } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-klark-black/40 z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-klark-white z-[70] shadow-2xl transition-transform duration-500 ease-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-6 border-b border-klark-grey-light">
          <h2 className="font-serif text-2xl font-light">Your Cart</h2>
          <button
            onClick={closeCart}
            className="font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="font-serif text-xl text-klark-grey mb-2">
              Your cart is empty
            </p>
            <p className="font-sans text-sm text-klark-grey mb-8">
              Discover our premium essentials
            </p>
            <Link href="/shop?category=henleys" onClick={closeCart}>
              <Button>Shop Henleys</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="w-24 shrink-0">
                    <ImagePlaceholder
                      label={item.imagePlaceholder}
                      aspectRatio="portrait"
                      size="sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-sm font-medium truncate">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-klark-grey mt-1">
                      {item.size} · {item.color}
                    </p>
                    <p className="font-sans text-sm mt-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 border border-klark-grey-light flex items-center justify-center text-sm hover:border-klark-black transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-sans text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 border border-klark-grey-light flex items-center justify-center text-sm hover:border-klark-black transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="ml-auto font-sans text-xs text-klark-grey hover:text-klark-black transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-klark-grey-light p-6 space-y-4">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-klark-grey">Subtotal</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              <p className="font-sans text-xs text-klark-grey">
                Delivery calculated at checkout
              </p>
              <Link href="/checkout" onClick={closeCart}>
                <Button fullWidth>Checkout</Button>
              </Link>
              <button
                onClick={closeCart}
                className="w-full font-sans text-xs tracking-widest uppercase text-klark-grey hover:text-klark-black transition-colors py-2"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
