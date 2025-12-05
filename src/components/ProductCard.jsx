import React, { useState } from 'react'
import IconHeart from './icons/IconHeart'
import styles from '../styles/_product-card.module.sass'

export default function ProductCard({ product, onAddToCart }) {
  const [fav, setFav] = useState(false)

  return (
    <div className={styles.productCard}>
      <img src={product.image} className={styles.productImage} alt={product.title} />
      <p className={styles.favoriteButton}>
        <button aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => setFav(s => !s)} style={{ background: 'transparent', border: 'none' }}>
          <IconHeart filled={fav} />
        </button>
      </p>
      <p className={styles.description}>{product.title}</p>
      <p className={styles.price}>{product.priceStr}</p>
      <p className={styles.installment}>ou 3x de R$ {(product.price / 3).toFixed(0)}</p>
      <p className={styles.size}>{product.size}</p>
      <button type="button" className={styles.addToCartButton} onClick={onAddToCart} aria-label={`Adicionar ${product.title} ao carrinho`}>
        Adicionar ao Carrinho
      </button>
    </div>
  )
}
