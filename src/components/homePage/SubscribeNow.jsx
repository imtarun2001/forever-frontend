
const SubscribeNow = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className="my-10 flex flex-col justify-center items-center gap-2 pb-2.5">
      <p className="font-medium text-2xl">Subscribe now & get 20% off</p>
      <p className="font-light text-gray-400 text-center text-sm sm:text-base text-wrap">Get instant access to limited-time deals, new collections, and members-only discounts.</p>
      <form onSubmit={submitHandler} className="w-full sm:w-5/6 flex flex-col sm:flex-row justify-center items-center gap-3 mx-auto my-6 sm:border border-gray-300 sm:pl-3">
        <input type="text" name="" id="" required className="w-4/5 sm:flex-1 outline-none border sm:border-none text-center sm:text-start p-1.5 placeholder:text-gray-400" placeholder="Enter Your Email" />
        <button type="submit" className="sm:p-[15.4px] bg-black text-white text-xs px-5 py-2">SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default SubscribeNow