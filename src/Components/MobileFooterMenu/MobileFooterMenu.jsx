import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaUser } from "react-icons/fa";
import { LuMedal } from "react-icons/lu";
import { IoMedalSharp } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BiMessageSquare } from "react-icons/bi";
import { PiChatFill } from "react-icons/pi";

function MobileFooterMenu() {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <div className="fixed bottom-0 md:hidden w-full bg-white rounded-tr-2xl rounded-tl-2xl p-2 shadow-3xl border-t-gray shadow-black z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex flex-1 justify-around items-center">
          <div className="text-center" onClick={() => handleClick("profile")}>
            <Link to="/profile">
              {activeIcon === "profile" ? (
                <FaUser className="text-2xl text-button" />
              ) : (
                <FaRegUser className="text-2xl" />
              )}
            </Link>
          </div>

          <div className="text-center" onClick={() => handleClick("bestmatch")}>
            <Link to="/bestmatch">
              {activeIcon === "bestmatch" ? (
                <IoMedalSharp className="text-2xl text-button" />
              ) : (
                <LuMedal className="text-2xl" />
              )}
            </Link>
          </div>

          <div className="text-center relative">
            <Link to="/">
              <img
                src="https://assets.aceternity.com/logo-dark.png"
                width={40}
                height={40}
                alt="Aceternity Logo"
                className="relative -top-1"
              />
            </Link>
          </div>

          <div className="text-center" onClick={() => handleClick("interest")}>
            <Link to="/interest">
              {activeIcon === "interest" ? (
                <FaHeart className="text-2xl text-button" />
              ) : (
                <FaRegHeart className="text-2xl" />
              )}
            </Link>
          </div>

          <div className="text-center" onClick={() => handleClick("message")}>
            <Link to="/message">
              {activeIcon === "message" ? (
                <PiChatFill className="text-2xl text-button" />
              ) : (
                <BiMessageSquare className="text-2xl" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileFooterMenu;
