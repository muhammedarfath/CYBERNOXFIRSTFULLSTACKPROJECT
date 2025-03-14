import React, { useState, useEffect } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNotification } from "../../../context/NotificationProvider";
import { backendUrl } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import userphoto from "../../../assets/default.jpg";
import { useSelector } from "react-redux";
import InterestCardSkeleton from "../../Loading/InterestCardSkeleton";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

function InterestRecievedSec() {
  const navigate = useNavigate();
  const {
    receivedNotifications = [],
    sentNotifications = [],
    hasActiveSubscription,
    fetchUnreadNotifications,
  } = useNotification();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("received");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [socket, setSocket] = useState(null);
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket Closed:", event.code, event.reason);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setSocket(newSocket);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      newSocket.close();
    };
  }, [accessToken]);

  const mapNotificationData = (notifications, isReceived) => {
    return notifications
      .filter((item) => item.notification.notification_type === "interest")
      .map((item) => {
        const notification = item.notification;
        const userProfile = isReceived
          ? item.sender_details
          : item.receiver_details;
        const sender = isReceived ? notification.sender : notification.user;

        return {
          notification,
          userProfile,
          sender,
        };
      });
  };

  const receivedLikes = mapNotificationData(receivedNotifications, true);
  const sentLikes = mapNotificationData(sentNotifications, false);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await axiosInstance.patch(
        `${requests.MarkAsRead}${notificationId}/`
      );

      if (response.status !== 200) {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleCardClick = async (slide, notificationId, isRead) => {
    if (hasActiveSubscription || filter === "sent") {
      if (!isRead) {
        await markNotificationAsRead(notificationId);
      }
      navigate("/profiledetails", { state: { slide } });
    } else {
      navigate("/pricing");
    }
  };

  const handleLikeClick = async (e, userProfile) => {
    e.stopPropagation();

    if (!hasActiveSubscription) {
      navigate("/pricing");
      return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    try {
      socket.send(
        JSON.stringify({
          option: "interest_sent",
          userId: userProfile.user.id,
        })
      );

      console.log("Like sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending like:", error);
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

        {loading ? (
          <InterestCardSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
            {bestMatches.length > 0 ? (
              bestMatches.map((match, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() =>
                    handleCardClick(
                      match.userProfile,
                      match.notification.id,
                      match.notification.isRead
                    )
                  }
                >
                  {match.userProfile && match.userProfile.user_profile && (
                    <p className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {match.userProfile.user_profile.name}
                    </p>
                  )}
                  {match.userProfile &&
                    match.userProfile.user_profile &&
                    match.userProfile.user_profile.user && (
                      <img
                        src={
                          match.userProfile?.user_profile?.user?.profile_picture
                            ? `${backendUrl}${match.userProfile.user_profile.user.profile_picture}`
                            : userphoto
                        }
                        alt={match.userProfile?.user_profile?.name || "User"}
                        className={`h-[30rem] w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${
                          !hasActiveSubscription && filter === "received"
                            ? "filter blur-md"
                            : ""
                        }`}
                      />
                    )}
                  {!hasActiveSubscription && filter === "received" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  )}
                  {filter === "received" && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center">
                      <button
                        onClick={(e) => handleLikeClick(e, match.userProfile)}
                        className="bg-gradient-to-r from-primary to-white text-white font-bold px-5 py-2 rounded-full flex items-center gap-2 text-sm transition-transform transform hover:scale-110"
                      >
                        <FaHeartCirclePlus className="text-xl" />
                        Interested
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No interests found.
              </p>
            )}
          </div>
        )}

        <div className="mt-6">
          <FloatingDockDemo />
        </div>
      </div>
    </div>
  );
}

export default InterestRecievedSec;
