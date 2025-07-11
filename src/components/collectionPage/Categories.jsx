
const Categories = ({activeFilter,toggleCategory}) => {
  return (
    <div
      className={`${
        activeFilter
          ? "w-full h-auto py-3 pl-3 flex flex-col gap-5 border overflow-hidden border-gray-400"
          : "w-0 h-0 p-0"
      } sm:flex sm:flex-col sm:gap-5 sm:border sm:border-gray-400 sm:w-full sm:h-auto sm:py-3 sm:pl-3 overflow-hidden transition-all duration-1000`}
    >
      <p>CATEGORIES</p>
      <div className="flex flex-col gap-1.5">
        {
            ['Men','Women','Kids'].map((ele) => (
                <div key={ele} className="flex justify-start items-center gap-2.5">
                    <input
                        type="checkbox"
                        name={ele}
                        id={ele}
                        value={ele}
                        onChange={toggleCategory}
                    />
                    <label htmlFor={ele}>{ele}</label>
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Categories