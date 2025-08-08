import { createContext, useContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {
    const currency = '💲';
    const delivery_fee = 10;

    const [searchText,setSearchText] = useState('');
    const [showSearchbar,setShowSearchbar] = useState(false);
    const [cartProducts,setCartProducts] = useState({});
    const [subTotal,setSubTotal] = useState(0);
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
        if(!size) {
            return toast.error('Please Select Size');
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


    const updateCart = async (itemId,size,quantity) => {
        let cartProductsCopy = structuredClone(cartProducts);
        cartProductsCopy[itemId][size] = quantity;
        setCartProducts(cartProductsCopy);
    }







    const values = {
        products,
        currency,
        delivery_fee,
        navigate,
        searchText,setSearchText,
        showSearchbar,setShowSearchbar,
        cartProducts,setCartProducts,
        subTotal,setSubTotal,
        addToCart,
        cartSize,
        updateCart
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);