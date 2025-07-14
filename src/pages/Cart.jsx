import { useEffect, useState } from "react";
import { useShopContext } from "../contexts/ShopContext"
import Title from "../components/common/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {

  const {products,delivery_fee,currency,cartProducts} = useShopContext();

  const [cartItems,setCartItems] = useState([]);
  const [subTotal,setSubTotal] = useState(0);

  useEffect(() => {
    let tempData = [];
    let tempSubTotal = 0;
    for(const items in cartProducts) {
      for(const size in cartProducts[items]) {
        if(cartProducts[items][size] > 0) {
          const product = products.find(p => p._id === items);
          if(product) {
            tempSubTotal += product.price * cartProducts[items][size];
            tempData.push({
              _id: items,
              size: size,
              quantity: cartProducts[items][size]
            });
          }
        }
      }
    }
    setCartItems(tempData);
    setSubTotal(tempSubTotal);
  },[cartProducts]);

  return (
    cartItems.length > 0 ?
    <div className="w-full border-t pt-10 flex flex-col items-start justify-center gap-7 mb-10">


      {/* -------------------------------my cart----------------------------- */}
      <Title text1={'MY'} text2={'CART'}/>

      <div className="w-full flex flex-col justify-start items-center">
        {
          cartItems.map((item,index) => {
            const product = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="w-full flex justify-between items-center p-2.5 sm:px-10 border-b border-gray-500">
                <Link to={`/product/${product._id}`} className="w-[30%] sm:w-[10%] flex items-center justify-center"><img src={product.image[0]} alt="" className="w-full"/></Link>
                <div className="flex flex-col gap-2 justify-center items-start">
                  <p className="text-xs sm:text-xl text-emerald-600">{product.name}</p>
                  <p>Size : <span className="font-extrabold">{item.size}</span></p>
                  <p>{currency +''+ product.price}</p>
                  <div className="flex justify-center items-center gap-2.5">
                    <button className="text-xl sm:text-2xl cursor-pointer">-</button>
                    <span>{item.quantity}</span>
                    <button className="text-xl sm:text-2xl cursor-pointer">+</button>
                  </div>
                </div>
                <button className=" cursor-pointer hover:bg-emerald-600 hover:text-white hover:border sm:py-1.5 sm:px-2.5 outline-none sm:border sm:rounded sm:flex justify-center items-center gap-2"><span className="hidden sm:block">Remove</span><img src={assets.bin_icon} alt="" className="w-4"/></button>
              </div>
            )
          })
        }
      </div>





      {/* -----------------------------cart total---------------------------- */}
      <div className="w-full flex justify-center sm:justify-end items-center">
        <div className="p-10 border rounded-xl flex flex-col justify-center items-center gap-2.5">
          <div className="w-full flex justify-start items-center"><Title text1={'CART'} text2={'TOTALS'}/></div>
          <div className="w-full flex justify-between items-center py-1.5">
            <div>Subtotal :</div><div>{currency + '' + subTotal}</div>
          </div>
          <div className="w-full flex justify-between items-center py-1.5">
            <div>Shipping Fee :</div><div>{currency + '' + delivery_fee}</div>
          </div>
          <div className="w-full flex justify-between items-center border-b-2 py-1.5">
            <div className="font-bold">Total :</div><div className="font-bold">{`${currency} ${delivery_fee + subTotal}`}</div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="px-10 py-2 rounded border bg-emerald-500 font-bold">CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
    :
    <div className="h-[50vh] flex justify-center items-center animate-pulse">
      <Title text1={'Your cart🛒'} text2={'is empty'}/>
    </div>
  )
}

export default Cart