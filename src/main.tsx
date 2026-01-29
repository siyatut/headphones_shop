import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ShopProvider } from "./store/shop";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/card.css";
import "./styles/product-modal.css";
import "./styles/cart.css";
import "./styles/checkout-modal.css";
import "./styles/footer.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);
