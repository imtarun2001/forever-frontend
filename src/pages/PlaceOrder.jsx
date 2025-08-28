import { useState } from "react";
import CartTotal from "../components/cartPage/CartTotal"
import Title from "../components/common/Title"
import { assets } from "../assets/frontend_assets/assets";
import Button from "../components/common/Button";
import { useShopContext } from "../contexts/ShopContext";
import { orderByCodHandler } from "../services/OrderApis";
import toast from "react-hot-toast";

const PlaceOrder = () => {

  const {subTotal, delivery_fee} = useShopContext();

  const [orderdata,setOrderData] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      paymentMethod: '',
      amount: subTotal + delivery_fee
    }
  )
  const paymentModes = [
    { value: 'stripe', image: assets.stripe_logo },
    { value: 'razorpay', image: assets.razorpay_logo },
    { value: 'cod' }
  ];

  const inputFields = [
    {
      field1: "First Name",
      type1: "text",
      value1: "firstName",
      field2: "Last Name",
      type2: "text",
      value2: "lastName",
      fullWidth: false
    },
    {
      field1: "Email Address",
      type1: "email",
      value1: "email",
      fullWidth: true
    },
    {
      field1: "Street",
      type1: "text",
      value1: "street",
      fullWidth: true
    },
    {
      field1: "Zip Code",
      type1: "text",
      value1: "zipCode",
      field2: "City",
      type2: "text",
      value2: "city",
      fullWidth: false
    },
    {
      field1: "State",
      type1: "text",
      value1: "state",
      field2: "Country",
      type2: "text",
      value2: "country",
      fullWidth: false
    },
    {
      field1: "Phone",
      type1: "tel",
      value1: "phone",
      fullWidth: true
    },
  ];

  const changeHandler = (event) => {
    const {name,type,value,checked} = event.target;
    setOrderData(prev => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  }

  const orderByCod = async (event) => {
    try {
      event.preventDefault();
      const response = await orderByCodHandler(orderdata);
      toast.success(response.data.message);
      setOrderData(prev => (
        {
          ...prev,
          amount: subTotal + delivery_fee,
          city: '',
          country: '',
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          state: '',
          street: '',
          zipCode: ''
        }
      ));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={orderByCod} className="w-full flex flex-col lg:flex-row justify-center items-start gap-5 pt-10 sm:pt-15 sm:pb-10 border-t">
      {/* left side */}
      <div className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2">
        <div className="w-full flex justify-start items-center">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        {
          inputFields.map((inputField, index) => (
            inputField.field1 && inputField.field2 ?
              <div key={index} className="flex gap-3 w-full">
                <input name={inputField.value1} id={inputField.value1} onChange={changeHandler} value={orderdata[inputField.value1]} type={inputField.type1} placeholder={inputField.field1} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
                <input name={inputField.value2} id={inputField.value2} onChange={changeHandler} value={orderdata[inputField.value2]} type={inputField.type2} placeholder={inputField.field2} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
              </div>
              :
              <input key={index} name={inputField.value1} id={inputField.value1} onChange={changeHandler} value={orderdata[inputField.value1]} type={inputField.type1} placeholder={inputField.field1} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
          ))
        }
      </div>

      {/* right side */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center gap-15">
        <CartTotal />


        {/* PlaceOrderMethod */}
        <div className='flex flex-col justify-center items-start gap-5 border p-3 rounded sm:drop-shadow-sm sm:drop-shadow-black bg-gray-100'>
          <Title text1={'Payment'} text2={'Method'} />
          <div className='flex justify-between items-center gap-2.5 sm:gap-10'>
            {
              paymentModes.map((paymentMode, index) => (
                <div key={index} className='flex justify-center items-center gap-1 sm:gap-3.5 rounded border p-2 cursor-pointer hover:bg-gray-200'>
                  <input type="radio" name="paymentMethod" id={paymentMode.value} onChange={changeHandler} value={paymentMode.value} checked={orderdata.paymentMethod === paymentMode.value}/>
                  <label htmlFor={paymentMode.value} className="flex justify-start items-center">
                    {
                      paymentMode.value === 'cod' ? <p className=''>cod</p> : <img src={paymentMode.image} alt="" className='w-1/2 sm:w-1/3' />
                    }
                  </label>
                </div>
              ))
            }
          </div>
          <Button text={'place order'} center={true} />
        </div>


      </div>
    </form>
  )
}

export default PlaceOrder