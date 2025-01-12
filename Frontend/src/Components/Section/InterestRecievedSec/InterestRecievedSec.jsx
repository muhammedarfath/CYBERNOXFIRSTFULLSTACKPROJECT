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
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function InterestRecievedSec() {
  const [filter, setFilter] = useState("received");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const receivedLikes = [
    { imgsrc: slide_img_1, name: "Sreya, 19" },
    { imgsrc: slide_img_2, name: "John, 25" },
    { imgsrc: slide_img_3, name: "Asha, 22" },
  ];

  const sentLikes = [
    { imgsrc: slide_img_4, name: "Arjun, 27" },
    { imgsrc: slide_img_5, name: "Maya, 23" },
  ];

  const bestmatches = filter === "received" ? receivedLikes : sentLikes;

  return (
    <div className="w-full h-full">
      <div className="h-auto flex flex-col gap-4 container mx-auto p-4 mt-4">
        <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="font-extrabold text-4xl text-gray-800">
              {filter === "received" ? "Interest Received" : "Interest Sent"}
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
                      filter === "received" ? "bg-gray-200 font-bold" : ""
                    }`}
                    onClick={() => {
                      setFilter("received");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "received"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    Interest Received
                  </li>
                  <li
                    className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      filter === "sent" ? "bg-gray-200 font-bold" : ""
                    }`}
                    onClick={() => {
                      setFilter("sent");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "sent" ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    Interest Sent
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {bestmatches.map((match, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
            >
              <p className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {match.name}
              </p>
              <img
                src={match.imgsrc}
                alt={match.name}
                className="h-[30rem] w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <button className="bg-gradient-to-r from-primary to-white text-white font-bold px-5 py-2 rounded-full flex items-center gap-2 text-sm transition-transform transform hover:scale-110">
                  <FaHeartCirclePlus className="text-xl" />
                  Like
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Dock Section */}
        <div className="mt-6">
          <FloatingDockDemo />
        </div>
      </div>
    </div>
  );
}

export default InterestRecievedSec;
