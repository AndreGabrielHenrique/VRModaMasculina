// src\components\ProductCard.jsx
// Card de produto individual: imagem, descrição, preço e botão de adicionar ao carrinho

import React, { useState } from 'react'
import IconHeart from './icons/IconHeart'

// Componente ProductCard
// Props:
// - product: objeto com dados do produto
// - onAddToCart: função chamada quando adiciona ao carrinho
export default function ProductCard({ product, onAddToCart }) {
  // Estado local para controlar se produto está favoritado
  const [isFavorited, setIsFavorited] = useState(false)

  // Handler para clique no ícone de favorito
  const handleFavoriteClick = (e) => {
    e.stopPropagation() // Impede propagação para elementos pai
    setIsFavorited(!isFavorited) // Alterna estado
  }

  // Handler para adicionar ao carrinho
  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      // Converte preço de string para número
      // Remove "R$ ", pontos (separadores de milhar) e substitui vírgula por ponto
      const priceStr = product.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
      const priceNumber = parseFloat(priceStr)
      
      // Chama função do pai com produto e preço convertido
      onAddToCart({
        ...product, // Copia todas as propriedades do produto
        price: priceNumber || 0 // Adiciona/sobrescreve preço como número
      })
    }
  }

  return (
    <div className="produto">
      {/* Imagem do produto */}
      <img src={product.image} className="imagemdoproduto" alt={product.description} />
      
      {/* Ícone de favorito */}
      <p className="favoritar" onClick={handleFavoriteClick} role="button" tabIndex="0">
        <IconHeart 
          size={40}
          ariaLabel={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} 
          filled={isFavorited} // Prop filled controla se coração está preenchido
        />
      </p>
      
      {/* Descrição do produto */}
      <p className="descricao">{product.description}</p>
      
      {/* Preço do produto */}
      <p className="preco">{product.price}</p>
      
      {/* Opção de parcelamento */}
      <p className="parcela">ou 3x de R$ {product.installment}</p>
      
      {/* Tamanho do produto */}
      <p className="descricaotamanho">{product.size}</p>
      
      {/* Botão para adicionar ao carrinho */}
      <button 
        type="button" 
        className="adicionaraocarrinho"
        onClick={handleAddToCart}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  )
}