import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaGraduationCap, FaHeart } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { backendUrl } from "../../../Constants/Constants";
import { MdOutlineStarBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import userphoto from "../../../assets/logo PNG M.png";
import requests from "../../../lib/urls";
import axiosInstance from "../../../axios";
import indian from "../../../assets/Indian Flag Icon.png";
import AuthContext from "../../../context/AuthContext";
import { useNotifyWebSocket } from "../../hooks/useNotifyWebSocket";


export function MobileProfileCards({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const accessToken = useSelector((state) => state.auth.token);

  const navigate = useNavigate();
  const [showHeart, setShowHeart] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const socket = useNotifyWebSocket(accessToken);

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const cardRef = useRef(null);
  const { fetchDetails } = useContext(AuthContext);

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

  const nextSlide = (direction) => {
    // Set the swipe direction for animation
    setSwipeDirection(direction);

    // After animation completes, move to next slide
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
      setSwipeDirection(null);
      setOffsetX(0);
    }, 300);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setShowHeart(true);
    sendWebSocketMessage("interest_sent");
    setTimeout(() => {
      setShowHeart(false);
      nextSlide("right");
    }, 1000);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    nextSlide("left");
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    setShowSave(true);

    try {
      await axiosInstance.post(`${requests.savePost}`, {
        saved_user_id: slides[currentIndex].user_profile.user.id,
      });
      fetchDetails();
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

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine if swipe was significant enough
    if (offsetX > 100) {
      // Swipe right - like
      setShowHeart(true);
      sendWebSocketMessage("interest_sent");
      setTimeout(() => {
        setShowHeart(false);
        nextSlide("right");
      }, 300);
    } else if (offsetX < -100) {
      // Swipe left - reject
      setShowClose(true);
      setTimeout(() => {
        setShowClose(false);
        nextSlide("left");
      }, 300);
    } else {
      // Reset if swipe wasn't significant
      setOffsetX(0);
    }
  };

  // Mouse handlers for desktop swipe gestures
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine if swipe was significant enough
    if (offsetX > 100) {
      // Swipe right - like
      setShowHeart(true);
      sendWebSocketMessage("interest_sent");
      setTimeout(() => {
        setShowHeart(false);
        nextSlide("right");
      }, 300);
    } else if (offsetX < -100) {
      // Swipe left - reject
      setTimeout(() => {
        nextSlide("left");
      }, 300);
    } else {
      // Reset if swipe wasn't significant
      setOffsetX(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setOffsetX(0);
    }
  };

  // Calculate card styles based on swipe state
  const getCardStyle = () => {
    if (swipeDirection === "left") {
      return "translate-x-[-150%] rotate-[-20deg] opacity-0";
    } else if (swipeDirection === "right") {
      return "translate-x-[150%] rotate-[20deg] opacity-0";
    } else if (isDragging) {
      const rotate = offsetX * 0.1; // Adjust rotation based on swipe distance
      return `translate-x-[${offsetX}px] rotate-[${rotate}deg]`;
    }
    return "";
  };

  // Calculate background color based on swipe direction
  const getOverlayStyle = () => {
    if (offsetX > 50) {
      // Green overlay for right swipe (like)
      const opacity = Math.min(0.3, offsetX / 300);
      return { backgroundColor: `rgba(0, 255, 0, ${opacity})` };
    } else if (offsetX < -50) {
      // Red overlay for left swipe (dislike)
      const opacity = Math.min(0.3, Math.abs(offsetX) / 300);
      return { backgroundColor: `rgba(255, 0, 0, ${opacity})` };
    }
    return {};
  };

  return (
    <div className="flex justify-center items-center p-4">
      {slides && slides.length > 0 ? (
        <div
          ref={cardRef}
          className={`max-w-[calc(100vw-2rem)] w-[calc(100vw-2rem)] h-full bg-[#e0e0e0] rounded-lg shadow flex flex-col relative mb-4 transition-all duration-300 ease-out ${getCardStyle()}`}
          style={{
            transform: isDragging
              ? `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)`
              : "",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute inset-0 rounded-lg z-10 transition-colors duration-200"
            style={getOverlayStyle()}
          />

          <div
            style={{ position: "relative", zIndex: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              handleProfileClick(slides[currentIndex]);
            }}
          >
            {slides[currentIndex].user_profile &&
            slides[currentIndex].user_profile.user &&
            slides[currentIndex].user_profile.user.profile_picture ? (
              <img
                className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
                src={`${backendUrl}${slides[currentIndex].user_profile.user.profile_picture}`}
                alt={slides[currentIndex].username}
              />
            ) : (
              <img
                src={userphoto || "/placeholder.svg"}
                alt="image"
                className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
              />
            )}
          </div>

          <div className="absolute inset-x-0 top-4 flex justify-end px-4">
            <button
              onClick={handleSaveClick}
              className="bg-white text-black font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110 z-20"
            >
              <MdOutlineStarBorder className="text-2xl" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-36 flex justify-between px-4">
            <button
              onClick={handleCloseClick}
              className="bg-[#1A1A1A] text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110 z-20"
            >
              <CgClose className="text-2xl" />
            </button>
            <button
              onClick={handleHeartClick}
              className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110 z-20"
            >
              <FaHeart className="text-2xl" />
            </button>
          </div>

          {/* Direction indicators for swipe */}
          {offsetX > 50 && (
            <div className="absolute top-1/4 right-8 transform rotate-12 z-20">
              <FaHeart className="text-green-500 text-6xl opacity-80" />
            </div>
          )}

          {offsetX < -50 && (
            <div className="absolute top-1/4 left-8 transform -rotate-12 z-20">
              <CgClose className="text-red-500 text-6xl opacity-80" />
            </div>
          )}

          {showHeart && (
            <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart z-30">
              <FaHeart className="text-button text-5xl " />
            </div>
          )}
          {showSave && (
            <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart z-30">
              <MdOutlineStarBorder className="text-button text-5xl " />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-2 text-center text-black z-20">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 text-center lg:text-left">
              {slides[currentIndex]?.user_profile?.name || "Unknown"}
            </h1>
            <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
              {calculateAge(slides[currentIndex]?.user_profile?.date_of_birth)}{" "}
              yrs, {slides[currentIndex]?.user_profile?.religion}
            </p>
            <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
              {slides[currentIndex]?.groom_bride_info?.occupation ||
                "Not provided"}{" "}
            </p>
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex items-center gap-2 mt-2 bg-gray px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
                <img src={indian} alt="Indian flag" className="w-5 h-5" />
                <span className="text-gray-700 text-sm">
                  {slides[currentIndex]?.groom_bride_info?.city},{" "}
                  {slides[currentIndex]?.groom_bride_info?.state},{" "}
                  {slides[currentIndex]?.groom_bride_info?.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No users found</p>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-heart {
          animation: heartBeat 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
