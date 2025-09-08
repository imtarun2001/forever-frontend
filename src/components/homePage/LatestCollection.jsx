import { useShopContext } from "../../contexts/ShopContext"
import Product from "../common/Product";
import Spinner from "../common/Spinner";
import Title from "../common/Title";

const LatestCollection = () => {
    const { loading, products } = useShopContext();

    return loading ? <Spinner/> : (
        <div className="my-10 w-full flex flex-col justify-center items-center">
            <Title text1={"LATEST"} text2={"COLLECTIONS"} center={true} desc={'Discover the latest arrivals in our exclusive collection. Handpicked styles that elevate your everyday look.'} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    products?.slice(0, 10).map((product) => <Product key={product._id} product={product} />)
                }
            </div>
        </div>
    )
}

export default LatestCollection