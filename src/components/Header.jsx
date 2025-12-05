import React from 'react'
import IconSearch from './icons/IconSearch'
import IconCart from './icons/IconCart'
import IconUser from './icons/IconUser'

export default function Header({ cartCount }) {
  return (
    <header>
      <form className="busca" id="busca" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">Pesquisar</label>
        <input id="search" placeholder="O que você procura?" aria-label="Pesquisar" />
        <button type="button" aria-label="Pesquisar">
          <IconSearch />
        </button>
      </form>

      <img src="/Imagens/logo1.jpeg" className="logo" alt="VR Moda Masculina logo" />

      <ul>
        <li>
          <button aria-label="Configurações" onClick={e => e.preventDefault()}>
            ⚙️
          </button>
        </li>
        <li>
          <button aria-label="Localização" onClick={e => e.preventDefault()}>
            📍
          </button>
        </li>
        <li>
          <a href="#carrinho" className="carrinhodecompras" aria-label="Abrir carrinho">
            <IconCart /> {cartCount > 0 ? `(${cartCount})` : ''}
          </a>
        </li>
        <li>
          <button className="abrirmenu" aria-label="Abrir menu do usuário">
            <IconUser />
          </button>
        </li>
      </ul>
    </header>
  )
}
