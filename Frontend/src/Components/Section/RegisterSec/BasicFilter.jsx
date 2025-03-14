import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineStarBorder } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import Login from "../../Modal/Login";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { backendUrl } from "../../../Constants/Constants";
import userphoto from "../../../assets/default.jpg";

function BasicFilter() {
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [age, setAge] = useState({ min: 18, max: 50 });
  const [height, setHeight] = useState({ min: 140, max: 200 });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);

  const [options, setOptions] = useState({
    maritals: [],
    religions: [],
  });

  // Fetch default profiles and options on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all profiles
        const profilesResponse = await axiosInstance.get(requests.Search);
        setUserData(profilesResponse.data);

        // Fetch maritals and religions
        const [maritalsRes, religionsRes] = await Promise.all([
          axiosInstance.get(requests.getMarital),
          axiosInstance.get(requests.getReligion),
        ]);

        setOptions({
          maritals: maritalsRes.data || [],
          religions: religionsRes.data || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle search with filters
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        maritalStatus,
        religion,
        age: `${age.min}-${age.max}`,
        height: `${height.min}-${height.max}`,
      };

      const response = await axiosInstance.get(requests.Search, { params });
      setUserData(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert("No matching results found.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
      setError("User not found or error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const defaultProfiles = userData.slice(0, 8);
  console.log(defaultProfiles);

  // Utility function to calculate age from date_of_birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Filter Section */}
      <div className="bg-primary mt-20 p-6 flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto">
          {/* Marital Status Dropdown */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-white whitespace-nowrap">
              I am Looking for a
            </label>
            <div className="relative w-full">
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
              >
                <option value="">Select Marital Status</option>
                {options.maritals.map((marital) => (
                  <option key={marital.id} value={marital.id}>
                    {marital.status}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Age Dropdown */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Age</label>
            <div className="flex gap-2">
              <div className="relative w-20">
                <select
                  value={age.min}
                  onChange={(e) =>
                    setAge({ ...age, min: parseInt(e.target.value) })
                  }
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 50 - 18 + 1 }, (_, i) => i + 18).map(
                    (age) => (
                      <option key={age}>{age}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <span className="text-white">to</span>
              <div className="relative w-20">
                <select
                  value={age.max}
                  onChange={(e) =>
                    setAge({ ...age, max: parseInt(e.target.value) })
                  }
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 50 - 18 + 1 }, (_, i) => i + 18).map(
                    (age) => (
                      <option key={age}>{age}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Height Dropdown */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Height</label>
            <div className="flex gap-2">
              <div className="relative w-20">
                <select
                  value={height.min}
                  onChange={(e) =>
                    setHeight({ ...height, min: parseInt(e.target.value) })
                  }
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 200 - 140 + 1 }, (_, i) => i + 140).map(
                    (height) => (
                      <option key={height}>{height}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <span className="text-white">to</span>
              <div className="relative w-20">
                <select
                  value={height.max}
                  onChange={(e) =>
                    setHeight({ ...height, max: parseInt(e.target.value) })
                  }
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 200 - 140 + 1 }, (_, i) => i + 140).map(
                    (height) => (
                      <option key={height}>{height}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Religion Dropdown */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Community</label>
            <div className="relative w-full">
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
              >
                <option value="">Select Community</option>
                {options.religions.map((religion) => (
                  <option key={religion.id} value={religion.id}>
                    {religion.name}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full items-center flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-button max-w-xl text-white py-2 px-9 rounded-md hover:bg-teal-500 transition-colors w-full"
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* User Data Grid */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultProfiles.map((profile) => {
            const age = profile.user_profile?.date_of_birth
              ? calculateAge(profile.user_profile.date_of_birth)
              : "N/A"; 

            return (
              <div
                key={profile.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
                onClick={onOpen}
              >
                <div className="relative">
                  {profile.user_profile?.user?.profile_picture ? (
                    <img
                      src={`${backendUrl}${profile.user_profile.user.profile_picture}`}
                      alt={`Profile ${profile.name}`}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <img
                      src={userphoto}
                      alt="profile"
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <button
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
                    aria-label={
                      profile.liked ? "Unlike profile" : "Like profile"
                    }
                  >
                    <MdOutlineStarBorder className="text-pink-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">
                    {profile.user_profile?.name || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {age} years | {profile.groom_bride_info?.city || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Login Modal */}
      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default BasicFilter;
