import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  productId: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string) => void;
  totalCount: number; 
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "cart";

function readCartFromSessionStorage(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];
 
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x === "object" &&
          "productId" in x &&
          "qty" in x &&
          typeof (x as any).productId === "string" &&
          typeof (x as any).qty === "number"
      )
      .map((x) => ({ productId: (x as any).productId, qty: (x as any).qty }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCartFromSessionStorage());

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId);
      if (idx === -1) {
        return [...prev, { productId, qty: 1 }];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
      return next;
    });
  };

  const clear = () => setItems([]);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    totalCount,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
