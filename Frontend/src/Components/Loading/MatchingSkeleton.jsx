import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MatchingSkeleton() {
  return (
    <div className="w-full h-full py-6">
      <div className="container mx-auto p-4">

        {/* Grid Layout for User Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative bg-gradient-to-b from-primary rounded-lg shadow-lg p-4 flex flex-col items-center">
              <Skeleton circle width={128} height={128} className="mb-4" />
              <Skeleton width={150} height={25} className="mb-2" />
              <Skeleton width={120} height={40} className="mb-4" />
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="flex justify-center mt-8">
          <Skeleton width={120} height={40} />
        </div>
      </div>
    </div>
  );
}

export default MatchingSkeleton;