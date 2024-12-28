import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";

function PhysicalDetails() {
  const details = [
    { label: "Height", value: "156 cm (5'2\")" },
    { label: "Weight", value: "50 Kg" },
    { label: "Skin Color", value: "Add Skin Color", isAction: true },
    { label: "Blood Group", value: "Add Blood Group", isAction: true },
    { label: "Body type", value: "Athletic" },
    { label: "Hair Color", value: "Add Hair Color", isAction: true },
    { label: "Hair Type", value: "Add Hair Type", isAction: true },
    { label: "Facial Hair", value: "Add Facial Hair", isAction: true },
    { label: "Eye Color", value: "Add Eye Color", isAction: true },
    { label: "Eye Wear", value: "Add Eye Wear", isAction: true },
    { label: "Appearance", value: "Add Appearance", isAction: true },
  ];

  return (
    <div className="w-full mx-auto p-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold ">
          Physical & Appearance Details
        </h1>
        <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
      </div>

      <div className="space-y-1">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-700 text-lg">{detail.label}</span>
            <div className="flex items-center">
              <span
                className={detail.isAction ? "text-primary2" : "text-gray-900"}
              >
                {detail.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhysicalDetails;
