// src\components\CheckoutForm.jsx
// Componente do formulário de checkout usado no carrinho
// Implementa validação sequencial, autocomplete de estados e lógica de envio

import React, { useState, useRef, useEffect } from 'react'
import IconAt from './icons/IconAt'

// Array de estados brasileiros (incluindo "Estrangeiro")
// Cada objeto tem: value (sigla) e label (nome completo)
const ESTADOS = [
  { value: 'AC', label: 'Acre' },{ value: 'AL', label: 'Alagoas' },{ value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },{ value: 'BA', label: 'Bahia' },{ value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },{ value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },{ value: 'MA', label: 'Maranhão' },{ value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },{ value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },{ value: 'PB', label: 'Paraíba' },{ value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },{ value: 'PI', label: 'Piauí' },{ value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },{ value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },{ value: 'RR', label: 'Roraima' },{ value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },{ value: 'SE', label: 'Sergipe' },{ value: 'TO', label: 'Tocantins' },
  { value: 'EX', label: 'Estrangeiro' }
]

// Componente principal do formulário de checkout
// Props:
// - onCheckoutComplete: função callback chamada quando formulário é enviado com sucesso
export default function CheckoutForm({ onCheckoutComplete }) {
  // Estado do formulário (todos os campos)
  const [form, setForm] = useState({
    primeiroNome: '',
    segundoNome: '',
    email: '',
    cidade: '',
    estado: '',
    cep: '',
    termos: false // checkbox
  })

  // Estado para mensagens de erro de cada campo
  const [errors, setErrors] = useState({
    primeiroNome: '',
    segundoNome: '',
    email: '',
    cidade: '',
    estado: '',
    cep: '',
    termos: ''
  })

  // Referência para armazenar timers de erro (cada campo tem seu timer)
  const errorTimersRef = useRef({})

  // Estado para autocomplete do campo 'estado'
  const [filtrados, setFiltrados] = useState([]) // Estados filtrados conforme digitação
  const [listaAberta, setListaAberta] = useState(false) // Se dropdown está aberto
  const [selecao, setSelecao] = useState(-1) // Índice do item selecionado no dropdown (-1 = nenhum)
  const listaRef = useRef(null) // Referência para container da lista (para rolagem e clique fora)
  const estadoInputRef = useRef(null) // Referência para input de estado (para foco)

  // Ordem de validação sequencial dos campos
  const ordem = [
    'primeiroNome',
    'segundoNome',
    'email',
    'cidade',
    'estado',
    'cep',
    'termos'
  ]

  // Expressão regular para validar formato de email
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // Limpa todos os timers de erro
  function clearAllErrorTimers() {
    Object.values(errorTimersRef.current).forEach(timer => {
      try { clearTimeout(timer) } catch(e) {}
    })
    errorTimersRef.current = {}
  }

  // Define erro para um campo específico e agenda remoção automática após 7 segundos
  function setFieldError(field, message) {
    // Remove erros de outros campos (mantém apenas erro do campo atual)
    clearOtherErrors(field)

    // Atualiza estado de erros
    setErrors(prev => ({ ...prev, [field]: message }))
    
    // Se já existe timer para este campo, cancela
    if (errorTimersRef.current[field]) {
      clearTimeout(errorTimersRef.current[field])
      delete errorTimersRef.current[field]
    }

    // Se há mensagem de erro, agenda limpeza após 7 segundos
    if (message) {
      errorTimersRef.current[field] = setTimeout(() => {
        setErrors(prev => ({ ...prev, [field]: '' }))
        delete errorTimersRef.current[field]
      }, 7000)
    }
  }

  // Limpa erro de um campo específico e seu timer
  function clearFieldError(field) {
    setErrors(prev => ({ ...prev, [field]: '' }))
    if (errorTimersRef.current[field]) {
      clearTimeout(errorTimersRef.current[field])
      delete errorTimersRef.current[field]
    }
  }

  // Limpa todos os erros e timers
  function clearAllErrors() {
    setErrors({
      primeiroNome: '',
      segundoNome: '',
      email: '',
      cidade: '',
      estado: '',
      cep: '',
      termos: ''
    })
    clearAllErrorTimers()
  }

  // Limpa erros de todos os campos EXCETO o especificado
  function clearOtherErrors(currentField) {
    setErrors(prev => {
      const updated = { ...prev }
      for (const key in updated) {
        if (key !== currentField) updated[key] = ''
      }
      return updated
    })

    // Limpa timers dos outros campos
    for (const key in errorTimersRef.current) {
      if (key !== currentField) {
        clearTimeout(errorTimersRef.current[key])
        delete errorTimersRef.current[key]
      }
    }
  }

  // Efeito: fecha dropdown de estados ao clicar fora
  useEffect(() => {
    function onClick(e) {
      // Se clique NÃO foi na lista E NÃO foi no input de estado
      if (listaRef.current && !listaRef.current.contains(e.target) && e.target.id !== 'estado') {
        setListaAberta(false)
        setSelecao(-1)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Efeito: limpa timers quando componente desmonta
  useEffect(() => {
    return () => clearAllErrorTimers()
  }, [])

  // Função para validação sequencial: verifica campos anteriores antes do campo atual
  function checkSequencialAntes(campo) {
    // Percorre campos na ordem definida
    for (let key of ordem) {
      // Quando chega no campo atual, retorna true (tudo anterior OK)
      if (key === campo) return true
      // Valida campo anterior
      const err = validaCampo(key, form[key])
      // Se campo anterior tem erro
      if (err) {
        // Limpa todos os erros
        clearAllErrors()
        // Define erro no campo anterior
        setFieldError(key, err)
        // Mapeia nome do campo para ID do elemento HTML
        const idMap = {
          primeiroNome: 'primeironome',
          segundoNome: 'segundonome',
          email: 'email',
          cidade: 'cidade',
          estado: 'estado',
          cep: 'cep',
          termos: 'termos'
        }
        // Foca no campo com erro
        const el = document.getElementById(idMap[key])
        if (el) el.focus()
        return false
      }
    }
    return true
  }

  // Função de validação individual para cada campo
  function validaCampo(campo, valor) {
    // Validação específica para checkbox de termos
    if (campo === 'termos') return valor ? '' : 'É necessário aceitar os termos e condições'
    
    // Validação para campos obrigatórios
    if (!String(valor).trim()) return 'Não preenchido'
    
    // Validação de email com regex
    if (campo === 'email' && !emailRegex.test(valor)) return 'E-mail incorreto'
    
    // Validação de estado: verifica se existe na lista ESTADOS
    if (campo === 'estado') {
      const valido = ESTADOS.some(s => s.label.toLowerCase() === String(valor).toLowerCase())
      return valido ? '' : 'Estado incorreto'
    }
    
    return '' // Sem erro
  }

  // Handler para mudanças em qualquer campo do formulário
  function handleChange(field, value) {
    // Atualiza estado do formulário
    setForm(prev => ({ ...prev, [field]: value }))

    // Se campo tinha erro e agora está válido, limpa o erro
    if (errors[field]) {
      const errAgora = validaCampo(field, value)
      if (!errAgora) clearFieldError(field)
    }

    // Comportamento especial para campo 'estado'
    if (field === 'estado') {
      const q = String(value || '')
      // Se campo vazio, mostra todos os estados
      if (q.trim() === '') setFiltrados(ESTADOS)
      // Senão, filtra estados que contêm o texto digitado
      else setFiltrados(ESTADOS.filter(s => s.label.toLowerCase().includes(q.toLowerCase())))
      
      // Abre dropdown e reseta seleção
      setListaAberta(true)
      setSelecao(-1)
    }
  }

  // Handler para quando campo perde foco (onBlur)
  function handleBlur(field) {
    // Validação sequencial: verifica campos anteriores primeiro
    if (!checkSequencialAntes(field)) return
    
    // Valida campo atual
    const err = validaCampo(field, form[field])
    setFieldError(field, err)
    
    // Comportamento especial para campo 'estado'
    if (field === 'estado') {
      // Se valor corresponde a um estado válido, fecha dropdown
      const match = ESTADOS.find(s => s.label.toLowerCase() === String(form.estado).toLowerCase())
      if (match) setListaAberta(false)
    }
  }

  // Handler para envio do formulário (onSubmit)
  function handleSubmit(e) {
    e.preventDefault()
    
    // Validação final: percorre todos os campos na ordem
    for (let field of ordem) {
      const err = validaCampo(field, form[field])
      if (err) {
        // Se encontrar erro, limpa todos, mostra erro e foca no campo
        clearAllErrors()
        setFieldError(field, err)
        const idMap = {
          primeiroNome: 'primeironome',
          segundoNome: 'segundonome',
          email: 'email',
          cidade: 'cidade',
          estado: 'estado',
          cep: 'cep',
          termos: 'termos'
        }
        const el = document.getElementById(idMap[field])
        if (el) el.focus()
        return // Para execução (não envia formulário)
      }
    }

    // Se todos os campos válidos, limpa erros e notifica sucesso
    clearAllErrors()
    if (onCheckoutComplete) onCheckoutComplete()
  }

  // Função para selecionar um estado do dropdown
  function selecionarEstado(obj) {
    if (!obj) return
    // Atualiza formulário com label do estado selecionado
    setForm(prev => ({ ...prev, estado: obj.label }))
    setFiltrados([]) // Limpa lista filtrada
    setListaAberta(false) // Fecha dropdown
    setSelecao(-1) // Reseta seleção
    
    // Limpa erro do campo estado
    clearFieldError('estado')
    
    // Retorna foco para input de estado
    if (estadoInputRef.current) estadoInputRef.current.focus()
  }

  // Handler para teclas pressionadas no campo estado
  function handleKeyDownEstado(e) {
    // Se dropdown não está aberto ou não há opções, não faz nada
    if (!listaAberta || !filtrados.length) return

    // Navegação com setas do teclado
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      // Move seleção para baixo (não passa do último item)
      setSelecao(prev => {
        const next = prev < filtrados.length - 1 ? prev + 1 : filtrados.length - 1
        return next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      // Move seleção para cima (não passa do primeiro item)
      setSelecao(prev => {
        const next = prev > 0 ? prev - 1 : 0
        return next
      })
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (selecao !== -1) {
        // Seleciona item destacado
        e.preventDefault()
        selecionarEstado(filtrados[selecao])
      } else {
        // Se nada selecionado, fecha dropdown
        e.preventDefault()
        setListaAberta(false)
      }
    } else if (e.key === 'Escape') {
      // Fecha dropdown sem selecionar
      setListaAberta(false)
      setSelecao(-1)
    }
  }

  // Efeito para rolar dropdown quando seleção muda
  useEffect(() => {
    if (!listaRef.current) return
    if (selecao === -1) return
    
    // Obtém item selecionado
    const itens = listaRef.current.querySelectorAll('.lista-estado-item')
    const item = itens[selecao]
    if (!item) return
    
    const container = listaRef.current
    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.offsetHeight
    
    // Se item está acima da área visível, rola para cima
    if (itemTop < container.scrollTop) {
      container.scrollTop = itemTop
    } 
    // Se item está abaixo da área visível, rola para baixo
    else if (itemBottom > container.scrollTop + container.clientHeight) {
      container.scrollTop = itemBottom - container.clientHeight
    }
  }, [selecao])

  // Handler para quando campo estado recebe foco
  function handleFocusEstado() {
    // Mostra todos os estados e abre dropdown
    setFiltrados(ESTADOS)
    setListaAberta(true)
    setSelecao(-1)
  }

  return (
    <>
      {/* Formulário principal */}
      {/* noValidate: desabilita validação nativa do navegador */}
      <form className="cadastro" id="cadastro" onSubmit={handleSubmit} noValidate>
        <nav className="camposcliente">
          {/* Campo: Primeiro nome */}
          <span id="campoprimeironome" className={`input ${errors.primeiroNome ? 'error' : ''}`}>
            <label htmlFor="primeironome">Primeiro nome</label>
            <input
              id="primeironome"
              value={form.primeiroNome}
              onChange={e => handleChange('primeiroNome', e.target.value)}
              onBlur={() => handleBlur('primeiroNome')}
            />
            {/* Mensagem de erro (condicional) */}
            <div id="erroprimeironome" className={`errocadastro ${errors.primeiroNome ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.primeiroNome}</p>
            </div>
          </span>

          {/* Campo: Segundo nome */}
          <span id="camposegundonome" className={`input ${errors.segundoNome ? 'error' : ''}`}>
            <label htmlFor="segundonome">Segundo nome</label>
            <input
              id="segundonome"
              value={form.segundoNome}
              onChange={e => handleChange('segundoNome', e.target.value)}
              onBlur={() => handleBlur('segundoNome')}
            />
            <div id="errosegundonome" className={`errocadastro ${errors.segundoNome ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.segundoNome}</p>
            </div>
          </span>

          {/* Campo: Email com ícone */}
          <span id="campoemail" className={`input ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <div className="campoemail">
              <IconAt ariaLabel="Email" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
              />
            </div>
            <div id="erroemail" className={`errocadastro ${errors.email ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.email}</p>
            </div>
          </span>

          {/* Campo: Cidade */}
          <span id="campocidade" className={`input ${errors.cidade ? 'error' : ''}`}>
            <label htmlFor="cidade">Cidade</label>
            <input
              id="cidade"
              value={form.cidade}
              onChange={e => handleChange('cidade', e.target.value)}
              onBlur={() => handleBlur('cidade')}
            />
            <div id="errocidade" className={`errocadastro ${errors.cidade ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.cidade}</p>
            </div>
          </span>

          {/* Campo: Estado com autocomplete */}
          <span id="campoestado" className={`input ${errors.estado ? 'error' : ''}`} >
            <label htmlFor="estado">Estado</label>
              <input
                id="estado"
                ref={estadoInputRef}
                value={form.estado}
                onChange={e => handleChange('estado', e.target.value)}
                onFocus={handleFocusEstado}
                onBlur={() => handleBlur('estado')}
                onKeyDown={handleKeyDownEstado}
                placeholder="Selecione o estado"
                autoComplete="new-password"
                name="uf"
                data-lpignore="true"
              />
            {/* Seta decorativa */}
            <span className="seta" aria-hidden>&gt;</span>

            {/* Dropdown de estados (condicional) */}
            <div
              id="listaestados"
              ref={listaRef}
              style={{ display: listaAberta && filtrados.length ? 'block' : 'none' }}
              role="listbox"
              aria-labelledby="estado"
            >
              {filtrados.map((s, i) => (
                <div
                  key={s.value}
                  className={`lista-estado-item ${selecao === i ? 'selecionado' : ''}`}
                  onMouseDown={() => selecionarEstado(s)}
                  onMouseEnter={() => setSelecao(i)}
                >
                  {s.label}
                </div>
              ))}
            </div>

            <div id="erroestado" className={`errocadastro ${errors.estado ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.estado}</p>
            </div>
          </span>

          {/* Campo: CEP */}
          <span id="campocep" className={`input ${errors.cep ? 'error' : ''}`}>
            <label htmlFor="cep">CEP</label>
            <input
              id="cep"
              value={form.cep}
              onChange={e => handleChange('cep', e.target.value)}
              onBlur={() => handleBlur('cep')}
            />
            <div id="errocep" className={`errocadastro ${errors.cep ? 'mostrarerrocadastro' : ''}`}>
              <p className="errado">{errors.cep}</p>
            </div>
          </span>
        </nav>

        {/* Checkbox de termos e condições */}
        <nav>
          <span id="checkboxtermos" className={`input ${errors.termos ? 'error' : ''}`}>
            <span className="checkbox-wrapper" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <input
                id="termos"
                type="checkbox"
                checked={form.termos}
                onChange={e => handleChange('termos', e.target.checked)}
                onBlur={() => handleBlur('termos')}
              />
              <p>Aceito os termos e condições</p>

              {/* Mensagem de erro para termos (renderizada inline) */}
              {errors.termos && (
                <div className="errocadastro mostrarerrocadastro">
                  <p className="errado">{errors.termos}</p>
                </div>
              )}
            </span>
          </span>
        </nav>

        {/* Botão de envio */}
        <nav>
          <span className="enviar">
            <button id="enviar" type="submit">Enviar</button>
          </span>
        </nav>
      </form>
    </>
  )
}