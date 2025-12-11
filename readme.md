# VR Moda Masculina
└── cart-interactions.spec.js
"""
# VR Moda Masculina

Resumo do repositório e instruções rápidas (em português).

Descrição
---------
Projeto de e‑commerce para "VR Moda Masculina" portado para React + Vite. O código fonte principal está em `src/` e a versão estática original está preservada em `legacy/`.

Estado atual
------------
- Código reorganizado em componentes React (`src/components/`) com **comentários explicativos em português**.
- Estilos convertidos para SASS (formato indented `.sass`) e divididos em partials em `src/styles/` (também com comentários).
- Imagens otimizadas: importadas como módulos (via `import img from './Imagens/...'`) para máxima compatibilidade com Vite.
- Playwright configurado para testes E2E sob `e2e/`.
- Validação: revise os comentários e a estrutura de imports antes de commitar.

Estrutura principal (resumo)
---------------------------
```
src/
├─ main.jsx            # entrada da aplicação
├─ App.jsx             # componente raiz
├─ components/         # componentes React (Header, Carousel, Products, Cart, CheckoutForm, etc.)
└─ styles/             # partials SASS e entry `style.sass`

legacy/                # versão estática original (referência)
e2e/                   # Playwright tests
test-results/          # capturas visuais geradas pelos testes
```

Requisitos
----------
- Node.js (versão LTS recomendada)
- npm
- Recomenda-se instalar devtools do Playwright quando for rodar os testes: `npx playwright install`.

Instalação
---------
```powershell
npm install
npx playwright install # se for executar os testes E2E
```

Desenvolvimento
---------------
```powershell
npm run dev
# abre dev server (por padrão: http://localhost:5173 ou 5174 conforme configuração no Playwright)
```

Build de produção
------------------
```powershell
npm run build
```

Build compatível com comportamento "legacy" (ocultar carrinho por padrão)
------------------------------------------------------------------
Existe um script auxiliar que define a variável `VITE_HIDE_CART=true` para reproduzir o comportamento do site legacy:
```powershell
npm run build:legacy
```
Obs.: em alguns ambientes Windows o `cross-env` é usado no script. Caso falte, instale como dependência dev: `npm install --save-dev cross-env`.

Testes E2E (Playwright)
-----------------------
Instale os navegadores com `npx playwright install` e rode:
```powershell
npm run test:e2e
```
Para abrir a interface interativa dos testes:
```powershell
npm run test:e2e:ui
```

Dicas de verificação rápida
--------------------------
- Se `npm run dev` falhar com erros do esbuild, rode `npm install` e verifique versões do Node. Verifique mensagens no terminal (por exemplo dependências faltando).
- Se os estilos parecerem incorretos, confirme que `src/styles/style.sass` está importado em `src/main.jsx`.

Sobre alterações recentes
------------------------
- Todos os componentes e partials SASS agora incluem comentários explicativos em português descrevendo funcionalidades, hooks, estado e lógica.
- As imagens foram movidas para imports modulares (Vite) para melhor otimização.
- Alguns arquivos foram editados múltiplas vezes durante a migração; revise `git diff` para ver as mudanças exatas.
- Arquivos principais com alterações: `src/components/*` (Carousel, Header, Products, UnderConstructionModal), `src/styles/*`, `e2e/*`.
# VR Moda Masculina

Resumo do repositório e instruções rápidas (em português).

Descrição
---------
Projeto de e‑commerce "VR Moda Masculina" portado para React + Vite. O código-fonte principal está em `src/` e a versão estática original foi preservada em `legacy/` para referência.

Estado atual
------------
- Código organizado em componentes React (`src/components/`).
- Estilos migrados para SASS (sintaxe indented) em `src/styles/`.
- Imagens agora são importadas como módulos (`import img from './Imagens/...'`) para otimização pelo Vite.
- Testes E2E com Playwright em `e2e/`.

Instalação
---------
# VR Moda Masculina

Projeto portado de um site estático para uma aplicação moderna com Vite e React.

Principais pontos:

- Código React organizado em `src/`.
- Estilos em SASS (sintaxe indented) dentro de `src/styles/`.
- Testes E2E foram removidos (Playwright desinstalado).
- Versão legacy preservada em `legacy/` para referência.

Consulte `documentation.html` para instruções detalhadas de execução e build.

## Instalação

```powershell
npm install
```

## Desenvolvimento

```powershell
npm run dev
# abre o servidor de desenvolvimento (por padrão http://localhost:5173)
```

## Build de produção

```powershell
npm run build
```

## Build compatível com comportamento "legacy"

```powershell
npm run build:legacy
```

## Procedimentos antes de commitar

1. Verifique alterações locais: `git status` e `git diff`.
2. Rode `npm install` e `npm run dev` para validar localmente.
3. Faça o commit com mensagem clara (em inglês) quando estiver satisfeito.

---

Projeto para fins educacionais.
