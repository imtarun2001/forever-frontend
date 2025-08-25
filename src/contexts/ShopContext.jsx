import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getProductsHandler } from "../services/ProductApis";
import { addToCartHandler, getCartDataOfAnUserHandler, updateCartHandler } from "../services/CartApis";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const currency = '💲';
    const delivery_fee = 10;
    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("accountType") ? localStorage.getItem("accountType") : null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalCartItems,setTotalCartItems] = useState(0);
    const [subTotal,setSubTotal] = useState(0);

    // fetch all products from server
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await getProductsHandler();
            setProducts(response.data.data);
        } catch (error) {
            console.log(`Error in fetchAllProducts`);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    
    
    const addToCart = async (itemId, size) => {
        if (loggedIn === null) {
            return toast.error(`Login to avail this feature`);
        }
        if (!size) {
            return toast.error('Please Select Size');
        }
        
        const response = await addToCartHandler({itemId,size});
        if(response.data.success) {
            toast.success('Product Added to Cart');
            setCartProducts(response.data.data);
            console.log(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    const getCartDataOfAnUser = async () => {
        setLoading(true);
        try {
            const response = await getCartDataOfAnUserHandler();
            if(response.data.success) {
                setCartProducts(Object.entries(response.data.data));
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateCart = async (itemId, size, quantity) => {
        try {
            const response = await updateCartHandler({itemId,size,quantity});
            if(response.data.success) {
                toast.success(response.data.message);
                await getCartDataOfAnUser();
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const subTotalHandler = async () => {
        setLoading(true);
        try {
            const cartTotal = cartProducts.reduce((acc,curr) => {
                const product = products.find(product => product._id === curr[0]);
                if(!product) return acc;
                return acc + product.price * Object.values(curr[1])[0];
            },0);
            setSubTotal(cartTotal);
        } catch (error) {
            console.log(`Error in subTotalHandler`);
        } finally {
            setLoading(false);
        }
    }
    console.log(`loading in ShopContext`,loading);
    







    useEffect(() => {
        subTotalHandler();
    },[cartProducts,products]);

    useEffect(() => {
        fetchAllProducts();
        getCartDataOfAnUser();
        setLoggedIn(localStorage.getItem("accountType"));
    }, []);
    useEffect(() => {
        const resizeHandler = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [screenWidth]);
    

    

    




    const values = {
        currency,
        delivery_fee,
        navigate,
        screenWidth,setScreenWidth,
        loggedIn, setLoggedIn,
        products, setProducts,
        loading, setLoading,
        searchText, setSearchText,
        showSearchbar, setShowSearchbar,
        cartProducts, setCartProducts,
        subTotal,setSubTotal,
        addToCart,
        getCartDataOfAnUser,
        updateCart
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);