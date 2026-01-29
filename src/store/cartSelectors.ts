import { products, type Product } from "../data/products";

export type CartItem = { product: Product; qty: number };

const productById = new Map<string, Product>(products.map((p) => [p.id, p]));

export function getCartItems(cart: Record<string, number>): CartItem[] {
  return Object.entries(cart)
    .map(([id, qty]) => {
      const product = productById.get(id);
      if (!product) return null;
      return { product, qty };
    })
    .filter((x): x is CartItem => x !== null);
}

export function getCartTotals(cartItems: CartItem[]) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  return { total, totalCount };
}
