import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { LuMedal } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BiMessageSquare } from "react-icons/bi";

function MobileFooterMenu() {
  return (
    <div className="fixed bottom-0 md:hidden w-full bg-white p-4 shadow-3xl z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex flex-1 justify-around items-center">
          <div className="text-center">
            <Link to="/profile">
              <FaRegUser className="text-2xl " />
            </Link>
          </div>
          <div className="text-center">
            <Link to="/bestmatch">
              <LuMedal className="text-2xl" />
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
          <div className="text-center">
            <Link to="/interest">
              <FaRegHeart className="text-2xl" />
            </Link>
          </div>
          <div className="text-center">
            <Link to="/message">
              <BiMessageSquare className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileFooterMenu;
