import { useEffect } from "react"
import { matchPath, Route, Routes } from "react-router-dom"
import Otp from "./pages/Otp"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Orders from "./pages/Orders"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import MyProfile from "./pages/MyProfile"
import Collection from "./pages/Collection"
import PlaceOrder from "./pages/PlaceOrder"
import VerifyStripe from "./pages/VerifyStripe"
import ForgotPassword from "./pages/ForgotPassword"
import EmailVerification from "./pages/EmailVerification"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import Searchbar from "./components/common/Searchbar"
import IntroVideo from "./components/common/IntroVideo"
import { useShopContext } from "./contexts/ShopContext"

const App = () => {

  const { introVideo, setIntroVideo, location } = useShopContext();

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
    <div className={`${matchPath(`/verify-email/:forgotPasswordTokenFromFrontend`, location.pathname) || location.pathname === `/forgotPassword` ? `px-0` : `px-2 sm:px-4 md:px-6 lg:px-8`} bg-white text-wrap min-h-screen flex flex-col justify-start lg:justify-between items-center`}>

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
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/generateOtp" element={<Otp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyEmail/:forgotPasswordTokenFromFrontend" element={<EmailVerification />} />
        <Route path="/verify" element={<VerifyStripe />} />
      </Routes>


      {/* footer */}
      <Footer />

    </div>
  )
}

export default App