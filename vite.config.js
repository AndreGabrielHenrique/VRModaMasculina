// Caminho: vite.config.js
// Arquivo de configuração do Vite (ferramenta de build/desenvolvimento)

// Importa a função defineConfig do Vite
import { defineConfig } from 'vite'
// Importa o plugin do React para Vite
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Exporta a configuração padrão
export default defineConfig({
  plugins: [react()],  // Habilita o plugin do React
  base: './',           // Caminho base para assets (relativo ao diretório atual)

  // Configurar entrada múltipla para incluir legacy/index.html
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        legacy: resolve(__dirname, 'legacy/index.html')
      }
    }
  }
})