import React, { useState } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdFilterList } from "react-icons/md";

function BestMatchesSec() {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filter, setFilter] = useState("Partner Expectation");

  const bestmatches = [
    { imgsrc: slide_img_1, name: "raku, 19" },
    { imgsrc: slide_img_2, name: "John, 25" },
    { imgsrc: slide_img_3, name: "Asha, 22" },
    { imgsrc: slide_img_4, name: "Arjun, 27" },
    { imgsrc: slide_img_5, name: "Maya, 23" },
  ];

  const Expectation = [
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

  const Location = [
    {
      imgsrc: slide_img_4,
      name: "Arjun, 27",
    },
    {
      imgsrc: slide_img_5,
      name: "Maya, 23",
    },
  ];

  const bestmatch = filter === "Partner Expectation" ? Expectation : Location;

  return (
    <div className="w-full overflow-hidden">
      <div className="h-[auto] w-full flex flex-col gap-3 overflow-hidden container mx-auto p-4 mt-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-4xl">
              {filter === "Partner Expectation" ? "Best Match" : "Location"}
            </h1>
            <MdFilterList
              className="text-3xl cursor-pointer"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            />
          </div>
        </div>
        {showFilterOptions && (
          <div className="absolute right-0 mt-9 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="flex flex-col">
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  filter === "Partner Expectation"
                    ? "font-semibold text-button"
                    : ""
                }`}
                onClick={() => {
                  setFilter("Partner Expectation");
                  setShowFilterOptions(false);
                }}
              >
                Partner Expectation
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  filter === "Location" ? "font-semibold text-button" : ""
                }`}
                onClick={() => {
                  setFilter("Location");
                  setShowFilterOptions(false);
                }}
              >
                Location
              </li>
            </ul>
          </div>
        )}
        <hr />
        <Link to="/profiledetails">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestmatch.map((match, index) => (
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
                    <FaHeart className="text-2xl" />
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

export default BestMatchesSec;
