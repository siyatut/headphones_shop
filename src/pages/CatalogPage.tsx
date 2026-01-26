import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { useShop } from "../store/shop";

export function CatalogPage() {
  const wired = products.filter((p) => p.section === "wired");
  const wireless = products.filter((p) => p.section === "wireless");

  const { addToCart, toggleFavorite, isFavorite } = useShop();

  return (
    <div className="page">
      <div className="container">
        <h2 className="sectionTitle">Наушники</h2>
        <div className="grid">
          {wired.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={() => addToCart(p.id)}
              onToggleFavorite={() => toggleFavorite(p.id)}
              favorite={isFavorite(p.id)}
            />
          ))}
        </div>

        <h2 className="sectionTitle">Беспроводные наушники</h2>
        <div className="grid">
          {wireless.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={() => addToCart(p.id)}
              onToggleFavorite={() => toggleFavorite(p.id)}
              favorite={isFavorite(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
