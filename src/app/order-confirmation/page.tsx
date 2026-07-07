"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="pt-20 sm:pt-24 section-padding py-20 lg:py-32 text-center">
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="w-16 h-16 border border-klark-black rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-2xl">✓</span>
        </div>

        <h1 className="heading-section mb-4">Order Confirmed</h1>

        {orderNumber && (
          <p className="font-sans text-sm text-klark-grey mb-6">
            Order number:{" "}
            <span className="text-klark-black font-medium">{orderNumber}</span>
          </p>
        )}

        <p className="body-large mb-4">
          Your order has been received. We will contact you shortly.
        </p>

        <p className="font-sans text-sm text-klark-grey mb-10">
          {orderNumber
            ? "Payment instructions will be sent to your phone if you selected Mobile Money."
            : "Thank you for choosing Klark."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton href="/shop?category=henleys">Continue Shopping</LinkButton>
          <Link
            href="/"
            className="font-sans text-xs tracking-widest uppercase py-3.5 hover:opacity-60 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 section-padding py-20 text-center">
          <p className="font-sans text-sm text-klark-grey">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
