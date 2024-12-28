import React from "react";
import { TbChevronRight } from "react-icons/tb";

function FamilyDetails() {
  const details = [
    { label: "Family Type", value: "Add Family Type", isAction: true },
    { label: "Financial Status", value: "Middle Class" },
    { label: "Home Type", value: "Add Home Type", isAction: true },
    { label: "Living Situation", value: "Add Living Situation", isAction: true },
    { label: "Father Name", value: "Add Father Name", isAction: true },
    { label: "Father Alive or Not?", value: "Add Father Details", isAction: true },
    { label: "Father's Occupation", value: "Add Father's Occupation", isAction: true },
    { label: "Mother Name", value: "Add Mother Name", isAction: true },
    { label: "Mother Alive or Not?", value: "Add Mother Details", isAction: true },
    { label: "Mother's Occupation", value: "Add Mother's Occupation", isAction: true },
    { label: "No. Elder Brothers", value: "0" },
    { label: "No. Younger Brothers", value: "0" },
    { label: "No. Married Brothers", value: "0" },
    { label: "No. Elder Sisters", value: "0" },
    { label: "No. Younger Sisters", value: "0" },
    { label: "No. Married Sisters", value: "0" },
    { label: "Family Values", value: "Add Family Values", isAction: true },
    { label: "Family Origin", value: "Add Family Origin", isAction: true },
    { label: "Family Details", value: "Add Family Details", isAction: true }
  ];

  return (
    <div className="w-full mx-auto p-3">
      <h1 className="text-2xl font-bold mb-6">Family & Living Details</h1>
      
      <div className="space-y-1">
        {details.map((detail, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-700 text-lg">{detail.label}</span>
            <div className="flex items-center">
              <span className={detail.isAction ? 'text-primary2' : 'text-gray-900'}>
                {detail.value}
              </span>
              <TbChevronRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FamilyDetails;

