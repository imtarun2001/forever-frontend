import { useEffect, useState } from "react";
import { useShopContext } from "../../contexts/ShopContext"
import Product from "../common/Product";
import Title from "../common/Title";

const LatestCollection = () => {
    const {products} = useShopContext();
    const [latestCollection,setLatestCollection] = useState([]);

    useEffect(() => {
        setLatestCollection(products.slice(0,10));
    },[]);

  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Discover the latest arrivals in our exclusive collection. Handpicked styles that elevate your everyday look.
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestCollection.map((product) => <Product key={product._id} product={product}/>)
            }
        </div>
    </div>
  )
}

export default LatestCollection