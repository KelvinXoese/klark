import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "./ShopContent";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop premium men's essentials — Henleys, Ringer Tees, and Polos. Minimal design, perfect fit.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="pt-20 sm:pt-24">
      <div className="section-padding py-12 lg:py-16 border-b border-klark-grey-light">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="heading-section mb-4">Shop</h1>
          <p className="body-large max-w-lg">
            Premium essentials, curated for everyday confidence.
          </p>
        </div>
      </div>

      <Suspense fallback={<ShopLoading />}>
        <ShopContent products={products} />
      </Suspense>
    </div>
  );
}

function ShopLoading() {
  return (
    <div className="section-padding py-16 max-w-[1600px] mx-auto">
      <p className="font-sans text-sm text-klark-grey">Loading products...</p>
    </div>
  );
}
