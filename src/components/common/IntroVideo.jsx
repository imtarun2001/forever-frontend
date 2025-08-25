import { motion } from 'framer-motion';

const IntroVideo = () => {

  const transition = { type: 'normal', duration: 5 };

  return (
    <div className="h-screen w-full flex justify-center items-center absolute bg-black">
      <div className='h-1/2 w-2/3 bg-black flex flex-col justify-center items-center gap-3'>
        <motion.p initial={{ fontSize: '7rem' }} whileInView={{ fontSize: '4rem' }} transition={transition} className="kaushan-script-regular tracking-widest text-white z-10">FOREVER</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={transition} className="text-white z-10">Timeless • Trendy • Trusted</motion.p>
      </div>
    </div>
  )
}

export default IntroVideo