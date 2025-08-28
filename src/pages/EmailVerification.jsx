import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { forgotPasswordHandler } from "../services/UserApis";
import toast from "react-hot-toast";
import { useShopContext } from "../contexts/ShopContext";

const EmailVerification = () => {

    const {navigate} = useShopContext();
    const {forgotPasswordTokenFromFrontend} = useParams();

    const [userPasswords,setUserPasswords] = useState(
        {
            newPassword: '',
            confirmNewPassword: ''
        }
    );
    const [loading,setLoading] = useState(false);
    const [openPasswordResetSuccessfulModal,setOpenPasswordResetSuccessfulModal] = useState(false);
    const openPasswordResetSuccessfulModalRef = useRef(null);

    const changeHandler = (event) => {
        const {name,type,value,checked} = event.target;
        setUserPasswords(prev => {
            return {
                ...prev,
                [name] : type === 'checkbox' ? checked : value
            }
        });
    }

    const forgotPassword = async (event) => {
        setLoading(true);
        try {
            event.preventDefault();
            const response = await forgotPasswordHandler({forgotPasswordTokenFromFrontend,newPassword: userPasswords.newPassword});
            setOpenPasswordResetSuccessfulModal(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        const clickAnyWhereToCloseOpenPasswordResetSuccessfulModal = (event) => {
            openPasswordResetSuccessfulModal && openPasswordResetSuccessfulModalRef.current && !openPasswordResetSuccessfulModalRef.current.contains(event.target) && setOpenPasswordResetSuccessfulModal(false);
        }
        window.addEventListener("mousedown",clickAnyWhereToCloseOpenPasswordResetSuccessfulModal);
        return () => window.removeEventListener("mousedown",clickAnyWhereToCloseOpenPasswordResetSuccessfulModal);
    },[openPasswordResetSuccessfulModal]);

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
        <div className={`w-full h-full ${openPasswordResetSuccessfulModal ? `block` : `hidden`} absolute z-10 bg-black opacity-85`}></div>
        <div className={`${openPasswordResetSuccessfulModal ? `flex` : `hidden`} flex-col justify-center items-center gap-10 py-10 px-5 border rounded absolute z-20 bg-white`}>
            <p className="font-semibold text-lg text-pink-700">Password reset successful</p>
            <button onClick={() => navigate('/login')} className="bg-black hover:bg-gray-700 px-5 sm:px-10 py-3 rounded text-white cursor-pointer">Login now</button>
        </div>

        <div className='flex flex-col justify-center items-center gap-5 rounded border sm:border-0 sm:shadow shadow-black p-5 sm:p-10'>
            <input type="password" required name="newPassword" id="newPassword" placeholder="new password" className="placeholder:text-gray-400 w-full bg-white border border-gray-400 outline-none rounded-md flex justify-center items-center px-1 py-2" onChange={changeHandler} value={userPasswords.newPassword}/>
            <input type="password" required name="confirmNewPassword" id="confirmNewPassword" placeholder="confirm new password" className="placeholder:text-gray-400 w-full bg-white border border-gray-400 outline-none rounded-md flex justify-center items-center px-1 py-2" onChange={changeHandler} value={userPasswords.confirmNewPassword}/>
            <button className="bg-black font-semibold flex justify-center items-center w-full py-2 text-white hover:bg-gray-600 rounded-lg cursor-pointer" disabled={loading ? true : false} onClick={forgotPassword}>{loading ? `Please wait...` : `Change`}</button>
        </div>
    </div>
  )
}

export default EmailVerification