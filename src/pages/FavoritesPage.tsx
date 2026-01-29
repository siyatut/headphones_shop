import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailsModal } from "../components/ProductDetailsModal";
import { products, type Product } from "../data/products";
import { useShop } from "../store/shop";

export function FavoritesPage() {
  const { addToCart, toggleFavorite, isFavorite, favorites } = useShop();

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const favProducts = useMemo(() => {
    return products.filter((p) => favoritesSet.has(p.id));
  }, [favoritesSet]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const openDetails = (p: Product) => {
    setActiveProduct(p);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setActiveProduct(null);
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="cartTitle">Избранное</h2>

        {favProducts.length === 0 ? (
          <div className="cartEmpty">Здесь пока пусто.</div>
        ) : (
          <div className="grid">
            {favProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuy={() => addToCart(p.id)}
                onToggleFavorite={() => toggleFavorite(p.id)}
                favorite={isFavorite(p.id)}
                onView={() => openDetails(p)}
              />
            ))}
          </div>
        )}
      </div>

      <ProductDetailsModal
        open={detailsOpen}
        onClose={closeDetails}
        product={activeProduct}
      />
    </div>
  );
}
