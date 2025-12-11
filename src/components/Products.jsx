// Caminho: src/components/Products.jsx
// Seção de listagem de produtos com paginação

import React from 'react'
import ProductCard from './ProductCard'

// Importa as imagens dos produtos da nova localização
import calca from './Imagens/calca 1.jpg'
import terno from './Imagens/terno 1.jpg'
import sapato from './Imagens/sapato 1.jpg'
import relogio from './Imagens/relogio 1.jpg'

// Dados estáticos dos produtos com as imagens importadas
const productsData = [
  {
    id: 1,
    image: calca, // Usa a variável importada (caminho otimizado pelo Vite)
    description: 'Calça Social Clássica',
    price: 'R$ 297',
    installment: 99,
    size: 'M'
  },
  {
    id: 2,
    image: terno, // Usa a variável importada (caminho otimizado pelo Vite)
    description: 'Terno Linho Fino',
    price: 'R$ 888',
    installment: 296,
    size: 'M'
  },
  {
    id: 3,
    image: sapato, // Usa a variável importada (caminho otimizado pelo Vite)
    description: 'Sapato de Couro',
    price: 'R$ 399',
    installment: 133,
    size: 'Tam. Único'
  },
  {
    id: 4,
    image: relogio, // Usa a variável importada (caminho otimizado pelo Vite)
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