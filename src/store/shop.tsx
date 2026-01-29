import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartMap = Record<string, number>;

type ShopContextValue = {
  cart: CartMap;
  favorites: string[];

  cartCount: number;
  favoritesCount: number;

  addToCart: (productId: string) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  remove: (productId: string) => void;

  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "qpick_cart";
const FAV_KEY = "qpick_favorites";

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartMap>(() =>
    safeParse<CartMap>(sessionStorage.getItem(CART_KEY), {})
  );

  const [favorites, setFavorites] = useState<string[]>(() =>
    safeParse<string[]>(sessionStorage.getItem(FAV_KEY), [])
  );

  useEffect(() => {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const favoritesCount = favorites.length;

  const addToCart = useCallback((productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }, []);

  const inc = useCallback((productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }, []);

  const dec = useCallback((productId: string) => {
    setCart((prev) => {
      const current = prev[productId] ?? 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: current - 1 };
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  }, []);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const isFavorite = useCallback(
    (productId: string) => favoriteSet.has(productId),
    [favoriteSet]
  );

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      return [...prev, productId];
    });
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    return {
      cart,
      favorites,
      cartCount,
      favoritesCount,
      addToCart,
      inc,
      dec,
      remove,
      isFavorite,
      toggleFavorite,
    };
  }, [
    cart,
    favorites,
    cartCount,
    favoritesCount,
    addToCart,
    inc,
    dec,
    remove,
    isFavorite,
    toggleFavorite,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
