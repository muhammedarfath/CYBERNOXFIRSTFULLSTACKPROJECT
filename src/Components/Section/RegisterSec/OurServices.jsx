import React from "react";
import security from "../../../assets/Authentication Rafiki Illustration (1).png";
import chat from "../../../assets/Rafiki Conversation Illustration.png";

function OurServices() {
  return (
    <div className="flex flex-col space-y-12 md:space-y-16">
      <div className="flex flex-col md:flex-row w-full items-center md:container mx-auto">
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            src={security}
            alt="Security"
            className="w-64 h-auto md:w-96" 
          />
        </div>
        <div className="md:w-1/2 w-full flex items-center px-4 md:px-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Secure Registration with Aadhaar-based OTP
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Your security is our priority! When registering and creating your
              profile, we ensure authenticity by using Aadhaar-based OTP
              verification. This guarantees a safe and genuine matchmaking
              experience.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full items-center md:container mx-auto">
        <div className="md:w-1/2 w-full flex items-center px-4 md:px-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Connect Directly with Matches
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Build meaningful relationships through our direct messaging
              feature. Communicate seamlessly with matches and take the first
              step toward a successful connection.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <img
            src={chat}
            alt="Direct Messaging"
            className="w-64 h-auto md:w-96" 
          />
        </div>
      </div>
    </div>
  );
}

export default OurServices;
