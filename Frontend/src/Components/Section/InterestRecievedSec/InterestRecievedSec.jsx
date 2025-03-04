import React, { useState } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNotification } from "../../../context/NotificationProvider";
import { backendUrl } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";

function InterestRecievedSec() {
  const navigate = useNavigate();
  const {
    receivedNotifications = [],
    sentNotifications = [],
    hasActiveSubscription,
  } = useNotification();
  const [filter, setFilter] = useState("received");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const receivedLikes = receivedNotifications.map((notification) => ({
    imgsrc: notification.sender?.profile_picture
      ? `${backendUrl}${notification.sender.profile_picture}`
      : slide_img_1,
    name: notification.sender?.email || "Unknown",
  }));

  const sentLikes = sentNotifications.map((notification) => ({
    imgsrc: notification.user?.profile_picture
      ? `${backendUrl}${notification.user.profile_picture}`
      : slide_img_1,
    name: notification.user?.email || "Unknown",
  }));


  const handleCardClick = (slide) => {
    if (hasActiveSubscription) {
      navigate("/profiledetails", { state: { slide } });
    } else {
      navigate("/pricing"); 
    }
  };

  const bestMatches = filter === "received" ? receivedLikes : sentLikes;

  return (
    <div className="w-full h-full">
      <div className="container mx-auto p-4 mt-4">
        <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="font-extrabold text-4xl text-gray-800">
              {filter === "received" ? "Interest Received" : "Interest Sent"}
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage all your likes and interests.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
            >
              <MdFilterList className="text-2xl" />
              Filter
            </button>

            {showFilterOptions && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-md rounded-md p-2 z-50 animate-fade-in">
                <ul className="flex flex-col">
                  {["received", "sent"].map((option) => (
                    <li
                      key={option}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                        filter === option ? "bg-gray-200 font-bold" : ""
                      }`}
                      onClick={() => {
                        setFilter(option);
                        setShowFilterOptions(false);
                      }}
                    >
                      <IoIosCheckmarkCircleOutline
                        className={`text-xl ${
                          filter === option ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      {option === "received"
                        ? "Interest Received"
                        : "Interest Sent"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {bestMatches.length > 0 ? (
            bestMatches.map((match, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleCardClick(match.userId)}
              >
                <p className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {match.name}
                </p>
                <img
                  src={match.imgsrc}
                  alt={match.name}
                  className={`h-[30rem] w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${
                    !hasActiveSubscription ? "brightness-75" : ""
                  }`}
                />

                {!hasActiveSubscription && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md rounded-lg"></div>
                )}

                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <button className="bg-gradient-to-r from-primary to-white text-white font-bold px-5 py-2 rounded-full flex items-center gap-2 text-sm transition-transform transform hover:scale-110">
                    <FaHeartCirclePlus className="text-xl" />
                    Like
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No interests found.
            </p>
          )}
        </div>

        {/* Floating Dock Section */}
        <div className="mt-6">
          <FloatingDockDemo />
        </div>
      </div>
    </div>
  );
}

export default InterestRecievedSec;
