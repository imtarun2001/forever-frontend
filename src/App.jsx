import { Route, Routes, useLocation } from "react-router-dom"
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
import Footer from "./components/common/Footer"
import Searchbar from "./components/common/Searchbar"
import IntroVideo from "./components/common/IntroVideo"
import { useEffect } from "react"
import Otp from "./pages/Otp"
import { useShopContext } from "./contexts/ShopContext"

const App = () => {

  const location = useLocation();
  const {introVideo,setIntroVideo} = useShopContext();

  useEffect(() => {
    if (location.pathname === "/") {
      setIntroVideo(true);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (introVideo) {
      timer = setTimeout(() => {
        setIntroVideo(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [introVideo]);

  if (introVideo) {
    return <IntroVideo />;
  }


  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 bg-white min-h-screen flex flex-col justify-start lg:justify-between items-center text-nowrap">

      {/* navbar */}
      <Navbar />

      {/* searchbar */}
      <Searchbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/generate-otp" element={<Otp />} />
      </Routes>


      {/* footer */}
      <Footer />

    </div>
  )
}

export default App