import type { Product } from "../data/products";
import starIcon from "../assets/star.png";

type Props = {
  product: Product;
  onBuy: (productId: string) => void;
};

export function ProductCard({ product, onBuy }: Props) {
  const hasOld = Boolean(product.oldPrice);

  return (
    <div className="card">
      <div className="cardImage">
        {product.img ? (
          <img src={product.img} alt={product.title} />
        ) : (
          <div className="imgPlaceholder" />
        )}
      </div>

      <div className="cardBody">
        <div className="cardTitleRow">
          <div className="cardTitle">{product.title}</div>

          <div className="cardPrice">
            <span className="priceCurrent">{product.price} ₽</span>

            <span className={`priceOld ${hasOld ? "" : "priceOldHidden"}`}>
              {hasOld ? `${product.oldPrice} ₽` : "0 ₽"}
            </span>
          </div>
        </div>

        <div className="cardBottomRow">
          <div className="ratingBox">
            <img className="ratingStarIcon" src={starIcon} alt="" />
            <span className="ratingValue">{product.rate}</span>
          </div>

          <button
            type="button"
            className="buyBtn"
            onClick={() => onBuy(product.id)}
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
