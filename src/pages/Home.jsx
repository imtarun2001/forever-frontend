import Hero from "../components/homePage/Hero"
import LatestCollection from "../components/homePage/LatestCollection"
import BestSeller from "../components/homePage/BestSeller"
import ExchangeReturnCustomer from "../components/homePage/ExchangeReturnCustomer"
import SubscribeNow from "../components/homePage/SubscribeNow"

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <ExchangeReturnCustomer />
      <SubscribeNow />
    </div>
  )
}

export default Home