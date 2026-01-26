import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useShop } from "../store/shop";

export function Header() {
  const { favoritesCount, cartCount } = useShop();

  return (
    <header className="header">
      <div className="container">
        <div className="headerInner">
          <Link className="logo" to="/">
            QPICK
          </Link>

          <div className="headerIcons">
            <Link className="iconLink" to="/">
              <FiHeart className="iconSvg" size={22} />
              {favoritesCount > 0 ? (
                <span className="iconBadge">{favoritesCount}</span>
              ) : null}
            </Link>

            <Link className="iconLink" to="/cart">
              <FiShoppingCart className="iconSvg" size={22} />
              {cartCount > 0 ? (
                <span className="iconBadge">{cartCount}</span>
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
