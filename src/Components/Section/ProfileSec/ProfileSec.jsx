import React from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import ContactDetails from "./ContactDetails";
import BasicDetails from "./BasicDetails";
import EducationProfile from "./EducationProfile";
import ReligiousDetails from "./ReligiousDetails";
import AddProfileImages from "./AddProfileImages";
import PartnerExpectation from "./PartnerExpectation";
import FamilyDetails from "./FamilyDetails";
import PhysicalDetails from "./PhysicalDetails";
import Hobbies from "./Hobbies";
import MainProfileCard from "./MainProfileCard";

function ProfileSec() {



  return (
    <div className="w-full overflow-scroll h-full">
      <div className="flex md:flex-row flex-col w-full p-4">
        <div className="flex flex-col md:w-3/5 w-full flex-wrap gap-4 md:p-4">
          <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-5">
            <MainProfileCard/>
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <BasicDetails  />
          </div>

          <div className="w-full bg-white p-2 rounded-lg shadow-md ">
            <ContactDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <EducationProfile />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <ReligiousDetails />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <PhysicalDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <FamilyDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <Hobbies />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <PartnerExpectation />
          </div>
        </div>
        <AddProfileImages />
      </div>
      <div className="slider-controler">
        <FloatingDockDemo />
      </div>



    </div>
  );
}

export default ProfileSec;
