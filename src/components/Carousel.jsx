// src\components\Carousel.jsx
// Componente de carrossel de imagens automático com controles e indicadores.

// Importa hooks do React: 
// - useState: para gerenciar estado do componente
// - useEffect: para executar efeitos colaterais (como o autoplay)
// - useRef: para manter referência ao intervalo do carrossel
import React, { useState, useEffect, useRef } from 'react'

// Array com os caminhos das imagens do carrossel
// Cada string representa uma imagem na pasta pública /Imagens
const images = [
  '/Imagens/carrocel-1 1.png',
  '/Imagens/carrocel-2 1.png',
  '/Imagens/carrocel-3 1.png'
]

// Componente: Carousel — slideshow de imagens com autoplay e navegação manual
// Exportado como default para ser importado em outros arquivos
export default function Carousel() {
  // Estado que armazena o índice da imagem atualmente visível (começa na primeira, índice 0)
  const [currentIndex, setCurrentIndex] = useState(0)
  // Estado que indica se o mouse está sobre o carrossel (para pausar o autoplay)
  const [isHovered, setIsHovered] = useState(false)
  // Referência para armazenar o ID do intervalo do autoplay (permite limpar o intervalo)
  const intervalRef = useRef(null)

  // Função para avançar para o próximo slide
  // Usa o estado anterior (prevIndex) para garantir atualização correta
  // Operador % (módulo) garante que após a última imagem volte para a primeira
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Função para voltar para o slide anterior
  // Adiciona images.length para evitar números negativos
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Função para ir diretamente para um slide específico (usada pelos indicadores)
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Função para determinar a classe CSS dos botões de navegação (cor do botão)
  // Baseado na imagem atual para garantir contraste com o fundo
  const getButtonColorClass = (buttonType) => {
    // Imagem 1: botão anterior preto, próximo branco
    if (currentIndex === 0) {
      return buttonType === 'prev' ? 'botaopreto' : 'botaobranco'
    } 
    // Imagem 2: botão anterior branco, próximo preto
    else if (currentIndex === 1) {
      return buttonType === 'prev' ? 'botaobranco' : 'botaopreto'
    } 
    // Imagem 3: ambos pretos
    else {
      return 'botaopreto'
    }
  }

  // Efeito para configurar o carrossel automático
  // Executa sempre que isHovered muda (mouse entra/sai do carrossel)
  useEffect(() => {
    // Função que inicia o autoplay (muda de slide a cada 4 segundos)
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 4000) // 4000ms = 4 segundos
    }

    // Função que para o autoplay (limpa o intervalo)
    const stopAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // Se o mouse NÃO está sobre o carrossel, inicia o autoplay
    if (!isHovered) {
      startAutoPlay()
    } else {
      // Se o mouse está sobre o carrossel, para o autoplay
      stopAutoPlay()
    }

    // Cleanup: função que executa quando o componente desmonta ou antes do próximo efeito
    // Garante que o intervalo seja limpo para evitar memory leaks
    return () => {
      stopAutoPlay()
    }
  }, [isHovered]) // Dependência: executa novamente quando isHovered muda

  // Retorna o JSX (estrutura HTML) do componente
  return (
    // Seção principal do carrossel
    // onMouseEnter: quando mouse entra, pausa autoplay
    // onMouseLeave: quando mouse sai, retoma autoplay
    <section 
      className="carousel" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container dos slides (imagens) */}
      <div className="carousel-items">
        {/* Mapeia cada imagem no array images */}
        {images.map((src, index) => (
          <div 
            key={index} // Chave única para cada slide (React requirement)
            className={`imagem fade`} // Classe CSS para efeito de transição
            // Estilo inline: mostra apenas a imagem atual (currentIndex)
            // display: 'block' para visível, 'none' para oculto
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <img src={src} alt={`Carrossel ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Botão de navegação "anterior" */}
      <a 
        className={`anterior ${getButtonColorClass('prev')}`}
        onClick={prevSlide} // Chama função ao clicar
        role="button" // Papel semântico para acessibilidade
        tabIndex="0" // Torna o elemento focável por teclado
        aria-label="Slide anterior" // Descrição para leitores de tela
      >
        &#10094; {/* Seta unicode para esquerda (<) */}
      </a>
      
      {/* Botão de navegação "próximo" */}
      <a 
        className={`proximo ${getButtonColorClass('next')}`}
        onClick={nextSlide} // Chama função ao clicar
        role="button"
        tabIndex="0"
        aria-label="Próximo slide"
      >
        &#10095; {/* Seta unicode para direita (>) */}
      </a>

      {/* Container dos indicadores (bolinhas de navegação) */}
      <div className="indicadores">
        {images.map((_, index) => (
          <span
            key={index}
            // Classe 'ativo' apenas para o indicador da imagem atual
            className={`indicador ${index === currentIndex ? 'ativo' : ''}`}
            onClick={() => goToSlide(index)} // Vai para slide específico
            role="button"
            tabIndex="0"
            aria-label={`Ir para slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </section>
  )
}