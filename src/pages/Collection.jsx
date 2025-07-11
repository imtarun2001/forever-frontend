import { useEffect, useState } from "react"
import Title from "../components/common/Title";
import { useShopContext } from "../contexts/ShopContext";
import Products from "../components/collectionPage/Products";
import FilterButton from "../components/collectionPage/FilterButton";
import SortButton from "../components/collectionPage/SortButton";
import Categories from "../components/collectionPage/Categories";
import Types from "../components/collectionPage/Types";

const Collection = () => {

  const {products,searchText,showSearchbar} = useShopContext();

  const [activeFilter,setActiveFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState(products);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortBy,setSortBy] = useState('relevant');

  
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
  const applyFiltering = () => {
    let filteredProducts = [...products];
    if(showSearchbar && searchText) filteredProducts = filteredProducts.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    if(category.length > 0) filteredProducts = filteredProducts.filter(item => category.includes(item.category));
    if(subCategory.length > 0) filteredProducts = filteredProducts.filter(item => subCategory.includes(item.subCategory));
    applySorting(filteredProducts);
  }

  const applySorting = (filteredProducts) => {
    let sortedProducts = [...filteredProducts];
    if(sortBy === 'low-high') sortedProducts = sortedProducts.sort((a,b) => a.price - b.price);
    else if(sortBy === 'high-low') sortedProducts = sortedProducts.sort((a,b) => b.price - a.price);
    setFilterProducts(sortedProducts);
  }
  

  useEffect(() => {
    applyFiltering();
  },[category,subCategory,sortBy,searchText,showSearchbar]);

  return (
    <div className="w-full border-t py-10 border-gray-200 flex flex-col sm:flex-row justify-between items-start gap-5 relative">

      {/* filters */}
      <div className="w-full sm:w-1/4 flex flex-col justify-center items-start gap-5 sm:order-2 sm:sticky sm:top-25 transition-all duration-500">

        {/* filter button */}
        <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>

        {/* sort button */}
        <SortButton activeFilter={activeFilter} setSortBy={setSortBy}/>

        {/* categories */}
        <Categories activeFilter={activeFilter} toggleCategory={toggleCategory}/>

        {/* types */}
        <Types activeFilter={activeFilter} toggleSubCategory={toggleSubCategory}/>
      </div>

      {/* all collections */}
      <div className="flex flex-col gap-5 sm:gap-10 w-full sm:w-3/4 sm:order-1">
          {/* title */}
          <div className="flex justify-start items-center">
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          </div>

          {/* products */}
          <Products filterProducts={filterProducts}/>
      </div>

    </div>
  )
}

export default Collection