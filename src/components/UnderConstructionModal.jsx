// src\components\UnderConstructionModal.jsx
// Modal que aparece quando funcionalidade está em construção
// Bloqueia interação com conteúdo de fundo e fecha automaticamente

import React, { useEffect, useState, useRef } from 'react'
import '../styles/_modal.sass' // Estilos específicos do modal

// Componente UnderConstructionModal
// Props:
// - visible: controla se modal está visível
// - onClose: função para fechar modal
export default function UnderConstructionModal({ visible, onClose }) {
  // Estado que controla se modal está montado (para animações)
  const [mounted, setMounted] = useState(visible)
  // Ref para ignorar próximo evento keyup (evita fechar imediatamente ao abrir com Enter)
  const ignoreNextKeyUpRef = useRef(false)
  // Ref para timeout que limpa a flag ignoreNextKeyUpRef
  const clearIgnoreTimeoutRef = useRef(null)

  // Efeito para montar modal quando visible torna-se true
  useEffect(() => {
    if (visible) {
      setMounted(true)
      // Ignora próximo keyup (evita que Enter que abriu modal também o feche)
      ignoreNextKeyUpRef.current = true
      clearIgnoreTimeoutRef.current = setTimeout(() => {
        ignoreNextKeyUpRef.current = false
        clearIgnoreTimeoutRef.current = null
      }, 250) // 250ms é tempo suficiente para evento keyup do Enter passar
    }
  }, [visible])

  // Efeito para desmontar modal após animação de saída
  useEffect(() => {
    if (!visible && mounted) {
      const t = setTimeout(() => setMounted(false), 300) // Tempo da animação de saída
      return () => clearTimeout(t)
    }
  }, [visible, mounted])

  // Efeito para desabilitar scroll da página quando modal está aberto
  useEffect(() => {
    if (mounted) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden' // Impede scroll do body
      return () => { document.body.style.overflow = prev || '' } // Restaura ao desmontar
    }
  }, [mounted])

  // Efeito para capturar teclas e fechar modal
  useEffect(() => {
    if (!mounted) return

    const keyHandler = (e) => {
      // Impede que evento chegue em inputs/buttons por trás do modal
      e.stopPropagation()
      e.preventDefault()

      // Fecha modal
      if (onClose) onClose()
    }

    // Adiciona listener com capture: true para capturar antes de outros handlers
    document.addEventListener('keydown', keyHandler, true)

    return () => {
      document.removeEventListener('keydown', keyHandler, true)
    }
  }, [mounted, onClose])

  // Efeito para fechar automaticamente após 15 segundos
  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, 15000) // 15 segundos

    return () => clearTimeout(timer)
  }, [visible, onClose])

  // Se não está montado, não renderiza nada
  if (!mounted) return null

  return (
    // Overlay do modal (fundo escuro semi-transparente)
    // Classes condicionais para animação de entrada/saída
    <section
      className={`fundoconstrucao ${visible ? 'fundoconstrucaoabrindo' : 'fundoconstrucaofechando'}`}
      onClick={() => onClose && onClose()} // Fecha ao clicar no overlay
      aria-hidden={!visible} // Esconde de leitores de tela quando não visível
    >
      {/* Imagem "em construção" */}
      <img
        src="/Imagens/em_construao.png"
        alt="Em Construção"
        onClick={(e) => e.stopPropagation()} // Clicar na imagem não fecha modal
      />
    </section>
  )
}