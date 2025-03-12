import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SearchSkeleton() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Image Skeleton */}
            <div className="relative">
              <Skeleton height={256} className="w-full" />
              <div className="absolute top-2 right-2 bg-yellow-500 p-2 rounded-full">
                <Skeleton circle width={24} height={24} />
              </div>
            </div>

            {/* User Info Skeleton */}
            <div className="p-4">
              <Skeleton width={100} height={24} className="mb-2" />
              <Skeleton width={80} height={16} className="mb-2" />
              <Skeleton width={120} height={16} className="mb-2" />
              <Skeleton width={150} height={16} className="mb-2" />

              {/* Location Skeleton */}
              <div className="mt-3">
                <Skeleton width={100} height={24} />
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex justify-between p-4">
              <Skeleton circle width={48} height={48} />
              <Skeleton circle width={48} height={48} />
              <Skeleton circle width={48} height={48} />
              <Skeleton circle width={48} height={48} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls Skeleton */}
      <div className="flex justify-center mt-8 space-x-4">
        <Skeleton width={80} height={40} />
        <Skeleton width={120} height={40} />
        <Skeleton width={80} height={40} />
      </div>
    </div>
  );
}

export default SearchSkeleton;