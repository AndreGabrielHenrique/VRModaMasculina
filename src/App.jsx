import React, { useState } from 'react'
import Header from './components/Header'
import Carousel from './components/Carousel'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import Footer from './components/Footer'
import ScrollButton from './components/ScrollButton'

const initialProducts = [
  { id: 1, title: 'Calça Social Clássica', price: 297, priceStr: 'R$ 297', image: '/Imagens/calca 1.jpg', size: 'M' },
  { id: 2, title: 'Terno Linho Fino', price: 888, priceStr: 'R$ 888', image: '/Imagens/terno 1.jpg', size: 'M' },
  { id: 3, title: 'Sapato de Couro', price: 399, priceStr: 'R$ 399', image: '/Imagens/sapato 1.jpg', size: 'Tam. Único' },
  { id: 4, title: 'Relógio San Diego', price: 279, priceStr: 'R$ 279', image: '/Imagens/relogio 1.jpg', size: 'Tam. Único' }
]

export default function App() {
  const [products] = useState(initialProducts)
  const [cartItems, setCartItems] = useState([])
  const [constructionOpen, setConstructionOpen] = useState(false)

  function addToCart(product) {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: Math.min(99, p.quantity + 1) } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productId, qty) {
    setCartItems(prev => prev.map(p => p.id === productId ? { ...p, quantity: qty } : p).filter(p => p.quantity > 0))
  }

  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(p => p.id !== productId))
  }

  function handleConstruction(e) {
    e?.preventDefault()
    setConstructionOpen(true)
  }

  function closeConstruction(e) {
    if (e.target.id === 'fundoconstrucao') {
      setConstructionOpen(false)
    }
  }

  return (
    <div>
      <Header 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} 
        onConstruction={handleConstruction}
      />
      <main>
        <Carousel />
        <section className="produtos">
          <h2>Produtos</h2>
          <nav>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
            ))}
          </nav>
        </section>
        <Cart items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
        <ScrollButton />
      </main>
      <Footer />
      
      {constructionOpen && (
        <div 
          className="fundoconstrucao" 
          id="fundoconstrucao"
          onClick={closeConstruction}
          style={{ display: 'flex' }}
        >
          <div id="construcao" className="construcao" style={{ background: 'white' }}>
            <h2>🚧 Em Construção</h2>
            <p>Esta funcionalidade ainda está em desenvolvimento.</p>
            <p>Breve teremos novidades!</p>
            <button 
              onClick={() => setConstructionOpen(false)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#202529',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
