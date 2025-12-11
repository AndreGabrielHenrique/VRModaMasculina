// src\components\Footer.jsx
// Componente do rodapé da página com links e informações de contato

import React from 'react'

// Componente Footer
// Props:
// - onConstruction: função chamada quando clica em links que estão em construção
export default function Footer({ onConstruction }) {
  return (
    <footer>
      {/* Lista de links (todos em construção) */}
      <ul className="links">
        <li className="link"><a onClick={onConstruction}>Fale Conosco</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a onClick={onConstruction}>Meios de Pagamento e Frete</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a onClick={onConstruction}>Política de Privacidade</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a onClick={onConstruction}>Política de Trocas e Devolução</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a onClick={onConstruction}>Quem Somos</a></li>
      </ul>

      {/* Separador horizontal entre seções */}
      <hr className="separador" />

      {/* Lista de informações de contato (não clicáveis) */}
      <ul className="contatos">
        <li className="contato">Telefone: 4002-8922</li>
        <li className="espacador"><hr /></li>
        <li className="contato">WhatsApp: 11 99229-1289</li>
        <li className="espacador"><hr /></li>
        <li className="contato">Segunda a Sexta das 8 às 18 horas</li>
        <li className="espacador"><hr /></li>
        <li className="contato">Endereço: Rua dos Bobos, número 0, SP</li>
      </ul>
    </footer>
  )
}