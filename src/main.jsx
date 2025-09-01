import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ShopContextProvider } from './contexts/ShopContext.jsx'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <UserContextProvider>
        <App />
        <Toaster toastOptions={
          {
            duration: 3000,
            style: {
              borderRadius: "6px",
              padding: "12px 16px",
              fontSize: "0.95rem",
              fontWeight: 500,
            },
            success: {
              style: {
                color: "#065F46",
              }
            },
            error: {
              style: {
                color: "#991B1B",
              }
            },
          }
        } />
      </UserContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
)
