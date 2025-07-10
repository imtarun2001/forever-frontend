import { useEffect, useState } from "react"
import { assets } from "../../assets/frontend_assets/assets"

const Hero = () => {

    const [whiteBackground,setWhiteBackground] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setWhiteBackground(prev => !prev);
        },6000);
        return () => clearInterval(interval);
    },[]);

  return (
    <div className="flex relative my-10">
        <div className={`w-0 h-0 absolute sm:h-full sm:w-full ${whiteBackground ? 'bg-black' : 'bg-[#FFD6D6]'} bottom-5 right-5 transition-all duration-1000`}></div>
        <div className={`w-0 h-0 absolute sm:h-full sm:w-full ${whiteBackground ? 'bg-[#FFD6D6]' : 'bg-black'} top-5 left-5 transition-all duration-1000`}></div>
        <div className="flex flex-col sm:flex-row relative">
            
            {/* hero left */}
            <div className={`w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 border border-gray-300 ${whiteBackground ? 'bg-white' : 'bg-black'} transition-all duration-1000`}>
                <div className={`${whiteBackground ? 'text-[#414141]' : 'text-[#FFD6D6]'} transition-all duration-300`}>
                    <div className="flex items-center justify-start gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-sm md:text-base">OUR BEST SELLER</p>
                    </div>
                    <div className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-12">Latest Arrivals</div>
                    <div className="flex items-center justify-end gap-2">
                        <p className="font-semibold text-sm md:text-base">Shop Now</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            {/* hero right */}
            <img src={assets.hero_img} alt="" className="w-full sm:w-1/2 order-1"/>
        </div>
    </div>
  )
}

export default Hero