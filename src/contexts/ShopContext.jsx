import { createContext, useContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {
    const currency = '💲';
    const delivery_fee = 10;

    const [searchText,setSearchText] = useState('');
    const [showSearchbar,setShowSearchbar] = useState(false);
    const [selectedSize,setSelectedSize] = useState(null);
    const [relatedProducts,setRelatedProducts] = useState([]);
    const [cartProducts,setCartProducts] = useState({});

    const addToCart = async (itemId,size) => {
        if(!size) {
            toast.error('Please Select Size');
            return;
        }
        let cartProductsCopy = structuredClone(cartProducts);
        if(cartProductsCopy[itemId]) {
            if(cartProductsCopy[itemId][size]) {
                cartProductsCopy[itemId][size] += 1;
            }
            else {
                cartProductsCopy[itemId][size] = 1;
            }
        }
        else {
            cartProductsCopy[itemId] = {};
            cartProductsCopy[itemId][size] = 1;
        }
        toast.success('Product Added to Cart');
        console.log("cartProductsCopy ",cartProductsCopy);
        setCartProducts(cartProductsCopy);
    };

    const cartSize = () => {
        let totalItems = 0;
        for(let itemId in cartProducts) {
            for(let size in cartProducts[itemId]) {
                if(cartProducts[itemId][size] > 0) {
                    totalItems += cartProducts[itemId][size];
                }
            }
        }
        return totalItems;
    }







    const values = {
        products,
        currency,
        delivery_fee,
        searchText,setSearchText,
        showSearchbar,setShowSearchbar,
        selectedSize,setSelectedSize,
        relatedProducts,setRelatedProducts,
        cartProducts,setCartProducts,
        addToCart,
        cartSize,
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);