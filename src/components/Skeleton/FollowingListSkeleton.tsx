import React from 'react';

const FollowingListSkeleton = () => {
  return (
    <div className="following-list">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="following-user-skeleton " key={index}>
          <div className="eachitem flex flex-col bg-gray-700 p-2 h-12 rounded-2xl animate-pulse my-2">
            <div className="details flex justify-between mt-2">
              <div className="left flex gap-1 items-center">
                <div className="prof rounded-full bg-gray-600 w-4 h-4"></div>
                <div className="writer xl:text-xs text-[10px] bg-gray-600 h-4 w-16 rounded"></div>
                <div className="actions flex gap-1 items-center">
                  <div className="min-w-0 mr-px bg-gray-600 w-4 h-4 rounded"></div>
                </div>
              </div>
              <div className="right flex items-center">
                <div className="views bg-gray-600 font-bold rounded-2xl px-1 xl:text-xs text-[10px] w-8 h-4"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingListSkeleton;
