// src\components\ErrorBoundary.jsx
// Componente Error Boundary para capturar erros JavaScript em componentes filhos
// Exibe uma interface de fallback amigável ao invés de quebrar toda a aplicação

import React from 'react'

// Classe ErrorBoundary (não pode ser função porque precisa de lifecycle methods)
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    // Estado inicial: sem erro
    this.state = { hasError: false, error: null }
  }

  // Método estático que é chamado quando um erro é lançado em um componente filho
  // Atualiza o estado para indicar que houve um erro
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  // Método de lifecycle chamado após um erro ser capturado
  // Útil para logging de erros (envio para serviço de monitoramento, etc.)
  componentDidCatch(error, info) {
    // Registra erro no console (para debug durante desenvolvimento)
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    // Se houve erro, renderiza UI de fallback
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: '#fff0f0', color: '#600', borderRadius: 8 }}>
          <strong>Ocorreu um erro no componente.</strong>
          {/* Exibe mensagem de erro (convertida para string) */}
          <div style={{ marginTop: 8, fontSize: 13, whiteSpace: 'pre-wrap' }}>
            {String(this.state.error)}
          </div>
          {/* Instrução para desenvolvedores/usuários técnicos */}
          <div style={{ marginTop: 8, fontSize: 13 }}>Abra o console do navegador para ver o stack.</div>
        </div>
      )
    }
    // Se não houve erro, renderiza filhos normalmente
    return this.props.children
  }
}