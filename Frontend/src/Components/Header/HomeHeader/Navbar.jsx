import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import verifiedIcon from "../../../assets/Verified Icon.png";
import AuthContext from "../../../context/AuthContext";
import userphoto from "../../../assets/default.jpg";
import Logo from "../../../assets/logo PNG M.png";
import { backendUrl } from "../../../Constants/Constants";

function Navbar({ toggleMenu }) {
  const [isHovered, setIsHovered] = useState(false);
  const { profileDetails} = useContext(AuthContext);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (profileDetails?.user_profile?.user.profile_picture) {
      setPreview(
        `${backendUrl}${profileDetails.user_profile.user.profile_picture}`
      );
    } else {
      setPreview(userphoto);
    }
  }, [profileDetails]);

  return (
    <nav className="mx-auto flex items-center justify-between md:p-2 p-6 lg:px-8 ">
      <div className="flex lg:flex-1 items-center">
        <Link to="/">
          <img
            className="w-auto md:max-h-20 max-h-9 object-contain md:scale-150 scale-[2]"
            src={Logo}
            alt="Company Logo"
          />
        </Link>
      </div>
      <div className="flex lg:flex-1 lg:justify-end items-center gap-6">
        <Link to="/search">
          <button className="bg-button text-white gap-3 flex p-2 px-5 justify-center items-center rounded-xl">
            <IoSearchOutline className="text-xl" />
            <span className="hidden md:block">Search</span>
          </button>
        </Link>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          className="relative md:flex items-center hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to="/profile">
            <img
              src={preview}
              alt="User Profile"
              className="w-12 h-12 rounded-xl"
            />
          </Link>
          <img
            src={verifiedIcon}
            alt="Verified"
            className="absolute bottom-0 -right-1 transform -translate-x-1/2 w-5 h-5"
          />
          {isHovered && (
            <div className="absolute top-14 left-0 bg-button text-white px-3 py-1 text-sm rounded-lg shadow-lg">
              Verified
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
