
const SortButton = ({activeFilter,setSortBy}) => {
  return (
    <select
      name="sortBy"
      id="sortBy"
      className={`sm:py-2.5 sm:w-full sm:border sm:border-gray-300 sm:h-auto outline-none rounded-none ${
        activeFilter ? "border border-gray-300 w-1/2 h-auto" : "w-0 h-0"
      }`}
      onChange={(event) => setSortBy(event.target.value)}
    >
      <option value="relevant">Sort by : Relevant</option>
      <option value="low-high">Sort by : Price Low to High</option>
      <option value="high-low">Sort by : Price High to Low</option>
    </select>
  );
};

export default SortButton;