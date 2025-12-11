// src\components\icons\IconTrash.jsx
// Componente React para o ícone de lixeira (excluir/remover)
// Usado para remover itens do carrinho de compras

import React from 'react'

// Componente funcional IconTrash
// Parâmetros:
// - size: tamanho do ícone (padrão 24px)
// - ariaLabel: texto para acessibilidade (padrão 'Remover')
export default function IconTrash({ size = 24, ariaLabel = 'Remover' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="remover" 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      role="img" 
      aria-label={ariaLabel}
    >
      {/* Primeiro caminho: parte do ícone sem preenchimento (detalhe) */}
      <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/>
      
      {/* Segundo caminho: corpo principal da lixeira (com preenchimento) */}
      <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z"/>
    </svg>
  )
}