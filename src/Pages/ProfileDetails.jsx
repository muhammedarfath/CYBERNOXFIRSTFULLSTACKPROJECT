import React from "react";
import { CiPhone } from "react-icons/ci";
import slide_img_5 from "../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import ProfileDetailImg from "../Components/Section/ProfileDetailsSec/ProfileDetailImg";
import ProfileDetailsHobbies from "../Components/Section/ProfileDetailsSec/ProfileDetailsHobbies";
import ProfileDetailOther from "../Components/Section/ProfileDetailsSec/ProfileDetailOther";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ProfileDetails() {
  return (
    <div>
      <div className="">
        <div className="container mx-auto py-8">
          <Link to="/">
            <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white">
              <FaLeftLong />
              Back
            </button>
          </Link>
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <ProfileDetailImg slide_img_5={slide_img_5} />
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Profile Description</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Lorem, ipsum dolor sit amet consectetur adipisicing
                  elit. Quas dolores enim magni. Cumque laborum omnis ullam,
                  itaque doloribus laudantium ipsum! Corporis ea tempora
                  voluptatem doloremque sunt ipsam, nam pariatur corrupti?
                </p>

                <div className="w-full h-auto mt-6 text-white bg-gray50 flex flex-col justify-center items-center p-3 gap-5 rounded-2xl">
                  <h1 className="text-black">Contact Number: +97*******5</h1>
                  <button className="bg-button flex w-full text-center justify-center p-3 rounded-lg">
                    <CiPhone className="text-2xl" />
                    View Contact Details
                  </button>
                </div>

                <div className="mt-6">
                  <ProfileDetailsHobbies />
                  <ProfileDetailOther />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
