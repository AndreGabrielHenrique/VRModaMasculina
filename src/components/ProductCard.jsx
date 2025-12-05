import React, { useState } from 'react'
import IconHeart from './icons/IconHeart'

export default function ProductCard({ product, onAddToCart }) {
  const [fav, setFav] = useState(false)

  return (
    <div className="produto">
      <img src={product.image} className="imagemdoproduto" alt={product.title} />
      <p className="favoritar">
        <button aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => setFav(s => !s)} style={{ background: 'transparent', border: 'none' }}>
          <IconHeart filled={fav} />
        </button>
      </p>
      <p className="descricao">{product.title}</p>
      <p className="preco">{product.priceStr}</p>
      <p className="parcela">ou 3x de R$ {(product.price / 3).toFixed(0)}</p>
      <p className="descricaotamanho">{product.size}</p>
      <button type="button" className="adicionaraocarrinho" onClick={onAddToCart} aria-label={`Adicionar ${product.title} ao carrinho`}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}
