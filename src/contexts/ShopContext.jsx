import { createContext, useContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {
    const currency = '💲';
    const delivery_fee = 10;

    const [searchText,setSearchText] = useState('');
    const [showSearchbar,setShowSearchbar] = useState(true);
    const [quantity,setQuantity] = useState(1);
    const increaseQuantity = () => {
        quantity < 5 ? setQuantity(prev => prev + 1) : toast.warning('Can not add more than 5 items');
    };
    const decreaseQuantity = () => {
        quantity > 1 ? setQuantity(prev => prev - 1) : toast.warning('Minimum 1 item has to be added');
    };

    const values = {
        products,
        currency,
        delivery_fee,
        searchText,setSearchText,
        showSearchbar,setShowSearchbar,
        quantity,setQuantity,
        increaseQuantity,
        decreaseQuantity
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);