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
            duration: 2000,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "0.95rem",
              fontWeight: 500,
              boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
            },
            success: {
              style: {
                background: "#ECFDF5",
                color: "#065F46",
                border: "1px solid #A7F3D0",
              }
            },
            error: {
              style: {
                background: "#FEF2F2",
                color: "#991B1B",
                border: "1px solid #FCA5A5",
              }
            },
          }
        } />
      </UserContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
)
