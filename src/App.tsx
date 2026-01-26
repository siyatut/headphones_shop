import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { CatalogPage } from "./pages/CatalogPage";
import { CartPage } from "./pages/CartPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}
