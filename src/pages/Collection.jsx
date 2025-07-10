import { useEffect, useState } from "react"
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/common/Title";
import { useShopContext } from "../contexts/ShopContext";
import Product from "../components/common/Product";

const Collection = () => {

  const {products} = useShopContext();

  const [activeFilter,setActiveFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState(products);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);

  
  const toggleCategory = (event) => {
    category.includes(event.target.value) ?
    setCategory(prev => prev.filter(item => item !== event.target.value))
    :
    setCategory(prev => [...prev,event.target.value]);
  }
  const toggleSubCategory = (event) => {
    subCategory.includes(event.target.value) ?
    setSubCategory(prev => prev.filter(item => item !== event.target.value))
    :
    setSubCategory(prev => [...prev,event.target.value]);
  }
  const applyFilter = () => {
    let productsCopy = [...products];
    if(category.length > 0) productsCopy = productsCopy.filter(item => category.includes(item.category));
    if(subCategory.length > 0) productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    return setFilterProducts(productsCopy);
  }
  
  const sortByPriceLowToHigh = () => setFilterProducts([...filterProducts].sort((a,b) => a.price - b.price));
  const sortByPriceHighToLow = () => setFilterProducts([...filterProducts].sort((a,b) => b.price - a.price));
  

  useEffect(() => {
    applyFilter();
  },[category,subCategory]);

  return (
    <div className="w-full border-t py-10 border-gray-200 flex flex-col sm:flex-row justify-between items-start gap-5 relative">

      {/* filters */}
      <div className="w-full sm:w-1/4 flex flex-col justify-center items-start gap-5 sm:order-2 sm:sticky sm:top-25 transition-all duration-500">

        {/* filter button */}
        <div className="flex justify-center items-center gap-2">
          <p className="text-xl text-black" onClick={() => setActiveFilter(prev => !prev)}>FILTERS</p>
          <img src={assets.dropdown_icon} alt="" className={`w-2 sm:hidden ${activeFilter ? 'rotate-90' : 'rotate-0'} transition duration-500 cursor-pointer`} onClick={() => setActiveFilter(prev => !prev)}/>
        </div>

        {/* sort button */}
        <select name="sortBy" id="sortBy" className={`sm:py-2.5 sm:w-full sm:border sm:border-gray-300 sm:h-auto outline-none rounded-none ${activeFilter ? 'border border-gray-300 w-1/2 h-auto' : 'w-0 h-0'}`}
        onChange={(event) => {
          const value = event.target.value;
          if(value === 'low-high') sortByPriceLowToHigh();
          else if(value === 'high-low') sortByPriceHighToLow();
          else setFilterProducts(products);
        }}>
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Price Low to High</option>
            <option value="high-low">Sort by : Price High to Low</option>
        </select>

        {/* categories */}
        <div className={`${activeFilter ? 'w-full h-auto py-3 pl-3 flex flex-col gap-5 border overflow-hidden border-gray-400' : 'w-0 h-0 p-0'} sm:flex sm:flex-col sm:gap-5 sm:border sm:border-gray-400 sm:w-full sm:h-auto sm:py-3 sm:pl-3 overflow-hidden transition-all duration-1000`}>
          <p>CATEGORIES</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Men" id="Men" value={"Men"} onChange={toggleCategory}/>
              <label htmlFor="Men">Men</label>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Women" id="Women" value={"Women"} onChange={toggleCategory}/>
              <label htmlFor="Women">Women</label>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Kids" id="Kids" value={"Kids"} onChange={toggleCategory}/>
              <label htmlFor="Kids">Kids</label>
            </div>
          </div>
        </div>

        {/* types */}
        <div className={`${activeFilter ? 'w-full h-auto py-3 pl-3 flex flex-col gap-5 border overflow-hidden border-gray-400' : 'w-0 h-0 p-0'} sm:flex sm:flex-col sm:gap-5 sm:border sm:border-gray-400 sm:w-full sm:h-auto sm:py-3 sm:pl-3 overflow-hidden transition-all duration-1000`}>
          <p>TYPE</p>
          <div className="flex flex-col gap-1.5">
              <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Topwear" id="Topwear" value={"Topwear"} onChange={toggleSubCategory}/>
              <label htmlFor="Topwear">Topwear</label>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Bottomwear" id="Bottomwear" value={"Bottomwear"} onChange={toggleSubCategory}/>
              <label htmlFor="Bottomwear">Bottomwear</label>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <input type="checkbox" name="Winterwear" id="Winterwear" value={"Winterwear"} onChange={toggleSubCategory}/>
              <label htmlFor="Winterwear">Winterwear</label>
            </div>
          </div>
        </div>
      </div>

      {/* all collections */}
      <div className="flex flex-col gap-5 sm:gap-10 w-full sm:w-3/4 sm:order-1">

        {/* title */}
        <div className="flex justify-start items-center">
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
        </div>

        {/* products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((product) => (
              <Product key={product._id} product={product}/>
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default Collection