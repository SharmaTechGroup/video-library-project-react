import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

import App from './App.tsx'
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
       <App />
    </CookiesProvider>
  </StrictMode>,
)
