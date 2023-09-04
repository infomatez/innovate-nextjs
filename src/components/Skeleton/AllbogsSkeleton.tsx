import React from 'react';
import style from '../blogs/blogs.module.css';
import Image from 'next/image';


const CardSkeleton = ({ index }) => {
  const isRight = index % 2 !== 0;

  return (
    <div
    className={`${style['timeline-block']} ${
      index % 2 != 0 ? style['timeline-block-right'] : style['timeline-block-left']
    }`}
    key={index}
  >
    <div className={`${style['marker']} relative`}>
      <picture>
        <Image
          src="https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="New Blog"
          className="w-full h-full object-cover"
          fill={true}
        />
      </picture>
    </div>
    <div className={`${style['timeline-content']} rounded-lg`}>
        <h3 className={`mb-3 skeleton-loader-title`}></h3>
        <div className={`${style['image-box-inner']} mt-3`}>
          <div className="w-full md:w-[40%] mt-3">
            <div className="flex flex-row justify-end gap-3 relative items-center mt-[10px] md:mt-[50px] md:mb-50">
              <div className="min-h-0 min-w-0 mr-px relative w-4 shrink-0 skeleton-loader-icon"></div>
              <div className="bg-white-circle bg-cover bg-50%_50% bg-blend-normal flex flex-row justify-start relative w-4 shrink-0 h-4 items-center px-1 skeleton-loader-icon">
                <div className="flex flex-col justify-start pt-px relative w-2 shrink-0 items-center">
                </div>
              </div>
              <div className="min-h-0 min-w-0 relative w-3 shrink-0 skeleton-loader-icon"></div>
            </div>
            <div className="justify-start items-start gap-3 inline-flex mt-4 relative md:absolute bottom-0 left-0">
              <button className="px-[10px] py-2 bg-fuchsia-700 rounded-md justify-center items-center gap-2.5 flex mb-3 mt-3 skeleton-loader-button">
                <div className="text-white text-[13.021600723266602px] font-medium leading-3 skeleton-loader-button-text">Convert To Speech!</div>
              </button>
            </div>
          </div>

          <div className={`w-full md:flex-1 md:ml-4 mt-3 md:mt-0 mb-3 skeleton-loader-image`}></div>
        </div>
        <p className="w-[100%] h-full text-sm font-poppins tracking-[1.2151619052886964]  leading-[19.6px] text-white h-[130px] skeleton-loader-content"></p>
        <div className="flex justify-end mb-2">
          <button className="bg-white inline-flex flex-col justify-center relative h-10 text-black-100 items-stretch px-3 rounded-[19.5px] " >
            <span className="whitespace-nowrap text-base font-poppins leading-[7.97px] text-black-100 relative skeleton-loader-button-text ">
              Read More
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
