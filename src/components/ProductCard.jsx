import React, { useState } from 'react'
import IconHeart from './icons/IconHeart'
import styles from '../styles/_product-card.module.sass'

export default function ProductCard({ product, onAddToCart }) {
  const [fav, setFav] = useState(false)

  return (
    <div className={`${styles.productCard} produto`}>
      <img src={product.image} className={`${styles.productImage} imagemdoproduto`} alt={product.title} />
      <p className={`${styles.favoriteButton} favoritar`}>
        <button aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => setFav(s => !s)} style={{ background: 'transparent', border: 'none' }}>
          <IconHeart filled={fav} />
        </button>
      </p>
      <p className={`${styles.description} descricao`}>{product.title}</p>
      <p className={`${styles.price} preco`}>{product.priceStr}</p>
      <p className={`${styles.installment} parcela`}>ou 3x de R$ {(product.price / 3).toFixed(0)}</p>
      <p className={`${styles.size} descricaotamanho`}>{product.size}</p>
      <button type="button" className={`${styles.addToCartButton} adicionaraocarrinho`} onClick={onAddToCart} aria-label={`Adicionar ${product.title} ao carrinho`}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}
