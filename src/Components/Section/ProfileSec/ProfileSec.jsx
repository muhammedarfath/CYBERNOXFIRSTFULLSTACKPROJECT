import React from "react";
import userphoto from "../../../assets/User Male Profile.svg";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import { TbEdit } from "react-icons/tb";
import ContactDetails from "./ContactDetails";
import BasicDetails from "./BasicDetails";
import EducationProfile from "./EducationProfile";
import ReligiousDetails from "./ReligiousDetails";
import AddProfileImages from "./AddProfileImages";
import PartnerExpectation from "./PartnerExpectation";
import FamilyDetails from "./FamilyDetails";

function ProfileSec() {
  const details = [
    { label: "Name", value: "Muhammed Arfath" },
    { label: "Profile ID", value: "WT3677639" },
    { label: "Age", value: "21 Yrs" },
    { label: "Gender", value: "Male" },
    { label: "Marital Status", value: "Never Married" },
    { label: "Creating Profile for", value: "My Self" },
    { label: "Willing to Relocate", value: "Add Relocate", action: true },
    { label: "Marriage Plan", value: "Add Marriage Plan", action: true },
    { label: "Any Health / Disability Issues?", value: "No" },
    { label: "Ethnic Group", value: "Add Ethnicity", action: true },
    { label: "Mother Tongue", value: "Add Mother Tongue", action: true },
    { label: "Languages Spoken", value: "Add Language", action: true },
  ];

  return (
    <div className="w-full overflow-hidden bg-gray-100 min-h-screen">
      <div className="flex md:flex-row flex-col w-full p-4">
        <div className="flex flex-col md:w-3/5 flex-wrap gap-4 p-4">
          <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-5">
            <div className="flex items-center gap-4">
              <div>
                <img
                  src={userphoto}
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Muhamed Arfath</h1>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 text-sm font-medium">
                    Verified
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-green-600"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59l-4.3-4.29 1.42-1.42 2.88 2.88 6.88-6.88 1.42 1.42-8.3 8.29z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-button p-3 rounded-2xl cursor-pointer hover:bg-[#FFB9C3]">
              <TbEdit className="text-white text-2xl" />
            </div>
          </div>

          <div className="w-full bg-white p-6 rounded-lg shadow-md ">
            <BasicDetails details={details} />
          </div>

          <div className="w-full bg-white p-6 rounded-lg shadow-md ">
            <ContactDetails />
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-md ">
            <EducationProfile />
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-md ">
            <ReligiousDetails/>
          </div>

          <FamilyDetails/>

          <div className="w-full bg-white p-6 rounded-lg shadow-md ">
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
