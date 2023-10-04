import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="bg-[#1f1f1f] rounded-[10px] p-4 shadow-md mb-4" key={index}>
          <div className="flex md:items-center cursor-pointer">
            <div className="mt-2 mr-2">
            <div className="flex flex-row gap-3 w-full items-center mb-3">
        <div className="skeleton-avatar bg-[#3f3f3f] animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row ml-0 gap-3 items-center">
            <div className="skeleton-username-notification bg-[#3f3f3f] animate-pulse"></div>
          </div>
          <div className="flex flex-row justify-between mr-12 items-center mt-1">
            <div className="skeleton-stats-notification bg-[#3f3f3f] animate-pulse"></div>
          </div>
        </div>
      </div>
            </div>
            <div>
              <div className="skeleton-text text-lg font-semibold" />
              <div className="skeleton-text text-sm opacity-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
