import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Title from "../components/common/Title";
import { useShopContext } from "../contexts/ShopContext"
import { getOrdersOfAnUserHandler } from "../services/OrderApis";

const Orders = () => {

  const { currency, screenWidth } = useShopContext();

  const [orderData, setOrderData] = useState([]);

  const getOrdersOfAnUser = async () => {
    try {
      const response = await getOrdersOfAnUserHandler();
      let allOrderedItems = [];
      response.data.data.map(order => (
        order.itemsOrdered.map(product => {
          product['orderStatus'] = order.orderStatus;
          product['paymentMethod'] = order.paymentMethod;
          product['date'] = order.createdAt;
          allOrderedItems.push(product);
        })
      ));
      setOrderData(allOrderedItems.reverse());
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getOrdersOfAnUser();
  }, []);


  return (
    <div className="w-full flex flex-col justify-center items-start gap-10 pt-10 sm:pt-15 sm:pb-10 border-t">
      <Title text1={'my'} text2={'orders'} />

      {/* orders */}
      <div className="w-full flex flex-col justify-center items-center gap-10 text-xs md:text-base">
        {
          orderData.map((product, index) => (

            // single order

            <div key={index} className="w-full min-w-[200px] flex justify-start items-start gap-4 md:gap-10 border-b pb-2">
              {/* image */}
              <img src={product.images[0]} alt="" className="w-1/6 sm:w-1/8 lg:w-1/12" />



              <div className="w-5/6 sm:w-7/8 lg:w-11/12 flex flex-col sm:flex-row justify-center sm:justify-between items-start sm:items-center gap-4">
                {/* product details */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-2">
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
                    <p className="font-bold">{product.price + '.00' + '' + currency}</p>
                    <p className="text-start">Qty : <b>{product.quantity}</b></p>
                    <p>Size :<b>{product.size}</b></p>
                  </div>
                  <p className="text-gray-500">{new Date(product.date).toDateString()}</p>
                  <p>Mode of payment : <b className="uppercase text-gray-600">{product.paymentMethod}</b></p>
                </div>

                {/* ready to ship and track order */}
                <div className={`w-full sm:w-2/3 flex ${screenWidth < 350 ? `flex-col justify-center items-start gap-5` : `flex-row justify-between items-center`}`}>
                  <div className="flex justify-center items-center gap-1 sm:gap-2">
                    <p className={`min-w-3.5 h-3.5 rounded-full bg-green-500`}></p>
                    <p className="text-nowrap">{product.orderStatus}</p>
                  </div>
                  <Button navigateTo={null} text={'track order'} noBackground={true} center={screenWidth < 350 ? true : false} />
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