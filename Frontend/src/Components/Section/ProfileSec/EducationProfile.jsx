import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";

export default function EducationProfile() {
  const [education, setEducation] = useState({
    degree: "Diploma (Computers/ IT)",
    institution: "",
    eduDetails: "",
    profession: "Software Consultant",
    company: "",
    jobDetails: "",
    experience: "",
    professionType: "Business",
    annualIncome: "",
  });

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
  };

  const renderField = (label, value, field) => (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 cursor-pointer hover:bg-gray-50"
      onClick={() => handleEdit(field)}
    >
      <div>
        <p className="text-sm">{label}</p>
        <p className={`font-medium ${!value ? "text-primary2" : ""}`}>
          {value || `Add ${label}`}
        </p>
      </div>
      <MdChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );

  return (
    <div className="w-full mx-auto p-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Education & Professional Details
          </h1>
          <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
        </div>

        <button
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => console.log("Edit all details")}
        >
          <MdChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {renderField("Education", education.degree, "degree")}
      {renderField(
        "Education Institution",
        education.institution,
        "institution"
      )}
      {renderField("Edu Details", education.eduDetails, "eduDetails")}
      {renderField("Profession", education.profession, "profession")}
      {renderField("Company Name", education.company, "company")}
      {renderField("Job Details", education.jobDetails, "jobDetails")}
      {renderField("Job Experience", education.experience, "experience")}
      {renderField(
        "Profession Type",
        education.professionType,
        "professionType"
      )}
      {renderField("Annual Income", education.annualIncome, "annualIncome")}
    </div>
  );
}
