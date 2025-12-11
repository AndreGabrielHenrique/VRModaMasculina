// src\components\icons\IconHeart.jsx
// Componente React para o ícone de coração (favoritos)
// Ícone SVG que pode aparecer preenchido ou vazio (toggle de favorito)

import React from 'react'

// Componente funcional IconHeart
// Parâmetros:
// - size: tamanho do ícone (padrão 24px)
// - ariaLabel: texto para acessibilidade (padrão 'Favorito')
// - filled: booleano que controla se o coração está preenchido (padrão false)
export default function IconHeart({ size = 24, ariaLabel = 'Favorito', filled = false }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="ionicon" 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      role="img" 
      aria-label={ariaLabel}
    >
      {/* Caminho único que desenha o coração */}
      // fill={filled ? "currentColor" : "none"}: 
      // - Se filled=true, preenche com cor atual (coração sólido)
      // - Se filled=false, não preenche (apenas contorno)
      <path 
        d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="32"
      />
    </svg>
  )
}