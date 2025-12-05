# VR Moda Masculina

E-commerce platform for men's fashion, built with React and Vite.

## 🚀 Tecnologias

- **Vite** v5.4 - Build tool and dev server
- **React** 18 - UI framework
- **Dart Sass** (indented syntax) - Styling
- **Playwright** - E2E testing
- **Node.js** - Runtime

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
├── components/            # React components
│   ├── Header.jsx
│   ├── Carousel.jsx
│   ├── ProductCard.jsx
│   ├── Products.jsx
│   ├── Cart.jsx
│   ├── CheckoutForm.jsx
│   ├── ScrollButton.jsx
│   ├── Footer.jsx
│   └── icons/            # Icon components
│       ├── IconHeart.jsx
│       ├── IconCart.jsx
│       ├── IconSearch.jsx
│       ├── IconUser.jsx
│       └── IconTrash.jsx
└── styles/               # SASS modules
    ├── style.sass       # Main entry point
    ├── _variables.sass
    ├── _header.sass
    ├── _carousel.sass
    ├── _products.sass
    ├── _product-card.module.sass
    ├── _cart.sass
    ├── _forms.sass
    ├── _footer.sass
    ├── _scroll-button.sass
    ├── _modal.sass
    └── _media-queries.sass

legacy/                  # Original static files
├── index.original.html
├── style.css
└── script.js

e2e/                    # Playwright E2E tests (80 tests, 100% passing)
├── homepage.spec.js
└── cart-interactions.spec.js

Imagens/               # Product and carousel images
Icones/                # Favicon and assets
```

## 🛠️ Instalação

```bash
npm install
```

## ✨ Desenvolvimento

```bash
npm run dev
```

Dev server starts on `http://localhost:5173`

## 🔨 Build

```bash
npm run build
```

Production build output in `dist/`

## 🧪 Testes E2E

```bash
npm run test:e2e
```

Run all Playwright tests (80 tests across chromium, firefox, webkit, Mobile Chrome)

```bash
npm run test:e2e:ui
```

Open interactive test UI

## 📊 Recursos

- ✅ Responsive design (mobile-first)
- ✅ Product carousel with auto-rotation
- ✅ Product catalog with pagination
- ✅ Shopping cart functionality
- ✅ Checkout form with state autocomplete
- ✅ Scroll-to-top button
- ✅ Keyboard navigation
- ✅ WCAG accessibility standards
- ✅ CSS Modules for component scoping
- ✅ Modern Sass with @use modules
- ✅ 100% E2E test pass rate

## 🎨 Estilo

- **Sass**: Modular SASS with indented syntax
- **CSS Modules**: Used for component-scoped styles (e.g., `_product-card.module.sass`)
- **Breakpoints**:
  - Mobile: ≤613px
  - Tablet: 614–833px
  - Desktop: ≥834px

## 🧩 Componentes

### Header
- Navigation bar with search, menu, and icons
- User profile dropdown
- Shopping cart link

### Carousel
- Auto-rotating product carousel
- Navigation controls (prev/next)
- Dot indicators

### ProductCard
- Product image, title, price
- Installment info
- Add-to-cart button
- Favorite button (icon component)

### Cart
- List of cart items
- Quantity adjusters
- Item removal
- Checkout form

### CheckoutForm
- Personal info fields (name, email)
- Address input (city, state, CEP)
- State autocomplete
- Terms checkbox
- Form validation

## 🚢 Deploy

```bash
npm run build
# Deploy dist/ folder to hosting
```

Fully compatible with static hosts (Netlify, Vercel, GitHub Pages).

## 📝 Migração Vite + React

This project was successfully migrated from vanilla HTML/CSS/JS to React + Vite:

- ✅ Original files preserved in `legacy/` folder
- ✅ All logic ported to React components
- ✅ CSS converted to Sass with @use modules and CSS Modules
- ✅ Playwright E2E tests (80 tests, 100% passing)
- ✅ Build size optimized with Vite
- ✅ Accessibility improvements (aria-labels, semantic HTML)
- ✅ Production-ready build

### Build Stats

- CSS: 7.56 kB (gzipped)
- JS: ~52 kB (gzipped)
- Test suite: 80 tests, ~1.1 minute execution time

## 📄 Licença

Projeto para fins educacionais.
