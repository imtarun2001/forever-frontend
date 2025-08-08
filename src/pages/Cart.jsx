import { useEffect, useState } from "react";
import { useShopContext } from "../contexts/ShopContext"
import Title from "../components/common/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/cartPage/CartTotal";

const Cart = () => {

  const {products,currency,cartProducts,updateCart,subTotal,setSubTotal} = useShopContext();

  const [cartItems,setCartItems] = useState([]);  // cartProducts is an object and this cartItems is an array. We are creating this to map each cart item in our cart page

  useEffect(() => {
    let tempData = [];
    let tempSubTotal = 0;
    for(const itemId in cartProducts) {
      for(const size in cartProducts[itemId]) {
        if(cartProducts[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartProducts[itemId][size]
          });
          const product = products.find(p => p._id === itemId);   // to calculate the subtotal of cart
          if(product) {
            tempSubTotal += product.price * cartProducts[itemId][size];
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
                {/* image of product */}
                <Link to={`/product/${product._id}`} className="w-1/3 sm:w-1/6 flex items-center justify-center"><img src={product.image[0]} alt="" className="w-full"/></Link>

                {/* details of product */}
                <div className="sm:w-3/5 flex flex-col gap-2 justify-center items-start">
                  <p className="text-xs sm:text-xl text-red-600">{product.name}</p>
                  <p>Size : <span className="font-extrabold">{item.size}</span></p>
                  <p>{currency +''+ product.price}</p>
                  <input onChange={(event) => updateCart(item._id,item.size,event.target.value === '' || event.target.value === '0' ? null : Number(event.target.value))} type="number" name="quantity" id="qnty" defaultValue={item.quantity} min={1} max={10} className="border rounded w-1/8 outline-none text-center"/>
                </div>

                {/* remove button */}
                <button onClick={() => updateCart(item._id,item.size,0)} className=" cursor-pointer hover:bg-red-200 active:bg-red-500 hover:font-semibold sm:py-1.5 sm:px-2.5 outline-none sm:border sm:rounded sm:flex justify-center items-center gap-2"><span className="hidden sm:block">Remove</span><img src={assets.bin_icon} alt="" className="w-4"/></button>
              </div>
            )
          })
        }
      </div>





      {/* -----------------------------cart total---------------------------- */}
      <div className="w-full flex justify-center sm:justify-end items-center">
        <CartTotal button={true} width={true}/>
      </div>

    </div>
    :
    <div className="h-[50vh] flex justify-center items-center animate-pulse">
      <Title text1={'Your cart🛒'} text2={'is empty'}/>
    </div>
  )
}

export default Cart