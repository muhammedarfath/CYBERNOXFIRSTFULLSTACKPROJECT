import React from "react";
import { TbEdit } from "react-icons/tb";

function FamilyDetails() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-lg shadow-md p-5">
      <div>
        <div className="flex gap-3">
          <h1 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Family Details
          </h1>
        </div>
        <ul className="space-y-2">
          <li>
            <span className="font-bold">Native Place:</span> Kozhikode
          </li>
          <li>
            <span className="font-bold">Father's Name:</span> Anwar
          </li>
          <li>
            <span className="font-bold">Brother:</span> 1 (0 Married)
          </li>
        </ul>
      </div>
      <div className="bg-button p-3 rounded-2xl cursor-pointer hover:bg-[#FFB9C3] mt-4 md:mt-0">
        <TbEdit className="text-white text-2xl" />
      </div>
    </div>
  );
}

export default FamilyDetails;
