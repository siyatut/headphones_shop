import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailsModal } from "../components/ProductDetailsModal";
import { products, type Product } from "../data/products";
import { useShop } from "../store/shop";

export function CatalogPage() {
  const wired = products.filter((p) => p.section === "wired");
  const wireless = products.filter((p) => p.section === "wireless");

  const { addToCart, toggleFavorite, isFavorite } = useShop();

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
        <h2 className="sectionTitle">Наушники</h2>
        <div className="grid">
          {wired.map((p) => (
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

        <h2 className="sectionTitle">Беспроводные наушники</h2>
        <div className="grid">
          {wireless.map((p) => (
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
      </div>

      <ProductDetailsModal
        open={detailsOpen}
        onClose={closeDetails}
        product={activeProduct}
      />
    </div>
  );
}
