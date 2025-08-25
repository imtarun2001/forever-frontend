import { useShopContext } from "../contexts/ShopContext"
import Title from "../components/common/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/cartPage/CartTotal";
import Spinner from "../components/common/Spinner";

const Cart = () => {

  const { products, currency, cartProducts, loading, updateCart, screenWidth } = useShopContext();





  return loading ? <Spinner />
    :
    (
      <div className="w-full border-t pt-10 flex flex-col items-start justify-center gap-5 mb-10">


        {/* -------------------------------my cart----------------------------- */}
        <Title text1={'MY'} text2={'CART'} />

        {
          cartProducts.flatMap((item) => {
            const product = products.find((product) => product._id === item[0]);
            if (!product) {
              return (
                <div key={item[0]} className="h-[50vh] flex justify-center items-center animate-pulse">
                  <Title text1={'Your cart🛒'} text2={'is empty'} />
                </div>
              )
            }
            return Object.keys(item[1]).map((size,index) => (
              <div key={index} className="w-full flex p-2.5 border-b border-gray-500">
                {/* image of product */}
                <Link to={`/product/${product._id}`} className="w-1/3 sm:w-1/9 flex items-center justify-center"><img src={product.images[0]} alt="" className="w-full" /></Link>

                {/* details of product */}
                <div className="w-2/3 sm:w-8/9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 p-2.5">
                  <div className="flex flex-col justify-center items-start gap-2">
                    <p className="sm:text-xl text-pink-800 text-wrap">{product.name}</p>
                    <p>Size : <span className="font-extrabold">{size}</span></p>
                    <p>{currency + '' + product.price}</p>
                    <input onChange={(event) => updateCart(item[0], size, event.target.value === '' || event.target.value === '0' ? null : Number(event.target.value))} type="number" name="quantity" defaultValue={item[1][size]} min={1} max={10} className="border rounded outline-none text-center" />
                  </div>

                  <button onClick={() => updateCart(item[0], size, 0)} className="w-1/2 sm:w-1/6 cursor-pointer hover:bg-pink-200 active:bg-pink-500 hover:font-semibold py-1.5 px-2.5 outline-none border rounded flex justify-center items-center gap-2"><span className={`text-sm ${screenWidth < 315 ? `hidden` : `block`}`}>Remove</span><img src={assets.bin_icon} alt="" className="w-4" /></button>
                </div>
              </div>
            )
            )
          })
        }


        {/* -----------------------------cart total---------------------------- */}
        <div className="w-full flex justify-center sm:justify-end items-center">
          <CartTotal button={true} width={true} />
        </div>

      </div>
    )
}

export default Cart