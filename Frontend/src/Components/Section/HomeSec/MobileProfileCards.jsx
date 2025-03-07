import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaGraduationCap, FaHeart } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { backendUrl } from "../../../Constants/Constants";
import { MdOutlineStarBorder, MdOutlineWorkOutline } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { useSelector } from "react-redux";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

export function MobileProfileCards({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [socket, setSocket] = useState(null);
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => console.log("WebSocket Connected");
    newSocket.onclose = (event) =>
      console.log("WebSocket Closed:", event.code, event.reason);
    newSocket.onerror = (error) => console.error("WebSocket Error:", error);

    setSocket(newSocket);

    return () => newSocket.close();
  }, [accessToken]);

  const sendWebSocketMessage = (option) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    socket.send(
      JSON.stringify({
        option,
        userId: slides[currentIndex].user_profile.user.id,
      })
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setShowHeart(true);
    sendWebSocketMessage("interest_sent");
    setTimeout(() => {
      setShowHeart(false);
      nextSlide();
    }, 1000);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setShowClose(true);
    setTimeout(() => {
      setShowClose(false);
      nextSlide();
    }, 1000);
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    setShowSave(true);

    try {
      await axiosInstance.post(`${requests.savePost}`, {
        saved_user_id: slides[currentIndex].user_profile.user.id,
      });
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
    }

    setTimeout(() => {
      setShowSave(false);
    }, 1000);
  };

  const handleProfileClick = (slide) => {
    navigate("/profiledetails", { state: { slide } });
  };

  console.log(slides);

  return (
    <div className="flex justify-center items-center p-4">
      {slides && slides.length > 0 ? (
        <div className="max-w-[calc(100vw-2rem)] w-[calc(100vw-2rem)] h-full bg-white rounded-lg shadow flex flex-col relative mb-4">
          <div onClick={() => handleProfileClick(slides[currentIndex])}>
            <img
              className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
              src={`${backendUrl}${slides[currentIndex].user_profile.user.profile_picture}`}
              alt={slides[currentIndex].username}
            />
          </div>
          <div className="absolute inset-x-0 top-4 flex justify-end px-4">
            <button
              onClick={handleSaveClick}
              className="bg-white text-black font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
            >
              <MdOutlineStarBorder className="text-2xl" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-28 flex justify-between px-4">
            <button
              onClick={handleCloseClick}
              className="bg-[#1A1A1A] text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
            >
              <CgClose className="text-2xl" />
            </button>
            <button
              onClick={handleHeartClick}
              className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
            >
              <FaHeart className="text-2xl" />
            </button>
          </div>

          {showHeart && (
            <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
              <FaHeart className="text-button text-5xl " />
            </div>
          )}
          {showClose && (
            <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
              <CgClose className="text-button text-5xl " />
            </div>
          )}
          {showSave && (
            <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
              <MdOutlineStarBorder className="text-button text-5xl " />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-2 text-center text-black">
            <h2 className="text-xl font-bold">
              {slides[currentIndex]?.user_profile?.name || "Unknown"}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <FaBriefcase className="text-lg" />
              <p className="font-bold">
                {slides[currentIndex]?.groom_bride_info?.occupation ||
                  "Not provided"}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <FaGraduationCap className="text-lg" />
              <p className="text-sm font-bold">
                {slides[currentIndex]?.groom_bride_info?.education ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
