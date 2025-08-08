import { useShopContext } from "../../contexts/ShopContext"

const Button = ({navigateTo,text,noBackground,center}) => {

    const {navigate} = useShopContext();

  return (
    <div className={`w-full flex ${center ? `justify-center` : `justify-end`} items-center`}>
        <button onClick={() => navigate(navigateTo)} className={`${center && `w-full sm:w-2/3`} px-7 py-2 text-sm sm:text-base ${noBackground ? `border` : `bg-black hover:bg-gray-800 active:bg-red-300 text-white active:text-black`} cursor-pointer rounded uppercase`}>{text}</button>
    </div>
  )
}

export default Button