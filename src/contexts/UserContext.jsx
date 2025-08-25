import { createContext, useContext, useState } from "react";
import { generateOtpHandler } from "../services/OtpApis";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "../services/UserApis";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useShopContext } from "./ShopContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const { setCartProducts, loggedIn, setLoggedIn } = useShopContext();

    const [current, setCurrent] = useState('Log in');

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const navigate = useNavigate();

    const [userData, setUserData] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            otp: '',
            cartData: {}
        }
    );

    const changeHandler = (event) => {
        const { name, type, value, checked } = event.target;
        setUserData(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    }

    const clickLoginOrSignupButtonHandler = async () => {
        try {
            if (current === 'Sign up') {
                if (userData.password !== userData.confirmPassword) {
                    return toast.error(`Password and confirm Password must be same`);
                }
                const response = await generateOtpHandler({ email: userData.email });
                if (response.data.success) {
                    navigate('/generate-otp');
                    return toast.success(response.data.message);
                }
            } else {
                const response = await loginUserHandler({ email: userData.email, password: userData.password });
                if (response.data.success) {
                    localStorage.setItem("accountType", response.data.data);
                    setLoggedIn(response.data.data);
                    navigate('/');
                    setUserData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        otp: '',
                        cartData: {}
                    });
                    return toast.success(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const signupUser = async () => {
        try {
            const response = await registerUserHandler(userData);
            if (response.data.success) {
                navigate('/login');
                setCurrent('Log in');
                setUserData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    otp: '',
                    cartData: {}
                });
                return toast.success(response.data.message);
            } else {
                return toast.error(response.data.message);
            }
        } catch (error) {
            console.log(`Error in signupUser in UserContext`);
        }
    }


    const logoutUser = async () => {
        try {
            const response = await logoutUserHandler();
            if (response.data.success) {
                localStorage.removeItem("accountType");
                setLoggedIn(null);
                setLogoutModalOpen(false);
                setCartProducts({});
                navigate('/');
            }
        } catch (error) {
            console.log(`Error in logoutUser in UserContext`);
        }
    }

    const values = {
        current, setCurrent,
        loggedIn, setLoggedIn,
        logoutModalOpen, setLogoutModalOpen,
        navigate,
        userData,
        changeHandler,
        clickLoginOrSignupButtonHandler,
        signupUser,
        logoutUser
    };

    return <UserContext.Provider value={values}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);