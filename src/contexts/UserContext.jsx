import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useShopContext } from "./ShopContext";
import { generateOtpHandler } from "../services/OtpApis";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "../services/UserApis";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const { setCartProducts, setLoading } = useShopContext();
    const navigate = useNavigate();

    const [current, setCurrent] = useState('Log in');
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [userData, setUserData] = useState(
        {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            otp: ''
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
        setLoading(true);
        try {
            if (current === 'Sign up') {
                if (userData.password !== userData.confirmPassword) {
                    return toast.error(`Password and confirm Password must be same`);
                }
                const response = await generateOtpHandler({ email: userData.email });
                navigate('/generate-otp');
                toast.success(response.data.message);
            } else {
                const response = await loginUserHandler({ email: userData.email, password: userData.password });
                navigate('/');
                setUserData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    otp: ''
                });
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }




    const signupUser = async () => {
        setLoading(true);
        try {
            const response = await registerUserHandler(userData);
            navigate('/login');
            setCurrent('Log in');
            setUserData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                otp: ''
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }




    const logoutUser = async () => {
        setLoading(true);
        try {
            const response = await logoutUserHandler();

            setLogoutModalOpen(false);
            navigate('/');
            setCartProducts({});
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }















    const values = {
        current, setCurrent,
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