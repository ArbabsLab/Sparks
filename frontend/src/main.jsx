// React and DOM imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

// Application imports
import App from './App.jsx'
import './index.css'

// Initialize root element
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

// Render application
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
