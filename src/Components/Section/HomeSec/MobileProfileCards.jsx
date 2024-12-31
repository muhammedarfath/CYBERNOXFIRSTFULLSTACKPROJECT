import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

export function MobileProfileCards({ slides, swiperRef }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-sm w-full h-full bg-white rounded-lg shadow flex flex-col relative">
        <Link to="/profiledetails">
          <img
            className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
            src={slides[currentIndex].imgsrc}
            alt={slides[currentIndex].name}
          />
        </Link>

        <div className="absolute inset-x-0  bottom-28 flex justify-between px-4">
          <button
            onClick={(e) => {
              nextSlide()
              e.stopPropagation();
            }}
            className="bg-[#1A1A1A] text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
          >
            <CgClose className="text-2xl" />
          </button>
          <button
            onClick={(e) => {
              nextSlide()
              e.stopPropagation();
            }}
            className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
          >
            <FaHeart className="text-2xl" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-25 p-4 text-center text-black">
          <h2 className="text-xl font-bold">{slides[currentIndex].name}</h2>
          <p>{slides[currentIndex].status}</p>
          <p className="text-sm">{slides[currentIndex].university}</p>
        </div>
      </div>
    </div>
  );
}
