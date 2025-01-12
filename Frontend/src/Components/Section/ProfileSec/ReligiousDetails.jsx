import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";

function ReligiousDetails() {
  const details = [
    { label: "Religion", value: "Muslim" },
    { label: "Community", value: "A Muslim" },
    { label: "Religiousness", value: "Atheist" },
    { label: "Perform Namaz", value: "Prefer not to say" },
    { label: "Read Qur'an", value: "Add Read Quran", isAction: true },
    { label: "Mahallu Name", value: "Add Mahallu Name", isAction: true },
    {
      label: "Madrasa Education",
      value: "Add Madrasa Education",
      isAction: true,
    },
    {
      label: "Religious Services",
      value: "Add Religious Services",
      isAction: true,
    },
    { label: "Polygamy", value: "Add Polygamy", isAction: true },
    { label: "Born/Reverted", value: "Add Reverted", isAction: true },
    { label: "Political view", value: "Add Details", isAction: true },
  ];

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Socio - Religious Details
        </h1>
        <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
      </div>

      <div className="space-y-4 ">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg group"
          >
            <span className="text-gray-700 text-base">{item.label}</span>
            <div className="flex items-center gap-2">
              <span
                className={item.isAction ? "text-primary2" : "text-gray-900"}
              >
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReligiousDetails;
