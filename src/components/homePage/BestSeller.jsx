import { useEffect, useState } from "react";
import { useShopContext } from "../../contexts/ShopContext"
import Title from "../common/Title"
import Product from "../common/Product";

const BestSeller = () => {

    const {products} = useShopContext();
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter(product => product.bestseller);
        setBestSeller(bestProducts.slice(0,5));
    },[]);

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                These customer favorites are making waves. Don’t miss out on the items everyone’s talking about!
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestSeller.map((product) => <Product key={product._id} product={product}/>)
            }
        </div>
    </div>
  )
}

export default BestSeller