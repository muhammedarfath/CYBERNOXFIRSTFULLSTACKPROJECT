import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import SwiperSlideContent from "./SwiperSlideContent";
import { useNavigate } from "react-router-dom";

function ProfileCards({ slides }) {

  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileClick = (slide) => {
    navigate("/profiledetails", { state: { slide } });
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="container mx-auto md:px-[2.15rem]">
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container "
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <SwiperSlideContent
                slide={slide}
                swiperRef={swiperRef}
                index={index}
                handleProfileClick={handleProfileClick} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="slider-controler ">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default ProfileCards;
