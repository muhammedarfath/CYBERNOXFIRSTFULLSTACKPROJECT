import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { backendUrl } from "../../../Constants/Constants";

export function MobileProfileCards({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  console.log(`${backendUrl}${slides[currentIndex].user_profile.user.profile_picture}`);

  return (
    <div className="flex justify-center items-center p-4">
      {slides && slides.length > 0 ? (
        <div
          className="max-w-[calc(100vw-2rem)] w-[calc(100vw-2rem)] h-full bg-white rounded-lg shadow flex flex-col relative mb-4"
        >
          <Link to="/profiledetails">
            <img
              className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
              src={`${backendUrl}${slides[currentIndex].user_profile.user.profile_picture}`} 
              alt={slides[currentIndex].username} 
            />
          </Link>

          <div className="absolute inset-x-0 bottom-28 flex justify-between px-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide(); // Go to previous slide
              }}
              className="bg-[#1A1A1A] text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
            >
              <CgClose className="text-2xl" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide(); // Go to next slide
              }}
              className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
            >
              <FaHeart className="text-2xl" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-25 p-4 text-center text-black">
            <h2 className="text-xl font-bold">{slides[currentIndex].username}</h2>
            <p>{slides[currentIndex].status}</p>
            <p className="text-sm">{slides[currentIndex].university}</p>
          </div>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
