import { useLocation } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { useShopContext } from "../../contexts/ShopContext"
import { useEffect, useState } from "react";

const Searchbar = () => {

    const { searchText, setSearchText, showSearchbar, setShowSearchbar } = useShopContext();

    const [onlyShowSearchbarInCollection, setOnlyShowSearchbarInCollection] = useState(false);

    const location = useLocation();

    useEffect(() => {
        location.pathname === '/collection' && showSearchbar ? setOnlyShowSearchbarInCollection(true) : setOnlyShowSearchbarInCollection(false);
    }, [location, showSearchbar]);

    return onlyShowSearchbarInCollection &&
        <div className="w-full border-t bg-gray-50 text-center flex justify-center sm:justify-end items-center">
            <div className="flex items-center justify-center border border-gray-400 px-5 py-2 sm:py4 my-5 mx-3 rounded-full">
                <input type="text" name="search" id="search" placeholder="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} className="flex-1 w-full outline-none bg-inherit text-sm" />
                <img src={assets.search_icon} alt="" className="w-4" />
            </div>
            <img src={assets.cross_icon} alt="" className="inline w-3 cursor-pointer" onClick={() => setShowSearchbar(false)} />
        </div>
}

export default Searchbar