import { assets } from "../assets/frontend_assets/assets"
import Title from "../components/common/Title"
import SubscribeNow from "../components/homePage/SubscribeNow";

const About = () => {

  const whyChooseUs = [
    {
      title: 'Quality Assurance:',
      desc: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.'
    },
    {
      title: 'Convenience:',
      desc: 'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.'
    },
    {
      title: 'Exceptional Customer Service:',
      desc: 'Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.'
    },
  ];

  return (
    <div className="w-10/12 flex flex-col justify-start items-center gap-10 sm:gap-20 pt-10">
      <Title text1={'about'} text2={'us'} />

      {/* our mission */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-5">
        <img src={assets.about_img} alt="" className="w-full sm:w-1/2" />

        <div className="flex flex-col justify-center items-start gap-10 text-wrap">
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <p className="font-bold text-xl">Our mission</p>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <Title text1={'why'} text2={'choose us'} />

      {/* why choose us */}
      <div className="flex flex-col sm:flex-row justify-center items-center text-wrap">
        {
          whyChooseUs.map((reason, index) => (
            <div key={index} className="flex flex-col justify-center items-start gap-10 p-10 border border-gray-200">
              <p className="font-bold text-lg">{reason.title}</p>
              <p className="text-sm">{reason.desc}</p>
            </div>
          ))
        }
      </div>

      {/* subscribe */}
      <SubscribeNow />
    </div>
  )
}

export default About