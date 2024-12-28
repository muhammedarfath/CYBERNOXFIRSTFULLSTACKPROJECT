import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';

export default function EducationProfile() {
  const [education, setEducation] = useState({
    degree: 'Diploma (Computers/ IT)',
    institution: '',
    eduDetails: '',
    profession: 'Software Consultant',
    company: '',
    jobDetails: '',
    experience: '',
    professionType: 'Business',
    annualIncome: ''
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
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`font-medium ${!value ? 'text-green-600' : ''}`}>
          {value || `Add ${label}`}
        </p>
      </div>
      <MdChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Education & Professional Details</h1>
        <button 
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => console.log('Edit all details')}
        >
        <MdChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {renderField('Education', education.degree, 'degree')}
      {renderField('Education Institution', education.institution, 'institution')}
      {renderField('Edu Details', education.eduDetails, 'eduDetails')}
      {renderField('Profession', education.profession, 'profession')}
      {renderField('Company Name', education.company, 'company')}
      {renderField('Job Details', education.jobDetails, 'jobDetails')}
      {renderField('Job Experience', education.experience, 'experience')}
      {renderField('Profession Type', education.professionType, 'professionType')}
      {renderField('Annual Income', education.annualIncome, 'annualIncome')}
    </div>
  );
}

