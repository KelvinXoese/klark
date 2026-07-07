"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { ProductsManager } from "@/components/admin/ProductsManager";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyKey = async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Authentication failed");
      }
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
      verifyKey(adminKey.trim());
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
            Set ADMIN_SECRET_KEY in your environment variables.
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
          <OrdersManager adminKey={adminKey} />
        ) : (
          <ProductsManager adminKey={adminKey} />
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
