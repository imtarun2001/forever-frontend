import { assets } from "../../assets/frontend_assets/assets";


const FilterButton = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <p
        className="text-xl text-black"
      >
        FILTERS
      </p>
      <img
        src={assets.dropdown_icon}
        alt=""
        className={`w-2 sm:hidden ${activeFilter ? "rotate-90" : "rotate-0"
          } transition duration-500 cursor-pointer`}
        onClick={() => setActiveFilter((prev) => !prev)}
      />
    </div>
  );
};

export default FilterButton;
