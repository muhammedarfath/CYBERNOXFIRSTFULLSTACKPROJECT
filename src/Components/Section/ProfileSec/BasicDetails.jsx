import React from "react";
import { TbChevronRight } from "react-icons/tb";

function BasicDetails({details}) {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Basic Details</h1>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-black">{detail.label}</div>
            <div className="flex items-center gap-2">
              <span
                className={detail.action ? "text-primary2" : "text-black"}
              >
                {detail.value}
              </span>
              <TbChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BasicDetails;
