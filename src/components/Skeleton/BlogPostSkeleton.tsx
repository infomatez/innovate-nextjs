
import React from 'react';

const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] pr-[30px]">
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index}>
        <div className="skeleton-text skeleton-title bg-[#3f3f3f] animate-pulse"></div>
      </div>  
      ))}
      <div className="flex flex-row gap-3 w-full items-center mb-3">
        <div className="skeleton-avatar bg-[#3f3f3f] animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row ml-0 gap-3 items-center">
            <div className="skeleton-username bg-[#3f3f3f] animate-pulse"></div>
            <div className="skeleton-follow-button bg-[#3f3f3f] skeleton-loading animate-pulse"></div>
          </div>
          <div className="flex flex-row justify-between mr-12 items-center mt-1">
            <div className="skeleton-stats bg-[#3f3f3f] animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="skeleton-image bg-[#3f3f3f] animate-pulse"></div>
      <div className="relative flex gap-4 flex-row justify-start flex-wrap mt-4 mb-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="skeleton-category bg-[#3f3f3f] animate-pulse"></span>
        ))}
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between">
        <div className="justify-start items-center gap-3 inline-flex mt-4">
          <button className="min-w-0 w-8">
            <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
          </button>
        </div>
        <div className="flex flex-row justify-start gap-5 relative items-center">
          <button>
            <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
          </button>
          <button>
            <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
          </button>
          <button>
            <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
          </button>
        </div>
      </div>
      <hr className="opacity-25 bg-light relative bg-white w-full h-[2px]  block mt-5" />
      <div className="flex flex-col flex-wrap gap-20 relative w-full mt-5">
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="skeleton-text skeleton-paragraph bg-[#3f3f3f] animate-pulse"></div>
        ))}
        <div className="skeleton-image bg-[#3f3f3f] animate-pulse"></div>
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="skeleton-text skeleton-paragraph bg-[#3f3f3f] animate-pulse"></div>
        ))}
        <div>
          <div className="flex flex-row gap-3 w-full items-center cursor-pointer mb-4">
            <div className="skeleton-icon-container">
              <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
            </div>
            <div className="skeleton-text skeleton-comment bg-[#3f3f3f] animate-pulse"></div>
          </div>
          <div className="bg-[#212121] flex-row justify-start flex-column gap-5 relative w-full h-71 items-end pb-2 px-2 rounded-[19.296960830688477px] hidden">
            <div className="h-[215px] overflow-auto smooth-scroll" style={{ padding: '15px 20px' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="skeleton-comment-box bg-[#3f3f3f] animate-pulse">
                  <div className="skeleton-comment-header bg-[#3f3f3f] animate-pulse">
                    <div className="skeleton-avatar bg-[#3f3f3f] animate-pulse"></div>
                    <div className="skeleton-comment-details bg-[#3f3f3f] animate-pulse">
                      <div className="skeleton-username bg-[#3f3f3f] animate-pulse"></div>
                      <div className="skeleton-comment-time bg-[#3f3f3f] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="skeleton-comment-content bg-[#3f3f3f] animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="flex w-full  bottom-5 position-absolute right-0 bottom-[10px]">
              <form className="h-[50px] w-full flex rounded-lg justify-between px-2 items-center">
                <textarea
                  className="skeleton-comment-input bg-[#3f3f3f] animate-pulse"
                  placeholder="Loading..."
                ></textarea>
                <button className="skeleton-comment-submit bg-[#3f3f3f] animate-pulse">
                  <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-[rgba(36,_35,_35,_0.35)] p-4">
          <div className="flex flex-col justify-start gap-3 relative w-full items-stretch">
            <div className="flex flex-row justify-start gap-px relative items-center mb-px mr-12">
              <div className="skeleton-avatar bg-[#3f3f3f] animate-pulse"></div>
              <div className="skeleton-text skeleton-username bg-[#3f3f3f] animate-pulse"></div>
              <div className="skeleton-icon-container">
                <div className="skeleton-icon bg-[#3f3f3f] animate-pulse"></div>
              </div>
            </div>
            <div className="skeleton-text skeleton-follower-count bg-[#3f3f3f] animate-pulse"></div>
            <div className="skeleton-text skeleton-following bg-[#3f3f3f] animate-pulse"></div>
          </div>
          <h3 className="skeleton-text skeleton-subtitle bg-[#3f3f3f] animate-pulse"></h3>
          <div className="flex items-center flex-wrap mt-5 w-full">
            <div className="swiper-wrapper">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="swiper-slide">
                  <div className="blog-card m-2">
                    <div className="skeleton-image bg-[#3f3f3f] animate-pulse"></div>
                    <div className="skeleton-text skeleton-card-text bg-[#3f3f3f] animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
