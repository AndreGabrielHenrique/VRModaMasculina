// src\components\Products.jsx
// Seção de listagem de produtos com paginação

import React from 'react'
import ProductCard from './ProductCard'

// Dados estáticos dos produtos (mesmo do original)
const productsData = [
  {
    id: 1,
    image: '/Imagens/calca 1.jpg',
    description: 'Calça Social Clássica',
    price: 'R$ 297',
    installment: 99,
    size: 'M'
  },
  {
    id: 2,
    image: '/Imagens/terno 1.jpg',
    description: 'Terno Linho Fino',
    price: 'R$ 888',
    installment: 296,
    size: 'M'
  },
  {
    id: 3,
    image: '/Imagens/sapato 1.jpg',
    description: 'Sapato de Couro',
    price: 'R$ 399',
    installment: 133,
    size: 'Tam. Único'
  },
  {
    id: 4,
    image: '/Imagens/relogio 1.jpg',
    description: 'Relógio San Diego',
    price: 'R$ 279',
    installment: 93,
    size: 'Tam. Único'
  }
]

// Componente Products (seção de produtos)
// Props:
// - onAddToCart: função para adicionar produto ao carrinho
// - onConstruction: função para abrir modal "em construção"
export default function Products({ onAddToCart, onConstruction }) {
  // Array de números para paginação
  const paginationItems = [1, 2, 3, 4, 5]

  // Handler para clique na paginação
  const handlePaginationClick = (pageNumber, e) => {
    if (pageNumber !== 1) {
      e.preventDefault()
      if (onConstruction) {
        onConstruction(e)
      }
    }
  }

  return (
    <section className="produtos">
      <h2>Produtos</h2>
      
      {/* Container dos produtos */}
      <nav>
        {productsData.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onConstruction={onConstruction}
          />
        ))}
      </nav>

      {/* Paginação */}
      <ul>
        {paginationItems.map((pageNumber) => (
          <li 
            key={pageNumber}
            onClick={(e) => {
              e.preventDefault()   // Impede scroll para âncora
              if (pageNumber !== 1) onConstruction(e) // Página 1 é a atual
            }}
          >
            <a href="#">{pageNumber}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}