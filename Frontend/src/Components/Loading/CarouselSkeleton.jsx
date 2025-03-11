import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CarouselSkeleton() {
  return (
    <div className="relative w-full">
      <div className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]">
        <div className="flex flex-row justify-start gap-4 lg:pl-96 md:pl-80 pl-20 max-w-7xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div className="relative rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-96 overflow-hidden flex flex-col items-start justify-start">
              <div key={index} className="w-full">
                <Skeleton
                  height={500}
                  borderRadius="1rem"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          disabled
        >
          <Skeleton circle width={24} height={24} />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          disabled
        >
          <Skeleton circle width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

export default CarouselSkeleton;
