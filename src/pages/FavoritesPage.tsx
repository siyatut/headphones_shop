import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { useShop } from "../store/shop";

export function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite, addToCart } = useShop();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="page">
      <div className="container">
        <h2 className="cartTitle">Избранное</h2>

        <div className="grid">
          {favoriteProducts.length === 0 ? (
            <div className="cartEmpty">Здесь пока пусто.</div>
          ) : (
            favoriteProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onBuy={() => addToCart(p.id)}
                onToggleFavorite={() => toggleFavorite(p.id)}
                favorite={isFavorite(p.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
