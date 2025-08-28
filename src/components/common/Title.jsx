const Title = ({ text1, text2, center, desc }) => {
  return center && desc ? (
    <div className="w-full flex flex-col justify-center items-center mb-6 px-2">
      {/* Heading */}
      <div className="w-full flex justify-center items-center uppercase text-xl sm:text-2xl md:text-3xl gap-2 flex-wrap text-center">
        <p className="flex gap-1.5 flex-wrap justify-center">
          <span className="text-gray-500">{text1}</span>
          <span className="text-gray-700 font-medium">{text2}</span>
        </p>
        <p className="w-6 sm:w-12 md:w-20 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>

      {/* Description */}
      <p className="w-full max-w-2xl mt-2 text-center text-xs sm:text-sm md:text-base text-gray-600 px-2">
        {desc}
      </p>
    </div>
  ) : (
    <div className="w-full flex justify-start items-center uppercase text-xl sm:text-2xl md:text-3xl gap-2 flex-wrap">
      <p className="flex gap-1.5 flex-wrap">
        <span className="text-gray-500">{text1}</span>
        <span className="text-gray-700 font-medium">{text2}</span>
      </p>
      <p className="w-6 sm:w-12 md:w-20 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
