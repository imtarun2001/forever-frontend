// import { assets } from "../../assets/frontend_assets/assets"

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-[30vh] w-full">
        {/* <img src={assets.logo} alt="" className="w-10"/> */}
        <div className="prata-regular">Please wait a while</div>
        <div className='spinner'></div>
    </div>
  )
}

export default Spinner