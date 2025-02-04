import React, { useState, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import CompanyModal from "../../Modal/CompanyModal";
import JobExperienceModal from "../../Modal/JobExperienceModal";

export default function EducationProfile({ profileDetails }) {
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    profession: "",
    company: "",
    jobDetails: "",
    experience: "",
    annualIncome: "",
  });

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isJobExperienceModalOpen, setIsJobExperienceModalOpen] = useState(false);

  useEffect(() => {
    if (profileDetails?.groom_bride_info) {
      setEducation({
        degree: profileDetails.groom_bride_info.education || "",
        institution: profileDetails.groom_bride_info.college_name || "",
        profession: profileDetails.groom_bride_info.occupation || "",
        company: profileDetails.groom_bride_info.company_name || "",
        jobDetails: profileDetails.groom_bride_info.employment || "",
        experience: profileDetails.groom_bride_info.experience || "",
        annualIncome: profileDetails.groom_bride_info.income || "",
      });
    }
  }, [profileDetails]);

  const handleEdit = (field) => {
    if (field === "company") {
      setIsCompanyModalOpen(true);
    } else if (field === "experience") {
      setIsJobExperienceModalOpen(true);
    }
  };

  const updateCompany = (newCompany) => {
    setEducation((prev) => ({ ...prev, company: newCompany }));
  };

  const updateExperience = (newExperience) => {
    setEducation((prev) => ({ ...prev, experience: newExperience }));
  };

  const renderField = (label, value, field, showIcon = false) => (
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
      {showIcon && <MdChevronRight className="h-5 w-5 text-gray-400" />}
    </div>
  );

  return (
    <div className="w-full mx-auto p-2">
      {renderField("Education", education.degree, "degree")}
      {renderField("Education Institution", education.institution, "institution")}
      {renderField("Profession", education.profession, "profession")}
      {renderField("Company Name", education.company, "company", true)}
      {renderField("Job Details", education.jobDetails, "jobDetails")}
      {renderField("Job Experience", education.experience, "experience", true)}
      {renderField("Annual Income", education.annualIncome, "annualIncome")}

      <CompanyModal open={isCompanyModalOpen} setOpen={setIsCompanyModalOpen} setCompany={updateCompany} />
      <JobExperienceModal open={isJobExperienceModalOpen} setOpen={setIsJobExperienceModalOpen} setExperience={updateExperience} />
    </div>
  );
}
