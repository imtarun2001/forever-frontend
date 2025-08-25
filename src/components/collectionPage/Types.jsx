const Types = ({ activeFilter, toggleSubCategory }) => {
  return (
    <div
      className={`${activeFilter
          ? "w-full h-auto py-3 pl-3 "
          : "w-0 h-0 p-0 border-none"
        } flex flex-col gap-5 border overflow-hidden border-gray-400 sm:w-full sm:h-auto sm:py-3 sm:pl-3 transition-all duration-1000`}
    >
      <p>TYPE</p>
      <div className="flex flex-col gap-1.5">
        {["Topwear", "Bottomwear", "Winterwear"].map((ele) => (
          <div key={ele} className="flex justify-start items-center gap-2.5">
            <input
              type="checkbox"
              name={ele}
              id={ele}
              value={ele}
              onChange={toggleSubCategory}
            />
            <label htmlFor={ele}>{ele}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
