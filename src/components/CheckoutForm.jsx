import React, { useState } from 'react'

const estados = [
  { value: 'AC', label: 'Acre' },{ value: 'AL', label: 'Alagoas' },{ value: 'AP', label: 'Amapá' },{ value: 'AM', label: 'Amazonas' },{ value: 'BA', label: 'Bahia' },{ value: 'CE', label: 'Ceará' },{ value: 'DF', label: 'Distrito Federal' },{ value: 'ES', label: 'Espírito Santo' },{ value: 'GO', label: 'Goiás' },{ value: 'MA', label: 'Maranhão' },{ value: 'MT', label: 'Mato Grosso' },{ value: 'MS', label: 'Mato Grosso do Sul' },{ value: 'MG', label: 'Minas Gerais' },{ value: 'PA', label: 'Pará' },{ value: 'PB', label: 'Paraíba' },{ value: 'PR', label: 'Paraná' },{ value: 'PE', label: 'Pernambuco' },{ value: 'PI', label: 'Piauí' },{ value: 'RJ', label: 'Rio de Janeiro' },{ value: 'RN', label: 'Rio Grande do Norte' },{ value: 'RS', label: 'Rio Grande do Sul' },{ value: 'RO', label: 'Rondônia' },{ value: 'RR', label: 'Roraima' },{ value: 'SC', label: 'Santa Catarina' },{ value: 'SP', label: 'São Paulo' },{ value: 'SE', label: 'Sergipe' },{ value: 'TO', label: 'Tocantins' },{ value: 'EX', label: 'Estrangeiro' }
]

export default function CheckoutForm({ onSubmit }) {
  const [primeiro, setPrimeiro] = useState('')
  const [segundo, setSegundo] = useState('')
  const [email, setEmail] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [cep, setCep] = useState('')
  const [termos, setTermos] = useState(false)
  const [erros, setErros] = useState({})
  const [filtrados, setFiltrados] = useState(estados)

  function emailValido(e) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(e)
  }

  function validar() {
    const novo = {}
    if (!primeiro) novo.primeiro = 'Não preenchido'
    if (!segundo) novo.segundo = 'Não preenchido'
    if (!email || !emailValido(email)) novo.email = 'E-mail incorreto'
    if (!cidade) novo.cidade = 'Não preenchido'
    const validoEstado = estados.some(s => s.label.toLowerCase() === estado.toLowerCase())
    if (!validoEstado) novo.estado = 'Estado não selecionado ou inválido'
    if (!cep) novo.cep = 'Não preenchido'
    if (!termos) novo.termos = 'É necessário aceitar os termos e condições'
    setErros(novo)
    return Object.keys(novo).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validar()) return
    setPrimeiro('')
    setSegundo('')
    setEmail('')
    setCidade('')
    setEstado('')
    setCep('')
    setTermos(false)
    setErros({})
    if (onSubmit) onSubmit()
  }

  function filtrarEstado(q) {
    setFiltrados(estados.filter(s => s.label.toLowerCase().includes(q.toLowerCase())))
  }

  return (
    <form className="cadastro" id="cadastro" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <nav className="camposcliente">
        <span id="campoprimeironome" className="input">
          <label>Primeiro nome</label>
          <input id="primeironome" value={primeiro} onChange={e => setPrimeiro(e.target.value)} />
          <div id="erroprimeironome" className="errocadastro">{erros.primeiro}</div>
        </span>
        <span id="camposegundonome" className="input">
          <label>Segundo nome</label>
          <input id="segundonome" value={segundo} onChange={e => setSegundo(e.target.value)} />
          <div id="errosegundonome" className="errocadastro">{erros.segundo}</div>
        </span>
        <span id="campoemail" className="input">
          <label>E-mail</label>
          <div className="campoemail">
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <div id="erroemail" className="errocadastro">{erros.email}</div>
          </div>
        </span>
        <span id="campocidade" className="input">
          <label>Cidade</label>
          <input id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
          <div id="errocidade" className="errocadastro">{erros.cidade}</div>
        </span>
        <span id="campoestado" className="input">
          <label>Estado</label>
          <input id="estado" value={estado} onChange={e => { setEstado(e.target.value); filtrarEstado(e.target.value) }} placeholder="Selecione o estado" />
          <div id="listaestados" style={{ display: filtrados.length ? 'block' : 'none' }}>
            {filtrados.map((s, i) => (
              <div key={s.value} onClick={() => { setEstado(s.label); setFiltrados([]) }}>{s.label}</div>
            ))}
          </div>
          <div id="erroestado" className="errocadastro">{erros.estado}</div>
        </span>
        <span id="campocep" className="input">
          <label>CEP</label>
          <input id="cep" value={cep} onChange={e => setCep(e.target.value)} />
          <div id="errocep" className="errocadastro">{erros.cep}</div>
        </span>
      </nav>
      <nav>
        <span id="checkboxtermos" className="input">
          <input type="checkbox" id="termos" checked={termos} onChange={e => setTermos(e.target.checked)} />
          <p>Aceito os termos e condições</p>
          <div id="errotermos" className="errocadastro">{erros.termos}</div>
        </span>
      </nav>
      <nav>
        <span className="enviar">
          <button id="enviar" type="submit">Enviar</button>
        </span>
      </nav>
    </form>
  )
}
