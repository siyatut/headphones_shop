import { FiX } from "react-icons/fi";
import starIcon from "../assets/star.png";
import type { Product } from "../data/products";
import { useEscape } from "../hooks/useEscape";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export function ProductDetailsModal({ open, onClose, product }: Props) {
  useEscape(onClose, open);
  useLockBodyScroll(open);

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open || !product) return null;

  const hasOld = Boolean(product.oldPrice);

  return (
    <div className="modalOverlay" onMouseDown={onOverlayClick} role="presentation">
      <div
        className="modalCard productModalCard"
        role="dialog"
        aria-modal="true"
        aria-label="О товаре"
      >
        <div className="productModalHeader">
          <div className="productModalTitle">О товаре</div>

          <button
            type="button"
            className="modalCloseBtn"
            onClick={onClose}
            aria-label="Закрыть"
            title="Закрыть"
            autoFocus
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="productModalBody">
          <div className="productModalGrid">
            <div className="productModalImgWrap">
              {product.img ? (
                <img className="productModalImg" src={product.img} alt={product.title} />
              ) : null}
            </div>

            <div className="productModalInfo">
              <div className="productModalName">{product.title}</div>

              <div className="productModalMeta">
                <div className="productModalRating">
                  <img className="productModalStar" src={starIcon} alt="" />
                  <span className="productModalRate">{product.rate}</span>
                </div>

                <div className="productModalPriceRow">
                  <span className="productModalPrice">{formatPrice(product.price)}</span>

                  {hasOld ? (
                    <span className="productModalOldPrice">
                      {formatPrice(product.oldPrice!)}
                    </span>
                  ) : null}
                </div>

                <div className="productModalDesc">
                  {product.section === "wireless"
                    ? "Беспроводные наушники. Отличный выбор для повседневного использования."
                    : "Проводные наушники. Отличный выбор для повседневного использования."}
                </div>
              </div>
            </div>
          </div>

          <button type="button" className="productModalOkBtn" onClick={onClose}>
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
