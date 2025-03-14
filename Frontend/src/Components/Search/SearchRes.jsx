import React, { useState, useEffect, useContext } from "react";
import { backendUrl } from "../../Constants/Constants";
import { FaHeart, FaTimes } from "react-icons/fa";
import userphoto from "../../assets/logo PNG M.png";
import SearchSkeleton from "../Loading/SearchSkeleton";
import { MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNotifyWebSocket } from "../hooks/useNotifyWebSocket";
import AuthContext from "../../context/AuthContext";
import requests from "../../lib/urls";
import axiosInstance from "../../axios";

function SearchRes({ userData, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const accessToken = useSelector((state) => state.auth.token);
  const socket = useNotifyWebSocket(accessToken);
  const { fetchDetails } = useContext(AuthContext);

  const handleHeartClick = (e, userId) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    e.stopPropagation();
    setShowHeart(true);

    socket.send(
      JSON.stringify({
        option: "interest_sent",
        userId: userId,
      })
    );
    setTimeout(() => {
      setShowHeart(false);
    }, 1000);
  };

  const handleSaveClick = async (e,userId) => {
    e.stopPropagation();
    setShowSave(true);

    await axiosInstance.post(`${requests.savePost}`, {
      saved_user_id: userId,
    });

    fetchDetails();
    setTimeout(() => {
      setShowSave(false);
    }, 1000);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [userData]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData?.slice(indexOfFirstUser, indexOfLastUser) || [];

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  if (!Array.isArray(userData) || userData.length === 0) {
    return <p className="text-center mt-6">No users found.</p>;
  }

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleProfileClick = (slide) => {
    navigate("/profiledetails", { state: { slide } });
  };

  return (
    <div className="mt-6">
      {isLoading ? (
        <>
          <SearchSkeleton />
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden "
            >
              <div
                className="relative cursor-pointer"
                onClick={() => handleProfileClick(user)}
              >
                {showSave && (
                  <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
                    <MdOutlineStarBorder className="text-button text-5xl md:text-8xl" />
                  </div>
                )}
                {showHeart && (
                  <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
                    <FaHeart className="text-button text-5xl md:text-8xl" />
                  </div>
                )}
                {user.user_profile?.user.profile_picture ? (
                  <img
                    className="w-full h-64 object-cover"
                    src={`${backendUrl}${
                      user.user_profile?.user.profile_picture || ""
                    }`}
                    alt={user.first_name || "Profile"}
                  />
                ) : (
                  <img
                    className="w-full h-64 object-cover"
                    src={userphoto}
                    alt="Profile"
                  />
                )}
                <div
                  className="absolute top-2 right-2 bg-white p-2 rounded-full transition duration-200 transform hover:scale-110 cursor-pointer"
                  onClick={(e) => handleSaveClick(e, user.user_profile.user.id)}
                >
                  <MdOutlineStarBorder className="text-black " />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {user.user_profile.name || "No Name"}
                </h3>
                <p className="text-gray-600 text-sm">{user.unique_id}</p>
                <p className="text-sm font-bold mt-2">
                  {calculateAge(user.user_profile.date_of_birth) ||
                    "Age not available"}{" "}
                  years, {user.user_profile.height || "-"} cm
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {user.groom_bride_info.education || "Education not available"}
                </p>

                {/* Location */}
                <div className="mt-3 flex items-center">
                  <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg flex items-center">
                    🇮🇳 {user.groom_bride_info.country},
                    {user.groom_bride_info.state},{user.groom_bride_info.city}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between p-4">
                <button className="bg-black  text-white p-3 rounded-full shadow-lg transition duration-200 transform hover:scale-110">
                  <FaTimes size={20} />
                </button>

                <button
                  onClick={(e) =>
                    handleHeartClick(e, user.user_profile.user.id)
                  }
                  className="bg-button p-3 rounded-full shadow-lg transition duration-200 transform hover:scale-110"
                >
                  <FaHeart size={20} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray text-gray-500" : "bg-button text-white"
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
