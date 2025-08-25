import { useState } from "react"

const DescriptionAndReviews = () => {
  const [active, setActive] = useState('Description');
  return (
    <div className="w-full flex flex-col justify-start items-start text-wrap">
      <div className="w-full flex justify-start items-center">
        {
          ['Description', 'Reviews (122)'].map((ele) => (
            <p key={ele} onClick={() => setActive(ele)} className={`w-[20%] text-center cursor-pointer px-auto py-auto bg-gray-100 border ${active === ele ? `font-bold` : `font-medium`}`}>{ele}</p>
          ))
        }
      </div>
      <div className="w-full border p-2.5 text-justify">
        {
          active === 'Description' ?
            `Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description.`
            :
            `Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review Review.`
        }
      </div>
    </div>
  )
}

export default DescriptionAndReviews