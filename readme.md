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

        **Migration to Vite + React**

        - This repository was migrated from a static HTML/CSS/JS project to a Vite + React structure.
        - The original files were preserved: `index.original.html`, `style.css`, and `script.js` remain at the project root for reference.
        - New React source is inside `src/` and styles use SASS. The original CSS is imported into the SASS entry to preserve visual parity while enabling future refactor.

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
        - `src/styles/style.sass` — SASS entry which imports the original `style.css`
        - `docs/documentation.html` — simple project documentation (HTML)

        If you want me to refactor styles into idiomatic SASS blocks per-component, I can run a follow-up pass.
        The repository now contains a full SASS conversion for main layout areas (header, carousel, products, cart, forms) in `src/styles/` as indented `.sass` partials.
        The interactive form logic (validation and states autocomplete), the cart behavior, carousel controls and the scroll button were ported into React components under `src/components/`.
        The original `script.js` remains in the repository root for reference but is no longer required by the React app.

        If you'd like, I can remove the legacy `script.js` after you validate the React app behavior.
