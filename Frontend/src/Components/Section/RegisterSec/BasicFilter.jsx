import slide_img_1 from "../../../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../../../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../../../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../../../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineStarBorder } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import Login from "../../Modal/Login";

function BasicFilter() {
  const [lookingFor, setLookingFor] = useState("Bride");
  const [ageFrom, setAgeFrom] = useState("22");
  const [ageTo, setAgeTo] = useState("26");
  const [heightFrom, setHeightFrom] = useState("150");
  const [heightTo, setHeightTo] = useState("170");
  const [community, setCommunity] = useState("Any");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const profiles = [
    {
      id: 1,
      name: "CM123456",
      age: 28,
      location: "Kerala, India",
      image: slide_img_1,
      liked: false,
    },
    {
      id: 2,
      name: "CM234567",
      age: 26,
      location: "Mumbai, India",
      image: slide_img_2,
      liked: true,
    },
    {
      id: 3,
      name: "CM345678",
      age: 27,
      location: "Delhi, India",
      image: slide_img_3,
      liked: false,
    },
    {
      id: 4,
      name: "CM456789",
      age: 25,
      location: "Bangalore, India",
      image: slide_img_4,
      liked: false,
    },
    {
      id: 4,
      name: "CM456789",
      age: 25,
      location: "Bangalore, India",
      image: slide_img_5,
      liked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary mt-20 p-6 flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <label className="text-white whitespace-nowrap">
              I am Looking for a
            </label>
            <div className="relative w-full ">
              <select
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
              >
                <option>Bride</option>
                <option>Groom</option>
              </select>
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Age</label>
            <div className="flex gap-2">
              <div className="relative w-20">
                <select
                  value={ageFrom}
                  onChange={(e) => setAgeFrom(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                    <option key={age}>{age}</option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <span className="text-white">to</span>
              <div className="relative w-20">
                <select
                  value={ageTo}
                  onChange={(e) => setAgeTo(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                    <option key={age}>{age}</option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Height</label>
            <div className="flex gap-2">
              <div className="relative w-20">
                <select
                  value={heightFrom}
                  onChange={(e) => setHeightFrom(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 61 }, (_, i) => i + 140).map(
                    (height) => (
                      <option key={height}>{height}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <span className="text-white">to</span>
              <div className="relative w-20">
                <select
                  value={heightTo}
                  onChange={(e) => setHeightTo(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
                >
                  {Array.from({ length: 61 }, (_, i) => i + 140).map(
                    (height) => (
                      <option key={height}>{height}</option>
                    )
                  )}
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <label className="text-white">Community</label>
            <div className="relative w-full ">
              <select
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-8 rounded-md w-full"
              >
                <option>Any</option>
                <option>Catholic</option>
                <option>Protestant</option>
                <option>Orthodox</option>
              </select>
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="w-full items-center flex justify-center">
          <button className="bg-button max-w-xl  text-white py-2 px-9 rounded-md hover:bg-teal-500 transition-colors w-full ">
            SEARCH
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer" 
              onClick={onOpen}
            >
              <div className="relative">
                <img
                  src={profile.image}
                  alt={`Profile ${profile.name}`}
                  className="w-full h-64 object-cover"
                />
                <button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md"
                  aria-label={profile.liked ? "Unlike profile" : "Like profile"}
                >
                  <MdOutlineStarBorder className="text-pink-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{profile.name}</h3>
                <p className="text-sm text-gray-500">
                  {profile.age} years | {profile.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default BasicFilter;
