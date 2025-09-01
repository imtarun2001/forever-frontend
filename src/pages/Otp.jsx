import { assets } from "../assets/frontend_assets/assets";
import { useShopContext } from "../contexts/ShopContext";
import { useUserContext } from "../contexts/UserContext"

const Otp = () => {

    const { userData, changeHandler, signupUser } = useUserContext();
    const { loading } = useShopContext();

    return (
        <div className="h-screen w-full flex justify-center items-center absolute bg-white">
            <div className="w-full sm:w-1/3 flex flex-col justify-center items-center gap-5 px-10 py-5 rounded border sm:shadow-2xl sm:shadow-black bg-pink-100">
                <div className="w-full flex justify-between items-center">
                    <p>Enter OTP to Verify</p>
                    <img src={assets.logo} alt="" className="w-[max(30%,70px)]" />
                </div>
                <input type="text" name="otp" id="otp" onChange={changeHandler} value={userData.otp} className="border w-full p-1.5 rounded outline-none" />
                <button className={`w-full sm:w-2/3 mt-2 px-7 py-2 text-sm sm:text-base bg-black hover:bg-gray-800 active:bg-red-300 text-white active:text-black cursor-pointer rounded uppercase`} disabled={loading ? true : false} onClick={signupUser}>{loading ? `Verifying...` : `Verify Otp`}</button>
            </div>
        </div>
    )
}

export default Otp