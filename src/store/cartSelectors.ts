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
  const { total, totalCount } = cartItems.reduce(
    (acc, item) => {
      acc.total += item.product.price * item.qty;
      acc.totalCount += item.qty;
      return acc;
    },
    { total: 0, totalCount: 0 }
  );

  return { total, totalCount };
}
