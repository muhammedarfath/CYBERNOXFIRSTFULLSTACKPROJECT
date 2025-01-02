import React, { useState } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

function InterestRecievedSec() {
  const [filter, setFilter] = useState("received");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const receivedLikes = [
    {
      imgsrc: slide_img_1,
      name: "Sreya, 19",
    },
    {
      imgsrc: slide_img_2,
      name: "John, 25",
    },
    {
      imgsrc: slide_img_3,
      name: "Asha, 22",
    },
  ];

  const sentLikes = [
    {
      imgsrc: slide_img_4,
      name: "Arjun, 27",
    },
    {
      imgsrc: slide_img_5,
      name: "Maya, 23",
    },
  ];

  const bestmatches = filter === "received" ? receivedLikes : sentLikes;

  return (
    <div className="w-full overflow-hidden">
      <div className="h-[auto] flex flex-col gap-4 w-full overflow-hidden container mx-auto p-4 mt-4">
        <div className="flex justify-between gap-3">
          <h1 className="font-semibold text-4xl">
            {filter === "received" ? "Interest Received" : "Interest Sent"}
          </h1>
          <div className="relative flex gap-5">
            <MdFilterList
              className="text-3xl cursor-pointer"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            />

            {showFilterOptions && (
              <div className="absolute right-0 mt-9 w-64 z-50 bg-white rounded-md shadow-lg">
                <ul className="flex flex-col">
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-button hover:text-white ${
                      filter === "received" ? "font-semibold text-black" : ""
                    }`}
                    onClick={() => {
                      setFilter("received");
                      setShowFilterOptions(false);
                    }}
                  >
                    Interest Received
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-button hover:text-white ${
                      filter === "sent" ? "font-semibold text-primary" : ""
                    }`}
                    onClick={() => {
                      setFilter("sent");
                      setShowFilterOptions(false);
                    }}
                  >
                    Interest Sent
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <hr />

        <Link to="/profiledetails">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestmatches.map((match, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
              >
                <p className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-sm font-semibold z-10">
                  {match.name}
                </p>
                <img
                  className="h-[30rem] w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  src={match.imgsrc}
                  alt={match.name}
                />
                <div className="absolute inset-x-0 bottom-4 flex justify-end px-9">
                  <button className="bg-button text-white font-bold p-4 rounded-full flex items-center text-xs md:text-sm lg:text-base transition duration-200 transform hover:scale-110">
                    <FaHeartCirclePlus className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>

      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default InterestRecievedSec;
