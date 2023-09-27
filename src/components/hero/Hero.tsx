'use client'
import { TypeAnimation } from "react-type-animation";
import SphereEffect from "../canvas/SphereEffect";
import Image from "next/image";
import logoIcon from '@/public/Logo-Main-image.png'
const Hero = () => {
  return (
    <section
      id="Home"
      className="flex sm:h-[100vh] h-auto w-full mx-auto justify-center items-center relative bg-cover"
    >
      <video src="./stars.mp4" autoPlay loop muted className="w-full absolute top-0 h-screen object-cover" />
      <div className="flex h-[100vh] md:h-[auto] sm:flex-row flex-col items-center justify-center lg:w-[80vw] w-[100%]">
        <div className="relative sm:h-[80%] sm:w-[60%] w-full h-[50%] md:h-[60%] ">
          {/*  <img
            src="./heromain.png"
            alt=""
            className="rounded-3xl w-auto sm:h-[50vh] h-[30vh]"
          /> */}
          <SphereEffect />
          <Image width={350} height={350} className="hero_img absolute object-contain top-0 bottom-0 left-0 right-0 m-auto" src="/astro.png" alt='astro image' />
        </div>
        <div className="flex flex-col justify-between items-center z-40">
          <div className="bg-[#201d1d] rounded-3xl p-1 w-auto sm:h-auto h-auto">
            <Image
              src={logoIcon}
              alt="logo icon"
              className="rounded-3xl lg:w-[25vw] md:w-[35vw] sm:w-[40vw] w-[60vw]"
            />
            <div className="text text-white flex flex-col xl:text-3xl sm:text-2xl text-xl gap-3 items-center w-auto">
              <h1 className="text-white font-bookman-old-style">
                Write what{" "}
                <span className="text-pink-100 font-bookman-old-style">
                  matters
                </span>{" "}
                to{" "}
              </h1>
              <h1 className='font-bookman-old-style'>you, and let others be</h1>
              <div className=" flex xl:w-[80%] w-[90%] justify-evenly">
                <h1 className="text-pink-100 font-bookman-old-style">
                  moved.
                </h1>
                <button
                  className="bg-pink-100 rounded-3xl py-1 px-2 xl:text-xl sm:text-lg text-sm font-bold text-black-0 hover:text-pink-100 hover:cursor-pointer hover:bg-black-100 hover:border hover:border-pink-bg-pink-100 transition ease-in-out duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div
            className="mt-10 flex sm:items-end justify-center font-bookman-old-style"
          >
            <TypeAnimation
              sequence={[
                "Create", // Types 'One'
                1500, // Waits 1s
                "Innovate", // Deletes 'One' and types 'Two'
                2500, // Waits 2s
                "Publish",
                3500, // Types 'Three' without deleting 'Two'
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "3em", fontWeight: "800", color: "#ff00f2" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero