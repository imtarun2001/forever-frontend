import { Link } from "react-router-dom";
import { useShopContext } from "../../contexts/ShopContext"

const Product = ({ product }) => {

  const { currency } = useShopContext();

  return (
    <Link to={`/product/${product._id}`} className="text-gray-700 cursor-pointer flex flex-col justify-start items-center ">
      <div className="overflow-hidden">
        <img src={product.images[0]} alt="" className="hover:scale-110 w-40 transition ease-in-out" />
      </div>
      <div className="font-bold pt-3 pb-1">{`${currency} ${product.price}`}</div>
      <div className="font-medium text-sm text-wrap text-center sm:text-justify">{product.name}</div>
    </Link>
  )
}

export default Product