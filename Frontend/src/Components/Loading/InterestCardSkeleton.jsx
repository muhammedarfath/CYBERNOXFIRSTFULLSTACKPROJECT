import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function InterestCardSkeleton() {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto p-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {[...Array(5)].map((_, index) => (
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
  )
}

export default InterestCardSkeleton
