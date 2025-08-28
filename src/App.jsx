import { matchPath, Route, Routes, useLocation } from "react-router-dom"
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
import EmailVerification from "./pages/EmailVerification"
import ForgotPassword from "./pages/ForgotPassword"
import MyProfile from "./pages/MyProfile"

const App = () => {

  const {introVideo,setIntroVideo,location,screenWidth} = useShopContext();

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
      }, screenWidth < 350 ? 5000 : 3000);
    }
    return () => clearTimeout(timer);
  }, [introVideo]);

  if (introVideo) {
    return <IntroVideo />;
  }


  return (
    <div className={`${matchPath(`/verify-email/:forgotPasswordTokenFromFrontend`, location.pathname) || location.pathname === `/forgot-password` ? `px-0` : `px-2 sm:px-4 md:px-6 lg:px-8`} bg-white min-h-screen flex flex-col justify-start lg:justify-between items-center text-nowrap`}>

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
        <Route path="/orders/:userId" element={<Orders />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/generate-otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:forgotPasswordTokenFromFrontend" element={<EmailVerification />} />
      </Routes>


      {/* footer */}
      <Footer />

    </div>
  )
}

export default App