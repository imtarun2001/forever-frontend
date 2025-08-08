import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Title from "../components/common/Title";
import Spinner from "../components/common/Spinner";
import { useShopContext } from "../contexts/ShopContext";
import ProductImages from "../components/productPage/ProductImages";
import ProductDetails from "../components/productPage/ProductDetails";
import RelatedProducts from "../components/productPage/RelatedProducts";
import DescriptionAndReviews from "../components/productPage/DescriptionAndReviews";

const Product = () => {

  const {products} = useShopContext();

  const {productId} = useParams();

  const [product,setProduct] = useState(null);

  const fetchProducts = () => {
    try {
      const response = products.find(item => item._id === productId);
      setProduct(response);
    } catch (error) {
      console.log(error);    
      toast.error('error while fetching product');    
    }
  };

  useEffect(() => {
    fetchProducts();
  },[productId,products]);

  return product ?
  
  <div className="w-full md:min-h-[70vh] flex flex-col justify-center items-center gap-10">

    {/* ------------------------------top div------------------------------- */}
    <div className="w-full py-5 flex flex-col lg:flex-row justify-center items-center gap-2.5">
      
      {/* -----------------------------------laptop : product left && phone : product top containing product images--------------------------------- */}
      <ProductImages product={product}/>

      {/* -------------------------vertical line for laptop-------------------------------- */}
      <p className="hidden lg:block h-[80vh] border border-red-100"></p>

      {/* -------------------------laptop : product right && phone : product mid containing product details---------------------- */}
      <ProductDetails product={product}/>

    </div>

    {/* ------------------------descripton and review------------------------ */}
    <DescriptionAndReviews/>



    
    {/* --------------------product bottom containing products of same category as of the product--------------------- */}
    <Title text1={'RELATED'} text2={'PRODUCTS'}/>
    <RelatedProducts category={product.category} subCategory={product.subCategory}/>




  </div>

  :

  <Spinner/>
}

export default Product