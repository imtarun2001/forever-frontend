import { assets } from "../../assets/frontend_assets/assets"

const ExchangeReturnCustomer = () => {

  const arr = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "We offer hassle free exchange policy"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "We provide 7 days free return policy"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "we provide 24/7 customer support"
    }
  ]

  return (
    <div className="my-10 flex flex-col sm:flex-row justify-around items-center bg-white shadow shadow-black sm:shadow-none sm:mt-10 py-5 sm:py-10 px-5 sm:px-0 gap-10 sm:gap-20 rounded-2xl sm:rounded-none">
      {
        arr.map((ele, index) => (
          <div key={index} className="flex flex-col justify-center items-center gap-1">
            <img src={ele.icon} alt="" className="w-12.5 mb-2.5" />
            <p className="font-bold">{ele.title}</p>
            <p className="font-light text-gray-400 text-center">{ele.desc}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ExchangeReturnCustomer