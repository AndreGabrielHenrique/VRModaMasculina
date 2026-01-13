// Caminho: vite.config.js
// Arquivo de configuração do Vite (ferramenta de build/desenvolvimento)

// Importa a função defineConfig do Vite
import { defineConfig } from 'vite'
// Importa o plugin do React para Vite
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy' // Importe o plug-in

// Exporta a configuração padrão
export default defineConfig({
  plugins: [
    react(),  // Habilita o plugin do React
    // Configure o plug-in para copiar as imagens
    viteStaticCopy({
      targets: [
        {
          src: 'src/components/Imagens/*', // Origem das imagens
          dest: 'legacy/Imagens'           // Destino dentro de 'dist/'
        },
        {
          src: 'Icones/*',                 // Origem do favicon
          dest: 'legacy/Icones'            // Destino dentro de 'dist/'
        },
        {
          src: 'legacy/*',  // Copia TODOS os arquivos da pasta legacy
          dest: 'legacy'
        }
      ]
    })
  ],
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