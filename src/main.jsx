// Caminho: src/main.jsx
// Ponto de entrada da aplicação React - Renderiza o componente raiz

// Importa React e a função createRoot do ReactDOM
import React from 'react'
import { createRoot } from 'react-dom/client'
// Importa o componente principal App
import App from './App'
// Importa os estilos SASS globais
import './styles/style.sass'

// Obtém o elemento DOM onde a aplicação será renderizada
// O index.html deve ter um elemento com id="root"
const container = document.getElementById('root')

// Cria uma raiz React para renderização (nova API do React 18+)
const root = createRoot(container)

// Renderiza a aplicação dentro de React.StrictMode
// StrictMode ativa verificações extras de desenvolvimento
root.render(
  <React.StrictMode>
    {/* Componente principal da aplicação */}
    <App />
  </React.StrictMode>
)