"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        const { items } = get();
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },

      toggleItem: (productId) => {
        const { items } = get();
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },

      hasItem: (productId) => get().items.includes(productId),
    }),
    { name: "klark-wishlist" }
  )
);
