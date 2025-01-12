import React, { useState } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import { FaHeart } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdFilterList } from "react-icons/md";

function BestMatchesSec() {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filter, setFilter] = useState("Partner Expectation");

  const Expectation = [
    { imgsrc: slide_img_1, name: "Sreya, 19" },
    { imgsrc: slide_img_2, name: "John, 25" },
    { imgsrc: slide_img_3, name: "Asha, 22" },
  ];

  const Location = [
    { imgsrc: slide_img_4, name: "Arjun, 27" },
    { imgsrc: slide_img_5, name: "Maya, 23" },
  ];

  const bestmatch = filter === "Partner Expectation" ? Expectation : Location;

  return (
    <div className="w-full h-full py-6">
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
          <div className="">
            <h1 className="text-4xl font-bold text-purple-800">
              {filter === "Partner Expectation"
                ? "Best Matches"
                : "Nearby Matches"}
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage all your likes and interests.
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
            >
              <MdFilterList className="text-2xl" />
              Filter
            </button>

            {showFilterOptions && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-md rounded-md p-2 z-50 animate-fade-in">
                <ul className="flex flex-col">
                  <li
                    className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      filter === "Partner Expectation"
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                    onClick={() => {
                      setFilter("Partner Expectation");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "Partner Expectation"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    Partner Expectation
                  </li>
                  <li
                    className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      filter === "Location" ? "bg-gray-200 font-bold" : ""
                    }`}
                    onClick={() => {
                      setFilter("Location");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "Location"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    Location
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Best Matches List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {bestmatch.map((user, index) => (
            <Link to="/profiledetails">
              <div
                key={index}
                className="relative bg-gradient-to-b from-primary rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-all"
              >
                <img
                  src={user.imgsrc}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                  {user.name}
                  <IoIosCheckmarkCircleOutline className="ml-2 text-green-500 text-xl" />
                </h3>
                <button className="text-white p-3 rounded-md bg-button mb-4">
                  Click to connect
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default BestMatchesSec;
