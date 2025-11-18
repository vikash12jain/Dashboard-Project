import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './Context/LoadingProvider.jsx'
import { EcomProvider } from './Context/EcomProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <LoadingProvider>
      <EcomProvider>
          <App />
      </EcomProvider>
        </LoadingProvider>
    </BrowserRouter>
    <Toaster position='bottom-right' reverseOrder={false} />
  </StrictMode>,
)
