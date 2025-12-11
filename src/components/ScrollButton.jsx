// src\components\ScrollButton.jsx
// Botão flutuante para rolar página para topo ou para baixo

import React, { useEffect, useState } from 'react'

// Componente ScrollButton
// Botão que alterna entre "ir para topo" e "ir para baixo" baseado na posição do scroll
export default function ScrollButton() {
  // Estado que indica se usuário rolou além de 100px (mostrar "voltar ao topo")
  const [isTop, setIsTop] = useState(false)

  // Efeito para monitorar scroll da janela
  useEffect(() => {
    const handleScroll = () => {
      // window.scrollY: pixels que a página foi rolada verticalmente
      // Se >= 100px, usuário está longe do topo
      setIsTop(window.scrollY >= 100)
    }
    
    // Adiciona listener de evento scroll
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Chama uma vez para definir estado inicial
    
    // Cleanup: remove listener quando componente desmonta
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handler para clique no botão
  const handleClick = () => {
    if (isTop) {
      // Se está longe do topo, rola para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Se está no topo, rola para o final da página
      window.scrollTo({ 
        top: document.body.scrollHeight, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <button 
      type="button" 
      className={`scrollpagina ${isTop ? 'topo' : 'inferior'}`} 
      onClick={handleClick}
      aria-label={isTop ? 'Voltar ao topo' : 'Ir para o final da página'}
    >
      {/* Conteúdo vazio - o conteúdo visual vem do CSS via pseudo-elemento ::after */}
      {/* CSS define seta para cima (↑) ou para baixo (↓) baseado na classe */}
    </button>
  )
}