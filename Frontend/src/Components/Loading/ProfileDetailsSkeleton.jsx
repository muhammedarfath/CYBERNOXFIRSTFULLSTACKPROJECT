import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { FaLeftLong } from "react-icons/fa6"
import { Link } from "react-router-dom"

function ProfileDetailsSkeleton() {
  return (
    <div className="h-screen bg-gray-100 overflow-scroll">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="hidden md:block">
          <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white text-sm md:text-base hover:bg-button-hover transition">
            <FaLeftLong />
            Back
          </button>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-12 gap-6">
          {/* Profile Image Section */}
          <div className="col-span-1 sm:col-span-4 lg:col-span-3">
            <div className="bg-white shadow rounded-lg p-4">
              <Skeleton height={300} className="mb-4" />
              <Skeleton height={20} width="70%" className="mb-2" />
              <Skeleton height={15} width="50%" className="mb-2" />
              <Skeleton height={15} width="60%" />
            </div>
          </div>

          {/* Profile Description Section */}
          <div className="col-span-1 sm:col-span-8 lg:col-span-9 mb-9">
            <div className="bg-white shadow rounded-lg p-6">
              <Skeleton height={28} width="40%" className="mb-4" />
              <Skeleton count={4} className="mb-4" />

              {/* Contact Details Section */}
              <div className="w-full h-auto mt-6 bg-[#f15d5d] bg-opacity-10 p-3 gap-5 rounded-2xl">
                <Skeleton height={50} className="mb-3" />
                <Skeleton height={50} className="mb-3" />
              </div>

              <Skeleton height={50} className="mt-4" />

              {/* Hobbies Section */}
              <div className="mt-6">
                <Skeleton height={28} width="40%" className="mb-4" />

                {/* Smoking & Drinking */}
                <div className="space-y-4 mb-6">
                  <Skeleton height={60} className="mb-3" />
                  <Skeleton height={60} className="mb-3" />
                </div>

                <Skeleton height={20} width="30%" className="mb-3" />
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} height={40} width={120} className="rounded-full" />
                  ))}
                </div>

                {/* Basic Details Section */}
                <Skeleton height={20} width="30%" className="mb-3 mt-6" />
                <div className="space-y-4 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} height={60} className="mb-3" />
                  ))}
                </div>

                {/* Education Section */}
                <Skeleton height={20} width="40%" className="mb-3" />
                <div className="space-y-4 mb-6">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} height={60} className="mb-3" />
                  ))}
                </div>

                {/* Family Background Section */}
                <Skeleton height={20} width="35%" className="mb-3" />
                <div className="space-y-4 mb-6">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} height={60} className="mb-3" />
                  ))}
                </div>

                {/* Location Section */}
                <Skeleton height={20} width="25%" className="mb-3" />
                <div className="space-y-4 mb-6">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} height={60} className="mb-3" />
                  ))}
                </div>

                {/* Contact Information Section */}
                <Skeleton height={20} width="40%" className="mb-3" />
                <div className="space-y-4 mb-6">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} height={60} className="mb-3" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetailsSkeleton

