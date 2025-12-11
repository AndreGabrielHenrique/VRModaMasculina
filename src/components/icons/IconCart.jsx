// src\components\icons\IconCart.jsx
// Componente React para o ícone do carrinho de compras
// Ícone SVG reutilizável para representar o carrinho de compras na aplicação

// Importa a biblioteca React
import React from 'react'

// Componente funcional IconCart
// Parâmetros:
// - size: tamanho do ícone (padrão 24px)
// - ariaLabel: texto descritivo para acessibilidade (padrão 'Carrinho')
export default function IconCart({ size = 24, ariaLabel = 'Carrinho' }) {
  return (
    // Elemento SVG do carrinho
    // className="ionicon": classe para estilização (herdada do projeto legacy)
    // viewBox="0 0 512 512": área visível do SVG (512x512 unidades)
    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512" width={size} height={size} role="img" aria-label={ariaLabel}>
      {/* Primeiro círculo: roda esquerda do carrinho */}
      // cx="176": coordenada X do centro do círculo
      // cy="416": coordenada Y do centro do círculo
      // r="16": raio do círculo (16 unidades)
      <circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
      
      {/* Segundo círculo: roda direita do carrinho */}
      <circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
      
      {/* Caminho principal: estrutura básica do carrinho */}
      // d="M48 80h64l48 272h256": 
      // M48 80: move para ponto (48,80)
      // h64: linha horizontal 64 unidades para direita
      // l48 272: linha para ponto relativo (48,272)
      // h256: linha horizontal 256 unidades para direita
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256" />
      
      {/* Caminho adicional: alça/parte superior do carrinho */}
      <path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
    </svg>
  )
}