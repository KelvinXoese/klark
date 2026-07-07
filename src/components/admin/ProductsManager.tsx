"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductForm } from "./ProductForm";

export function ProductsManager({ adminKey }: { adminKey: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load products");
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddForm = () => {
    setEditingProduct(undefined);
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(undefined);
  };

  const handleSubmit = async (payload: Record<string, unknown>) => {
    setSubmitting(true);
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      await fetchProducts();
      closeForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;

    setDeletingId(product.id);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product");
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleInStock = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ inStock: !product.inStock }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update stock");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, inStock: !product.inStock } : p
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update stock");
    }
  };

  if (loading) {
    return (
      <p className="font-sans text-sm text-klark-grey py-12 text-center">
        Loading products...
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

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openAddForm}
          className="px-6 py-2.5 bg-klark-black text-klark-white font-sans text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto border border-klark-grey-light">
        <table className="w-full font-sans text-sm">
          <thead className="bg-klark-beige">
            <tr>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Name</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Category</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Price</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Promo</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Sizes</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Stock</th>
              <th className="text-left p-4 text-xs tracking-widest uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-klark-grey">
                  No products yet. Add your first one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t border-klark-grey-light">
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 capitalize">
                    {product.category.replace("-", " ")}
                  </td>
                  <td className="p-4">
                    {formatPrice(product.price)}
                    {product.compareAtPrice ? (
                      <span className="ml-2 text-xs text-klark-grey line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    ) : null}
                  </td>
                  <td className="p-4">
                    {product.promoTag ? (
                      <span className="px-2 py-0.5 bg-klark-beige text-xs">
                        {product.promoTag}
                      </span>
                    ) : (
                      <span className="text-xs text-klark-grey">—</span>
                    )}
                  </td>
                  <td className="p-4 text-xs">{product.sizes.join(", ")}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleInStock(product)}
                      className={`text-xs px-2 py-1 border ${
                        product.inStock
                          ? "border-green-600 text-green-700"
                          : "border-red-400 text-red-600"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-xs tracking-wide uppercase underline hover:opacity-60"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        className="text-xs tracking-wide uppercase underline text-red-600 hover:opacity-60 disabled:opacity-40"
                      >
                        {deletingId === product.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <ProductForm
          product={editingProduct}
          onCancel={closeForm}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
}
