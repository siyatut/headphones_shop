import type { Product } from "../data/products";
import starIcon from "../assets/star.png";
import { FiHeart, FiEye } from "react-icons/fi";

type Props = {
  product: Product;
  onBuy: () => void;

  favorite: boolean;
  onToggleFavorite: () => void;

  onView: () => void;
};

export function ProductCard({
  product,
  onBuy,
  favorite,
  onToggleFavorite,
  onView,
}: Props) {
  const hasOld = Boolean(product.oldPrice);

  return (
    <div className="card">
      {/* View Button */}
      <button
        type="button"
        className="viewBtn"
        onClick={onView}
        aria-label="Посмотреть товар"
        title="Посмотреть"
      >
        <FiEye className="viewIcon" size={20} />
      </button>

      {/* Favorite Button */}
      <button
        type="button"
        className="favBtn"
        onClick={onToggleFavorite}
        aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
        title={favorite ? "Убрать из избранного" : "Добавить в избранное"}
      >
        <FiHeart
          className="favIcon"
          size={22}
          style={{
            color: "#FF8A00",
            fill: favorite ? "#FF8A00" : "transparent",
            stroke: "#FF8A00",
            strokeWidth: 2,
          }}
        />
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

          <button className="buyBtn" onClick={onBuy}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
