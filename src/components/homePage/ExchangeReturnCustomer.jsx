import { assets } from "../../assets/frontend_assets/assets"

const ExchangeReturnCustomer = () => {
  return (
    <div className="my-10 flex flex-col sm:flex-row justify-around items-center bg-white shadow shadow-black sm:shadow-none sm:mt-10 py-5 sm:py-10 px-5 sm:px-0 gap-10 sm:gap-20 rounded-2xl sm:rounded-none">
        {/* exchange policy */}
        <div className="flex flex-col justify-center items-center gap-1">
            <img src={assets.exchange_icon} alt="" className="w-12.5 mb-2.5"/>
            <p className="font-bold">Easy Exchange Policy</p>
            <p className="font-light text-gray-400 text-center">We offer hassle free exchange policy</p>
        </div>
        
        {/* return policy */}
        <div className="flex flex-col justify-center items-center gap-1">
            <img src={assets.quality_icon} alt="" className="w-12.5 mb-2.5"/>
            <p className="font-bold">7 Days Return Policy</p>
            <p className="font-light text-gray-400 text-center">We provide 7 days free return policy</p>
        </div>

        {/* customer support */}
        <div className="flex flex-col justify-center items-center gap-1">
            <img src={assets.support_img} alt="" className="w-12.5 mb-2.5"/>
            <p className="font-bold">Best Customer Support</p>
            <p className="font-light text-gray-400 text-center">we provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default ExchangeReturnCustomer