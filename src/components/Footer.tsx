import { Link } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";

import vkIcon from "../assets/social/vk.svg";
import tgIcon from "../assets/social/tg.svg";
import waIcon from "../assets/social/whatsapp.svg";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerBox">
          {/* Left: logo */}
          <Link className="footerLogo" to="/">
            QPICK
          </Link>

          <nav className="footerNav" aria-label="Footer navigation">
            <Link className="footerLink" to="/">
              Избранное
            </Link>

            <Link className="footerLink" to="/cart">
              Корзина
            </Link>

            <a className="footerLink" href="tel:+79990000000">
              Позвонить
            </a>
          </nav>

          <div className="footerService">
            <a
              className="footerLink footerTerms"
              href="https://i.pinimg.com/736x/cb/1c/5e/cb1c5e4312c8cacda6e4d3a1222724c6.jpg"
              target="_blank"
              rel="noreferrer"
            >
              Условия сервиса
            </a>

            <div className="footerLang" aria-label="Language switch">
              <FiGlobe className="footerGlobe" size={18} />
              <button type="button" className="langBtn langBtnActive">
                Рус
              </button>
              <button type="button" className="langBtn">
                Eng
              </button>
            </div>
          </div>

          <div className="footerSocial" aria-label="Social links">
            <a
              className="socialLink"
              href="https://vk.com/dobro_memi"
              target="_blank"
              rel="noreferrer"
              aria-label="VK"
              title="VK"
            >
              <img className="socialIcon" src={vkIcon} alt="" />
            </a>

            <a
              className="socialLink"
              href="https://t.me/neoflexcareers"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              title="Telegram"
            >
              <img className="socialIcon" src={tgIcon} alt="" />
            </a>

            <a
              className="socialLink"
              href="https://wa.me/79990000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <img className="socialIcon" src={waIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
