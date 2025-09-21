import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductHandler, getProductsHandler } from "../services/ProductApis";
import { addToCartHandler, getCartDataOfAnUserHandler, updateCartHandler } from "../services/CartApis";
import { checkUserHandler } from "../services/UserApis";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const currency = '💲';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const location = useLocation();

    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [introVideo, setIntroVideo] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

















    // fetch all products from server
    const getProducts = async () => {
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
    const getProduct = async (productId) => {
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
        setLoading(true);
        try {
            if (!size) {
                toast.error('please select size');
                return;
            }
            if(userId === null) {
                toast.error('login first');
            }
            let cartData = structuredClone(cartProducts);
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
            setCartProducts(cartData);
            const response = await addToCartHandler({ itemId, size });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    // update cart
    const updateCart = async (itemId, size, quantity) => {
        setLoading(true);
        try {
            let cartData = structuredClone(cartProducts);
            if (quantity === 0) {
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                } else {
                    delete cartData[itemId][size];
                }
            } else {
                cartData[itemId][size] = quantity;
            }
            setCartProducts(cartData);
            const response = await updateCartHandler({ itemId, size, quantity });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


    // calculate total cart items and amount
    const cartTotal = () => {
        let totalAmount = 0;
        let totalItems = 0;
        for (const itemId in cartProducts) {
            const productInfo = products.find(p => p._id === itemId);
            if (!productInfo) continue;
            for (const size in cartProducts[itemId]) {
                if (cartProducts[itemId][size] > 0) {
                    totalAmount += productInfo.price * cartProducts[itemId][size];
                    totalItems += cartProducts[itemId][size];
                }
            }
        }
        return { totalAmount, totalItems };
    }


    // get cart data of an user
    const getCartDataOfAnUser = async () => {
        setLoading(true);
        try {
            const response = await getCartDataOfAnUserHandler();
            setCartProducts(response.data.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }




    // check user logged in or not and accordingly remove the userId from localstorage
    const checkUser = async () => {
        try {
            const response = await checkUserHandler();
            setUserId(response.data.data);
            localStorage.setItem("userId",response.data.data);
        } catch (error) {
            localStorage.removeItem("userId");
            setUserId(null);
        }
    }














    useEffect(() => {
        getProducts();
        if(userId) checkUser();
    }, []);

    useEffect(() => {
        if (userId && location.pathname === `/cart/${userId}`) getCartDataOfAnUser();
    }, [userId, location.pathname]);

    useEffect(() => {
        const resizeHandler = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);





















    const values = {
        currency,
        delivery_fee,
        navigate,
        location,
        userId, setUserId,
        screenWidth, setScreenWidth,
        introVideo, setIntroVideo,
        loading, setLoading,
        products, setProducts,
        product, setProduct,
        searchText, setSearchText,
        showSearchbar, setShowSearchbar,
        cartProducts, setCartProducts,
        getProducts,
        getProduct,
        addToCart,
        updateCart,
        cartTotal,
        getCartDataOfAnUser
    };

    return <ShopContext.Provider value={values}>
        {children}
    </ShopContext.Provider>
};

export const useShopContext = () => useContext(ShopContext);