import { toast } from "react-toastify";
import { useShopContext } from "../../contexts/ShopContext"
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const RelatedProducts = ({category,subCategory}) => {

    const {currency,products,relatedProducts,setRelatedProducts} = useShopContext();

    const fetchRelatedProducts = async () => {
        try {
            if(products.length > 0) {
                let productsCopy = [...products];
                if(category) productsCopy = productsCopy.filter(item => item.category === category);
                if(subCategory) productsCopy = productsCopy.filter(item => item.subCategory === subCategory);
                setRelatedProducts(productsCopy.slice(0,5));
            }
        } catch (error) {
            toast.error('Error while fetching related products');
        }
    };

    useEffect(() => {
        fetchRelatedProducts();
    },[products]);

  return (
    <div className="w-full flex justify-start sm:justify-between items-center gap-2 overflow-x-scroll p-2.5">
        {
            relatedProducts.map((item) => (
                <NavLink to={`/product/${item._id}`} key={item._id} className="bg-gray-100 w-[60%] lg:w-[30%] flex flex-col justify-start items-start gap-2.5 rounded text-nowrap p-5 sm:p-2">
                    <div className="flex items-center justify-center">
                        <img src={item.image[0]} alt="" className="w-full sm:w-[80%]"/>
                    </div>
                    <p className="text-lg font-semibold">{item.name.slice(0,10)}</p>
                    <p className="text-sm font-light">{currency +''+item.price}</p>
                </NavLink>
            ))
        }
    </div>
  )
}

export default RelatedProducts