import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type FavoritesContextValue = {
  ids: string[];
  toggle: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  totalCount: number; 
  clear: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "favorites";

function readFavoritesFromSessionStorage(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readFavoritesFromSessionStorage());

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggle = (productId: string) => {
    setIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) return prev.filter((id) => id !== productId);
      return [...prev, productId];
    });
  };

  const isFavorite = (productId: string) => ids.includes(productId);

  const clear = () => setIds([]);

  const totalCount = useMemo(() => ids.length, [ids]);

  const value: FavoritesContextValue = {
    ids,
    toggle,
    isFavorite,
    totalCount,
    clear,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside <FavoritesProvider>");
  }
  return ctx;
}
