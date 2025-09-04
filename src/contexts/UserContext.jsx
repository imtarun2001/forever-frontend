import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { useShopContext } from "./ShopContext";
import { generateOtpHandler } from "../services/OtpApis";
import { customerLoginHandler, customerLogoutHandler, registerUserHandler } from "../services/UserApis";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const { setCartProducts, setLoading, accountType, setAccountType } = useShopContext();
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
                navigate('/generateOtp');
                toast.success(response.data.message);
            } else {
                if(accountType === null) {
                    const response = await customerLoginHandler({ email: userData.email, password: userData.password });
                    localStorage.setItem("accountType", response.data.data);
                    setAccountType(response.data.data);
                    navigate('/');
                    setUserData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        otp: ''
                    });
                    toast.success(response.data.message);
                } else {
                    toast.error(`already logged in with an account`);
                }
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




    const customerLogout = async () => {
        setLoading(true);
        try {
            if(accountType !== null) {
                const response = await customerLogoutHandler();
                localStorage.removeItem("accountType");
                setAccountType(null);
                setLogoutModalOpen(false);
                navigate('/');
                setCartProducts({});
                toast.success(response.data.message);
            } else {
                toast.error(`log in first`);
            }
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
        customerLogout
    };

    return <UserContext.Provider value={values}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);