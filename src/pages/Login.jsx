import { useEffect, useState } from "react"
import Title from "../components/common/Title"
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useUserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";

const Login = () => {

  const { current, setCurrent, userData, changeHandler, clickLoginOrSignupButtonHandler } = useUserContext();
  const { loading } = useShopContext();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(false);
  }, [current]);

  return (
    <form onSubmit={(event) => event.preventDefault()} className="w-full md:w-11/12 min-h-[50vh] md:min-h-[70vh] flex flex-col justify-start items-center gap-20 pt-10 border-t">
      <Title text1={current.split(' ')[0]} text2={current.split(' ')[1]} />

      <div className="w-4/5 sm:w-1/2 flex flex-col justify-center items-center gap-3">
        {
          current === 'Sign up' && <input type="text" placeholder="Full Name" name="name" value={userData.value} onChange={changeHandler} required className="border w-full sm:w-2/3 p-1.5 rounded outline-none" />
        }

        <input type="email" placeholder="Email Address" name="email" value={userData.email} onChange={changeHandler} required className="border w-full sm:w-2/3 p-1.5 rounded outline-none" />

        <div className="w-full sm:w-2/3 relative flex justify-center items-center">
          <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={userData.password} onChange={changeHandler} required className="border w-full p-1.5 rounded outline-none" />
          <span className="absolute right-0 h-full border-l flex justify-center items-center p-1.5 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <LuEye /> : <LuEyeClosed />}</span>
        </div>
        {
          current === 'Sign up' &&
          <div className="w-full sm:w-2/3 relative flex justify-center items-center">
            <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" value={userData.confirmPassword} onChange={changeHandler} required className="border w-full p-1.5 rounded outline-none" />
            <span className="absolute right-0 h-full border-l flex justify-center items-center p-1.5 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <LuEye /> : <LuEyeClosed />}</span>
          </div>
        }

        <p className="w-full sm:w-2/3 flex justify-between items-center text-sm">
          <Link to="/forgot-password" className="cursor-pointer text-red-300 hover:text-red-400">Forgot Password?</Link>
          {
            current === 'Log in' ?
              <span>New User? <u className="hover:text-sky-600 cursor-pointer" onClick={() => setCurrent('Sign up')}>Sign up</u></span>
              :
              <span>Existing User? <u className="hover:text-sky-600 cursor-pointer" onClick={() => setCurrent('Log in')}>Log in</u></span>
          }
        </p>

        <button className={`w-full sm:w-2/3 mt-2 px-7 py-2 text-sm sm:text-base bg-black hover:bg-gray-800 active:bg-red-300 text-white active:text-black cursor-pointer rounded uppercase`} onClick={clickLoginOrSignupButtonHandler}>
          {
            loading ? `please wait` : current === 'Log in' ? 'log in' : 'sign up'
          }
        </button>
      </div>
    </form>
  )
}

export default Login