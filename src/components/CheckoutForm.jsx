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
  const [filtrados, setFiltrados] = useState([])
  const [submitted, setSubmitted] = useState('')
  const [selecao, setSelecao] = useState(-1)

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
    setSubmitted('Muito obrigado, logo daremos retorno')
    setTimeout(() => {
      setPrimeiro('')
      setSegundo('')
      setEmail('')
      setCidade('')
      setEstado('')
      setCep('')
      setTermos(false)
      setErros({})
      setSubmitted('')
      if (onSubmit) onSubmit()
    }, 2000)
  }

  function filtrarEstado(q) {
    const novo = estados.filter(s => s.label.toLowerCase().includes(q.toLowerCase()))
    setFiltrados(novo)
    setSelecao(-1)
  }

  function selecionarEstado(index) {
    if (filtrados[index]) {
      setEstado(filtrados[index].label)
      setFiltrados([])
      setSelecao(-1)
    }
  }

  return (
    <form className="cadastro" id="cadastro" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <nav className="camposcliente">
        <span id="campoprimeironome" className={`input ${erros.primeiro ? 'erro' : ''}`}>
          <label htmlFor="primeironome">Primeiro nome</label>
          <input id="primeironome" value={primeiro} onChange={e => setPrimeiro(e.target.value)} />
          {erros.primeiro && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.primeiro}</p></div>}
        </span>
        <span id="camposegundonome" className={`input ${erros.segundo ? 'erro' : ''}`}>
          <label htmlFor="segundonome">Segundo nome</label>
          <input id="segundonome" value={segundo} onChange={e => setSegundo(e.target.value)} />
          {erros.segundo && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.segundo}</p></div>}
        </span>
        <span id="campoemail" className={`input ${erros.email ? 'erro' : ''}`}>
          <label htmlFor="email">E-mail</label>
          <div className="campoemail">
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            {erros.email && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.email}</p></div>}
          </div>
        </span>
        <span id="campocidade" className={`input ${erros.cidade ? 'erro' : ''}`}>
          <label htmlFor="cidade">Cidade</label>
          <input id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
          {erros.cidade && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.cidade}</p></div>}
        </span>
        <span id="campoestado" className={`input ${erros.estado ? 'erro' : ''}`}>
          <label htmlFor="estado">Estado</label>
          <input 
            id="estado" 
            value={estado} 
            onChange={e => { 
              setEstado(e.target.value)
              filtrarEstado(e.target.value)
            }}
            onFocus={() => {
              setFiltrados(estados)
            }}
            placeholder="Selecione o estado" 
          />
          <div id="listaestados" style={{ display: filtrados.length ? 'block' : 'none', position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', border: '1px solid #dcdedd', borderRadius: '7px', maxHeight: '150px', overflowY: 'auto', zIndex: 1000 }}>
            {filtrados.map((s, i) => (
              <div 
                key={s.value} 
                onClick={() => selecionarEstado(i)}
                style={{ padding: '8px 12px', cursor: 'pointer', background: i === selecao ? '#f0f0f0' : 'white' }}
                onMouseEnter={() => setSelecao(i)}
              >
                {s.label}
              </div>
            ))}
          </div>
          {erros.estado && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.estado}</p></div>}
        </span>
        <span id="campocep" className={`input ${erros.cep ? 'erro' : ''}`}>
          <label htmlFor="cep">CEP</label>
          <input id="cep" value={cep} onChange={e => setCep(e.target.value)} />
          {erros.cep && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.cep}</p></div>}
        </span>
      </nav>
      <nav>
        <span id="checkboxtermos" className={`input ${erros.termos ? 'erro' : ''}`}>
          <input type="checkbox" id="termos" checked={termos} onChange={e => setTermos(e.target.checked)} />
          <p>Aceito os termos e condições</p>
          {erros.termos && <div className="errocadastro mostrarerrocadastro"><p className="errado">{erros.termos}</p></div>}
        </span>
      </nav>
      <nav>
        <span className="enviar">
          <button id="enviar" type="submit">Enviar</button>
          {submitted && <div id="enviado" style={{ color: 'green', marginTop: '10px' }}><p className="correto">{submitted}</p></div>}
        </span>
      </nav>
    </form>
  )
}
