import React from "react";
import { TbEdit, TbCamera } from "react-icons/tb";
import userphoto from "../../../assets/User Male Profile.svg";
import indian from "../../../assets/Indian Flag Icon.png";

function MainProfileCard() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between p-6 bg-gray-50 rounded-lg gap-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray rounded-full flex items-center justify-center">
              <img
                src={userphoto}
                alt="Profile placeholder"
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full"
              />
            </div>
            <span className="text-gray-600 text-sm mt-2 block text-center">No Photo</span>
          </div>
          <button className="bg-gray text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors text-sm">
            <TbCamera className="w-5 h-5" />
            Take a Photo
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 text-center lg:text-left">
            Muhammed Arfath
          </h1>
          <p className="text-primary2 text-center lg:text-left">WT3677639</p>
          <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
            21 yrs, 156 cm (5'2"), Never Married, A Muslim
          </p>
          <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
            Computers/ IT, Software Consultant
          </p>
          <div className="flex items-center gap-2 mt-2 bg-gray px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
            <img src={indian} alt="Indian flag" className="w-5 h-5" />
            <span className="text-gray-700 text-sm">
              Cheruvannur, Kozhikode, Kerala
            </span>
          </div>
        </div>
      </div>

      <button className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors self-center lg:self-start">
        <TbEdit className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

export default MainProfileCard;
