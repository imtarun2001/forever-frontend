import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopContextProvider } from './contexts/ShopContext.jsx'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App/>
      <Toaster/>
    </ShopContextProvider>
  </BrowserRouter>
)
