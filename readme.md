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

Como proceder agora (recomendado)
--------------------------------
1. Revise as mudanças locais com `git status` / `git diff` — todo arquivo JSX/SASS agora tem comentários em português.
2. Rode `npm install` para garantir dependências (especialmente se não rodou recentemente).
3. Rode `npm run dev` para verificar que a aplicação inicia sem erros (dev server em `http://localhost:5173`).
4. Opcionalmente, rode `npm run test:e2e` para validar os testes E2E.
5. Depois de revisar e aprovar, crie um commit único com uma mensagem descritiva como:
   - `docs: adicionar comentários em português em componentes e SASS`
   - ou `refactor: otimizar imports de imagens e adicionar documentação`
6. Faça push quando estiver satisfeito com o estado.

Contribuição e contato
----------------------
Se for necessário que eu (ou a ferramenta de automação) reverta alterações específicas, me diga quais arquivos quer restaurar e eu executo.

Licença
-------
Projeto para fins educacionais.

"""
```
