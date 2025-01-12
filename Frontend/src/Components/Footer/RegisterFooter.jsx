import React from "react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { RiInstagramFill, RiMailFill, RiMapPin2Fill } from "react-icons/ri";

function RegisterFooter() {
  return (
    <>
      <div className="bg-primary w-full py-5">
        <ul className="flex flex-col sm:flex-row container mx-auto justify-center items-center gap-12 sm:gap-24 text-white">
          <li className="flex flex-col items-center gap-2">
            <div className="p-3 border-2 border-white rounded-full">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <span className="text-lg font-medium">Helpline</span>
            <span>79823489</span>
          </li>
          <li className="flex flex-col items-center gap-2">
            <div className="p-3 border-2 border-white rounded-full">
              <RiMailFill className="text-2xl" />
            </div>
            <span className="text-lg font-medium">Send Your Queries</span>
            <span>info@gmail.com</span>
          </li>
          <li className="flex flex-col items-center gap-2">
            <div className="p-3 border-2 border-white rounded-full">
              <RiMapPin2Fill className="text-2xl" />
            </div>
            <span className="text-lg font-medium">Head Office</span>
            <span>Calicut, Kerala</span>
          </li>
        </ul>
      </div>

      <footer className="bg-gray-100 py-8 rounded-t-lg">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:py-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center mb-4 sm:mb-0 space-x-4 justify-center">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border border-gray-400 p-2 rounded-full"
              >
                <FaFacebook className="text-2xl" />
                <span className="font-medium hidden sm:block">Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border border-gray-400 p-2 rounded-full"
              >
                <RiInstagramFill className="text-2xl" />
                <span className="font-medium hidden sm:block">Instagram</span>
              </a>
            </div>

            <ul className="flex flex-wrap items-center justify-center text-sm font-medium text-gray-500 mt-4 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default RegisterFooter;
