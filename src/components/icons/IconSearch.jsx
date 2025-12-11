// src\components\icons\IconSearch.jsx
// Componente React para o ícone de busca (lupa)
// Ícone SVG usado no formulário de busca da aplicação

import React from 'react'

// Componente funcional IconSearch
// Parâmetros:
// - size: tamanho do ícone (padrão 20px - menor que outros ícones)
// - ariaLabel: texto descritivo (padrão 'Pesquisar')
export default function IconSearch({ size = 20, ariaLabel = 'Pesquisar' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width={size} height={size} role="img" aria-label={ariaLabel}>
      {/* Primeiro caminho: círculo da lupa */}
      <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
      
      {/* Segundo caminho: haste da lupa (linha que sai do círculo) */}
      // d="M338.29 338.29L448 448": linha do ponto (338.29,338.29) até (448,448)
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
    </svg>
  )
}