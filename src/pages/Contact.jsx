import { assets } from "../assets/frontend_assets/assets"
import Title from "../components/common/Title"
import SubscribeNow from "../components/homePage/SubscribeNow"

const Contact = () => {
  return (
    <div className="w-10/12 flex flex-col justify-start items-center gap-10 pt-10">
      <Title text1={'contact'} text2={'us'}/>

      {/* our store */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10">
        <img src={assets.contact_img} alt="" className="w-full sm:w-1/2"/>

        <div className="flex flex-col justify-center items-start gap-5">
          <p className="text-lg font-semibold text-gray-600">Our Store</p>
          <div className="flex flex-col text-gray-500">
            <p>54709 Williams Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div className="flex flex-col text-gray-500">
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
          <p className="text-lg font-semibold text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="p-3 flex justify-center items-center text-sm border cursor-pointer hover:bg-black hover:text-white transition-colors delay-150">Explore Jobs</button>
        </div>
      </div>

      {/* subscribe */}
      <SubscribeNow/>
    </div>
  )
}

export default Contact