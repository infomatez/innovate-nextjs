import { fadeIn } from '@/src/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

type PersonCardProps = {
  designation: string;
  index: number;
  image: string;
  name: string;
};

const PersonCard = ({ index, image, name, designation }: PersonCardProps) => (
  <div className=" md:w-[250px] w-[100%] cursor-pointer">
    <motion.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        className={`bg-black rounded-[20px] p-2 min-h-[200px]  flex justify-evenly items-center flex-col overflow-hidden relative`}
        id="card"
      >
        <div className='w-[100%] h-[50vh] md:h-[26.5vh] relative'><Image fill={true} className="w-[100%] h-[100%] rounded-3xl object-cover" src={image} alt={image} /></div>
        <div
          className="dets w-[100%] h-[100%] bg-[#1919199d] absolute top-0 -right-[100%] backdrop-blur-sm rounded-3xl text-white flex flex-col justify-center items-center "
          id="card-body"
        >
          <h1 className="text-grey-100 font-medium lg:text-[20px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] text-center">
            {name}
          </h1>
          <h2>{designation}</h2>
        </div>
      </div>
    </motion.div>
  </div>
);

export default PersonCard;
