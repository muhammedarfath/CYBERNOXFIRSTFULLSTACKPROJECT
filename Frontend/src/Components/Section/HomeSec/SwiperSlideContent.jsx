import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaRegUserCircle, FaHeart } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { backendUrl } from "../../../Constants/Constants";
import userphoto from "../../../assets/User Male Profile.svg";
import { useSelector } from "react-redux";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";




function SwiperSlideContent({ slide, index, swiperRef, handleProfileClick }) {
  const [showHeart, setShowHeart] = useState(false);
  const [showClose, setShowClose] = useState(false);
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

    return () => {
      newSocket.close();
    };
  }, []);





  const handleHeartClick = (e) => {

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }


    e.stopPropagation();
    setShowHeart(true);
    socket.send(
      JSON.stringify({
        option: "interest_sent",
        userId: slide.user_profile.user.id,
      })
    );
    

    setTimeout(() => {
      swiperRef.current.swiper.slideNext();
      setShowHeart(false);
    }, 1000);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setShowClose(true);
    setTimeout(() => {
      swiperRef.current.swiper.slideNext();
      setShowClose(false);
    }, 1000);
  };



  return (
    <div
      className="relative h-full w-full container cursor-pointer"
      onClick={() => handleProfileClick(slide)}
    >
      {slide.user_profile &&
      slide.user_profile.user &&
      slide.user_profile.user.profile_picture ? (
        <img
          src={`${backendUrl}${slide.user_profile.user.profile_picture}`}
          alt={`Slide ${index + 1}`}
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      ) : (
        <img
          src={userphoto}
          alt="image"
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
      )}

      <div className="absolute font-semibold flex mb-20 flex-col left-10 md:left-0 inset-x-0 bottom-0 p-4 pl-10 text-black bg-white opacity-60">
        <h1 className="text-xl md:text-2xl lg:text-4xl">
          {slide.user_profile.name}
        </h1>
        <span className="text-sm md:text-base flex items-center gap-2">
          <MdOutlineWorkOutline />
          {slide.groom_bride_info.occupation}
        </span>
        <span className="text-sm md:text-base flex items-center gap-2">
          <LuGraduationCap />
          {slide.groom_bride_info.education}
        </span>
      </div>
      {showHeart && (
        <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
          <FaHeart className="text-button text-9xl md:text-8xl" />
        </div>
      )}
      {showClose && (
        <div className="w-16 h-16 items-center absolute text-center inset-0 m-auto animate-heart">
          <CgClose className="text-button text-9xl md:text-8xl" />
        </div>
      )}

      <div className="absolute inset-x-0 top-4 flex justify-end px-10">
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="bg-white text-black font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
        >
          <MdOutlineStarBorder className="text-2xl" />
        </button>
      </div>

      <div className="absolute inset-x-0 md:bottom-4 bottom-10 flex justify-between px-20">
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
    </div>
  );
}

export default SwiperSlideContent;
