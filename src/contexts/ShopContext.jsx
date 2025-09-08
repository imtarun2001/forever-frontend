import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductHandler, getProductsHandler } from "../services/ProductApis";
import { addToCartHandler, getCartDataOfAnUserHandler, updateCartHandler } from "../services/CartApis";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const currency = '💲';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const location = useLocation();

    const [accountType, setAccountType] = useState(localStorage.getItem("accountType") ? localStorage.getItem("accountType") : null);
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
                toast.error('Please Select Size');
                return;
            }
            if(accountType === null) {
                toast.error(`login to avail the feature`);
                return;
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
















    useEffect(() => {
        getProducts();
    }, []);
    
    useEffect(() => {
        if(accountType !== null) getCartDataOfAnUser();
    },[accountType]);

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
        accountType, setAccountType,
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