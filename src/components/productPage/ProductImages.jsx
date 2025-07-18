
const ProductImages = ({product,index,setIndex}) => {
  return (
      <div className="lg:w-[35%] flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-2.5">
        <img src={product.image[index]} alt="" className="w-[70%] sm:w-[90%] lg:w-[70%]"/>

        {/* ------------------------------all images of the products---------------------------------- */}
        <div className="flex h-auto w-auto lg:flex-col justify-start items-center gap-2.5 overflow-x-scroll overflow-y-auto lg:overflow-x-auto lg:overflow-y-scroll">
          {
            product.image.map((img,i) => (
              <img key={i} src={img} alt="" className={`${index === i ? `w-20 sm:w-30 lg:w-24` : `w-15 sm:w-25 lg:w-20 hover:scale-110`}`} onClick={() => setIndex(i)}/>
            ))
          }
        </div>
      </div>  
    )
}

export default ProductImages