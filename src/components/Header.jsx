// Caminho: src/components/Header.jsx
// Cabeçalho do site: inclui busca, logo, ícones de usuário, favoritos e carrinho

import React, { useState, useEffect, useRef } from 'react'
import IconSearch from './icons/IconSearch'
import IconCart from './icons/IconCart'
import IconUser from './icons/IconUser'
import IconTicket from './icons/IconTicket'
import IconHeart from './icons/IconHeart'

// Importa as imagens da nova localização
import logo from './Imagens/logo1.jpeg'
import perfil from './Imagens/perfil 1.jpg'

// Componente Header
// Props:
// - onToggleCart: função para alternar visibilidade do carrinho
// - onConstruction: função para abrir modal "em construção"
export default function Header({ onToggleCart, onConstruction }) {
  // Estado para controlar abertura do menu dropdown
  const [menuOpen, setMenuOpen] = useState(false)
  // Estado para controlar abertura do submenu de perfil
  const [profileOpen, setProfileOpen] = useState(false)
  // Referência para elemento do menu (detectar clique fora)
  const menuRef = useRef(null)
  // Referência para elemento do perfil (detectar clique fora)
  const profileRef = useRef(null)

  // Efeito para fechar menus ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Se clique NÃO foi dentro do menu, fecha menu
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
      // Se clique NÃO foi dentro do perfil, fecha perfil
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }

    // Adiciona listener com capture: true (executa antes de outros listeners)
    document.addEventListener('click', handleClickOutside, true)

    // Cleanup: remove listener quando componente desmonta
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  // Handler para clique no perfil
  const handleProfileClick = (e) => {
    e.stopPropagation() // Impede propagação para evitar fechar imediatamente
    setProfileOpen(!profileOpen) // Alterna estado
  }

  // Função para abrir modal "em construção"
  const triggerConstruction = (e) => {
    // Evita comportamento padrão (navegação em links)
    if (e && e.preventDefault) e.preventDefault()

    // Fecha menus antes de abrir modal (evita estado inconsistente)
    setProfileOpen(false)
    setMenuOpen(false)

    // Chama função do pai para abrir modal
    if (onConstruction) onConstruction()
  }

  return (
    <header>
      {/* Formulário de busca */}
      <form
        className="busca"
        id="busca"
        onSubmit={(e) => {
          e.preventDefault()
          onConstruction() // Ao submeter, abre modal "em construção"
        }}
      >
        <input placeholder="O que você procura?" />
        <button type="submit">
          <IconSearch size={20} />
        </button>
      </form>

      {/* 
        Logo da empresa 
        Agora usa a variável 'logo' que contém a importação da imagem
        Isso permite otimização pelo Vite e inclusão no bundle final
      */}
      <img src={logo} className="logo" alt="VR Moda Masculina logo" />
      
      {/* Lista de ícones de navegação */}
      <ul>
        {/* Ícone de ticket/suporte */}
        <li>
          <a onClick={triggerConstruction}>
            <IconTicket size={24} ariaLabel="Tickets" />
          </a>
        </li>
        {/* Ícone de favoritos */}
        <li>
          <a onClick={triggerConstruction}>
            <IconHeart size={24} ariaLabel="Favoritos" />
          </a>
        </li>
        {/* Ícone do carrinho */}
        <li>
          <a href="#carrinho" className="carrinhodecompras" onClick={(e) => { 
            e.preventDefault(); // Previne navegação por âncora
            onToggleCart(); // Alterna visibilidade do carrinho
          }}>
            <IconCart size={24} ariaLabel="Carrinho de compras" />
          </a>
        </li>
        {/* Ícone do usuário com menu dropdown */}
        <li>
          <a
            className="abrirmenu"
            onClick={(e) => { 
              e.stopPropagation(); // Impede propagação
              setMenuOpen(!menuOpen) // Alterna menu
            }}
          >
            <IconUser size={24} ariaLabel="Menu do usuário" />
             {/* Menu dropdown */}
             <nav
                ref={menuRef} // Referência para detectar clique fora
                className={`menu ${menuOpen ? 'mostrarmenu' : ''}`}
                id="menu"
              >
              {/* Item "Ver perfil" com submenu */}
              <div className="verperfil" onClick={handleProfileClick} ref={profileRef}>
                <p id="verperfil">Ver perfil</p>
                {/* Submenu de perfil */}
                <span className={`perfil ${profileOpen ? 'mostrarperfil' : ''}`} id="perfil">
                  {/* 
                    Imagem de perfil importada como módulo
                    Vai ser otimizada e incluída no bundle pelo Vite
                  */}
                  <img src={perfil} alt="Perfil do usuário"/>
                  <p>Usuário</p>
                  <p>usuario@usuario.com</p>
                  <p>
                    <button className="verperfilcompleto" onClick={triggerConstruction}>
                      Ver perfil completo
                    </button>
                  </p>
                </span>
              </div>
              {/* Outras opções do menu */}
              <p className="alterarsenha" onClick={triggerConstruction}>Alterar senha</p>
              <p className="logout" onClick={triggerConstruction}>Logout</p>
            </nav>
          </a>
        </li>
      </ul>
    </header>
  )
}