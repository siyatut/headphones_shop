import { FiTrash2 } from "react-icons/fi";
import type { CartItem } from "../store/cartSelectors";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  item: CartItem;
  onInc: (productId: string) => void;
  onDec: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function CartItemCard({ item, onInc, onDec, onRemove }: Props) {
  const { product, qty } = item;

  return (
    <div className="cartItemCard">
      <button
        type="button"
        className="cartRemoveBtn"
        onClick={() => onRemove(product.id)}
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
            onClick={() => onDec(product.id)}
            aria-label="Уменьшить количество"
          >
            −
          </button>

          <div className="qtyValue">{qty}</div>

          <button
            type="button"
            className="qtyBtn"
            onClick={() => onInc(product.id)}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>

        <div className="cartItemInfo">
          <div className="cartItemName">{product.title}</div>
          <div className="cartItemPriceMuted">{formatPrice(product.price)}</div>
        </div>

        <div className="cartItemSum">{formatPrice(product.price * qty)}</div>
      </div>
    </div>
  );
}
