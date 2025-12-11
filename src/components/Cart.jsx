// src\components\Cart.jsx
// Componente do carrinho de compras
// Gerencia a exibição dos itens, quantidade, preços e formulário de checkout

// Importa hooks do React para estado e efeitos
import React, { useState, useEffect } from 'react'
// Importa o componente do formulário de checkout
import CheckoutForm from './CheckoutForm'
// Importa o ícone de lixeira para remover produtos
import IconTrash from './icons/IconTrash'

// Componente Cart (carrinho de compras)
// Props recebidas:
// - visible: booleano que controla se o carrinho está visível
// - items: array de itens no carrinho
// - onRemove: função chamada quando remove um item
// - onUpdateQuantity: função chamada quando atualiza quantidade
// - onCheckoutComplete: função chamada quando checkout é completado
export default function Cart({ visible, items = [], onRemove = () => {}, onUpdateQuantity = () => {}, onCheckoutComplete }) {
  // Estado que controla se a mensagem "carrinho vazio" está visível
  const [emptyMessageVisible, setEmptyMessageVisible] = useState(false)

  // Garante que items seja um array válido, filtrando valores null/undefined
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : []

  // Estado para armazenar erros de quantidade (ex: máximo excedido)
  const [qtyErrors, setQtyErrors] = useState({})

  // Efeito para controlar a mensagem "carrinho vazio"
  useEffect(() => {
    // Se não há itens E o carrinho está visível
    if (safeItems.length === 0 && visible) {
      // Mostra mensagem
      setEmptyMessageVisible(true)
      // Configura timer para esconder mensagem após 15 segundos
      const timeout = setTimeout(() => {
        setEmptyMessageVisible(false)
      }, 15000) // 15 segundos
      // Cleanup: limpa o timer se componente desmontar ou dependências mudarem
      return () => clearTimeout(timeout)
    } else {
      // Se há itens, esconde mensagem
      setEmptyMessageVisible(false)
    }
  }, [safeItems, visible]) // Executa quando safeItems ou visible mudam

  // Função para lidar com mudança na quantidade de um item
  const handleQuantityChange = (itemId, value) => {
    // Remove caracteres não numéricos e converte para inteiro
    const parsed = parseInt(String(value).replace(/\D/g, ''), 10)
    // Se não for número válido, define como 0
    const newQuantity = Number.isFinite(parsed) ? parsed : 0

    // Se quantidade menor que 1, remove o item
    if (newQuantity < 1) {
      onRemove(itemId)
      setQtyErrors(prev => ({ ...prev, [itemId]: '' })) // Limpa erro
      return
    }

    // Se quantidade maior que 99 (limite máximo)
    if (newQuantity > 99) {
      // Define mensagem de erro
      setQtyErrors(prev => ({ ...prev, [itemId]: 'Número máximo atingido' }))
      // Atualiza quantidade para 99 (máximo)
      onUpdateQuantity(itemId, 99)
      return
    }

    // Se quantidade válida, limpa erro e atualiza
    setQtyErrors(prev => ({ ...prev, [itemId]: '' }))
    onUpdateQuantity(itemId, newQuantity)
  }

  return (
    // Seção do carrinho
    // Classes condicionais para animação de entrada/saída
    <section
      className={`carrinho ${visible ? 'carrinhoentrando' : 'carrinhosaindo'}`}
      id="carrinho"
    >
      <h2>Carrinho</h2>

      {/* Mensagem de carrinho vazio (condicional) */}
      {safeItems.length === 0 && emptyMessageVisible && (
        <h3 className="carrinhovazio">Seu carrinho está vazio</h3>
      )}

      {/* Se há itens no carrinho, mostra lista e formulário */}
      {safeItems.length > 0 && (
        <>
          {/* Container da lista de produtos no carrinho */}
          <nav className="listacarrinho" id="listacarrinho">
            {/* Mapeia cada item do carrinho */}
            {safeItems.map(item => {
              // ID único para cada item (usa id do item ou gera random)
              const id = item?.id ?? Math.random()
              // Converte preço para número (fallback 0)
              const priceNumber = Number(item?.price) || 0
              // Quantidade do item (fallback 1)
              const qty = Number(item?.quantity) || 1
              return (
                <div key={id}>
                  {/* Container de cada produto no carrinho */}
                  <span className="produtocarrinho">
                    {/* Botão para remover produto */}
                    <nav className="removerproduto" onClick={() => onRemove(item.id)}>
                      <IconTrash size={25} />
                    </nav>

                    {/* Imagem do produto */}
                    <nav className="imagemcarrinho">
                      <img src={item?.image || ''} alt={item?.description || item?.title || 'Produto'} />
                    </nav>

                    {/* Nome/descrição do produto */}
                    <nav className="nomecarrinho">{item?.description || item?.title || 'Produto'}</nav>
                    
                    {/* Seção de quantidade */}
                    <nav className="produtoquantidade">
                      <h3>Quantidade</h3>

                      {/* Input para alterar quantidade */}
                      <input 
                        type="number"
                        value={item.quantity}
                        className="quantidade"
                        // Atualiza quantidade quando valor muda
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                      
                      {/* Mensagem de erro de quantidade (se houver) */}
                      {qtyErrors[item.id] && (
                        <div className="erroquantidade">{qtyErrors[item.id]}</div>
                      )}
                    </nav>
                    
                    {/* Seção de tamanho */}
                    <nav className="tamanhoproduto">
                      <h3>Tamanho</h3>
                      <p className="tamanho">{item?.size ?? 'N/A'}</p>
                    </nav>

                    {/* Seção de preço unitário */}
                    <nav className="precounidadecarrinho">
                      <h3>Preço Unid.</h3>
                      <p className="precounidade">
                        {/* Formata preço: se for inteiro, sem decimais; senão, 2 decimais */}
                        R$ {priceNumber % 1 === 0 ? priceNumber : priceNumber.toFixed(2)}
                      </p>
                    </nav>

                    {/* Seção de preço total (unitário × quantidade) */}
                    <nav className="precototalcarrinho">
                      <h3>Preço Total</h3>
                      <p className="produtoprecototal">
                        {/* Formata preço total */}
                        R$ {(priceNumber * qty) % 1 === 0 ? (priceNumber * qty) : (priceNumber * qty).toFixed(2)}
                      </p>
                    </nav>
                  </span>
                </div>
              )
            })}
          </nav>

          {/* Formulário de checkout (só aparece se há itens) */}
          <CheckoutForm onCheckoutComplete={onCheckoutComplete} />
        </>
      )}
    </section>
  )
}