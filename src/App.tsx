import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { CatalogPage } from "./pages/CatalogPage";

function CartPageStub() {
  return (
    <div className="page">
      <div className="container">
        <h2 className="sectionTitle">Корзина</h2>
        <p>Страница корзины в разработке.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPageStub />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
