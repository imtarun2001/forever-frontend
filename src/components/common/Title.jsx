
const Title = ({ text1, text2, center, desc }) => {
  return center && desc ? (
    <div className="w-full flex flex-col justify-center items-center mb-5">
      <div className={`w-full flex justify-center items-center uppercase text-2xl md:text-3xl gap-2`}>
        <p className="flex gap-1.5">
          <span className="text-gray-500">{text1}</span>
          <span className="text-gray-700 font-medium">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
      <p className="w-full text-center text-xs sm:text-sm md:text-base text-gray-600 text-wrap">{desc}</p>
    </div>
  )
    :
    (
      <div className="w-full flex justify-start items-center uppercase text-2xl md:text-3xl gap-2">
        <p className="flex gap-1.5">
          <span className="text-gray-500">{text1}</span>
          <span className="text-gray-700 font-medium">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
    )
}

export default Title