import { products } from "../data/products";
import { useShop } from "../store/shop";
import { FiTrash2 } from "react-icons/fi";

export function CartPage() {
  const { cart, inc, dec, remove } = useShop();

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean) as Array<{ product: (typeof products)[number]; qty: number }>;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="page">
      <div className="container">
        <h2 className="cartTitle">Корзина</h2>

        <div className="cartLayout">
          <div className="cartList">
            {cartItems.length === 0 ? (
              <div className="cartEmpty">Здесь пока пусто.</div>
            ) : (
              cartItems.map(({ product, qty }) => (
                <div key={product.id} className="cartItemCard">
                  <button
                    type="button"
                    className="cartRemoveBtn"
                    onClick={() => remove(product.id)}
                    aria-label="Удалить товар"
                    title="Удалить товар"
                  >
                    <FiTrash2 size={18} />
                  </button>

                  <div className="cartItemInner">
                    <div className="cartItemImage">
                      {product.img ? (
                        <img src={product.img} alt={product.title} />
                      ) : null}
                    </div>

                    <div className="cartQtyRow">
                      <button
                        type="button"
                        className="qtyBtn"
                        onClick={() => dec(product.id)}
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>

                      <div className="qtyValue">{qty}</div>

                      <button
                        type="button"
                        className="qtyBtn"
                        onClick={() => inc(product.id)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>

                    <div className="cartItemInfo">
                      <div className="cartItemName">{product.title}</div>
                      <div className="cartItemPriceMuted">{product.price} ₽</div>
                    </div>

                    <div className="cartItemSum">{product.price * qty} ₽</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cartTotalCard">
            <div className="cartTotalRow">
              <div className="cartTotalLabel">ИТОГО</div>
              <div className="cartTotalValue">₽ {total.toLocaleString("ru-RU")}</div>
            </div>

            <button
              type="button"
              className="checkoutBtn"
              onClick={() => alert(`Оформление: товаров ${totalCount}, сумма ₽ ${total}`)}
            >
              Перейти к оформлению
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
