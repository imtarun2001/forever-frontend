import { NavLink, useParams } from "react-router-dom"
import { useShopContext } from "../contexts/ShopContext";
import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";
import { assets } from "../assets/frontend_assets/assets";

const Product = () => {

  const {products,currency,quantity,setQuantity,increaseQuantity,decreaseQuantity} = useShopContext();

  const {productId} = useParams();

  const [product,setProduct] = useState(null);
  const [index,setIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await products.find(item => item._id === productId);
      setProduct(response);
    } catch (error) {
      console.log(err);    
    }
  };

  useEffect(() => {
    fetchProduct();
  },[productId]);

  useEffect(() => {
    setQuantity(1);
  },[productId]);

  return product ?
  <div className="w-full flex flex-col justify-start items-center gap-10">
    {/* top div */}


    {/* laptop : product left && phone : product top containing product images */}
    <div className="w-full py-5 flex flex-col sm:flex-row justify-center sm:justify-start bg-red-100 items-center gap-2.5 sm:gap-2.5">
      <div className="sm:w-[49%] flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-2.5">
        <img src={product.image[index]} alt="" className="w-[70%]"/>

        {/* all images of the products */}
        <div className="flex h-auto w-auto sm:flex-col justify-start items-center gap-2.5 overflow-x-scroll overflow-y-auto sm:overflow-x-auto sm:overflow-y-scroll">
          {
            product.image.length > 1 && product.image.map((img,i) => (
              <img key={i} src={img} alt="" className={`${index === i ? `w-20 sm:w-24` : `w-15 sm:w-20 hover:scale-110`}`} onClick={() => setIndex(i)}/>
            ))
          }
        </div>
      </div>

      {/* vertical line for laptop */}
      <p className="sm:h-[65vh] sm:border-2 border-black"></p>

      {/* laptop : product left && phone : product top containing product details */}
      <div className="sm:w-[49%] flex flex-col justify-start items-start sm:text-nowrap gap-2.5 px-2.5 sm:px-0">
        <p className="font-semibold sm:font-medium text-xl sm:text-2xl">{product.name}</p>
        <p className="text-lg sm:text-2xl">{currency + '' + product.price}</p>
        <div className="flex justify-center items-center gap-1">
          {
            [1,2,3,4,5].map(ele => (
              ele !== 5 ?
              <img src={assets.star_icon} alt="" className="w-4"/>
              :
              <img src={assets.star_dull_icon} alt="" className="w-4"/>
            ))
          }
          <p>(1,285)</p>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button onClick={decreaseQuantity} className="text-4xl font-bold cursor-pointer">-</button>
          <p className="text-xl font-bold">{quantity}</p>
          <button onClick={increaseQuantity} className="text-3xl font-bold cursor-pointer">+</button>
        </div>
        <button className="text-lg font-semibold border border-black rounded cursor-pointer bg-red-300 text-black hover:text-white hover:bg-red-400 py-1.5 px-2.5">Add to Cart</button>
      </div>
    </div>



    {/* bottom div */}
    <div className="w-full flex justify-start items-start gap-4 overflow-x-scroll">
      {
        products.map((item) => (
          item.category === product.category &&
          <NavLink to={`/product/${item._id}`} key={item._id} className="bg-gray-300 flex flex-col justify-start items-center gap-2.5 rounded text-nowrap p-2">
            <img src={item.image[0]} alt="" className="w-15"/>
            <p className="text-lg font-semibold">{item.name.slice(0,10)}</p>
            <p className="text-sm font-light">{currency +''+item.price}</p>
          </NavLink>
        ))
      }
    </div>

  </div>
    :
    <Spinner/>
}

export default Product