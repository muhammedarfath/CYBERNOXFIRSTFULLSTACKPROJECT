import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProfileSkeleton() {
  return (
    <div className="w-full overflow-scroll h-full mb-9">
      <div className="flex md:flex-row flex-col w-full p-4">
        {/* Left Column */}
        <div className="flex flex-col md:w-1/2 w-full flex-wrap gap-4 md:p-4 mb-28">
          {/* Main Profile Card Skeleton */}
          <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-5">
            <Skeleton circle={true} height={100} width={100} />
            <div className="flex flex-col gap-2">
              <Skeleton width={150} height={20} />
              <Skeleton width={200} height={15} />
            </div>
          </div>

          {/* Basic Details Skeleton */}
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md">
            <Skeleton height={150} />
          </div>

          {/* Contact Details Skeleton */}
          <div className="w-full bg-white p-2 rounded-lg shadow-md">
            <Skeleton height={100} />
          </div>

          {/* Other Sections Skeleton */}
          {[1, 2, 3, 4, 5, 6].map((key) => (
            <div key={key} className="w-full bg-white md:p-6 rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between">
                <Skeleton width={200} height={20} />
                <Skeleton circle={true} height={20} width={20} />
              </div>
              <div className="mt-4">
                <Skeleton height={100} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col md:w-1/2">
          {/* Add Profile Images Skeleton */}
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <Skeleton height={200} />
          </div>

          {/* Posts Skeleton */}
          <div className="columns-2 xl:columns-3 p-4 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <div key={key} className="relative">
                <Skeleton height={200} />
              </div>
            ))}
          </div>

          {/* Saved Profiles Skeleton */}
          <div className="columns-1 xl:columns-1 p-4 gap-4 space-y-4 w-full mb-40">
            <div className="w-full md:p-4 md:mt-4">
              <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
                <Skeleton width={200} height={30} />
              </div>

              <div className="columns-2 xl:columns-3 p-4 gap-4 space-y-4">
                {[1, 2, 3].map((key) => (
                  <div key={key} className="relative">
                    <Skeleton height={150} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;