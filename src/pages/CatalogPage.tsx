import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export function CatalogPage() {
  const { addItem } = useCart();

  const wired = products.filter((p) => p.section === "wired");
  const wireless = products.filter((p) => p.section === "wireless");

  const handleBuy = (productId: string) => {
    addItem(productId);
  };

  return (
    <div className="page">
      <div className="container">
        <h2 className="sectionTitle">Наушники</h2>
        <div className="grid">
          {wired.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={handleBuy} />
          ))}
        </div>

        <h2 className="sectionTitle">Беспроводные наушники</h2>
        <div className="grid">
          {wireless.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={handleBuy} />
          ))}
        </div>
      </div>
    </div>
  );
}
