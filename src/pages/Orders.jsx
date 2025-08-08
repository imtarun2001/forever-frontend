import Button from "../components/common/Button";
import Title from "../components/common/Title";
import { useShopContext } from "../contexts/ShopContext"

const Orders = () => {

  const {products,currency} = useShopContext();

  return (
    <div className="w-full flex flex-col justify-center items-start gap-10 pt-10 sm:pt-15 sm:pb-10 border-t">
      <Title text1={'my'} text2={'orders'}/>

      {/* orders */}
      <div className="w-full flex flex-col justify-center items-center gap-10 text-xs md:text-base">
        {
          products.slice(0,10).map((product,index) => (

            // single order
            
            <div key={index} className="w-full flex justify-start items-start gap-4 md:gap-10 border-b pb-2">
              {/* image */}
              <img src={product.image[0]} alt="" className="w-1/6 sm:w-1/8 lg:w-1/12"/>



              <div className="w-5/6 sm:w-7/8 lg:w-11/12 flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center gap-4">
                {/* product details */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-2">
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex justify-center items-center gap-2">
                    <p>{product.price + '.00' + '' + currency}</p>
                    <p>Quantity : <b>1</b></p>
                    <p>Size : <b>M</b></p>
                  </div>
                  <p><i>Date : 01 Aug 2025</i></p>
                </div>

                {/* ready to ship and track order */}
                <div className="w-full sm:w-2/3 flex justify-between items-center">
                  <div className="flex justify-center items-center gap-1 sm:gap-2">
                    <p className={`min-w-3.5 h-3.5 rounded-full bg-green-500`}></p>
                    <p>Ready to ship</p>
                  </div>
                  <Button navigateTo={null} text={'track order'} noBackground={true}/>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders