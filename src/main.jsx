import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopContextProvider } from './contexts/ShopContext.jsx'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { UserContextProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <UserContextProvider>
        <App />
        <Toaster />
      </UserContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
)
