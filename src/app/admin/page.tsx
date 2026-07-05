"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import type { Order, Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
      setOrders(data.orders);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey.trim()) {
      fetchOrders(adminKey.trim());
    }
  };

  if (!authenticated) {
    return (
      <div className="pt-20 sm:pt-24 section-padding py-20">
        <div className="max-w-md mx-auto">
          <h1 className="heading-section mb-4 text-center">Admin</h1>
          <p className="body-large text-center mb-8">
            Enter your admin key to manage orders and products.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin secret key"
              className="w-full px-4 py-3 border border-klark-grey-light font-sans text-sm focus:outline-none focus:border-klark-black"
            />
            {error && (
              <p className="font-sans text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Verifying..." : "Enter Admin"}
            </Button>
          </form>
          <p className="font-sans text-xs text-klark-grey text-center mt-6">
            Set ADMIN_SECRET_KEY in your environment variables on Vercel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 section-padding py-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="heading-section">Admin Panel</h1>
          <div className="flex gap-2">
            <TabButton
              label="Orders"
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
            <TabButton
              label="Products"
              active={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
          </div>
        </div>

        {activeTab === "orders" ? (
          <OrdersTable orders={orders} />
        ) : (
          <ProductsTable products={PRODUCTS} />
        )}
      </div>
    </div>
  );
}

function TabButton({
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
      className={`px-6 py-2 font-sans text-xs tracking-widest uppercase border transition-all duration-300 ${
        active
          ? "bg-klark-black text-klark-white border-klark-black"
          : "border-klark-grey-light hover:border-klark-black"
      }`}
    >
      {label}
    </button>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="font-sans text-sm text-klark-grey py-12 text-center">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-klark-grey-light">
      <table className="w-full font-sans text-sm">
        <thead className="bg-klark-beige">
          <tr>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Order
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Customer
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Phone
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Items
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Total
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Payment
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Status
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <tr key={order.id} className="border-t border-klark-grey-light">
                <td className="p-4 font-medium">{order.orderNumber}</td>
                <td className="p-4">{order.customer.fullName}</td>
                <td className="p-4">{order.customer.phone}</td>
                <td className="p-4">{order.items.length}</td>
                <td className="p-4">{formatPrice(order.total)}</td>
                <td className="p-4 capitalize">
                  {order.paymentMethod.replace("-", " ")}
                </td>
                <td className="p-4 capitalize">{order.status}</td>
                <td className="p-4 text-klark-grey">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto border border-klark-grey-light">
      <table className="w-full font-sans text-sm">
        <thead className="bg-klark-beige">
          <tr>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Name
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Category
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Price
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Sizes
            </th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-klark-grey-light">
              <td className="p-4 font-medium">{product.name}</td>
              <td className="p-4 capitalize">
                {product.category.replace("-", " ")}
              </td>
              <td className="p-4">{formatPrice(product.price)}</td>
              <td className="p-4">{product.sizes.join(", ")}</td>
              <td className="p-4">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-sans text-xs text-klark-grey p-4 border-t border-klark-grey-light">
        To edit products, update src/lib/data.ts or connect a database. Product
        images: replace placeholders in data.ts with Cloudinary URLs when ready.
      </p>
    </div>
  );
}
