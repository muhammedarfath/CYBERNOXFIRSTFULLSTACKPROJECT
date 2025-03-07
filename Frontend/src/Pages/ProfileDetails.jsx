import React, { useState } from "react";
import { CiPhone } from "react-icons/ci";
import ProfileDetailImg from "../Components/Section/ProfileDetailsSec/ProfileDetailImg";
import ProfileDetailsHobbies from "../Components/Section/ProfileDetailsSec/ProfileDetailsHobbies";
import ProfileDetailOther from "../Components/Section/ProfileDetailsSec/ProfileDetailOther";
import { FaLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdMessage } from "react-icons/md";


function ProfileDetails() {
  const location = useLocation();
  const { slide } = location.state || {};

  
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsPaid(true);
  };

  const handleChatNavigation = () => {
    if (slide?.user_profile?.user.id && slide?.user_profile?.name) {
      navigate(`/chatarea/${encodeURIComponent(slide.user_profile.name)}`, {
        state: { userId: slide.user_profile.user.id },
      });
    }
  };
  
  
  

  return (
    <div className="h-screen bg-gray-100 overflow-scroll">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="hidden md:block">
          <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white text-sm md:text-base hover:bg-button-hover transition">
            <FaLeftLong />
            Back
          </button>
        </Link>

        {slide ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-12 gap-6">
            <div className="col-span-1 sm:col-span-4 lg:col-span-3">
              <ProfileDetailImg slide={slide} />
            </div>

            <div className="col-span-1 sm:col-span-8 lg:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Profile Description</h2>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {slide.family_info?.family_description}
                </p>
                <div
                  className={`w-full h-auto mt-6 text-white bg-[#f15d5d] bg-opacity-10 flex flex-col justify-center items-center p-3 gap-5 rounded-2xl transition-all duration-300 ${
                    isPaid ? "blur-0" : "blur-sm opacity-50 pointer-events-none"
                  }`}
                >
                  <h1 className="text-black text-sm md:text-lg">
                    Contact Number: +97*******5
                  </h1>
                  <button className="bg-button flex w-full text-center justify-center p-3 rounded-lg hover:bg-button-hover transition">
                    <CiPhone className="text-2xl" />
                    View Contact Details
                  </button>
                  <button
                    onClick={handleChatNavigation}
                    className="bg-button flex w-full text-center justify-center p-3 rounded-lg hover:bg-button-hover transition"
                  >
                    <MdMessage className="text-2xl" />
                    Message
                  </button>
                </div>

                {!isPaid && (
                  <button
                    onClick={handlePayment}
                    className="bg-button text-white w-full mt-4 p-3 rounded-lg hover:bg-green-600 transition"
                  >
                    Pay to Unlock Contact Details
                  </button>
                )}

                <div className="mt-6">
                  <ProfileDetailsHobbies hobbies={slide.hobbies}/>
                  <ProfileDetailOther slide={slide}/>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
