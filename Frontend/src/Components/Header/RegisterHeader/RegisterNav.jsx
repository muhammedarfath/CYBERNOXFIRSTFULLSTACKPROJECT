import React, { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Login from "../../Modal/Login";
import { Link } from "react-router-dom";

function RegisterNav() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className="flex w-full justify-between items-center py-4 px-4 md:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/">
            <img
              className="w-auto md:max-h-6 max-h-6 object-contain"
              src="https://assets.aceternity.com/logo-dark.png"
              alt="Company Logo"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/register"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex lg:flex-1 lg:justify-end items-center gap-2">
          <h1>Already a member?</h1>
          <button
            className="border-none mr-4 rounded-lg px-5 py-2 bg-button text-white text-sm font-medium"
            onClick={onOpen}
          >
            Login
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute z-50 top-16 left-0 w-full bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <Link
              to="/register"
              className="text-gray-600 hover:bg-button hover:text-white p-3 rounded-md text-sm font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:bg-button hover:text-white p-3 rounded-md text-sm font-medium"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:bg-button hover:text-white p-3 rounded-md text-sm font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex justify-center items-center gap-2">
              <h1>Already a member?</h1>
              <button
                className="border-none rounded-lg px-5 py-2 bg-button text-white text-sm font-medium"
                onClick={() => {
                  toggleMenu();
                  onOpen();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default RegisterNav;
