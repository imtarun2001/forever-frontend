import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import Title from '../common/Title'
import Button from '../common/Button';

const PlaceOrderMethod = () => {

    const [paymentMethod,setPaymentMethod] = useState('cod');
    const modes = [
        {value: 'stripe',image: assets.stripe_logo},
        {value: 'razorpay',image: assets.razorpay_logo},
        {value: 'cod'}
    ];

  return (
    <form className='flex flex-col justify-center items-start gap-5 border p-3 rounded sm:drop-shadow-sm sm:drop-shadow-black bg-gray-100'>
        <Title text1={'Payment'} text2={'Method'}/>

        <div className='flex justify-between items-center gap-2.5 sm:gap-10'>
            {
                modes.map((mode,index) => (
                    <div key={index} className='flex justify-center items-center gap-1 sm:gap-3.5 rounded border p-2 cursor-pointer hover:bg-gray-200' onClick={() => setPaymentMethod(mode.value)}>
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === mode.value ? 'bg-green-500 border-none' : ''}`}></p>
                        {
                            mode.value === 'cod' ? <p className='text-sm'>CASH ON DELIVERY</p> : <img src={mode.image} alt="" className='w-1/2 sm:w-1/3'/>
                        }
                    </div>
                ))
            }
        </div>

        <Button navigateTo={'/orders'} text={'place order'} center={true}/>
    </form>
  )
}

export default PlaceOrderMethod