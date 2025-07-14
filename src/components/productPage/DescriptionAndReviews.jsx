
const DescriptionAndReviews = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start">
        <div className="w-full flex justify-start items-center">
            {
                ['Description','Reviews (122)'].map((ele) => (
                    <p key={ele} className="w-[20%] text-center px-auto py-auto bg-gray-100 border">{ele}</p>
                ))
            }
        </div>
        <div className="w-full border p-2.5">Hii</div>
    </div>
  )
}

export default DescriptionAndReviews