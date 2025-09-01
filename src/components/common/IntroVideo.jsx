import { motion } from 'framer-motion';
import { useShopContext } from '../../contexts/ShopContext';
import { assets } from '../../assets/frontend_assets/assets';

const IntroVideo = () => {

  const { screenWidth } = useShopContext();
  const transition = { type: 'normal', duration: 5 };

  return (
    <div className="h-screen w-full flex justify-center items-center absolute bg-black">
      <div className='h-1/2 w-2/3 bg-black flex flex-col justify-center items-center gap-3'>
        <motion.img src={assets.favicon} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={transition} className={`z-10 `} />
        <motion.p initial={{ fontSize: screenWidth < 350 ? '3rem' : '5rem' }} whileInView={{ fontSize: screenWidth < 350 ? '1.5rem' : '2.5rem' }} transition={transition} className="kaushan-script tracking-widest text-white z-10">FOREVER</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={transition} className={`${screenWidth < 350 ? 'text-[12px]' : 'text-lg'} tracking-wider text-white z-10 text-center `}>Timeless • Trendy • Trusted</motion.p>
      </div>
    </div>
  )
}

export default IntroVideo