import React from "react";

function ProfileDetailOther() {
  return (
    <>
      <h3 className="font-semibold mb-3 mt-6">Basic Details</h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Age</span>
          <span>21 Yrs</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Height</span>
          <span>160 cm</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Weight</span>
          <span>65 Kg</span>
        </div>
      </div>

      <h3 className="font-semibold mb-3">Education & Profession</h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Education</span>
          <span>Bachelors (B Tech)</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Profession</span>
          <span>Student</span>
        </div>
      </div>

      <h3 className="font-semibold mb-3">Family Background</h3>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Financial Status</span>
          <span>Upper Middle Class</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Family Type</span>
          <span>Nuclear Family</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <span className="text-gray-600">Location</span>
          <span>Malappuram, Kerala, India</span>
        </div>
      </div>
    </>
  );
}

export default ProfileDetailOther;
