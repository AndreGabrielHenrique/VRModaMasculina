// Caminho: src/App.jsx
// Componente principal da aplicação - Gerencia estados globais e rotas principais

// Importações do React e hooks necessários
import React, { useState, useEffect } from 'react'
// Importação dos componentes principais da aplicação
import Header from './components/Header'              // Cabeçalho com navegação
import Carousel from './components/Carousel'          // Carrossel de imagens
import Products from './components/Products'          // Lista de produtos
import Cart from './components/Cart'                  // Carrinho de compras
import Footer from './components/Footer'              // Rodapé
import ScrollButton from './components/ScrollButton'  // Botão de rolagem
import ErrorBoundary from './components/ErrorBoundary' // Tratamento de erros
import UnderConstructionModal from './components/UnderConstructionModal' // Modal "em construção"

// Componente principal App (exportado como padrão)
export default function App() {
  // ESTADOS DA APLICAÇÃO
  
  // Estado: itens do carrinho (array de objetos de produto)
  // Inicializado como array vazio []
  const [cartItems, setCartItems] = useState([])
  
  // Estado: controla visibilidade do painel do carrinho
  // Inicializado como false (carrinho fechado)
  const [cartOpen, setCartOpen] = useState(false)
  
  // Estado: modal "em construção"
  // Inicializado como false (modal fechado)
  const [constructionOpen, setConstructionOpen] = useState(false)
  
  // Estado: flag para mensagem de envio concluído (checkout)
  // Inicializado como false (mensagem não mostrada)
  const [submitted, setSubmitted] = useState(false)
  
  // Estado: mensagem de carrinho vazio
  // Inicializado como false (mensagem não mostrada)
  const [cartEmptyMsg, setCartEmptyMsg] = useState(false)

  // FUNÇÃO: adiciona um produto ao carrinho
  // Parâmetro: product (objeto do produto a ser adicionado)
  function addToCart(product) {
    // Validação: verifica se o produto existe e tem ID
    if (!product || !product.id) {
      console.error('Produto inválido:', product)
      return  // Sai da função se produto for inválido
    }
    
    // Esconde mensagem de envio (se estiver visível)
    setSubmitted(false)
    
    try {
      console.log('Adicionando ao carrinho:', product)  // Log para debug

      // Converte o preço de string para número
      // Exemplo: "R$ 1.200,50" → 1200.50
      let priceNumber = 0
      if (typeof product.price === 'string') {
        // Remove "R$ ", pontos de milhar e substitui vírgula por ponto
        const priceStr = product.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.')
        priceNumber = parseFloat(priceStr)  // Converte para número
        if (isNaN(priceNumber)) priceNumber = 0  // Fallback se conversão falhar
      } else {
        priceNumber = product.price || 0  // Usa o valor direto ou 0
      }

      // Atualiza o estado do carrinho usando setCartItems
      setCartItems(prev => {
        // Verifica se o produto já existe no carrinho
        const existing = prev.find(p => p.id === product.id)
        
        if (existing) {
          // PRODUTO JÁ EXISTE: incrementa quantidade (máximo 99)
          return prev.map(p =>
            p.id === product.id
              ? { 
                  ...p,  // Mantém outras propriedades
                  quantity: Math.min(99, (p.quantity || 1) + 1),  // Incrementa, máximo 99
                  price: priceNumber  // Atualiza preço (caso tenha mudado)
                }
              : p
          )
        }

        // NOVO PRODUTO: cria novo item no carrinho
        const newItem = {
          id: product.id,                         // ID único do produto
          title: product.description || product.title || 'Produto',  // Título/descrição
          description: product.description || 'Produto',  // Descrição
          image: product.image || '',             // URL da imagem
          price: priceNumber,                     // Preço convertido para número
          size: product.size || 'N/A',            // Tamanho ou "N/A"
          quantity: 1                             // Quantidade inicial = 1
        }

        console.log('Novo item:', newItem)  // Log para debug
        return [...prev, newItem]  // Adiciona novo item ao array existente
      })

      // Abre o carrinho automaticamente
      setCartOpen(true)

      // Rola a página até o carrinho após 100ms (para garantir renderização)
      setTimeout(() => {
        const carrinhoElement = document.getElementById('carrinho')
        if (carrinhoElement) {
          // Scroll suave até o elemento com id="carrinho"
          carrinhoElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (error) {
      console.error('Erro em addToCart:', error)  // Log de erro
    }
  }

  // FUNÇÃO: atualiza a quantidade de um item no carrinho
  // Parâmetros: productId (ID do produto), qty (nova quantidade)
  function updateQuantity(productId, qty) {
    // Converte a quantidade para número
    let quantity = Number(qty)

    // Validação: se não for número, usa 1 como padrão
    if (isNaN(quantity)) {
      quantity = 1
    }

    // Se quantidade for <= 0, remove o item do carrinho
    if (quantity <= 0) {
      removeFromCart(productId)
      return  // Sai da função
    }

    // Limite máximo: 99 unidades
    if (quantity > 99) {
      // Atualiza apenas esse produto para quantidade 99
      setCartItems(prev => 
        prev.map(p => p.id === productId ? { ...p, quantity: 99 } : p)
      )
      return  // Sai da função
    }

    // Atualiza a quantidade do produto específico
    setCartItems(prev => 
      prev.map(p => p.id === productId ? { ...p, quantity } : p)
    )
  }

  // FUNÇÃO: alterna visibilidade do carrinho (abre/fecha)
  function toggleCart() {
    setSubmitted(false)  // Esconde mensagem de envio
    setCartOpen(prev => !prev)  // Inverte o estado atual (true ↔ false)

    // Se estiver ABRINDO o carrinho (cartOpen era false), rola até ele
    setTimeout(() => {
      const carrinhoElement = document.getElementById('carrinho')
      // cartOpen aqui refere-se ao valor ANTES da atualização (closure)
      if (carrinhoElement && !cartOpen) {
        carrinhoElement.scrollIntoView({ 
          behavior: 'smooth',  // Animação suave
          block: 'start'       // Alinha ao topo da viewport
        })
      }
    }, 100)  // Aguarda 100ms para garantir renderização
  }

  // FUNÇÃO: executada após checkout bem-sucedido
  function handleCheckoutComplete() {
    setSubmitted(true)    // Mostra mensagem de agradecimento
    setCartItems([])      // Limpa todos os itens do carrinho
    setCartOpen(false)    // Fecha o carrinho

    // Remove mensagem após 15 segundos (15000ms)
    setTimeout(() => setSubmitted(false), 15000)
  }

  // FUNÇÃO: abre o modal "em construção"
  // Parâmetro: e (evento opcional - para preventDefault)
  function handleConstruction(e) {
    e?.preventDefault()  // Previne comportamento padrão se evento existir
    setConstructionOpen(true)  // Abre o modal
  }

  // FUNÇÃO: remove item do carrinho por ID
  // Parâmetro: productId (ID do produto a remover)
  function removeFromCart(productId) {
    setCartItems(prev => {
      // Filtra removendo o produto com ID especificado
      const novaLista = prev.filter(p => p.id !== productId)
      
      // Se carrinho ficar vazio, fecha automaticamente
      if (novaLista.length === 0) setCartOpen(false)
      
      return novaLista  // Retorna novo array sem o item removido
    })
  }

  // EFEITO: monitora mudanças no carrinho
  // Executa sempre que cartItems ou cartOpen mudam
  useEffect(() => {
    // Se carrinho está vazio E aberto
    if (cartItems.length === 0 && cartOpen) {
      setCartEmptyMsg(true)  // Mostra mensagem de carrinho vazio
      
      // Configura timeout para fechar mensagem e carrinho após 15s
      const timeout = setTimeout(() => {
        setCartEmptyMsg(false)   // Esconde mensagem
        setCartOpen(false)       // Fecha carrinho
      }, 15000)  // 15 segundos
      
      // Cleanup: cancela timeout se componente desmontar ou dependências mudarem
      return () => clearTimeout(timeout)
    }
  }, [cartItems, cartOpen])  // Dependências: re-executa quando estas mudam

  // RENDERIZAÇÃO do componente App
  return (
    <div>
      {/* 
        COMPONENTE HEADER: 
        - cartCount: número total de itens no carrinho (soma de quantidades)
        - onConstruction: função para abrir modal "em construção"
        - onToggleCart: função para abrir/fechar carrinho
      */}
      <Header 
        cartCount={cartItems.reduce((s, i) => s + (i.quantity || 0), 0)} 
        onConstruction={handleConstruction}
        onToggleCart={toggleCart}
      />
      
      {/* CONTEÚDO PRINCIPAL */}
      <main>
        {/* COMPONENTE CARROSSEL: slides de imagens */}
        <Carousel />
        
        {/* 
          COMPONENTE PRODUTOS:
          - onAddToCart: função para adicionar produto ao carrinho
          - onConstruction: função para abrir modal "em construção"
        */}
        <Products 
          onAddToCart={addToCart}
          onConstruction={handleConstruction}
        />
        
        {/* 
          CARRINHO: renderizado condicionalmente (só se cartOpen for true)
          - ErrorBoundary: envolve o carrinho para tratamento de erros
        */}
        {cartOpen && (
          <ErrorBoundary>
            <Cart
              visible={cartOpen && (cartItems.length > 0 || cartEmptyMsg)}  // Visível se aberto E (tem itens OU mensagem vazio)
              items={cartItems}                    // Array de itens
              onRemove={removeFromCart}            // Função remover item
              onUpdateQuantity={updateQuantity}    // Função atualizar quantidade
              onCheckoutComplete={handleCheckoutComplete}  // Função checkout
              emptyMessageVisible={cartEmptyMsg}   // Flag mensagem vazio
            />
          </ErrorBoundary>
        )}

        {/* 
          MENSAGEM DE ENVIO BEM-SUCEDIDO: 
          Renderizada condicionalmente (só se submitted for true)
        */}
        {submitted && (
          <div id="enviado" className="mensagem-enviado">
            <p className="correto">Muito obrigado, logo daremos retorno</p>
          </div>
        )}
        
        {/* COMPONENTE BOTÃO DE ROLAGEM (scroll to top/bottom) */}
        <ScrollButton />
      </main>
      
      {/* COMPONENTE RODAPÉ */}
      <Footer onConstruction={handleConstruction} />

      {/* 
        MODAL "EM CONSTRUÇÃO": 
        - visible: controlado por constructionOpen state
        - onClose: função para fechar modal (setConstructionOpen(false))
      */}
      <UnderConstructionModal 
        visible={constructionOpen} 
        onClose={() => setConstructionOpen(false)} 
      />
    </div>
  )
}