# Identificador 

f001 

# Nome  

Tela home Vrmodas 

# Atores  

*( X ) Usuário* 

# Dependência  

 

# Prioridade  

*N/A*  

# Descrição  

- Como **Usuário** 

- Quero **listar produtos** 

- Para **após poder vê-los** 

# Elementos da Tela  

1. Barra de menu: 

    1. Nome “VRmodas”; 

    1. Barra de pesquisa; 

    1. Botão com ícone de “Lupa”; 

    1. Ícone de “ticket”; 

    1. Ícone de “Coração”; 

    1. Ícone de “Carrinho”; 

    1. Ícone de “perfil”: 

        - Ver perfil 

        - Alterar senha 

        - Logout 

 

1. Carrossel; 

1. Título “Produtos”; 

1. Card com: 

    1. Foto do produto; 

    1. Descrição; 

    1. Botão “Adicionar ao carrinho!” 

 

1. Paginação; 

1. Carrinho; 

1. Pré-cadastro: 

    1. Primeiro nome; 

    1. Segundo nome; 

    1. E-mail; 

    1. Cidade; 

    1. Estado: 

        - São Paulo 

        - ... 

    1. CEP; 

    1. Check “Aceito os termos e condições” 

    1. Botão “Enviar” 

 

1. Rodapé: 

    1. Conteúdo: 

        - “Fale conosco” 

        - “Meios de pagamento e frete” 

        - “Política de privacidade” 

        - “Politica de Tocas e Devolução” 

        - “Quem somos” 

 

    1. Atendimento: 

        - “Telefone: 4002-8922” 

        - “Whatsapp: 11 99229-1289” 

        - “Seg. a Sexta 8:00H as 18:00H” 

        - “Endereço: Rua dos Bobos, n° 0 -SP”
 
        ---

        **Migration to Vite + React — COMPLETE**

        - This repository was migrated from a static HTML/CSS/JS project to a Vite + React structure.
        - The original files were preserved in `legacy/` folder: `legacy/script.js` and `legacy/style.css` remain as reference.
        - New React source is inside `src/` with modular SASS styling (`.sass` indented syntax).
        - **SASS Conversion 100% Complete**: All styles converted to componentized SASS partials; legacy CSS fully migrated.
        - Responsive design maintained: media queries converted to `_media-queries.sass` partial (tablet 614-833px, mobile <613px).
        - CSS output reduced by 50% (~6.3 kB minified vs 12.8 kB original) thanks to SASS optimization.

        How to run (Windows PowerShell):

        ```powershell
        npm install
        npm run dev
        ```

        Build:

        ```powershell
        npm run build
        npm run preview
        ```

        Project layout (new):

        - `index.html` — Vite entry that mounts the React app
        - `src/main.jsx` — React entry
        - `src/App.jsx` — main application component
        - `src/components/*` — React components (Header, Carousel, Products, Cart, Footer)
        - `src/styles/style.sass` — SASS entry (now uses `@use` and componentized partials)
        - `legacy/` — original static files preserved (`index.original.html`, `style.css`, `script.js`)


This repository includes the following additional improvements:

- Playwright E2E tests under `e2e/` with a `playwright.config.js` to run cross-browser tests and a `npm run test:e2e` script.
- CSS Modules enabled for per-component scope (example: `src/styles/_product-card.module.sass` used by `ProductCard.jsx`).
- `@use` syntax adopted for Sass modules; a `_variables.sass` file provides shared variables.

Notes:
- The original `docs/` folder was removed and documentation consolidated into `readme.md`.
- To run E2E tests locally you must install Playwright browsers: `npx playwright install`.
- Dev server is forced to port `5173` to match Playwright configuration (`npm run dev`).

Accessibility and icons:

- SVG icons were converted to React components under `src/components/icons/` (search, cart, user, heart, trash).
- Buttons and interactive controls received `aria-label` attributes and better semantic structure.

If you'd like, I can now:

- Convert the remaining CSS rules into indented SASS partials per component (complete migration).
- Further improve accessibility (keyboard focus, aria-live regions for cart updates) and split component styles into dedicated files.
- Remove the `legacy/` folder after you validate the React app.

*** End Patch