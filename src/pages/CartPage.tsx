import { useMemo, useState } from "react";
import { CheckoutModal } from "../components/CheckoutModal";
import { CartItemCard } from "../components/CartItemCard";
import { useShop } from "../store/shop";
import { getCartItems, getCartTotals } from "../store/cartSelectors";
import { formatPrice } from "../utils/formatPrice";

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
              cartItems.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onInc={inc}
                  onDec={dec}
                  onRemove={remove}
                />
              ))
            )}
          </div>

          <div className="cartTotalCard">
            <div className="cartTotalRow">
              <div className="cartTotalLabel">ИТОГО</div>
              <div className="cartTotalValue">{formatPrice(total)}</div>
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
