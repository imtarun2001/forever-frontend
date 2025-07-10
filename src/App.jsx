import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/common/Navbar"
import Contact from "./pages/Contact"
import AdminPanel from "./pages/AdminPanel"
import Footer from "./components/common/Footer"

const App = () => {
  return (
    <div className="px-4 sm:px-[4vw] md:px-[5vw] lg:px-[6vw] bg-white min-h-screen flex flex-col justify-between items-center">

      {/* navbar */}
      <Navbar/>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/collection" element={<Collection/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/product/:productId" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
      </Routes>


      {/* footer */}
      <Footer/>
      
    </div>
  )
}

export default App