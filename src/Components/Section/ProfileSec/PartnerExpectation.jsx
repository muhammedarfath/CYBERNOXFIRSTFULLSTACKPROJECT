import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";

function PartnerExpectation() {
  const sections = [
    {
      title: "Partner Basic Preferences",
      preferences: [
        {
          label: "Partner Age Preference",
          value: "Add Age Preferences",
          isAction: true,
        },
        {
          label: "Partner Height Preference",
          value: "Add Height Preferences",
          isAction: true,
        },
        {
          label: "Partner Marital Status Preference",
          value: "Does not matter",
        },
        {
          label: "Partner Physical Status Preference",
          value: "Does not matter",
        },
        { label: "Partner Eating Preference", value: "Does not matter" },
        { label: "Partner Drinking Preference", value: "Does not matter" },
        { label: "Partner Smoking Preference", value: "Does not matter" },
        { label: "Partner Ethic Group Preference", value: "Any" },
        { label: "Partner Language Preference", value: "Does not matter" },
      ],
    },
    {
      title: "Education & Professional Preferences",
      preferences: [
        { label: "Partner Education Preferences", value: "Does not matter" },
        { label: "Partner Profession Preferences", value: "Does not matter" },
        { label: "Partner Annual Income", value: "Does not matter" },
      ],
    },
    {
      title: "Partner Location Preferences",
      preferences: [
        {
          label: "Partner District Preferences",
          value: "Add Partner District Preferences",
          isAction: true,
        },
        {
          label: "Partner Present Country Preferences",
          value: "Add Nationality",
          isAction: true,
        },
      ],
    },
  ];

  return (
    <div className="w-full mx-auto">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
          </div>

          <div className="divide-y divide-gray-200">
            {section.preferences.map((pref, index) => (
              <div
                key={index}
                className="flex flex-col p-4 cursor-pointer hover:bg-gray-100"
              >
                <span className="text-gray-600 text-sm mb-1">{pref.label}</span>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-lg ${
                      pref.isAction ? "text-primary2" : "text-gray-900"
                    }`}
                  >
                    {pref.value}
                  </span>
                  <TbChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PartnerExpectation;
