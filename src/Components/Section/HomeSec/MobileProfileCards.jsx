import React, { useState } from "react";

export function MobileProfileCards({ slides }) {
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
        <img
          className="rounded-lg object-cover w-full h-[calc(100vh-10.4rem)] transition-all duration-500"
          src={slides[currentIndex].imgsrc}
          alt={slides[currentIndex].name}
        />
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            &#60;
          </button>
          <button
            onClick={nextSlide}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            &#62;
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center text-white">
          <h2 className="text-xl font-bold">{slides[currentIndex].name}</h2>
          <p>{slides[currentIndex].status}</p>
          <p className="text-sm">{slides[currentIndex].university}</p>
        </div>
      </div>
    </div>
  );
}
