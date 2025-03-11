import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
  return (
    <div className="h-full w-full overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-3 md:px-[2.15rem]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton
                height={500}
                borderRadius="1rem"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
