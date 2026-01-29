# QPICK Store (Neoflex Test)

## 📝 Description

QPICK Store is a small React-based web application for an audio accessories shop. The app includes a product catalog and a shopping cart with persistent state stored in `sessionStorage`. It focuses on clean UI, reusable components, and a scalable structure without overengineering.

---

## 🚀 Key Features

- Product catalog built from a static `products[]` array
- Shopping cart with:
  - Add to cart from product card
  - Quantity increment / decrement
  - Remove item from cart
  - Automatic total price and item count recalculation
- Favorites page (extra feature)
- Persistent cart & favorites via `sessionStorage`
- Product details modal (view icon on card)
- Checkout modal with payment method selection and basic card input validation
- Hover feedback for interactive elements (links, icons, buttons)
- Responsive layout improvements (catalog grid, cart, footer)
- Cleaner structure with reusable hooks and utilities

---

## 🛠 Technologies

- React
- TypeScript
- React Router
- CSS
- React Icons

---

## 🧱 Architecture

The project follows a simple, pragmatic structure:

- `components` — reusable UI components (cards, modals, layout blocks)
- `pages` — route pages (Catalog, Cart, Favorites)
- `store` — app state via React Context + selectors
- `data` — static product data array
- `hooks` — reusable hooks (`useEscape`, `useLockBodyScroll`)
- `utils` — formatting helpers (`formatPrice`, card formatters)
- `styles` — global CSS styles split by UI areas

This structure keeps UI code readable, encourages reuse, and allows the app to grow without introducing unnecessary complexity.

---

## ✅ Requirements Checklist

### Mandatory requirements

- [x] Two pages: catalog + cart (implemented + extra Favorites page)
- [x] React Router routing with shared layout
- [x] Hover feedback for interactive UI elements
- [x] Navigation back to home via logo
- [x] Cart icon counter increases on “Buy”
- [x] Cart totals update on quantity changes
- [x] Products stored as an array and rendered dynamically
- [x] Cart state stored in `sessionStorage`

### Additional improvements

- [x] Code cleanup and refactoring
- [x] Performance improvements (selectors, memoization, Set/Map usage)
- [x] Responsive layout improvements
- [x] Remove items from cart
- [x] Checkout modal with payment method selection
- [x] Product details modal with view icon

## 📸 Screenshots

- **Catalog** — product grid with favorites and quick view
- **Product details modal** — extended product info preview
- **Favorites** — saved products list
- **Cart** — quantity controls, totals, and item removal
- **Checkout modal** — payment method selection and card validation

<img width="1325" height="775" alt="Снимок экрана 2569-01-29 в 19 47 41" src="https://github.com/user-attachments/assets/b1467ef5-99eb-4543-b979-8b46f4ee29cd" />
<img width="1237" height="776" alt="Снимок экрана 2569-01-29 в 19 49 04" src="https://github.com/user-attachments/assets/e3e8b317-24ff-41af-a1ba-7cb35f752014" />
<img width="1329" height="772" alt="Снимок экрана 2569-01-29 в 19 48 04" src="https://github.com/user-attachments/assets/191ad821-173d-4c6c-b0e8-18ece8223ba1" />
<img width="1313" height="769" alt="Снимок экрана 2569-01-29 в 19 48 20" src="https://github.com/user-attachments/assets/66addc6b-2ebe-4756-8d20-e87343e93f42" />
<img width="1307" height="771" alt="Снимок экрана 2569-01-29 в 19 48 40" src="https://github.com/user-attachments/assets/06802cc3-92fe-4d98-90af-79124cc626c9" />

