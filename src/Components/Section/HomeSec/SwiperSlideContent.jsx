import React from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineStarBorder } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuGraduationCap } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";

function SwiperSlideContent({ slide, index, swiperRef }) {
  return (
    <div className="relative h-full w-full container">
      <img
        src={slide.imgsrc}
        alt={`Slide ${index + 1}`}
        className="object-cover object-left-top absolute h-full w-full inset-0 "
      />
      <div className="absolute font-semibold flex mb-20 flex-col left-10 md:left-0 rounded-[2rem] inset-x-0 bottom-0 p-4 pl-10 text-white ">
        <h1 className="text-xl md:text-2xl lg:text-4xl">{slide.name}</h1>
        <span className="text-sm md:text-base flex items-center gap-2">
          <FaRegUserCircle />
          {slide.pronoun}
        </span>
        <span className="text-sm md:text-base flex items-center gap-2">
          <MdOutlineWorkOutline />
          {slide.status}
        </span>
        <span className="text-sm md:text-base flex items-center gap-2">
          <LuGraduationCap />
          {slide.university}
        </span>
      </div>

      <div className="absolute inset-x-0 top-4 flex justify-end px-10">
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="bg-white text-black font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
        >
          <MdOutlineStarBorder className="text-2xl" />
        </button>
      </div>

      <div className="absolute inset-x-0 md:bottom-4 bottom-10  flex justify-between px-20">
        <button
          onClick={(e) => {
            swiperRef.current.swiper.slideNext();
            e.stopPropagation();
          }}
          className="bg-[#1A1A1A] text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
        >
          <CgClose className="text-2xl" />
        </button>

        <button
          onClick={(e) => {
            swiperRef.current.swiper.slideNext();
            e.stopPropagation();
          }}
          className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110"
        >
          <FaHeart className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default SwiperSlideContent;
