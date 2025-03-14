"use client"
import { Link } from "react-router-dom"
import Logo from "../../../assets/logo PNG M.png"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { backendUrl } from "../../../Constants/Constants";
import userphoto from "../../../assets/default.jpg";

function MobileMenu({ toggleMenu, isOpen }) {
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
    <div>
      <div
        className={`md:hidden fixed inset-0 z-10 bg-gray-500/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-90" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed inset-y-0 right-0 z-20 w-1/2 overflow-y-auto bg-white px-6 py-6 shadow-xl rounded-l-2xl transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-12 object-contain" src={Logo || "/placeholder.svg"} alt="Company Logo" />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-full p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile section at top */}
        <div className="mt-6 border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={preview}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{profileDetails?.user_profile?.name}</h3>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flow-root">
          <div className="divide-y divide-gray-100">
            <div className="space-y-1 py-4">
              {["Home", "Profile", "Interest", "Message"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="group flex w-full items-center rounded-lg px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-all"
                  onClick={toggleMenu}
                >
                  <span className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-100">
                    {link === "Home" && (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    {link === "Profile" && (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                    {link === "Interest" && (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                    {link === "Message" && (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    )}
                  </span>
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu

