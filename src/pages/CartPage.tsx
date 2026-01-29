import { useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { CheckoutModal } from "../components/CheckoutModal";
import { useShop } from "../store/shop";
import { getCartItems, getCartTotals } from "../store/cartSelectors";

export function CartPage() {
  const { cart, inc, dec, remove } = useShop();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const cartItems = useMemo(() => getCartItems(cart), [cart]);
  const { total, totalCount } = useMemo(() => getCartTotals(cartItems), [cartItems]);

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
                      {product.img ? <img src={product.img} alt={product.title} /> : null}
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
              onClick={() => setCheckoutOpen(true)}
              disabled={cartItems.length === 0} 
            >
              Перейти к оформлению
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={total}
        totalCount={totalCount}
      />
    </div>
  );
}
