
const SubscribeNow = () => {

    const submitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className="my-10 flex flex-col justify-center items-center gap-2 pb-2.5">
        <p className="font-medium text-2xl">Subscribe now & get 20% off</p>
        <p className="font-light text-gray-400 text-center text-sm sm:text-base">Get instant access to limited-time deals, new collections, and members-only discounts.</p>
        <form onSubmit={submitHandler} className="w-full sm:w-7/8 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-3">
            <input type="text" name="" id="" className="w-full sm:flex-1 outline-none placeholder:text-gray-400" placeholder="Enter Your Email"/>
            <button type="submit" className="p-2 sm:p-[15.4px] bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default SubscribeNow