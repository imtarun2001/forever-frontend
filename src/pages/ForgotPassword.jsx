import { useEffect, useRef, useState } from "react"
import { forgotPasswordLinkToEmailHandler } from "../services/UserApis"
import toast from "react-hot-toast";
import { useShopContext } from "../contexts/ShopContext";


const ForgotPassword = () => {

    const {navigate} = useShopContext();

    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);
    const [openEmailSentModal,setOpenEmailSentModal] = useState(false);

    const openEmailSentModalRef = useRef(null);

    useEffect(() => {
        const clickAnyWhereToCloseOpenEmailSentModal = (event) => {
            openEmailSentModal && openEmailSentModalRef.current && !openEmailSentModalRef.current.contains(event.target) && setOpenEmailSentModal(false);
        }
        window.addEventListener("mousedown",clickAnyWhereToCloseOpenEmailSentModal);
        return () => window.removeEventListener("mousedown",clickAnyWhereToCloseOpenEmailSentModal);
    },[openEmailSentModal]);

    const forgotPasswordLinkToEmail = async () => {
        setLoading(true);
        try {
            if(!email) {
                return toast.error(`Please enter your email`);
            }
            const response = await forgotPasswordLinkToEmailHandler({email});
            toast.success(response.data.message);
            setOpenEmailSentModal(true);
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
        <div className={`absolute z-10 w-full h-screen ${openEmailSentModal ? `flex` : `hidden`} justify-center items-center opacity-85 bg-black`}>
        </div>
        <div ref={openEmailSentModalRef} className={`absolute z-20 rounded p-10 text-center bg-pink-100 flex-col gap-5 font-semibold ${openEmailSentModal ? 'flex' : `hidden`}`}>
            <p>The mail to reset password</p>
            <p>has been sent.</p>
            <p>Click any where to close</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 rounded border sm:border-0 sm:shadow shadow-black p-5 sm:p-10'>
            <div className="w-full flex justify-start items-center">
                <button className="hover:underline font-bold cursor-pointer" onClick={() => navigate(-1)}>back</button>
            </div>
            <div className={`font-semibold text-wrap text-center`}>Enter your email for verification</div>
            <input type="email" required placeholder="email here" name="email" id="email" className="w-full placeholder:text-gray-400 bg-white border border-gray-400 outline-none rounded-md flex justify-center items-center px-1 py-2" onChange={(event) => setEmail(event.target.value)} value={email}/>
            <button className="bg-black font-semibold flex justify-center items-center w-full py-2 text-white hover:bg-gray-600 rounded-lg cursor-pointer" disabled={loading ? true : false} onClick={forgotPasswordLinkToEmail}>{loading ? `Please wait...` : `Verify`}</button>
        </div>
    </div>
  )
}

export default ForgotPassword