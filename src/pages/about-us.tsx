import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import PersonCard from '../sections/about-us/person-card';
import { owners, testimonials } from '../utils/constant';
import CanvasLayout from '../layouts/canvas';
import { FeedbackCard } from '../sections/about-us/feedback-card';
import { useRouter } from 'next/router';
import {  PATH_AUTH } from '../routes/path';

AboutUs.getLayout = (page: React.ReactElement) => <CanvasLayout>{page}</CanvasLayout>;

export default function AboutUs() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-[95%] py-10 sm:h-screen h-[95vh] mx-auto overflow-y-scroll scrollbar-hide relative">
      <div className="one">
        <motion.div variants={textVariant()} className="flex justify-between items-center">
          <h2
            className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[28px] font-family: 'Fjalla One' h2tag"
            id="aboutush2"
          >
            About Us
          </h2>
          <button className="button-34" onClick={() => router.push(PATH_AUTH.root)}>
            Home Page
          </button>
        </motion.div>
        <div className="bg-red-500 w-fit h-fit mx-auto my-10 p-[1px] rounded-lg green-pink-gradient">
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-[14px] md:text-[20px] aboutusp max-w-3xl leading-6 md:leading-[30px] text-purpule font-bold bg-black-700 p-5 rounded-lg flex justify-center items-center w-full text-center mx-auto border border-1 text-white border-slate-400 hover:scale-105 "
            id="hovereffect"
          >
            Our blogging website provides a modern and interactive platform for users to read and create blogs. With a
            sleek UI and user-friendly features, our website offers a seamless experience for both readers and writers.
            Join our community of bloggers today and share your thoughts with the world.
          </motion.p>
        </div>
      </div>
      <motion.div variants={textVariant()}>
        <h2
          className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One' h2tag"
          id="aboutush2"
        >
          Our Team
        </h2>
      </motion.div>
      <div className="mt-10 flex flex-wrap gap-5 w-full justify-center">
        {owners.map((person, index) => (
          <PersonCard key={person.name} index={index} {...person} />
        ))}
      </div>

      <div className="mt-12 bg-black-800 rounded-[20px]">
        <div className="sm:px-16 px-6 sm:py-16 py-10 bg-tertiary rounded-2xl md:min-h-[300px]">
          <motion.div variants={textVariant()}>
            <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider text-slate-400">
              Why choose us?
            </p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One'">
              Testimonials.
            </h2>
          </motion.div>
        </div>
        <div className="sm:px-16 px-0 md:-mt-20 pb-14 flex flex-wrap justify-around gap-7">
          {testimonials.map((testimonial, index) => (
            <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
