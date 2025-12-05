import React, { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [fav, setFav] = useState(false)

  return (
    <div className="produto">
      <img src={product.image} className="imagemdoproduto" alt={product.title} />
      <p className="favoritar" onClick={() => setFav(s => !s)}>
        <svg className="favorito" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
            fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="32" />
        </svg>
      </p>
      <p className="descricao">{product.title}</p>
      <p className="preco">{product.priceStr}</p>
      <p className="parcela">ou 3x de R$ {(product.price / 3).toFixed(0)}</p>
      <p className="descricaotamanho">{product.size}</p>
      <button type="button" className="adicionaraocarrinho" onClick={onAddToCart}>Adicionar ao Carrinho</button>
    </div>
  )
}
