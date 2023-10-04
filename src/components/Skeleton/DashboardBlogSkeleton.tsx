import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

const ExperienceCardSkeleton = () => {
  const isEven = (num:any) => num % 2 === 0;

  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <VerticalTimelineElement
          contentStyle={{
            background: '#1d1836',
            color: '#fff',
            flexDirection: isEven(index) ? 'row-reverse' : 'row',
          }}
          contentArrowStyle={{
            borderRight: isEven(index) ? '7px solid #232631' : 'none',
            borderLeft: isEven(index) ? 'none' : '7px solid #232631',
          }}
          className="cursor-pointer"
          icon={
            <div className="flex justify-center items-center w-full h-full">
              <div className="skeleton-image w-20 h-20 rounded-full"></div>
            </div>
          }
        >
          <div className="relative">
            <div className="flex justify-end card-img_hover">
              <div className="bg-black w-10 h-10 rounded-full border border-1 border-purple-500 flex justify-center items-center cursor-pointer flex-col">
                <div className="skeleton-icon w-4 h-4 bg-[#1d1836] rounded"></div>
                <div className="skeleton-icon w-4 h-4 bg-[#1d1836] rounded mt-1"></div>
              </div>
            </div>
            <div className="title">
              <h3 className="text-white text-[24px] font-bold">
                <div className="skeleton-text w-4/5 h-6 bg-[#1d1836] rounded"></div>
              </h3>
            </div>
            <div className="flex justify-start items-center mt-2">
              <p className="text-secondary text-[16px] font-semibold">
                <div className="skeleton-text w-24 h-4 bg-[#1d1836] rounded"></div>
              </p>
              <div className="status">
                <div className="skeleton-button w-20 h-8 bg-[#cc00ff] rounded-2xl"></div>
              </div>
            </div>
          </div>
          <p>
            <div className="skeleton-text w-full h-4 bg-[#1d1836] rounded mt-2"></div>
            <div className="skeleton-text w-full h-4 bg-[#1d1836] rounded mt-2"></div>
            <div className="skeleton-text w-full h-4 bg-[#1d1836] rounded mt-2"></div>
          </p>
          <div className="icons flex justify-between items-center gap-2 mt-5">
            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
              <div className="skeleton-button w-8 h-8 bg-[#1d1836] rounded"></div>
              <div className="skeleton-button w-8 h-8 bg-[#1d1836] rounded"></div>
              <div className="skeleton-button w-8 h-8 bg-[#1d1836] rounded"></div>
            </div>
            <div className="skeleton-button w-36 h-8 bg-[#1d1836] rounded"></div>
          </div>
        </VerticalTimelineElement>
      ))}
    </>
  );
};

export default ExperienceCardSkeleton;
