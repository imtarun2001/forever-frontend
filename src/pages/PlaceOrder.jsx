import CartTotal from "../components/cartPage/CartTotal"
import Title from "../components/common/Title"
import PlaceOrderMethod from "../components/placeOrderPage/PlaceOrderMethod"

const PlaceOrder = () => {

  const inputFields = [
    {
      field1: 'First Name',
      type1: "text",
      field2: 'Last Name',
      type2: "text",
      fullWidth: false
    },
    {
      field1: 'Email Address',
      type1: "email",
      fullWidth: true
    },
    {
      field1: 'Street',
      type1: "text",
      fullWidth: true
    },
    {
      field1: 'Zip Code',
      type1: "text",
      field2: 'City',
      type2: "text",
      fullWidth: false
    },
    {
      field1: 'State',
      type1: "text",
      field2: 'Country',
      type2: "text",
      fullWidth: false
    },
    {
      field1: 'Phone',
      type1: "tel",
      fullWidth: true
    },
  ]

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-start gap-5 sm:gap-0 pt-10 sm:pt-15 sm:pb-10 border-t">
      {/* left side */}
      <div className="flex flex-col justify-start items-center gap-4 w-full sm:w-1/3">
        <div className="w-full flex justify-start items-center">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        {
          inputFields.map((inputField, index) => (
            inputField.field1 && inputField.field2 ?
              <div key={index} className="flex gap-3">
                <input type={inputField.type1} placeholder={inputField.field1} className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
                <input type={inputField.type2} placeholder={inputField.field2} className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
              </div>
              :
              <input type={inputField.type1} placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400" />
          ))
        }
      </div>

      {/* right side */}
      <div className="w-full sm:w-2/3 flex flex-col justify-center items-center gap-15">
        <CartTotal />
        <PlaceOrderMethod />
      </div>
    </div>
  )
}

export default PlaceOrder