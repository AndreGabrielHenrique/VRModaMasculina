// src\components\icons\IconAt.jsx
// Componente React para o ícone de "@" (arroba) usado no campo de email
// Este é um ícone SVG reutilizável e acessível

// Importa a biblioteca React para criar componentes
import React from 'react'

// Define o componente funcional IconAt com parâmetros padrão
// size: tamanho do ícone em pixels (padrão 24)
// ariaLabel: descrição acessível para leitores de tela (padrão 'Email')
export default function IconAt({ size = 24, ariaLabel = 'Email' }) {
  return (
    // Elemento SVG que define o ícone
    // xmlns: namespace XML para SVG
    // className="at": classe CSS para estilização
    // viewBox="0 0 512 512": sistema de coordenadas do SVG (0,0 a 512,512)
    // width={size}: largura dinâmica baseada na prop size
    // height={size}: altura dinâmica baseada na prop size
    // role="img": define o papel semântico como imagem
    // aria-label={ariaLabel}: descrição acessível para tecnologias assistivas
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="at" 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      role="img" 
      aria-label={ariaLabel}
    >
      {/* Primeiro caminho (path) do SVG: desenha a parte circular do "@" */}
      // d: atributo que contém os comandos de desenho (movimentos, linhas, curvas)
      // fill="none": não preenche o interior do caminho
      // stroke="currentColor": contorno usa a cor atual do elemento pai (herdável)
      // strokeLinecap="round": terminações das linhas são arredondadas
      // strokeLinejoin="round": junções das linhas são arredondadas
      // strokeWidth="32": espessura do contorno (32 unidades no sistema viewBox)
      <path d="M320 254.27c-4.5 51-40.12 80-80.55 80s-67.34-35.82-63.45-80 37.12-80 77.55-80 70.33 36 66.45 80z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
      
      {/* Segundo caminho (path) do SVG: desenha a cauda/parte decorativa do "@" */}
      <path d="M319.77 415.77c-28.56 12-47.28 14.5-79.28 14.5-97.2 0-169-78.8-160.49-176s94.31-176 191.51-176C381 78.27 441.19 150 432.73 246c-6.31 71.67-52.11 92.32-76.09 88.07-22.56-4-41.18-24.42-37.74-63.5l8.48-96.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    </svg>
  )
}