import React from 'react'

export default function Footer() {
  return (
    <footer>
      <ul className="links">
        <li className="link"><a>Fale Conosco</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a>Meios de Pagamento e Frete</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a>Política de Privacidade</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a>Política de Trocas e Devolução</a></li>
        <li className="espacador"><hr /></li>
        <li className="link"><a>Quem Somos</a></li>
      </ul>

      <hr className="separador" />

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
