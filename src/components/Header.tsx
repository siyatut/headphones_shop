import { Link } from "react-router-dom";

export function Header() {
  return (
    <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: 700 }}>
          QPICK
        </Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <a href="tel:+70000000000" style={{ textDecoration: "none" }}>
            📞
          </a>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            🛒
          </Link>
        </div>
      </div>
    </header>
  );
}
