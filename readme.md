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
- Código reorganizado em componentes React (`src/components/`).
- Estilos convertidos para SASS (formato indented `.sass`) e divididos em partials em `src/styles/`.
- Playwright configurado para testes E2E sob `e2e/`.
- Foram adicionados comentários explicativos em arquivos fonte (em português) — reveja antes de commitar alterações finais.

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
- Durante o trabalho de migração foram feitas mudanças em vários arquivos (componentes e SASS). Alguns desses arquivos foram posteriormente revertidos ou editados externamente; revise as diferenças locais antes de commitar.
- Arquivos importantes para revisão: `src/components/*`, `src/styles/*`, `e2e/*`, `legacy/*`.

Como proceder agora (recomendado)
--------------------------------
1. Revise as mudanças locais com `git status` / `git diff`.
2. Se quiser, rode `npm run dev` e `npm run test:e2e` para garantir que o app e os testes passam.
3. Depois de revisar e aprovar, crie um commit único com uma mensagem clara (ex.: `docs: adicionar comentários em português em arquivos fonte`) e faça push.

Contribuição e contato
----------------------
Se for necessário que eu (ou a ferramenta de automação) reverta alterações específicas, me diga quais arquivos quer restaurar e eu executo.

Licença
-------
Projeto para fins educacionais.

"""
```
