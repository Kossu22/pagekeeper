import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import ShelfProvider from './context/ShelfProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ShelfProvider>
      <App />
      </ShelfProvider>
    </HashRouter>
  </StrictMode>,
)
