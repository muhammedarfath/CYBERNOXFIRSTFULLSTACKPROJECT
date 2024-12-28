import React, { useState } from "react";
import { Carousel, Card } from "../../../Components/ui/apple-cards-carousel"; // Importing Carousel and Card from your UI components
import { FaPaperPlane } from "react-icons/fa"; // Using React Icons for the send button
import { Link } from "react-router-dom";
import slide_img_1 from "../../../assets/Screenshot 2024-12-16 at 11.22.18 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-16 at 11.22.35 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-16 at 11.22.53 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-16 at 11.23.07 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-16 at 11.23.31 AM.png";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";

export function MessageSec() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-screen py-20 ">
      <div className=" flex flex-col gap-4 w-full n container mx-auto p-4 mt-5">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-4xl">Messages</h1>
        </div>
        <hr />
      </div>

      <Carousel items={cards} />

      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    title: "Sreya, 19",
    src: slide_img_1,
    content: <DummyContent />,
  },
  {
    title: "John, 25",
    src: slide_img_2,
    content: <DummyContent />,
  },
  {
    title: "Asha, 22",
    src: slide_img_3,
    content: <DummyContent />,
  },

  {
    title: "Arjun, 27",
    src: slide_img_4,
    content: <DummyContent />,
  },
  {
    title: "Maya, 23",
    src: slide_img_5,
    content: <DummyContent />,
  },

];
