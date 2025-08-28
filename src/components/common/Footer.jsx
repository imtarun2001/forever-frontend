import { matchPath } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets"
import { useShopContext } from "../../contexts/ShopContext"

const Footer = () => {

    const { location } = useShopContext();

    return (
        <div className={`${matchPath(`/verify-email/:forgotPasswordTokenFromFrontend`, location.pathname) || location.pathname === `/forgot-password` ? `hidden` : ``}`}>

            <div className="w-full mt-10 mb-1 flex flex-col md:flex-row justify-between items-start md:gap-12">
                {/* logo n text */}
                <div className="flex-1 flex flex-col justify-center items-start gap-5 mb-5 md:mb-0">
                    <img src={assets.logo} alt="" className="w-32" />
                    <p className="w-full md:w-2/3 text-gray-600 text-xs sm:text-sm text-justify">
                        Forever is where timeless design meets modern living. From curated collections to everyday essentials, we bring you pieces that are made to last — inspired by beauty, crafted for life.
                    </p>
                </div>

                {/* company n get in touch */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-20">

                    {/* company */}
                    <div className="flex-1 flex flex-col justify-start items-start gap-2.5">
                        <div className="text-lg sm:text-xl font-medium uppercase sm:mb-2">Company</div>
                        <div className="flex flex-col justify-start items-start">
                            {['Home', 'About us', 'Delivery', 'Privacy Policy'].map((ele) => (
                                <span key={ele} className="text-gray-600 text-sm">{ele}</span>
                            ))}
                        </div>
                    </div>

                    {/* get in touch */}
                    <div className="flex-1 flex flex-col justify-start items-start gap-2.5">
                        <div className="text-lg sm:text-xl font-medium uppercase sm:mb-2">Get in Touch</div>
                        <div className="flex flex-col justify-start items-start">
                            {['+1-000-000-0000', 'admin@forever.com'].map((ele) => (
                                <span key={ele} className="text-gray-600 text-sm">{ele}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* copyright */}
            <div className="mt-10">
                <hr className="text-gray-200" />
                <p className="py-5 text-sm text-center">
                    Copyright 2025 @Tarun🤍Forever🛍️ - All Right Reserved.
                </p>
            </div>
        </div>

    )
}

export default Footer