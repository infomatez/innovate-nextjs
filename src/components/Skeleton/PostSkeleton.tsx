// PostSkeleton.tsx
import React from 'react';

const PostSkeleton: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-6 mb-4">
      <div className="bg-[#000] p-4 rounded-[15px]">
        <div className="animate-pulse">
          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
            Loading...
          </h3>
        </div>
        <div className="animate-pulse">
          <div className="w-full h-[138px] bg-[#333333] rounded-[23px]"></div>
        </div>
        <div className="flex w-full mt-1 animate-pulse">
          <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center">
            <div className="w-7 h-7 bg-[#333333] rounded-full"></div>
            <div className="w-7 h-7 bg-[#333333] rounded-full"></div>
            <div className="w-7 h-7 bg-[#333333] rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-end items-center mt-3">
          <div className="flex-1 mr-2">
            <div className="h-4 w-full bg-[#333333] rounded-md"></div>
            <div className="h-4 w-5/6 mt-1 bg-[#333333] rounded-md"></div>
          </div>
          <div className="bg-[#333333] w-16 h-6 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
