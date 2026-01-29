import { products } from "../data/products";

export function getCartItems(cart: Record<string, number>) {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean) as Array<{ product: (typeof products)[number]; qty: number }>;
}

export function getCartTotals(
  cartItems: Array<{ product: (typeof products)[number]; qty: number }>
) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  return { total, totalCount };
}
