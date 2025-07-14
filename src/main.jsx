import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopContextProvider } from './contexts/ShopContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App/>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        theme="dark"/>
    </ShopContextProvider>
  </BrowserRouter>
)
