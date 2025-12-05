import React from 'react'
import CheckoutForm from './CheckoutForm'
import IconTrash from './icons/IconTrash'

function formatBRL(value) {
  return `R$ ${value}`
}

export default function Cart({ items, onRemove, onUpdateQuantity }) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <section className="carrinho" id="carrinho">
      <h2>Carrinho</h2>
      {items.length === 0 && <h3 className="carrinhovazio">Seu carrinho está vazio</h3>}

      <nav className="listacarrinho" id="listacarrinho">
        {items.map(item => (
          <span className="produtocarrinho" key={item.id}>
            <nav className="removerproduto"><button aria-label={`Remover ${item.title}`} onClick={() => onRemove(item.id)}><IconTrash /></button></nav>
            <nav className="imagemcarrinho"><img src={item.image} alt={item.title} /></nav>
            <nav className="nomecarrinho">{item.title}</nav>
            <nav className="produtoquantidade">
              <h3>Quantidade</h3>
              <input type="number" value={item.quantity} min="0" max="99" className="quantidade" onChange={e => onUpdateQuantity(item.id, Math.max(0, Math.min(99, parseInt(e.target.value || 0))))} aria-label={`Quantidade de ${item.title}`} />
            </nav>
            <nav className="tamanhoproduto"><h3>Tamanho</h3><p className="tamanho">{item.size}</p></nav>
            <nav className="precounidadecarrinho"><h3>Preço Unid.</h3><p className="precounidade">{formatBRL(item.price)}</p></nav>
            <nav className="precototalcarrinho"><h3>Preço Total</h3><p className="produtoprecototal">{formatBRL(item.price * item.quantity)}</p></nav>
          </span>
        ))}
      </nav>

      {items.length > 0 && (
        <div className="carrinho-total">
          <h3>Total: {formatBRL(total)}</h3>
        </div>
      )}

      <CheckoutForm onSubmit={() => { /* after submit send empty cart action can be added by parent */ }} />
    </section>
  )
}
