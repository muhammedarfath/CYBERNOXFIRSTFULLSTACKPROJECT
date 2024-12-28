import React from "react";
import verifid from "../../../assets/Verification Search Icon.png";
import match from "../../../assets/Match Icon.png";
import connect from "../../../assets/Connect Love Icon.png";
import register from "../../../assets/Register Icon.png";

function FindUs() {
  return (
    <div className="p-8 w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-9 text-center">
        <h1 className="font-extrabold text-3xl">Find us online</h1>
        <hr className="mb-3" />
      </div>
      <div className="mt-8 flex justify-center items-center">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8 md:w-[40rem] lg:w-[90rem] w-full">
          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={register}
              alt="Register"
              className="h-[5rem] w-[5rem] mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">Register</h1>
            <span className="text-lg text-white">
              Join our platform by creating your profile.
            </span>
          </div>

          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={verifid}
              alt="Search"
              className="h-[5rem] w-[5rem] mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">Search</h1>
            <span className="text-lg text-white">
              Find your perfect match with our advanced search.
            </span>
          </div>

          {/* Message Card */}
          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img src={match} alt="Message" className="h-[5rem] w-[5rem] mb-4" />
            <h1 className="text-3xl font-bold mb-2">Message</h1>
            <span className="text-lg text-white">
              Connect with members through secure messaging.
            </span>
          </div>

          <div className="flex flex-col bg-primary items-center text-center text-white p-6 rounded-lg shadow-md">
            <img
              src={connect}
              alt="Connect"
              className="h-[5rem] w-[5rem] mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">Connect</h1>
            <span className="text-lg text-white">
              Build meaningful relationships and connect for life.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindUs;
