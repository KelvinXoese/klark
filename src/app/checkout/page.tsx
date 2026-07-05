"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice, SITE } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import type { PaymentMethod } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "mobile-money" as PaymentMethod,
  });

  const deliveryFee = items.length > 0 ? SITE.deliveryFee : 0;
  const total = subtotal() + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || undefined,
            address: form.address.trim(),
          },
          items,
          paymentMethod: form.paymentMethod,
          subtotal: subtotal(),
          deliveryFee,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      clearCart();
      router.push(`/order-confirmation?order=${data.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 sm:pt-24 section-padding py-20 text-center">
        <h1 className="heading-section mb-4">Checkout</h1>
        <p className="body-large mb-8">Your cart is empty.</p>
        <Link href="/shop?category=henleys">
          <Button>Shop Henleys</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24">
      <div className="section-padding py-12 lg:py-16 border-b border-klark-grey-light">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="heading-section mb-2">Checkout</h1>
          <p className="body-large">
            Guest checkout — no account required. We&apos;ll use your details
            for delivery.
          </p>
        </div>
      </div>

      <div className="section-padding py-12 lg:py-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl mb-6">Delivery Details</h2>
              <div className="space-y-4">
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Kwame Mensah"
                />
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+233 XX XXX XXXX"
                />
                <FormField
                  label="Email (optional)"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Street, area, city, region"
                    className="w-full px-4 py-3 border border-klark-grey-light bg-klark-white font-sans text-sm focus:outline-none focus:border-klark-black transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
              <div className="space-y-3">
                <PaymentOption
                  id="mobile-money"
                  label="Mobile Money"
                  description="MTN, Vodafone, AirtelTigo — payment instructions sent after order"
                  selected={form.paymentMethod === "mobile-money"}
                  onSelect={() =>
                    setForm((prev) => ({
                      ...prev,
                      paymentMethod: "mobile-money",
                    }))
                  }
                />
                <PaymentOption
                  id="card"
                  label="Card Payment"
                  description="Visa, Mastercard — secure card processing"
                  selected={form.paymentMethod === "card"}
                  onSelect={() =>
                    setForm((prev) => ({ ...prev, paymentMethod: "card" }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-t border-klark-grey-light">
              <TrustBadge title="Quality Guaranteed" />
              <TrustBadge title="Fast Delivery" />
              <TrustBadge title="Easy Returns" />
            </div>

            {error && (
              <p className="font-sans text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Processing..." : `Confirm Purchase — ${formatPrice(total)}`}
            </Button>
          </form>

          <div>
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
            <div className="border border-klark-grey-light p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="w-20 shrink-0">
                    <ImagePlaceholder
                      label={item.imagePlaceholder}
                      aspectRatio="portrait"
                      size="sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-sm">{item.name}</h3>
                    <p className="font-sans text-xs text-klark-grey mt-1">
                      {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                    <p className="font-sans text-sm mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t border-klark-grey-light pt-4 space-y-2">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-klark-grey">Subtotal</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-klark-grey">Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-sans text-base pt-2 border-t border-klark-grey-light">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-xs tracking-widest uppercase mb-2">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-klark-grey-light bg-klark-white font-sans text-sm focus:outline-none focus:border-klark-black transition-colors"
      />
    </div>
  );
}

function PaymentOption({
  id,
  label,
  description,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-4 border transition-all duration-300 ${
        selected
          ? "border-klark-black bg-klark-beige"
          : "border-klark-grey-light hover:border-klark-grey"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-klark-black" : "border-klark-grey-light"
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-klark-black" />
          )}
        </div>
        <span className="font-sans text-sm font-medium">{label}</span>
      </div>
      <p className="font-sans text-xs text-klark-grey mt-2 ml-7">
        {description}
      </p>
    </button>
  );
}

function TrustBadge({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-klark-black text-sm">✓</span>
      <span className="font-sans text-xs text-klark-grey">{title}</span>
    </div>
  );
}
