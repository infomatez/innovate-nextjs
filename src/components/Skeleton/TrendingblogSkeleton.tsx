import React from 'react';

const TrendingCardSkeleton = () => {
  return (
    <div className="sm:w-[40%] md:w-[30%] lg:w-[20%] w-[90%]">
      <div className="card relative flex justify-center items-start h-full border-grey-200 border-[0.25px] rounded-[20px!important] bg-gray-200">
        <div className="w-[10%] h-8 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col w-[80%] ml-2 pb-4 bg-gray-300">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-4 ml-2 bg-gray-300 rounded-md"></div>
          <div className="w-full h-4 mt-2 bg-gray-300 rounded-md"></div>
          <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCardSkeleton;
