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
import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import SwiperSlideContent from "./SwiperSlideContent";
import { Link, useNavigate } from "react-router-dom";

function ProfileCards() {
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);
  const navigate = useNavigate(); 
  const slideData = [
    {
      imgsrc: slide_img_1,
      name: "raku, 19",
      pronoun: "She",
      status: "Not Working",
      university: "Calcutta University 2020",
    },
    {
      imgsrc: slide_img_2,
      name: "John, 25",
      pronoun: "He",
      status: "Software Engineer",
      university: "XYZ University 2021",
    },
    {
      imgsrc: slide_img_3,
      name: "Asha, 22",
      pronoun: "She",
      status: "Student",
      university: "ABC University 2022",
    },
    {
      imgsrc: slide_img_4,
      name: "Arjun, 27",
      pronoun: "He",
      status: "Designer",
      university: "DEF University 2019",
    },
    {
      imgsrc: slide_img_5,
      name: "Maya, 23",
      pronoun: "She",
      status: "Photographer",
      university: "LMN University 2020",
    },
  ];

  useEffect(() => {
    const preloadImages = slideData.map((slide) => {
      const img = new Image();
      img.src = slide.imgsrc;
      return img.onload;
    });

    Promise.all(preloadImages).then(() => setIsLoading(false));
  }, [slideData]);

  const handleProfileClick = () => {
    navigate("/profiledetails");
  };

  return (
    <div className="h-full w-full overflow-hidden">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="loader">Loading...</div>
        </div>
      ) : (
          <div className="container mx-auto md:px-[2.15rem] " onClick={() => handleProfileClick()}>
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
              {slideData.map((slide, index) => (
                <SwiperSlide key={index}>
                  <SwiperSlideContent
                    slide={slide}
                    swiperRef={swiperRef}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      )}
      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default ProfileCards;
