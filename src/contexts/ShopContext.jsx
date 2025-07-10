import { createContext, useContext } from "react";
import { products } from "../assets/frontend_assets/assets";

const ShopContext = createContext();

export const ShopContextProvider = ({children}) => {
    const currency = '💲';
    const delivery_fee = 10;

    const values = {
        products,
        currency,
        delivery_fee,

    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);