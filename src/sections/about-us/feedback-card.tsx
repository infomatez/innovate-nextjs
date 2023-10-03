import { fadeIn } from '@/src/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
};

export const FeedbackCard = ({ index, testimonial, name, designation, company, image }: FeedbackCardProps) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className="bg-[#00091f] p-5 md:p-10 rounded-3xl xs:w-[100px] w-[350px]"
  >
    <p className="text-white font-black text-[48px] leading-[15px] mt-4">&quot;</p>
    <div className="mt-1 ">
      <p className="text-white tracking-wider text-[16px] md:text-[18px]">{testimonial}</p>
      <div className="mt-7 flex justify-between items-center">
        <div className="flex-1 flex flex-column">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
        </div>
        <div className="w-10 h-10 relative">
          <Image
            fill={true}
            src={image}
            alt={`feedback-by-${name}`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <p className="mt-1 text-secondary text-[14px]">
        {designation} of {company}
      </p>
    </div>
  </motion.div>
);
