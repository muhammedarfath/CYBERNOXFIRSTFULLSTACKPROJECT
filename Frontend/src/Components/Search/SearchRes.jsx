import React, { useState, useEffect } from "react";
import { backendUrl } from "../../Constants/Constants";
import { FaHeart, FaTimes, FaStar, FaCommentDots } from "react-icons/fa";

function SearchRes({ userData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Reset page when new search results come
  useEffect(() => {
    setCurrentPage(1);
  }, [userData]);

  // Get current page users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData?.slice(indexOfFirstUser, indexOfLastUser) || [];

  // Pagination Handlers
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  if (!Array.isArray(userData) || userData.length === 0) {
    return <p className="text-center mt-6">No users found.</p>;
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src={`${backendUrl}${user.profile_picture || ""}`}
                alt={user.first_name || "Profile"}
              />
              <div className="absolute top-2 right-2 bg-yellow-500 p-2 rounded-full">
                <FaStar className="text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {user.first_name || "No Name"}
              </h3>
              <p className="text-gray-600 text-sm">{user.unique_id}</p>
              <p className="text-sm font-bold mt-2">
                {user.age || "Age not available"} years, {user.height || "-"} cm
              </p>
              <p className="text-sm font-medium text-gray-700">
                {user.education || "Education not available"}
              </p>

              {/* Location */}
              <div className="mt-3 flex items-center">
                <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg flex items-center">
                  🇮🇳 {user.location || "Location not available"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between p-4">
              <button className="bg-white border border-red-500 text-red-500 p-3 rounded-full shadow-lg">
                <FaTimes size={20} />
              </button>
              <button className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                <FaCommentDots size={20} />
              </button>
              <button className="bg-white border border-gray-500 text-gray-500 p-3 rounded-full shadow-lg">
                <FaStar size={20} />
              </button>
              <button className="bg-white border border-red-500 text-red-500 p-3 rounded-full shadow-lg">
                <FaHeart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray text-gray-500"
              : "bg-button text-white"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {Math.ceil(userData.length / usersPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={indexOfLastUser >= userData.length}
          className={`px-4 py-2 rounded-lg ${
            indexOfLastUser >= userData.length
              ? "bg-gray text-gray-500"
              : "bg-button text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchRes;
