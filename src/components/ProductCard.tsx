import type { Product } from "../data/products";
import starIcon from "../assets/star.png";
import { useFavorites } from "../context/FavoritesContext";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

type Props = {
  product: Product;
  onBuy: (productId: string) => void;
};

export function ProductCard({ product, onBuy }: Props) {
  const hasOld = Boolean(product.oldPrice);

  const { toggle, isFavorite } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <div className="card">
      {/* FAVORITE BUTTON */}
      <button
        type="button"
        className="favBtn"
        onClick={() => toggle(product.id)}
      >
        {active ? (
          <FaHeart className="favIcon favIconFilled" size={22} />
        ) : (
          <FiHeart className="favIcon favIconOutline" size={22} />
        )}
      </button>

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

          <button type="button" className="buyBtn" onClick={() => onBuy(product.id)}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
