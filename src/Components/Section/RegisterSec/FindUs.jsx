import React from "react";
import verifid from "../../../assets/Verification Search Icon.png";
import match from "../../../assets/Match Icon.png";
import connect from "../../../assets/Connect Love Icon.png";
import register from "../../../assets/Register Icon.png";

function FindUs() {
  return (
    <div className="p-4 sm:p-8 w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="font-extrabold text-2xl sm:text-3xl">Find us online</h1>
        <hr className="mb-3 border-gray-300 w-1/2 mx-auto" />
      </div>
      <div className="mt-8 flex justify-center items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[40rem] lg:w-[90rem] w-full">
          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={register}
              alt="Register"
              className="h-16 w-16 mb-4 sm:h-20 sm:w-20"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Register</h1>
            <span className="text-sm sm:text-lg text-white">
              Join our platform by creating your profile.
            </span>
          </div>

          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={verifid}
              alt="Search"
              className="h-16 w-16 mb-4 sm:h-20 sm:w-20"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Search</h1>
            <span className="text-sm sm:text-lg text-white">
              Find your perfect match with our advanced search.
            </span>
          </div>

          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={match}
              alt="Message"
              className="h-16 w-16 mb-4 sm:h-20 sm:w-20"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Message</h1>
            <span className="text-sm sm:text-lg text-white">
              Connect with members through secure messaging.
            </span>
          </div>

          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={connect}
              alt="Connect"
              className="h-16 w-16 mb-4 sm:h-20 sm:w-20"
            />
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Connect</h1>
            <span className="text-sm sm:text-lg text-white">
              Build meaningful relationships and connect for life.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindUs;
