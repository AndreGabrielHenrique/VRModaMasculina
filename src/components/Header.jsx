import React from 'react'

export default function Header({ cartCount }) {
  return (
    <header>
      <form className="busca" id="busca" onSubmit={e => e.preventDefault()}>
        <input placeholder="O que você procura?" />
        <button type="button">
          🔍
        </button>
      </form>

      <img src="/Imagens/logo1.jpeg" className="logo" alt="logo" />

      <ul>
        <li><button onClick={e => e.preventDefault()}>⚙️</button></li>
        <li><button onClick={e => e.preventDefault()}>📍</button></li>
        <li><a href="#carrinho" className="carrinhodecompras">🛒 {cartCount > 0 ? `(${cartCount})` : ''}</a></li>
        <li><button className="abrirmenu">👤</button></li>
      </ul>
    </header>
  )
}
