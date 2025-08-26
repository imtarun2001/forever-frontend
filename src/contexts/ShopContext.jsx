import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getProductHandler, getProductsHandler } from "../services/ProductApis";
import { addToCartHandler, getCartDataOfAnUserHandler, updateCartHandler } from "../services/CartApis";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const currency = '💲';
    const delivery_fee = 10;
    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [introVideo, setIntroVideo] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("accountType") ? localStorage.getItem("accountType") : null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal,setSubTotal] = useState(0);
    const [totalCartItems,setTotalCartItems] = useState(0);

    // fetch all products from server
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await getProductsHandler();
            setProducts(response.data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    // fetch single product from server
    const fetchProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await getProductHandler(productId);
            setProduct(response.data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    
    // add product to the cart
    const addToCart = async (itemId, size) => {
        try {
            if (!size) {
                return toast.error('Please Select Size');
            }
            if (loggedIn === null) {
                return toast.error(`Login to avail this feature`);
            }

            const response = await addToCartHandler({itemId,size});
            setCartProducts(response.data.data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(response.message);
        }
    };

    const getCartDataOfAnUser = async () => {
        setLoading(true);
        try {
            const response = await getCartDataOfAnUserHandler();
            setCartProducts(Object.entries(response.data.data));
            toast.success(response.data.message);
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
            toast.error(error.message);
        }
    }

    const subTotalHandler = async () => {
        setLoading(true);
        try {
            // total price of all items in cart
            const totalCartPrice = cartProducts.reduce((acc,curr) => {
                const product = products.find(product => product._id === curr[0]);
                if(!product) return acc;
                const totalQty = Object.values(curr[1]).reduce((sum,qty) => sum + qty,0);
                return acc + product.price * totalQty;
            },0);
            setSubTotal(totalCartPrice);

            // total number of products in cart
            const totalItemsInCart = cartProducts.reduce((acc,curr) => {
                const product = products.find(product => product._id === curr[0]);
                if(!product) return acc;
                return acc + Object.values(curr[1]).reduce((acc,size) => acc + size,0);
            },0);
            setTotalCartItems(totalItemsInCart);
        } catch (error) {
            console.log(`Error in subTotalHandler`,error.message);
        } finally {
            setLoading(false);
        }
    }
    







    useEffect(() => {
        subTotalHandler();
    },[cartProducts,products]);

    useEffect(() => {
        fetchAllProducts();
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
        introVideo,setIntroVideo,
        loggedIn, setLoggedIn,
        loading, setLoading,
        products, setProducts,
        product,setProduct,
        searchText, setSearchText,
        showSearchbar, setShowSearchbar,
        cartProducts, setCartProducts,
        subTotal,setSubTotal,
        totalCartItems,setTotalCartItems,
        fetchAllProducts,
        fetchProduct,
        addToCart,
        getCartDataOfAnUser,
        updateCart
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);