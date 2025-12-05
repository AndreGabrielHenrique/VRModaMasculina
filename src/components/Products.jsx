import React from 'react'
import ProductCard from './ProductCard'

export default function Products({ products, onAddToCart }) {
  return (
    <nav>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAddToCart={() => onAddToCart(p)} />
      ))}
    </nav>
  )
}
