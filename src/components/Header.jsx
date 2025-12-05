import React, { useState } from 'react'
import IconSearch from './icons/IconSearch'
import IconCart from './icons/IconCart'
import IconUser from './icons/IconUser'

export default function Header({ cartCount, onConstruction }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClickOutside = (e) => {
    if (profileOpen && !e.target.closest('.perfil') && !e.target.closest('.abrirmenu')) {
      setProfileOpen(false)
    }
    if (menuOpen && !e.target.closest('.menu') && !e.target.closest('.abrirmenu-icon')) {
      setMenuOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [profileOpen, menuOpen])

  return (
    <header>
      <form className="busca" id="busca" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">Pesquisar</label>
        <input id="search" placeholder="O que você procura?" aria-label="Pesquisar" />
        <button type="button" aria-label="Pesquisar" onClick={onConstruction}>
          <IconSearch />
        </button>
      </form>

      <img src="/Imagens/logo1.jpeg" className="logo" alt="VR Moda Masculina logo" />

      <ul>
        <li>
          <button aria-label="Configurações" onClick={onConstruction}>
            ⚙️
          </button>
        </li>
        <li>
          <button aria-label="Localização" onClick={onConstruction}>
            📍
          </button>
        </li>
        <li>
          <a href="#carrinho" className="carrinhodecompras" aria-label="Abrir carrinho">
            <IconCart /> {cartCount > 0 ? `(${cartCount})` : ''}
          </a>
        </li>
        <li>
          <button 
            className="abrirmenu" 
            aria-label="Abrir menu do usuário"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <IconUser />
          </button>
          {profileOpen && (
            <div className="perfil" id="perfil">
              <nav className="menu" id="menu">
                <button onClick={onConstruction} className="menu-item">Ver perfil</button>
                <button onClick={onConstruction} className="menu-item">Alterar senha</button>
                <button onClick={onConstruction} className="menu-item">Logout</button>
              </nav>
            </div>
          )}
        </li>
      </ul>
    </header>
  )
}
