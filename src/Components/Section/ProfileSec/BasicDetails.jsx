import React from "react";
import { TbChevronRight } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";

function BasicDetails({ details }) {
  return (
    <>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl font-semibold">Basic Details</h1>
        <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
      </div>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-black">{detail.label}</div>
            <div className="flex items-center gap-2">
              <span className={detail.action ? "text-primary2" : "text-black"}>
                {detail.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BasicDetails;
