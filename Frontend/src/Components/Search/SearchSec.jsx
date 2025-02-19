import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FilterOption from "./FilterOption";
import SearchFilter from "./SearchFilter";
import requests from "../../lib/urls";
import axiosInstance from "../../axios";
import { FaHeart, FaTimes, FaStar, FaCommentDots } from "react-icons/fa";
import { backendUrl } from "../../Constants/Constants";
import Loader from "../Loading/Loader";

function SearchSec() {
  const [filters, setFilters] = useState({
    weight: [30, 150],
    age: [18, 21],
    height: [137, 217],
  });
  const [profileId, setProfileId] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("filter");
  const [activeLocation, setActiveLocation] = useState("location");

  const handleSearch = async () => {
    if (!profileId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `${requests.Search}?profileId=${profileId}`
      );

      console.log(response, "search");
      setUserData(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert("User not found! Please enter a valid ID.");
        } else if (err.response.status === 400) {
          alert("Profile ID is required!");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }

      setError("User not found or error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full overflow-scroll bg-gray-100">
      <div className="m-5 hidden md:block">
        <Link to="/">
          <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white">
            <FaLeftLong />
            Back
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-16">
        <div className="flex gap-3 mb-4">
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "filter" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => {
              setActiveFilter("filter");
              setUserData(null); 
              setProfileId("")
            }}
          >
            Filter
          </button>
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "search" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => {
              setActiveFilter("search");
              setUserData(null);
              setProfileId("")

            }}
          >
            ID Search
          </button>
        </div>

        <FilterOption
          activeFilter={activeFilter}
          filters={filters}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
        />

        <SearchFilter
          activeFilter={activeFilter}
          profileId={profileId}
          setProfileId={setProfileId}
        />

        <button
          className="left-0 w-full right-0 bg-button text-white py-4 rounded-xl mt-3 flex items-center justify-center gap-2 shadow-md"
          onClick={handleSearch}
        >
          <CgSearch className="w-5 h-5" />
          Search
        </button>

        {loading ? (
          <div className="mt-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-4 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          userData && (
            <div className="mt-6 max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Image */}
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={`${backendUrl}${userData.profile_picture}`}
                  alt="Profile"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 p-2 rounded-full">
                  <FaStar className="text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {userData.first_name || "No Name"}
                </h3>
                <p className="text-gray-600 text-sm">{userData.unique_id}</p>
                <p className="text-sm font-bold mt-2">
                  {userData.age || "Age not available"} years, {userData.height}{" "}
                  cm
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {userData.education || "Education not available"}
                </p>

                {/* Location */}
                <div className="mt-3 flex items-center">
                  <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg flex items-center">
                    🇮🇳 {userData.location || "Location not available"}
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
          )
        )}
      </div>
    </div>
  );
}

export default SearchSec;
