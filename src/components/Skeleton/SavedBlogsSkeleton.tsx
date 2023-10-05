import React from 'react';

const SavedBlogsSkeleton = () => {
  return (
  <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="blog-bg-ct p-5 rounded-2xl mt-16 w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto cursor-pointer">
          <div className="relative w-full sm:h-[230px] h-fit bg-[#1f1f1f] rounded-2xl" />
          <div className="mt-5">
            <h3 className="text-white font-bold sm:text-[24px] text-[14px] cursor-pointer">
              <div className="skeleton-text w-4/5 h-6 bg-[#1f1f1f] rounded" />
            </h3>
            <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
              <div className="skeleton-text w-full h-4 bg-[#1f1f1f] rounded" />
              <div className="skeleton-text w-full h-4 mt-2 bg-[#1f1f1f] rounded" />
              <div className="skeleton-text w-4/5 h-4 mt-2 bg-[#1f1f1f] rounded" />
            </p>
          </div>
          <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
            <div className="skeleton-text w-1/5 h-4 bg-[#1f1f1f] rounded" />
            <div className="skeleton-text w-1/5 h-4 bg-[#1f1f1f] rounded" />
            <div className="skeleton-text w-1/5 h-4 bg-[#1f1f1f] rounded" />
          </div>
        </div>
      ))}
  </>
  );
};

export default SavedBlogsSkeleton;
