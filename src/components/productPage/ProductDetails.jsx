import { assets } from "../../assets/frontend_assets/assets";
import { useShopContext } from "../../contexts/ShopContext"
import { IoIosArrowBack } from "react-icons/io";


const ProductDetails = ({product}) => {

    const {currency,selectedSize,setSelectedSize,addToCart} = useShopContext();

  return (
    <div className="lg:w-[60%] flex flex-col justify-center items-center lg:items-start sm:text-nowrap gap-2.5 sm:gap-7 lg:gap-5 px-2.5 lg:px-0">
        <p className="w-full sm:w-2/3 lg:w-full text-center lg:text-justify font-semibold sm:font-medium text-xl sm:text-2xl">{product.name}</p>
        <p className="w-full sm:w-2/3 lg:w-full italic text-xs sm:text-base text-wrap text-center lg:text-justify">{product.description}</p>
        <p className="text-lg sm:text-2xl">{currency + '' + product.price}</p>
        <div className="flex justify-center items-center gap-1">
          {
            [1,2,3,4,5].map(ele => (
              ele !== 5 ?
              <img key={ele} src={assets.star_icon} alt="" className="w-4"/>
              :
              <img key={ele} src={assets.star_dull_icon} alt="" className="w-4"/>
            ))
          }
          <p>(1,285)</p>
        </div>
        <div className="flex justify-center items-center gap-2.5">
          {
            product.sizes.map((size) => (
              <span className={`rounded border w-[2rem] py-1 text-center font-semibold cursor-pointer hover:scale-105 text-white ${selectedSize === size ? `bg-gray-800` : `bg-gray-500`}`} key={size} onClick={() => setSelectedSize(size)}>{size}</span>
            ))
          }
        </div>
        <button className="text-lg font-semibold border border-black rounded cursor-pointer bg-red-300 text-black hover:text-white hover:bg-red-400 py-1.5 px-2.5" onClick={() => addToCart(product._id,selectedSize)}>Add to Cart</button>
        <hr className="w-full"/>
        <div className="w-full flex flex-col justify-center items-center lg:items-end gap-1.5 text-center lg:text-justify text-nowrap">
            {
                ['100% Original product','Cash on delivery is available on this product','Easy return and exchange policy within 7 days'].map((ele,index) => (
                    <p key={index} className="flex justify-center items-center">{ele}<IoIosArrowBack className="hidden lg:block"/></p>
                ))
            }
        </div>
    </div>
  )
}

export default ProductDetails