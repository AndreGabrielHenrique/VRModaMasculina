import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Load new modular SASS
import './styles/style.sass'
// Legacy CSS import removed — migrating rules into SASS

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
