"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";
import type { Order, OrderStatus } from "@/lib/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export function OrdersManager({ adminKey }: { adminKey: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load orders");
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ orderId, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update order");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <p className="font-sans text-sm text-klark-grey py-12 text-center">
        Loading orders...
      </p>
    );
  }

  if (error) {
    return (
      <p className="font-sans text-sm text-red-600 py-12 text-center">
        {error}
      </p>
    );
  }

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
            <th className="text-left p-4 text-xs tracking-widest uppercase">Order</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Customer</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Phone</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Items</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Total</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Payment</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Status</th>
            <th className="text-left p-4 text-xs tracking-widest uppercase">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-klark-grey-light align-top">
              <td className="p-4 font-medium">{order.orderNumber}</td>
              <td className="p-4">
                <div>{order.customer.fullName}</div>
                <div className="text-xs text-klark-grey">{order.customer.address}</div>
              </td>
              <td className="p-4">{order.customer.phone}</td>
              <td className="p-4">
                {order.items.map((item, i) => (
                  <div key={i} className="text-xs text-klark-grey">
                    {item.quantity}× {item.name} ({item.size}/{item.color})
                  </div>
                ))}
              </td>
              <td className="p-4">{formatPrice(order.total)}</td>
              <td className="p-4 capitalize">{order.paymentMethod.replace("-", " ")}</td>
              <td className="p-4">
                <select
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="border border-klark-grey-light px-2 py-1 text-xs capitalize focus:outline-none focus:border-klark-black disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4 text-klark-grey text-xs">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
